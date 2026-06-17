import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/timetable?classId=...
export async function GET(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error; // Allow students/teachers to fetch? Maybe separate route or check role.

                if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        const { searchParams } = new URL(request.url);
        const classId = searchParams.get('classId');

        if (!classId) {
            // If no classId, maybe return all classes to select? 
            // Better to have a separate classes endpoint or client fetches classes first.
            return NextResponse.json({ success: false, message: 'Class ID required' }, { status: 400 });
        }

        const schedule = await db.classSchedule.findMany({
            where: { classId },
            include: {
                subject: {
                    select: { 
                        id: true, 
                        name: true, 
                        code: true, 
                        teachers: { 
                            include: { 
                                teacher: { 
                                    include: { 
                                        user: { select: { firstName: true, lastName: true } } 
                                    } 
                                } 
                            } 
                        } 
                    }
                }
            }
        });

        // Group by day for easier frontend consumption
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        type ScheduleItem = typeof schedule[number];
        const grouped: Record<string, ScheduleItem[]> = {};
        
        days.forEach(day => {
            grouped[day] = schedule
                .filter((s: any) => s.dayOfWeek === day) // Type inferred
                .sort((a, b) => a.startTime.localeCompare(b.startTime));
        });

        return NextResponse.json({
            success: true,
            data: grouped
        });

    } catch (error) {
        console.error('Admin Timetable GET Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/admin/timetable
export async function POST(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

                if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        const body = await request.json();
        const { classId, subjectId, dayOfWeek, startTime, endTime, room } = body;

        if (!classId || !subjectId || !dayOfWeek || !startTime || !endTime) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        // 1. Fetch Subject to get Teacher info
        const subject = await db.subject.findUnique({
            where: { id: subjectId }
        });

        if (!subject) {
            return NextResponse.json({ success: false, message: 'Subject not found' }, { status: 404 });
        }

        // 2. Conflict Checks
        // Define Time Overlap Condition
        // Existing Start < New End AND Existing End > New Start
        const timeOverlapConditions = {
            dayOfWeek,
            startTime: { lt: endTime },
            endTime: { gt: startTime }
        };

        // Check A: Class Conflict
        const classConflict = await db.classSchedule.findFirst({
            where: {
                classId,
                ...timeOverlapConditions
            }
        });

        if (classConflict) {
            return NextResponse.json({ 
                success: false, 
                message: `Class conflict: This class already has a lesson from ${classConflict.startTime} to ${classConflict.endTime}` 
            }, { status: 409 });
        }

        // Check B: Teacher Conflict (if teacher assigned)
        // In our schema, subjects can have multiple teachers. 
        // We'll check the teacher assigned to the ClassSchedule if we add it.
        // For now, let's assume we want to check if the subject's primary teacher is busy.
        // But subject.teacherId doesn't exist if it's M:M.
        
        const teacherId = body.teacherId; // Prefer explicit teacherId from body
        if (teacherId) {
            const teacherConflict = await db.classSchedule.findFirst({
                where: {
                    teacherId,
                    ...timeOverlapConditions
                },
                include: { class: true } // format message with class name
            });

            if (teacherConflict) {
                return NextResponse.json({ 
                    success: false, 
                    message: `Teacher conflict: Teacher is busy with ${teacherConflict.class.name} from ${teacherConflict.startTime} to ${teacherConflict.endTime}` 
                }, { status: 409 });
            }
        }

        // Check C: Room Conflict (if room specified) // TODO: Make room tenant-aware or use string for now
        if (room) {
            // Check explicit room bookings.
            const roomConflict = await db.classSchedule.findFirst({
                where: {
                    room,
                    ...timeOverlapConditions
                },
                include: { class: true }
            });

            if (roomConflict) {
                return NextResponse.json({ 
                    success: false, 
                    message: `Room conflict: Room ${room} is occupied by ${roomConflict.class.name}` 
                }, { status: 409 });
            }
        }

        const newEntry = await db.classSchedule.create({
            data: {
                classId,
                subjectId,
                dayOfWeek,
                startTime,
                endTime,
                room,
                teacherId: teacherId || null
            },
            include: {
                subject: true
            }
        });

        return NextResponse.json({
            success: true,
            data: newEntry,
            message: 'Schedule entry created'
        });

    } catch (error) {
        console.error('Admin Timetable POST Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE /api/admin/timetable?id=...
export async function DELETE(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

                if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
        }

        await db.classSchedule.delete({
            where: { id }
        });

        return NextResponse.json({
            success: true,
            message: 'Schedule entry deleted'
        });

    } catch (error) {
        console.error('Admin Timetable DELETE Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
