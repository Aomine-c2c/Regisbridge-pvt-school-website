import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { createUserInDB } from '@/lib/db'
import { config } from '@/lib/config'
import { checkRateLimit, rateLimitPresets } from '@/lib/rate-limit'
import { secureResponse } from '@/lib/security-headers'
import { users } from '@/lib/users-store'

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid('student', 'parent', 'teacher', 'admin').default('student'),
  grade: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  // studentId is now auto-generated, not required from client
  studentId: Joi.string().optional(),
})

// Check if email is already taken
async function isEmailTaken(email: string): Promise<boolean> {
  // Check in-memory first
  for (const user of users.values()) {
    if (user.email.toLowerCase() === email.toLowerCase()) {
      return true
    }
  }
  return false
}

function generateToken(user: any) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwt.secret,
    { expiresIn: '7d' }
  )
}

function generateRefreshToken(user: any) {
  return jwt.sign(
    { userId: user.id, type: 'refresh' },
    config.jwt.refreshSecret,
    { expiresIn: '30d' }
  )
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 registration attempts per 15 minutes
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.auth)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const body = await request.json()
    
    // Validate input
    const { error, value } = registerSchema.validate(body)
    if (error) {
      return secureResponse(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { email, password, firstName, lastName, role, grade, studentId } = value

    // Check if user already exists
    if (await isEmailTaken(email)) {
      return secureResponse(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Note: Registration numbers are assigned by admin upon admission approval
    // Students get a temporary application ID during signup
    const applicationId = role === 'student' 
      ? `APP${new Date().getFullYear()}${Date.now().toString().slice(-6)}`
      : undefined

    // Create user object
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      grade: role === 'student' ? grade : undefined,
      studentId: role === 'student' ? (studentId || applicationId) : undefined,
      createdAt: new Date().toISOString(),
    }

    // Store user in memory
    users.set(user.id, user)

    // Persist to DB if available
    await createUserInDB(user).catch(() => null)

    // Generate tokens
    const token = generateToken(user)
    const refreshToken = generateRefreshToken(user)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return secureResponse(
      {
        success: true,
        message: 'User registered successfully',
        data: {
          user: userWithoutPassword,
          token,
          refreshToken,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return secureResponse(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    )
  }
}
