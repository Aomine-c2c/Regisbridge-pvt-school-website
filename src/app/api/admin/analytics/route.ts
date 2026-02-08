import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        // Verify admin access
        const { error } = await requireAdmin(request);
        if (error) return error;

        // 1. Enrollment Stats
        const totalStudents = await prisma.student.count();
        const totalStaff = await prisma.user.count({ 
            where: { role: { in: ['teacher', 'admin', 'staff'] } } 
        });

        // 2. Financial Stats (Fee Collection)
        const payments = await prisma.feePayment.findMany({
            select: {
                amount: true,
                paidAmount: true,
                status: true
            }
        });

        const totalExpected = payments.reduce((acc, curr) => acc + curr.amount, 0);
        const totalCollected = payments.reduce((acc, curr) => acc + curr.paidAmount, 0);
        const collectionRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

        // 3. Academic Stats (Average GPA/Score)
        // Calculating approximate GPA based on recent grades
        const recentGrades = await prisma.grade.findMany({
            take: 100, // Sample size for performance
            orderBy: { createdAt: 'desc' },
            select: { percentage: true }
        });
        
        const avgScore = recentGrades.length > 0
            ? recentGrades.reduce((acc, curr) => acc + curr.percentage, 0) / recentGrades.length
            : 0;

        // 4. Student Distribution via Grades using User table or Student table
        const distribution = await prisma.student.groupBy({
            by: ['currentGrade'],
            _count: {
                currentGrade: true
            }
        });
        
        // Format distribution for chart
        const gradeDistribution = distribution.map(d => ({
            label: `Grade ${d.currentGrade}`,
            value: d._count.currentGrade
        })).sort((a, b) => a.label.localeCompare(b.label));


        // 5. Recent Financial Alerts (Pending/Overdue)
        const alerts = await prisma.feePayment.findMany({
            where: {
                status: { in: ['OVERDUE', 'PENDING'] }
            },
            take: 5,
            orderBy: { dueDate: 'asc' },
            include: {
                student: {
                    include: {
                        user: { select: { firstName: true, lastName: true } }
                    }
                }
            }
        });

        const formattedAlerts = alerts.map(alert => ({
            id: alert.id,
            type: alert.status === 'OVERDUE' ? 'warning' : 'info',
            title: alert.status === 'OVERDUE' ? 'Overdue Payment' : 'Pending Payment',
            account: `${alert.student.user.firstName} ${alert.student.user.lastName}`,
            amount: alert.amount - alert.paidAmount,
            date: alert.dueDate
        }));

        return NextResponse.json({
            success: true,
            data: {
                counts: {
                    students: totalStudents,
                    staff: totalStaff,
                },
                financial: {
                    collectionRate,
                    totalCollected,
                    totalExpected
                },
                academic: {
                    avgScore: Math.round(avgScore * 10) / 10 // 1 decimal
                },
                charts: {
                    distribution: gradeDistribution
                },
                recentAlerts: formattedAlerts
            }
        });

    } catch (error) {
        console.error('Analytics Fetch Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch analytics data' },
            { status: 500 }
        );
    }
}
