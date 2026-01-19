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

// GET /api/admin/users/[id] - Get single user
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const auth = await verifyAdmin(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { id: params.id },
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

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const auth = await verifyAdmin(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { email, firstName, lastName, role, grade, studentId, phoneNumber, status, password } = body

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: params.id },
        })

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }

        // Check if email is being changed and already exists
        if (email && email !== existingUser.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email },
            })
            if (emailExists) {
                return NextResponse.json(
                    { success: false, message: 'Email already in use' },
                    { status: 409 }
                )
            }
        }

        // Build update data
        const updateData: {
            email?: string;
            password?: string;
            firstName?: string;
            lastName?: string;
            role?: string;
            grade?: string | null;
            studentId?: string | null;
            phoneNumber?: string | null;
            status?: string;
        } = {}
        
        if (email) updateData.email = email
        if (firstName) updateData.firstName = firstName
        if (lastName) updateData.lastName = lastName
        if (role) updateData.role = role
        if (grade !== undefined) updateData.grade = grade
        if (studentId !== undefined) updateData.studentId = studentId
        if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber
        if (status) updateData.status = status
        if (password) updateData.password = await hashPassword(password)

        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: updateData as any,
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
            message: 'User updated successfully',
            user: updatedUser,
        })
    } catch (error) {
        console.error('Update user error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const auth = await verifyAdmin(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: params.id },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            )
        }

        // Prevent deleting yourself
        if (user.id === auth.userId) {
            return NextResponse.json(
                { success: false, message: 'Cannot delete your own account' },
                { status: 400 }
            )
        }

        await prisma.user.delete({
            where: { id: params.id },
        })

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully',
        })
    } catch (error) {
        console.error('Delete user error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
