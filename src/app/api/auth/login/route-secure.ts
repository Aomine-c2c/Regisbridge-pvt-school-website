import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit, addSecurityHeaders, validateEmail, sanitizeInput } from '@/lib/security'
import { prisma } from '@/lib/db'
import { comparePassword, generateAccessToken, generateRefreshToken } from '@/lib/auth'

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

    // Use secure database query
    const user = await secureDbQuery(
      () => prisma.user.findUnique({
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

    // Generate tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
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

// Import secureDbQuery function
async function secureDbQuery<T>(
  query: () => Promise<T>,
  operation: string
): Promise<T> {
  try {
    const result = await query()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ DB Operation successful: ${operation}`)
    }
    
    return result
  } catch (error) {
    console.error(`❌ DB Operation failed: ${operation}`, error)
    throw error
  }
}

export const POST = withRateLimit(loginHandler)
