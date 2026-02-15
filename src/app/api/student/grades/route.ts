import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireStudent } from '@/lib/api/auth-middleware'

// GET /api/student/grades - Get student grades
export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request)
        if (error) return error

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url)
        let studentId = searchParams.get('studentId')

        // If user is a student, force them to see their own grades
        if (user.role === 'student') {
            const studentProfile = await prisma.student.findUnique({
                where: { userId: user.userId }
            })
            
            if (!studentProfile) {
                return NextResponse.json(
                    { success: false, message: 'Student profile not found' },
                    { status: 404 }
                )
            }
            studentId = studentProfile.id
        }

        if (!studentId) {
             return NextResponse.json(
                { success: false, message: 'Student ID required' },
                { status: 400 }
            )
        }

        const grades = await prisma.grade.findMany({
            where: { studentId },
            include: {
                subject: {
                    select: { name: true, code: true }
                },
                term: {
                    select: { name: true } // Include term name as 'term' might be expected as string
                }
            },
            orderBy: { createdAt: 'desc' },
        })

        // Transform grades to match expected frontend format if necessary
        // Frontend likely expects `term` to be a string.
        const formattedGrades = grades.map(g => ({
            ...g,
            term: g.term.name // Flatten term name
        }))

        return NextResponse.json({
            success: true,
            grades: formattedGrades,
        })
    } catch (error) {
        console.error('Get grades error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
