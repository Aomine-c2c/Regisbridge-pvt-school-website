import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken, hashPassword } from '@/lib/auth'

async function verifyAdmin(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' }
    }

    const token = authHeader.substring(7)
    const payload = await verifyAccessToken(token)

    if (!payload || payload.role !== 'admin') {
        return { authorized: false, error: 'Admin access required' }
    }

    return { authorized: true, userId: payload.userId }
}

// POST /api/admin/users/create - Create new user
export async function POST(request: NextRequest) {
    try {
        const auth = await verifyAdmin(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { email, password, firstName, lastName, role, grade, studentId, phoneNumber } = body

        // Validate required fields
        if (!email || !password || !firstName || !lastName || !role) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'Email already registered' },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role,
                grade: grade || null,
                studentId: studentId || null,
                phoneNumber: phoneNumber || null,
                status: 'active',
            },
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
        })

        return NextResponse.json({
            success: true,
            message: 'User created successfully',
            user,
        }, { status: 201 })
    } catch (error) {
        console.error('Create user error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
