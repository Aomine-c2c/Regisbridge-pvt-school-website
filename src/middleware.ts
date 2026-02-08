import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/auth'

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/admin': ['admin'],
  '/teacher': ['teacher', 'admin'], // Admins might need access to teacher views
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
  '/admissions', // Public admissions info
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/verify',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Check if it's a public route
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route) || pathname === '/')) {
    return NextResponse.next()
  }

  // 2. Check for static assets (images, fonts, etc.)
  if (
    pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|css|js|woff|woff2)$/) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/media')
  ) {
    return NextResponse.next()
  }

  // 3. Get token from cookies or Authorization header
  // We'll check cookies first as that's standard for SSR/Middleware
  // But our AuthContext uses localStorage, so we might need to rely on the Authorization header if this was an API call
  // However, for page navigation, we REALLY should be using cookies.
  // ANALYSIS: The current AuthContext uses localStorage. Middleware CANNOT access localStorage.
  // Middleware can only access Cookies.
  // IF the app relies purely on localStorage, we cannot use Middleware for page protection effectively without
  // moving the token to a cookie or using a client-side layout check.
  
  // Let's check if the user is willing to migrate to cookies or if we should implement a client-side HOC.
  // The Security Audit recommended Middleware. To make Middleware work, we MUST use cookies.
  
  // STRATEGY:
  // I will implement the middleware to look for a 'accessToken' cookie.
  // I will ALSO update the AuthContext to set this cookie when logging in.
  
  let token = request.cookies.get('accessToken')?.value

  // Fallback to Authorization header (for API calls)
  if (!token) {
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
  }

  if (!token) {
    // Redirect to login if accessing a protected route
    if (Object.keys(PROTECTED_ROUTES).some(route => pathname.startsWith(route))) {
      // For API routes, return 401 Unauthorized instead of redirecting
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        )
      }

      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // 4. Verify Token
  const payload = await verifyAccessToken(token)

  if (!payload) {
    // Token is invalid/expired
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 5. Check Role Access
  const userRole = payload.role as string
  
  // Find which protected route is being accessed (longest match first)
  const matchedRoute = Object.keys(PROTECTED_ROUTES)
    .sort((a, b) => b.length - a.length)
    .find(route => pathname.startsWith(route))

  if (matchedRoute) {
    const allowedRoles = PROTECTED_ROUTES[matchedRoute as keyof typeof PROTECTED_ROUTES]
    if (!allowedRoles.includes(userRole)) {
      // User does not have permission
       const url = request.nextUrl.clone()
       url.pathname = '/unauthorized' // We need to create this page or redirect to their dashboard
       return NextResponse.redirect(url)
    }
  }

  // 6. Pass user info to backend via headers (optional but useful)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', payload.userId as string)
  requestHeaders.set('x-user-role', payload.role as string)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
