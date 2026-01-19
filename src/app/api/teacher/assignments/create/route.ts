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

// POST /api/teacher/assignments/create - Create assignment
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
        const { subjectId, title, description, dueDate, maxScore } = body

        // Validate required fields
        if (!subjectId || !title || !dueDate || !maxScore) {
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

        // Create assignment
        const assignment = await prisma.assignment.create({
            data: {
                subjectId,
                title,
                description: description || '',
                grade: subject.grade,
                dueDate: new Date(dueDate),
                totalPoints: maxScore,
                assignmentType: 'HOMEWORK',
                createdBy: auth.userId!,
            },
            include: {
                subject: {
                    select: {
                        name: true,
                        code: true,
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Assignment created successfully',
            assignment,
        }, { status: 201 })
    } catch (error) {
        console.error('Create assignment error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
