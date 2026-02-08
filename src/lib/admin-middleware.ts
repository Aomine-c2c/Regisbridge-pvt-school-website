import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

/**
 * Admin Authentication Middleware
 * Protects admin routes and injects auth token from httpOnly cookie
 * 
 * Usage in middleware.ts:
 * export const config = {
 *   matcher: ['/admin/:path*', '/api/admin/:path*']
 * }
 */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

/**
 * Verify JWT token from cookie
 */
async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as any
  } catch (error) {
    return null
  }
}

/**
 * Main middleware handler
 */
export async function adminMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public admin pages
  const publicPaths = ['/admin/login', '/admin/register']
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for auth token in httpOnly cookie
  const token = request.cookies.get('authToken')?.value

  if (!token) {
    // API routes return 401
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // UI routes redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Verify token
  const user = await verifyAuth(token)

  if (!user) {
    // Invalid token
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Check admin role
  if (!['admin', 'administrator', 'superadmin'].includes(user.role)) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  // ✅ Inject user info into request headers for downstream use
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', user.id)
  requestHeaders.set('x-user-role', user.role)
  requestHeaders.set('x-user-email', user.email)

  // Continue to route
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

/**
 * Helper to get authenticated user from middleware-injected headers
 * Use in API routes:
 * 
 * export async function POST(request: NextRequest) {
 *   const user = getAuthContext(request)
 *   // user = { id, role, email }
 * }
 */
export function getAuthContext(request: NextRequest) {
  return {
    id: request.headers.get('x-user-id'),
    role: request.headers.get('x-user-role'),
    email: request.headers.get('x-user-email'),
  }
}

/**
 * Helper to create secure httpOnly auth cookie
 * Use in login/auth API route:
 * 
 * const response = NextResponse.json({ success: true })
 * setAuthCookie(response, token)
 * return response
 */
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: 'authToken',
    value: token,
    httpOnly: true, // ✅ Not accessible via JavaScript (prevents XSS)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // ✅ CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/', // Available to entire app
  })
  return response
}

/**
 * Helper to clear auth cookie (on logout)
 * Use in logout API route
 */
export function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: 'authToken',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Immediate expiration
    path: '/',
  })
  return response
}
