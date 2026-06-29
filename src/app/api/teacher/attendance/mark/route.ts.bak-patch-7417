import { NextRequest, NextResponse } from 'next/server'
import { requireTeacher } from '@/lib/api/auth-middleware';

// POST /api/teacher/attendance/mark - Mark attendance
export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error; 
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

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
        const subject = await db.subject.findFirst({
            where: {
                id: subjectId,
                teachers: {
                    some: { teacherId: user.userId }
                }
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
        const existing = await db.attendance.findFirst({
            where: {
                studentId,
                date: attendanceDate,
            },
        })

        let attendance
        if (existing) {
            // Update existing
            attendance = await db.attendance.update({
                where: { id: existing.id },
                data: {
                    status,
                    remarks: notes || null,
                },
                include: {
                    student: {
                        select: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                }
                            }
                        },
                    },
                },
            })
        } else {
            // Create new
            attendance = await db.attendance.create({
                data: {
                    studentId,
                    status,
                    date: attendanceDate,
                    remarks: notes || null,
                    recordedById: user.userId,
                },
                include: {
                    student: {
                        select: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                }
                            }
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
