import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch Data
        const [totalSessions, totalStudents, upcomingSchedules] = await Promise.all([
            prisma.examSession.count(),
            prisma.student.count(),
            prisma.examSchedule.findMany({
                where: {
                    date: { gte: new Date() } // Future or today
                },
                include: {
                    subject: true,
                    session: true,
                    // results: { select: { id: true } } // Removed as per schema update
                },
                orderBy: { date: 'asc' },
                take: 50
            })
        ]);

        // Transform Schedules for Table
        const schedules = upcomingSchedules.map(schedule => ({
            id: schedule.id,
            paperCode: `${schedule.subject.name} ${schedule.subject.code}`,
            paperName: schedule.subject.description || 'Paper 1',
            date: schedule.date.toDateString(), // Simple date formatting
            time: `${schedule.startTime}`,
            candidates: Math.floor(Math.random() * 100) + 20, // Mock for now until Grades/Results linked
            venue: schedule.venue || 'Main Hall',
            status: schedule.session.status === 'PUBLISHED' ? 'Finalized' : 'Draft' 
        }));

        return NextResponse.json({
            success: true,
            data: {
                metrics: {
                    totalSessions,
                    invigilatorsAssigned: '89%', // Mock
                    venueConflicts: 0, // Mock
                    studentsRegistered: totalStudents
                },
                schedules
            }
        });

    } catch (error) {
        console.error('Admin Exams API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
