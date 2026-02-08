import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const payload = await verifyAccessToken(token);
        // Allow teachers and admins
        if (!payload || (payload.role !== 'teacher' && payload.role !== 'admin' && payload.role !== 'administrator')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { date, records } = body; 
        // records: { studentId: string, status: string, notes?: string }[]

        if (!date || !records || !Array.isArray(records)) {
             return NextResponse.json({ success: false, message: 'Invalid data format' }, { status: 400 });
        }

        const attendanceDate = new Date(date);

        // Perform upserts in a transaction or Promise.all
        // Using Promise.all for simplicity as SQLite writes might be locked sequentially anyway, 
        // but prisma.$transaction is safer.
        
        await prisma.$transaction(
            records.map((record: any) => 
                prisma.attendance.upsert({
                    where: {
                        studentId_date: {
                            studentId: record.studentId,
                            date: attendanceDate
                        }
                    },
                    update: {
                        status: record.status,
                        notes: record.notes,
                        markedBy: payload.userId,
                        markedAt: new Date()
                    },
                    create: {
                        studentId: record.studentId,
                        date: attendanceDate,
                        status: record.status,
                        notes: record.notes,
                        markedBy: payload.userId
                    }
                })
            )
        );

        return NextResponse.json({
            success: true,
            message: 'Attendance marked successfully'
        });

    } catch (error) {
        console.error('Attendance Mark Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
