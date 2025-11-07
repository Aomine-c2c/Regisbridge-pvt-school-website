import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-middleware'
import { getAllUsersFromDB } from '@/lib/db'

// In-memory users as fallback
const users = new Map()

export async function GET(request: NextRequest) {
  // Check admin auth
  const { user, error } = await requireAdmin(request)
  if (error) return error

  try {
    // Get users from database
    let allUsers = await getAllUsersFromDB()
    
    // Fallback to in-memory if DB empty
    if (allUsers.length === 0 && users.size > 0) {
      allUsers = Array.from(users.values())
    }

    // Remove passwords
    const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user)

    return NextResponse.json({
      success: true,
      data: usersWithoutPasswords,
      total: usersWithoutPasswords.length,
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
