import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// Helper to verify admin access
async function verifyAdminAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' };
    }

    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);

    if (!payload || (payload.role !== 'admin' && payload.role !== 'administrator')) {
        return { authorized: false, error: 'Unauthorized' };
    }

    return { authorized: true, userId: payload.userId };
}

// GET /api/admin/timetable?classId=...
export async function GET(request: NextRequest) {
    try {
        // Verify Admin (or potentially Teacher/Student if we want to reuse this for read-only)
        // For admin route, strict admin check.
        const auth = await verifyAdminAccess(request);
        if (!auth.authorized) { // Allow students/teachers to fetch? Maybe separate route or check role.
             return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const classId = searchParams.get('classId');

        if (!classId) {
            // If no classId, maybe return all classes to select? 
            // Better to have a separate classes endpoint or client fetches classes first.
            return NextResponse.json({ success: false, message: 'Class ID required' }, { status: 400 });
        }

        const schedule = await prisma.classSchedule.findMany({
            where: { classId },
            include: {
                subject: {
                    select: { id: true, name: true, code: true, teacher: { select: { firstName: true, lastName: true } } }
                }
            }
        });

        // Group by day for easier frontend consumption
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const grouped: Record<string, any[]> = {};
        
        days.forEach(day => {
            grouped[day] = schedule
                .filter((s: any) => s.dayOfWeek === day)
                .sort((a: any, b: any) => a.startTime.localeCompare(b.startTime));
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
        const auth = await verifyAdminAccess(request);
        if (!auth.authorized) {
            return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
        }

        const body = await request.json();
        const { classId, subjectId, dayOfWeek, startTime, endTime, room } = body;

        if (!classId || !subjectId || !dayOfWeek || !startTime || !endTime) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        // 1. Fetch Subject to get Teacher info
        const subject = await prisma.subject.findUnique({
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
        const classConflict = await prisma.classSchedule.findFirst({
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
        if (subject.teacherId) {
            const teacherConflict = await prisma.classSchedule.findFirst({
                where: {
                    subject: { teacherId: subject.teacherId },
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

        // Check C: Room Conflict (if room specified)
        if (room) {
            // Check explicit room assignments in schedule
            // Note: This doesn't check if the room corresponds to a class's default room that is occupied, 
            // unless that default room is explicitly stored in schedule. 
            // For MVP, we check explicit room bookings.
            const roomConflict = await prisma.classSchedule.findFirst({
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

        const newEntry = await prisma.classSchedule.create({
            data: {
                classId,
                subjectId,
                dayOfWeek,
                startTime,
                endTime,
                room
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
        const auth = await verifyAdminAccess(request);
        if (!auth.authorized) {
            return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
        }

        await prisma.classSchedule.delete({
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
