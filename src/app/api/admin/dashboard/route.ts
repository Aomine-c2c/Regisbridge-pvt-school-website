import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        // Verify Admin via Standard Middleware
        const { error } = await requireAdmin(request);
        if (error) return error;

        const tenantId = request.headers.get('x-tenant-id');
        if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = getTenantDb(tenantId);

        // Fetch Stats in parallel
        const [studentCount, teacherCount, classCount] = await Promise.all([
            db.student.count(),
            db.user.count({ where: { role: 'teacher' } }), 
            db.class.count() 
        ]);

        // Recent Activity (Mock for now, or fetch latest created users/logs)
        const recentUsers = await db.user.findMany({
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
