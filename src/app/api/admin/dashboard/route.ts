import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        // Verify Admin via Standard Middleware
        const { error } = await requireAdmin(request);
        if (error) return error;

        // Fetch Stats in parallel
        const [studentCount, teacherCount, classCount] = await Promise.all([
            prisma.student.count(),
            prisma.user.count({ where: { role: 'teacher' } }), // OR 'staff' if you have that role
            prisma.class.count() // Active Courses/Classes
            // prisma.subject.count() // Alternative for "Courses"
        ]);

        // Recent Activity (Mock for now, or fetch latest created users/logs)
        // Let's fetch last 3 users created as "New enrollments"
        const recentUsers = await prisma.user.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: { role: true, createdAt: true, firstName: true }
        });

        const recentActivity = recentUsers.map(u => ({
            action: `New ${u.role} registered: ${u.firstName}`,
            time: u.createdAt.toISOString()
        }));

        return NextResponse.json({
            success: true,
            data: {
                totalStudents: studentCount,
                totalStaff: teacherCount,
                activeCourses: classCount, 
                systemHealth: '98%', // Static for now
                recentActivity
            }
        });

    } catch (error) {
        console.error('Admin Dashboard API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
