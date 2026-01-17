import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

// Helper to verify admin access
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authorized: false, error: 'No token provided' }
  }

  const token = authHeader.substring(7)
  const payload = await verifyAccessToken(token)

  if (!payload) {
    return { authorized: false, error: 'Invalid token' }
  }

  if (payload.role !== 'admin') {
    return { authorized: false, error: 'Admin access required' }
  }

  return { authorized: true, userId: payload.userId }
}

// GET /api/admin/users - List all users with filtering
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build filter
    const where: any = {}
    if (role) where.role = role
    if (status) where.status = status
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get users and total count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          grade: true,
          studentId: true,
          phoneNumber: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
