import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Current Day
        // 0=Sun, 1=Mon... Schema uses 1=Mon...7=Sun
        const dayInt = new Date().getDay() || 7;

        // Fetch Data
        const [todaysClasses, notices] = await Promise.all([
            prisma.timetablePeriod.findMany({
                where: {
                    dayOfWeek: dayInt,
                    OR: [
                        { subject: { teachers: { some: { teacher: { userId: user.userId } } } } },
                        { class: { classTeacher: { userId: user.userId } } }
                    ]
                },
                include: {
                    class: true,
                    subject: true
                },
                orderBy: { startTime: 'asc' }
            }),
            prisma.newsArticle.findMany({
                where: {
                    status: 'PUBLISHED',
                    category: { in: ['announcement', 'event'] }
                },
                orderBy: { publishDate: 'desc' },
                take: 5
            })
        ]);

        // Transform Classes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const classes = todaysClasses.map((schedule: any) => ({
            id: schedule.id,
            time: `${schedule.startTime} - ${schedule.endTime}`,
            class: `${schedule.class.gradeLevel}-${schedule.class.section} ${schedule.class.name}`,
            subject: schedule.subject.name,
            room: schedule.room || 'Main Bldg',
            students: 30 // Mock student count
        }));

        // Transform Notices
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedNotices = notices.map((notice: any) => ({
            id: notice.id,
            date: notice.publishDate ? notice.publishDate.toISOString().split('T')[0] : '',
            title: notice.title,
            description: notice.excerpt || notice.content.substring(0, 50) + '...',
            priority: 'normal' // Mock priority
        }));

        return NextResponse.json({
            success: true,
            data: {
                metrics: {
                    studentsEnrolled: 120, // Mock - would sum class sizes
                    averageAttendance: '94%', // Mock
                    pendingReviews: 5, // Mock
                    meetings: 2 // Mock
                },
                todaysClasses: classes.length > 0 ? classes : [], 
                notices: transformedNotices
            }
        });

    } catch (error) {
        console.error('Staff Dashboard API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
