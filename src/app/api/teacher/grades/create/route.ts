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

    if (!payload || (payload.role !== 'teacher' && payload.role !== 'admin')) {
        return { authorized: false, error: 'Teacher access required' }
    }

    return { authorized: true, userId: payload.userId }
}

// POST /api/teacher/grades/create - Create grade entry
export async function POST(request: NextRequest) {
    try {
        const auth = await verifyTeacherAccess(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { studentId, subjectId, score, maxScore, assessmentType, weight, date } = body

        // Validate required fields
        if (!studentId || !subjectId || score === undefined || !maxScore || !assessmentType) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Verify teacher teaches this subject
        const subject = await prisma.subject.findFirst({
            where: {
                id: subjectId,
                teacherId: auth.userId,
            },
        })

        if (!subject) {
            return NextResponse.json(
                { success: false, message: 'You do not teach this subject' },
                { status: 403 }
            )
        }

        // Create grade
        const grade = await prisma.grade.create({
            data: {
                studentId,
                subjectId,
                score,
                maxScore,
                assessmentType,
                weight: weight || 1.0,
                date: date ? new Date(date) : new Date(),
            },
            include: {
                student: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Grade added successfully',
            grade,
        }, { status: 201 })
    } catch (error) {
        console.error('Create grade error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
