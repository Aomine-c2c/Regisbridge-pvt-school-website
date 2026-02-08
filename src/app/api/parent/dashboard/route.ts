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
                parentEmail: user.email
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
        const childrenData = await Promise.all(children.map(async (child) => {
             // Recent Grades
             const recentGrades = await prisma.grade.findMany({
                 where: { studentId: child.id },
                 orderBy: { gradedAt: 'desc' },
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
                 _sum: { balance: true }
             });
             
             const totalDue = pendingFees.reduce((acc, curr) => acc + (curr._sum.balance || 0), 0);

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
                 recentGrades: recentGrades.map(g => ({
                     subject: g.subject.name,
                     grade: g.letterGrade
                 })),
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
