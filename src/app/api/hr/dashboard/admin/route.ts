import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch Metrics
        const [totalStaff, pendingLeaves, staffProfiles] = await Promise.all([
            prisma.staffProfile.count(),
            prisma.leave.count({ where: { status: 'PENDING' } }),
            prisma.staffProfile.findMany({
                include: { user: true },
                orderBy: { user: { lastName: 'asc' } },
                take: 50
            })
        ]);

        // Calculate Department Usage (Mock logic based on department strings)
        // In a real app, this might be an aggregation
        const activeStaff = staffProfiles.filter(s => s.user.status === 'ACTIVE').length;

        // Mock Attendance (Randomized high percentage)
        const attendancePercentage = 92 + Math.floor(Math.random() * 5); 

        // Transform Staff List
        const staffList = staffProfiles.map(staff => ({
            id: staff.id, // e.g. STF-xxx
            name: `${staff.user.firstName} ${staff.user.lastName}`,
            role: staff.designation,
            department: staff.department,
            status: staff.user.status === 'ACTIVE' ? 'Active' : 'Inactive',
            lastActive: staff.user.lastLoginAt ? new Date(staff.user.lastLoginAt).toLocaleString() : 'Never',
            email: staff.user.email
        }));

        // Mock Activity Log using recent staff creation/updates or leaves
        const activityLog = [
             { id: 1, text: `New staff member onboarded`, time: '2 hours ago', type: 'system' },
             { id: 2, text: `Payroll for October generated`, time: '5 hours ago', type: 'finance' },
             { id: 3, text: `${pendingLeaves} leave requests pending`, time: 'Today', type: 'alert' }
        ];

        return NextResponse.json({
            success: true,
            data: {
                metrics: {
                    totalStaff,
                    activeStaff,
                    academicPercentage: 60, // Mock
                    attendanceToday: attendancePercentage, // Mock
                    pendingLeaves,
                    renewalsDue: 2 // Mock
                },
                staffList,
                activityLog
            }
        });

    } catch (error) {
        console.error('Admin HR API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
