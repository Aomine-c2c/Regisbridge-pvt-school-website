import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

async function verifyTeacherAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' }
    }

    const token = authHeader.substring(7)
    const payload = await verifyAccessToken(token)

    if (!payload) {
        return { authorized: false, error: 'Invalid token' }
    }

    if (payload.role !== 'teacher' && payload.role !== 'admin') {
        return { authorized: false, error: 'Teacher access required' }
    }

    return { authorized: true, userId: payload.userId, role: payload.role }
}

// GET /api/teacher/classes - Get teacher's classes
export async function GET(request: NextRequest) {
    try {
        const auth = await verifyTeacherAccess(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        // Get subjects taught by this teacher
        const subjects = await prisma.subject.findMany({
            where: {
                teacherId: auth.userId,
            },
            include: {
                students: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        grade: true,
                        studentId: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        students: true,
                        assignments: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        })

        return NextResponse.json({
            success: true,
            classes: subjects,
        })
    } catch (error) {
        console.error('Get classes error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
