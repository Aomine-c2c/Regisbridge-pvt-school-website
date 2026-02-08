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
        const studentId = searchParams.get('studentId') || user.userId

        // Only allow students to view their own grades, unless they are admin (handled by RequireStudent allowing admin? No, requireStudent allows admin/superadmin too)
        // requireStudent logic: if (user?.role !== 'student' && user?.role !== 'admin' && user?.role !== 'superadmin')
        // So if I am admin, I pass requireStudent.
        
        if (user.role === 'student' && studentId !== user.userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 403 }
            )
        }

        // If I am admin, I can see any student's grades if I provide studentId.
        // If I don't provide studentId as admin, it defaults to my userId, which might not have grades.
        // That is acceptable behavior.

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
