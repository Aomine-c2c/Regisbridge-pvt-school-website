import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        const { searchParams } = new URL(request.url);
        const classId = searchParams.get('classId');
        const dateStr = searchParams.get('date');

        if (!classId || !dateStr) {
            return NextResponse.json({ success: false, message: 'Missing classId or date' }, { status: 400 });
        }

        const date = new Date(dateStr);

        // Fetch students in the class
        const classDetails = await prisma.class.findUnique({
            where: { id: classId },
            select: { grade: true }
        });

        if (!classDetails) {
            return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        const students = await prisma.student.findMany({
            where: { currentGrade: classDetails.grade },
            select: { id: true, user: { select: { firstName: true, lastName: true } }, rollNumber: true }
        });

        // Fetch existing attendance for this date
        // We need to match date carefully. Often best to search range start-of-day to end-of-day
        // Or if we store pure date objects. Prisma DateTime usually has time.
        // Let's assume we store Start of Day.
        
        const startOfDay = new Date(dateStr);
        startOfDay.setHours(0,0,0,0);
        
        const endOfDay = new Date(dateStr);
        endOfDay.setHours(23,59,59,999);

        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                studentId: { in: students.map(s => s.id) },
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });

        const recordMap = new Map(attendanceRecords.map(a => [a.studentId, a]));

        const currentData = students.map(s => {
            const record = recordMap.get(s.id);
            return {
                studentId: s.id,
                name: `${s.user.firstName} ${s.user.lastName}`,
                rollNumber: s.rollNumber,
                status: record?.status || null, 
                remarks: record?.notes || ''
            };
        });

        return NextResponse.json({
            success: true,
            data: currentData
        });

    } catch (error) {
        console.error('Attendance Fetch Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch attendance' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { date, records } = body; // records: { studentId, status, remarks }[]

        if (!date || !Array.isArray(records)) {
             return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0,0,0,0); // Normalize

        // Use transaction for bulk upsert
        const ops = records.map((rec: any) => {
            return prisma.attendance.upsert({
                where: {
                    studentId_date: {
                        studentId: rec.studentId,
                        date: attendanceDate
                    }
                },
                update: {
                    status: rec.status,
                    notes: rec.remarks,
                    markedBy: user.userId,
                    markedAt: new Date()
                },
                create: {
                    studentId: rec.studentId,
                    date: attendanceDate,
                    status: rec.status,
                    notes: rec.remarks,
                    markedBy: user.userId
                }
            });
        });

        await prisma.$transaction(ops);

        return NextResponse.json({ success: true, message: 'Attendance saved' });

    } catch (error) {
        console.error('Attendance Save Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to save attendance' }, { status: 500 });
    }
}
