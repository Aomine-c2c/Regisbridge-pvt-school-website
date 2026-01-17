import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

// Helper to verify student or teacher access
async function verifyStudentAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' }
    }

    const token = authHeader.substring(7)
    const payload = await verifyAccessToken(token)

    if (!payload) {
        return { authorized: false, error: 'Invalid token' }
    }

    return { authorized: true, userId: payload.userId, role: payload.role }
}

// GET /api/student/grades - Get student grades
export async function GET(request: NextRequest) {
    try {
        const auth = await verifyStudentAccess(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const studentId = searchParams.get('studentId') || auth.userId

        // Only allow students to view their own grades, teachers/admins can view any
        if (auth.role === 'student' && studentId !== auth.userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 403 }
            )
        }

        const grades = await prisma.grade.findMany({
            where: { studentId },
            include: {
                subject: {
                    select: { name: true, code: true }
                }
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({
            success: true,
            grades,
        })
    } catch (error) {
        console.error('Get grades error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
