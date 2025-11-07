import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { createUserInDB } from '@/lib/db'

// In-memory users map as fallback
const users = new Map()

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
  studentId: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
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
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '7d' }
  )
}

function generateRefreshToken(user: any) {
  return jwt.sign(
    { userId: user.id, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
    { expiresIn: '30d' }
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const { error, value } = registerSchema.validate(body)
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { email, password, firstName, lastName, role, grade, studentId } = value

    // Check if user already exists
    if (await isEmailTaken(email)) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user object
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      grade: role === 'student' ? grade : undefined,
      studentId: role === 'student' ? studentId : undefined,
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

    return NextResponse.json(
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
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    )
  }
}
