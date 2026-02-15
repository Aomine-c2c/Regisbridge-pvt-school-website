import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// Helper to verify student access
async function verifyStudentAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' };
    }

    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);

    if (!payload) {
        return { authorized: false, error: 'Invalid token' };
    }

    return { authorized: true, userId: payload.userId, role: payload.role };
}

export async function GET(request: NextRequest) {
    try {
        const auth = await verifyStudentAccess(request);
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }

        const tenantId = request.headers.get('x-tenant-id');
        if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = getTenantDb(tenantId);

        // 2. Fetch Student with associated Class
        const student = await db.student.findUnique({
            where: { userId: auth.userId }, // Use auth.userId here
            include: { class: true }
        });

        if (!student || !student.class) {
            return NextResponse.json({ success: false, message: 'Class not assigned' }, { status: 404 });
        }

        // Fetch timetable for student's assigned class
        const scheduleEntries = await db.timetablePeriod.findMany({
            where: { classId: student.class.id },
            include: {
                subject: {
                    include: {
                        teachers: {
                            include: {
                                teacher: {
                                    include: { user: { select: { firstName: true, lastName: true } } }
                                }
                            }
                        }
                    }
                }
            }
        });

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        type Lesson = {
            id: string;
            time: string;
            subject: string;
            teacher: string;
            room: string;
            type: 'lesson' | 'break';
        };
        const fullSchedule: Record<string, Lesson[]> = {};

        days.forEach((day, index) => {
            const dayNum = index + 1;
            
            const dayEntries = scheduleEntries.filter(e => e.dayOfWeek === dayNum);
            
            const lessons: Lesson[] = dayEntries.map((entry) => {
                const teacherName = entry.subject?.teachers?.[0]?.teacher?.user 
                    ? `${entry.subject.teachers[0].teacher.user.firstName.charAt(0)}. ${entry.subject.teachers[0].teacher.user.lastName}` 
                    : 'Staff';

                return {
                    id: entry.id,
                    time: `${entry.startTime}-${entry.endTime}`,
                    subject: entry.subject?.name || 'Unknown',
                    teacher: teacherName,
                    room: entry.room || 'TBA',
                    type: 'lesson'
                };
            });

            lessons.push({
                id: `break-${day}`,
                time: '13:00-14:00',
                subject: 'Lunch Break',
                teacher: '',
                room: 'Dining Hall',
                type: 'break'
            });

            lessons.sort((a, b) => {
                const timeA = a.time.split('-')[0];
                const timeB = b.time.split('-')[0];
                return timeA.localeCompare(timeB);
            });

            fullSchedule[day] = lessons;
        });

        return NextResponse.json({
            success: true,
            data: fullSchedule
        });

    } catch (error) {
        console.error('Timetable API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
