import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Current Day
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = days[new Date().getDay()];

        // Fetch Data
        const [todaysClasses, notices] = await Promise.all([
            prisma.classSchedule.findMany({
                where: {
                    dayOfWeek: today,
                    OR: [
                        { subject: { teacherId: user.userId } }, // Use userId because Subject links to User
                        { class: { teacherId: user.userId } }
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
        const classes = todaysClasses.map(schedule => ({
            id: schedule.id,
            time: schedule.startTime,
            class: `${schedule.class.grade} ${schedule.class.name}`,
            subject: schedule.subject.name,
            room: schedule.room || schedule.class.room || 'Main Bldg',
            students: schedule.class.capacity || 30 // Mock student count as capacity
        }));

        // Transform Notices
        const transformedNotices = notices.map(notice => ({
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
