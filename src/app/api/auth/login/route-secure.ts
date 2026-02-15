import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit, addSecurityHeaders, validateEmail, sanitizeInput, secureDbQuery } from '@/lib/security'
import { prisma } from '@/lib/db'
import { generateAccessToken, generateRefreshToken } from '@/lib/auth'
import { comparePassword } from '@/lib/password'

async function loginHandler(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input with enhanced security checks
    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      const response = NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      )
      return addSecurityHeaders(response)
    }

    if (!password || typeof password !== 'string') {
      const response = NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      )
      return addSecurityHeaders(response)
    }

    // Sanitize email to prevent injection
    const sanitizedEmail = sanitizeInput(email.toLowerCase())

    // Use findFirst since email is unique per tenant but not globally
    // We should ideally scope this by tenant resolved from the domain
    const user = await secureDbQuery(
      () => prisma.user.findFirst({
        where: { email: sanitizedEmail },
        select: {
          id: true,
          email: true,
          password: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      'user_lookup_by_email'
    )

    if (!user) {
      const response = NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
      return addSecurityHeaders(response)
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      const response = NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
      return addSecurityHeaders(response)
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      const response = NextResponse.json(
        { success: false, message: 'Account is not active' },
        { status: 403 }
      )
      return addSecurityHeaders(response)
    }

    // Load permissions for the payload
    const { rbacService } = await import('@/services/rbac-service')
    const permissions = await rbacService.getUserPermissions(user.id)

    // Generate tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions
    }

    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(payload),
      generateRefreshToken(payload)
    ])

    // Update last login time (commented out until schema is updated)
    // await secureDbQuery(
    //   () => prisma.user.update({
    //     where: { id: user.id },
    //     data: { lastLoginAt: new Date() }
    //   }),
    //   'update_last_login'
    // )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    })

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Login error:', error)
    const response = NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

export const POST = withRateLimit(loginHandler)
