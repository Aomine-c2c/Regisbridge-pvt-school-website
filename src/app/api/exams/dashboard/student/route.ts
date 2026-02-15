import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Student Class
        const student = await prisma.student.findUnique({
            where: { userId: user.userId },
            include: { class: true }
        });

        if (!student || !student.class) {
             return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        // Find Upcoming Exams (Global for now, ideally filtered by subjects in class)
        const upcomingExams = await prisma.examSchedule.findMany({
            where: {
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
            subject: schedule.subject.name,
            date: schedule.date.toISOString(),
            startTime: schedule.startTime,
            duration: schedule.durationMin,
            venue: schedule.venue || 'Main Hall'
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
                    subtitle: `Starts in:`
                } : null
            }
        });

    } catch (error) {
        console.error('Student Exams API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
