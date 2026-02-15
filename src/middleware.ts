import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/auth'
import { addSecurityHeaders } from '@/lib/security'
import { checkRateLimit } from '@/lib/rate-limit'

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/admin': ['admin'],
  '/teacher': ['teacher', 'admin'],
  '/student': ['student'],
  '/parent': ['parent'],
  '/staff': ['staff', 'admin'],
}

// Public routes that don't need authentication
const PUBLIC_ROUTES = [
  '/login',
  '/register', 
  '/forgot-password',
  '/',
  '/about',
  '/contact',
  '/admissions',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/verify',
]

// Rate limit configuration for middleware
const RATE_LIMIT_OPTIONS = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 200, // 200 requests per minute per IP globally
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl
    const hostname = request.headers.get('host') || ''
    
    // 1. Tenant Resolution
    let tenantSlug = null
    if (hostname.includes('localhost')) {
        tenantSlug = 'default-school'
    } else {
        const parts = hostname.split('.')
        if (parts.length > 2) {
            tenantSlug = parts[0]
        }
    }

    // 2. Check for public routes / assets
    if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|css|js|woff|woff2)$/) ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/media')) {
      return NextResponse.next()
    }

    // 3. Global Rate Limiting
    const rateLimitRes = checkRateLimit(request, RATE_LIMIT_OPTIONS)
    if (rateLimitRes) return rateLimitRes

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route) || pathname === '/')

    if (isPublicRoute) {
       // Allow public routes, but still inject tenant header if we found one
       const requestHeaders = new Headers(request.headers)
       if (tenantSlug) requestHeaders.set('x-tenant-slug', tenantSlug)
       return NextResponse.next({
          request: { headers: requestHeaders }
       })
    }

    // 4. Authentication Check
    let token = request.cookies.get('accessToken')?.value

    if (!token) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      // Redirect unauthenticated users
      if (Object.keys(PROTECTED_ROUTES).some(route => pathname.startsWith(route))) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('from', pathname)
        return NextResponse.redirect(url)
      }
      return NextResponse.next()
    }

    // 5. Verify Token
    const payload = await verifyAccessToken(token)
    if (!payload) {
         if (Object.keys(PROTECTED_ROUTES).some(route => pathname.startsWith(route))) {
            if (pathname.startsWith('/api/')) {
               return NextResponse.json({ success: false, message: 'Invalid Token' }, { status: 401 })
            }
             const url = request.nextUrl.clone()
             url.pathname = '/login'
             return NextResponse.redirect(url)
         }
         // If not protected route (unlikely given logic above), just proceed? 
         // But logic above says "!token" check handles redirection.
         // Here token exists but invalid.
         // We should redirect/error.
         const url = request.nextUrl.clone()
         url.pathname = '/login'
         return NextResponse.redirect(url)
    }

    // 6. RBAC
    const userRole = payload.role as string
    const matchedRoute = Object.keys(PROTECTED_ROUTES)
      .sort((a, b) => b.length - a.length)
      .find(route => pathname.startsWith(route))

    if (matchedRoute) {
      const allowedRoles = PROTECTED_ROUTES[matchedRoute as keyof typeof PROTECTED_ROUTES]
      if (!allowedRoles.includes(userRole)) {
         const url = request.nextUrl.clone()
         url.pathname = '/unauthorized' 
         return NextResponse.redirect(url)
      }
    }

    // 7. Pass context to backend via headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId as string)
    requestHeaders.set('x-user-role', payload.role as string)
    if (payload.tenantId) {
        requestHeaders.set('x-tenant-id', payload.tenantId as string)
    }
    if (tenantSlug) {
        requestHeaders.set('x-tenant-slug', tenantSlug)
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // 8. Add Security Headers
    return addSecurityHeaders(response)

  } catch (error: any) {
    console.error('Middleware execution error:', error.message, error.stack)
    return NextResponse.json({ error: 'Middleware Error', details: error.message }, { status: 500 })
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
