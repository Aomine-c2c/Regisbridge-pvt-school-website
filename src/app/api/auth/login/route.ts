import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { findUserByEmailInDB } from '@/lib/db'

// In-memory users map as fallback
const users = new Map()

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request
    const { error } = loginSchema.validate(body)
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { email, password } = body

    // Try database first, fallback to in-memory
    let user = await findUserByEmailInDB(email)
    if (!user) {
      user = users.get(email.toLowerCase())
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    )
  }
}
