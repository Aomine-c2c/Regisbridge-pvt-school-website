import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

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

// GET /api/student/assignments - Get student assignments
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
        const status = searchParams.get('status') // 'pending', 'submitted', 'graded'

        // Only allow students to view their own assignments
        if (auth.role === 'student' && studentId !== auth.userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 403 }
            )
        }

        const assignments = await prisma.assignment.findMany({
            where: {
                subject: {
                    students: {
                        some: { id: studentId }
                    }
                }
            },
            include: {
                subject: {
                    select: { name: true, code: true }
                },
                submissions: {
                    where: { studentId },
                    select: {
                        id: true,
                        submittedAt: true,
                        grade: true,
                        feedback: true,
                        status: true,
                    }
                }
            },
            orderBy: { dueDate: 'asc' },
        })

        return NextResponse.json({
            success: true,
            assignments,
        })
    } catch (error) {
        console.error('Get assignments error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
