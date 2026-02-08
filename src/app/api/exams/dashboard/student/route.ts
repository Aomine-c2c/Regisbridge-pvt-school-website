import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Student Grade
        const student = await prisma.student.findUnique({
            where: { userId: user.userId },
            select: { currentGrade: true }
        });

        if (!student) {
             return NextResponse.json({ success: false, message: 'Student profile not found' }, { status: 404 });
        }

        // Find Upcoming Exams for this Grade
        const upcomingExams = await prisma.examSchedule.findMany({
            where: {
                subject: { grade: student.currentGrade },
                date: { gte: new Date() },
                session: { status: 'PUBLISHED' }
            },
            include: {
                subject: true,
                session: true
            },
            orderBy: { date: 'asc' },
            take: 10
        });

        // Transform for UI
        const schedules = upcomingExams.map(schedule => ({
            id: schedule.id,
            date: schedule.date.toISOString(),
            formattedDate: schedule.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: schedule.startTime,
            subject: schedule.subject.name,
            paper: schedule.subject.description || 'Paper 1', // Mock paper name as description
            venue: schedule.venue || 'Main Hall',
            duration: `${schedule.durationMinutes}m`, // e.g. 120m
            durationFormatted: `${Math.floor(schedule.durationMinutes / 60)}h ${schedule.durationMinutes % 60}m`
        }));

        // Detailed Countdown for the nearest exam
        const nearestExam = schedules.length > 0 ? schedules[0] : null;

        return NextResponse.json({
            success: true,
            data: {
                upcomingExams: schedules,
                nearestExam: nearestExam ? {
                    ...nearestExam,
                    title: `Upcoming Major Exam: ${nearestExam.subject}`,
                    subtitle: `${nearestExam.paper} starts in:`
                } : null
            }
        });

    } catch (error) {
        console.error('Student Exams API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
