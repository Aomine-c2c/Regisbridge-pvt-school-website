import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { findUserByEmailInDB } from '@/lib/db'
import { config } from '@/lib/config'
import { secureResponse } from '@/lib/security-headers'
import { checkRateLimit, rateLimitPresets } from '@/lib/rate-limit'
import { users } from '@/lib/users-store'

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 attempts per 15 minutes)
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.auth);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    const body = await request.json()
    
    // Validate request
    const { error } = loginSchema.validate(body)
    if (error) {
      return secureResponse(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { email, password } = body

    // Debug: Log available users
    console.log('Login attempt for:', email)
    console.log('Available in-memory users:', Array.from(users.values()).map(u => u.email))

    // Try database first, fallback to in-memory
    let user: any = await findUserByEmailInDB(email)
    if (!user) {
      // Search in-memory users by email
      user = Array.from(users.values()).find(u => u.email.toLowerCase() === email.toLowerCase())
      console.log('Found in-memory user:', user ? user.email : 'NOT FOUND')
    }

    if (!user) {
      return secureResponse(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return secureResponse(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token with secure config
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.accessTokenExpiry }
    )

    const { password: _, ...userWithoutPassword } = user

    return secureResponse({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return secureResponse(
      { success: false, message: 'Login failed' },
      { status: 500 }
    )
  }
}
