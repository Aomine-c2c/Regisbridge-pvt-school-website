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

// POST /api/teacher/attendance/mark - Mark attendance
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
        const { studentId, subjectId, status, date, notes } = body

        // Validate status
        const validStatuses = ['present', 'absent', 'late', 'excused']
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: 'Invalid attendance status' },
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

        const attendanceDate = date ? new Date(date) : new Date()
        attendanceDate.setHours(0, 0, 0, 0) // Normalize to start of day

        // Check if attendance already exists for this day
        const existing = await prisma.attendance.findFirst({
            where: {
                studentId,
                subjectId,
                date: attendanceDate,
            },
        })

        let attendance
        if (existing) {
            // Update existing
            attendance = await prisma.attendance.update({
                where: { id: existing.id },
                data: {
                    status,
                    notes: notes || null,
                },
                include: {
                    student: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            })
        } else {
            // Create new
            attendance = await prisma.attendance.create({
                data: {
                    studentId,
                    subjectId,
                    status,
                    date: attendanceDate,
                    notes: notes || null,
                },
                include: {
                    student: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Attendance marked successfully',
            attendance,
        })
    } catch (error) {
        console.error('Mark attendance error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
