import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        // Verify admin access
        const { error } = await requireAdmin(request);
        if (error) return error;

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        // 1. Enrollment Stats
        const totalStudents = await db.student.count();
        const totalStaff = await db.user.count({ 
            where: { role: { in: ['teacher', 'admin', 'staff'] } } 
        });

        // 2. Financial Stats (Fee Collection)
        // Aggregating payments linked to students in this tenant
        const paymentAgg = await db.feePayment.aggregate({
            where: {
                student: {
                    }
            },
            _sum: { amountPaid: true }
        });
        const totalCollected = paymentAgg._sum.amountPaid || 0;

        // Placeholder for expected (Schema doesn't support invoicing yet)
        const totalExpected = totalCollected; 
        const collectionRate = 100; 

        // 3. Academic Stats (Average GPA/Score)
        // Calculating approximate GPA based on recent grades
        const recentGrades = await db.grade.findMany({
            take: 100, // Sample size for performance
            orderBy: { createdAt: 'desc' },
            select: { score: true, maxScore: true }
        });
        
        let avgScore = 0;
        if (recentGrades.length > 0) {
            const totalPercentage = recentGrades.reduce((acc, curr) => {
                const pct = curr.maxScore > 0 ? (curr.score / curr.maxScore) * 100 : 0;
                return acc + pct;
            }, 0);
            avgScore = totalPercentage / recentGrades.length;
        }

        // 4. Student Distribution via Class Grade
        // GroupBy not supported on relations, so we fetch and aggregate
        const students = await db.student.findMany({
            select: {
                class: {
                    select: { gradeLevel: true }
                }
            }
        });

        const distMap = new Map<string, number>();
        students.forEach(s => {
            const grade = s.class?.gradeLevel || 'Unassigned';
            distMap.set(grade, (distMap.get(grade) || 0) + 1);
        });

        // Format distribution for chart
        const gradeDistribution = Array.from(distMap.entries()).map(([grade, count]) => ({
            label: `Grade ${grade}`,
            value: count
        })).sort((a, b) => a.label.localeCompare(b.label));

        // 5. Recent Financial Alerts (Pending/Overdue)
        // Schema limitation: No Invoice model. FeePayment is a receipt.
        // Returning empty alerts for now to ensure type safety.
        const formattedAlerts: unknown[] = []; 

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
