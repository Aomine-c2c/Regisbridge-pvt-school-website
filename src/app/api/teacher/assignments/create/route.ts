import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireTeacher } from '@/lib/api/auth-middleware'

// POST /api/teacher/assignments/create - Create assignment
export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request)
        if (error) return error

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
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
                teacherId: user.userId,
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
                totalPoints: parseInt(maxScore),
                assignmentType: 'HOMEWORK',
                createdBy: user.userId,
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
