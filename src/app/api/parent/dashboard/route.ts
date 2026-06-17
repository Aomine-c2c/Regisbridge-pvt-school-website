import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireParent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireParent(request);
        if (error) return error;

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Fetch children linked to this parent's email
        // We assume the user.email provided in token matches the Student.parentEmail
        const children = await prisma.student.findMany({
            where: {
                parents: {
                    some: {
                        parent: {
                            userId: user.userId // Use userId from the authenticated User object
                        }
                    }
                }
            },
            include: {
                user: { select: { firstName: true, lastName: true } },
                attendance: { 
                    take: 1, 
                    orderBy: { date: 'desc' } 
                },
                _count: {
                    select: { attendance: { where: { status: 'present' } } }
                }
            }
        });

        // Loop through children to get more specific stats (e.g. pending fees, recent grades)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const childrenData = await Promise.all((children as any[]).map(async (child: any) => {
             // Recent Grades
             const recentGrades = await prisma.grade.findMany({
                 where: { studentId: child.id },
                 orderBy: { updatedAt: 'desc' },
                 take: 3,
                 include: { subject: { select: { name: true } } }
             });

             // Pending Fees
             const pendingFees = await prisma.feePayment.groupBy({
                 by: ['status'],
                 where: { 
                     studentId: child.id,
                     status: 'PENDING'
                 },
                 _sum: { amountPaid: true }
             });
             
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             const totalDue = pendingFees.reduce((acc, curr) => acc + (curr._sum.amountPaid || 0), 0);

             return {
                 id: child.id,
                 name: `${child.user.firstName} ${child.user.lastName}`,
                 grade: child.currentGrade,
                 rollNumber: child.rollNumber,
                 avatar: `https://ui-avatars.com/api/?name=${child.user.firstName}+${child.user.lastName}&background=random`,
                 stats: {
                     attendance: '92%', // Mocked for now, or calc from _count
                     gpa: '3.5', // Mocked
                     feesDue: totalDue
                 },
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 recentGrades: (recentGrades as any[]).map(g => {
                     const percentage = (g.score / g.maxScore) * 100;
                     let letter = 'F';
                     if (percentage >= 90) letter = 'A';
                     else if (percentage >= 80) letter = 'B';
                     else if (percentage >= 70) letter = 'C';
                     else if (percentage >= 60) letter = 'D';

                     return {
                         subject: g.subject.name,
                         grade: letter
                     };
                 }),
                 lastAttendance: child.attendance[0]?.status || 'N/A'
             };
        }));

        return NextResponse.json({
            success: true,
            data: childrenData
        });

    } catch (error) {
        console.error('Parent Dashboard Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch parent dashboard' },
            { status: 500 }
        );
    }
}
