
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateAccessToken, generateRefreshToken } from '@/lib/auth'
import { comparePassword } from '@/lib/password'
import { rbacService } from '@/services/rbac-service'
import { withRateLimit, addSecurityHeaders, validateEmail, sanitizeInput } from '@/lib/security'
import { auditService } from '@/services/audit-service'

async function loginHandler(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json()
      console.log('[Login] Request body parsed', { email: body.email })
    } catch (_e) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { email, password } = body

    // Validate input with more specific checks
    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      return addSecurityHeaders(NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      ))
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }


    // Sanitize email
    const sanitizedEmail = sanitizeInput(email.toLowerCase())

    // Find user by global unique email
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: sanitizedEmail },
      })
      console.log('[Login] User lookup result:', user ? 'Found' : 'Not Found', user?.id)
    } catch (dbError: any) {
      console.error('Database connection error during login:', dbError)
      return NextResponse.json(
        { success: false, message: 'Service unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    console.log('[Login] Password verification:', isValidPassword)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, message: 'Account is not active' },
        { status: 403 }
      )
    }

    // Generate tokens
    const permissions = await rbacService.getUserPermissions(user.id)
    console.log('[Login] Permissions fetched:', permissions.length)

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions,
      // Add tenantId
    }

    const accessToken = await generateAccessToken(payload)
    console.log('[Login] Access Token generated')
    const refreshToken = await generateRefreshToken(payload)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Create response with cookies
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      // We can still return token for client-side usage if needed, but cookie is primary for middleware
      accessToken, 
    })

    // Set Secure HTTP-Only Cookies
    response.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    // Audit Log: Successful Login
    try {
      await auditService.log({
        action: 'LOGIN_SUCCESS',
        resource: 'auth',
        userId: user.id,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        details: { email: user.email }
      })
    } catch (auditError) {
      console.error('Audit log failed:', auditError)
      // Continue login even if audit fails
    }

    console.log('[Login] Sending success response')
    return addSecurityHeaders(response)
  } catch (error: any) {
    console.error('Critical login error:', error)
    return addSecurityHeaders(NextResponse.json(
      { success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    ))
  }
}

export const POST = withRateLimit(loginHandler)
