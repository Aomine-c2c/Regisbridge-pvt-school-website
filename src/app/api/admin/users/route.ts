import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-middleware'
import {
  getAllUsersFromDB,
  findUsersWithFilters,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
  findUserByEmailInDB,
} from '@/lib/db'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import Joi from 'joi'

// In-memory users as fallback
const users = new Map()

// Validation schemas
const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'parent', 'teacher', 'admin').required(),
  grade: Joi.string().optional().allow('', null),
  studentId: Joi.string().optional().allow('', null),
  phoneNumber: Joi.string().optional().allow('', null),
  status: Joi.string().valid('active', 'inactive', 'suspended').optional(),
})

const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  firstName: Joi.string().min(1).optional(),
  lastName: Joi.string().min(1).optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('student', 'parent', 'teacher', 'admin').optional(),
  grade: Joi.string().optional().allow('', null),
  studentId: Joi.string().optional().allow('', null),
  phoneNumber: Joi.string().optional().allow('', null),
  status: Joi.string().valid('active', 'inactive', 'suspended').optional(),
}).min(1)

// Utility: Remove sensitive fields from user object
function sanitizeUser(user: any) {
  const { password, ...sanitized } = user
  return sanitized
}

export async function GET(request: NextRequest) {
  // Check admin auth
  const { user, error } = await requireAdmin(request)
  if (error) return error

  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') || undefined
    const status = searchParams.get('status') || undefined
    const search = searchParams.get('search') || undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Get users with filters from database
    const { data: allUsers, total } = await findUsersWithFilters({
      role,
      status,
      search,
      page,
      limit,
    })

    // Fallback to in-memory if DB empty
    if (allUsers.length === 0 && users.size > 0) {
      const inMemoryUsers = Array.from(users.values())
      return NextResponse.json({
        success: true,
        data: inMemoryUsers.map(sanitizeUser),
        total: inMemoryUsers.length,
        page,
        limit,
      })
    }

    // Remove passwords
    const usersWithoutPasswords = allUsers.map(sanitizeUser)

    return NextResponse.json({
      success: true,
      data: usersWithoutPasswords,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Check admin auth
  const { user, error } = await requireAdmin(request)
  if (error) return error

  try {
    const body = await request.json()

    // Validate input
    const { error: validationError, value } = createUserSchema.validate(body)
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError.details[0].message },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await findUserByEmailInDB(value.email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(value.password, 10)

    // Create user data
    const newUser = {
      id: uuidv4(),
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: hashedPassword,
      role: value.role,
      grade: value.grade || null,
      studentId: value.studentId || null,
      phoneNumber: value.phoneNumber || null,
      status: value.status || 'active',
      permissions: null,
    }

    // Try database first
    const dbUser = await createUserInDB(newUser)
    
    // Fallback to in-memory if DB fails
    if (!dbUser) {
      users.set(newUser.id, newUser)
    }

    const createdUser = dbUser || newUser

    return NextResponse.json({
      success: true,
      data: sanitizeUser(createdUser),
      message: 'User created successfully',
    }, { status: 201 })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  // Check admin auth
  const { user, error } = await requireAdmin(request)
  if (error) return error

  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    // Validate updates
    const { error: validationError, value } = updateUserSchema.validate(updates)
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError.details[0].message },
        { status: 400 }
      )
    }

    // If updating email, check uniqueness
    if (value.email) {
      const existingUser = await findUserByEmailInDB(value.email)
      if (existingUser && existingUser.id !== id) {
        return NextResponse.json(
          { success: false, message: 'Email already in use by another user' },
          { status: 409 }
        )
      }
    }

    // Hash password if provided
    const updateData = { ...value }
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10)
    }

    // Try database update
    const updatedUser = await updateUserInDB(id, updateData)

    // Fallback to in-memory
    if (!updatedUser && users.has(id)) {
      const inMemoryUser = users.get(id)
      const updated = { ...inMemoryUser, ...updateData }
      users.set(id, updated)
      return NextResponse.json({
        success: true,
        data: sanitizeUser(updated),
        message: 'User updated successfully',
      })
    }

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: sanitizeUser(updatedUser),
      message: 'User updated successfully',
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  // Check admin auth
  const { user, error } = await requireAdmin(request)
  if (error) return error

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    // Prevent admin from deleting themselves
    if (user.userId === id) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete your own account' },
        { status: 403 }
      )
    }

    // Try database delete
    const deleted = await deleteUserInDB(id)

    // Fallback to in-memory
    if (!deleted && users.has(id)) {
      users.delete(id)
      return NextResponse.json({
        success: true,
        message: 'User deleted successfully',
      })
    }

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
