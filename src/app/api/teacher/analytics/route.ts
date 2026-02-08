import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { error } = await requireTeacher(request);
        if (error) return error;

        // Fetch students with their grades and attendance
        const students = await prisma.student.findMany({
            take: 20, // Limit for performance
            include: {
                user: { select: { firstName: true, lastName: true } },
                grades: {
                    where: { term: 'TERM 2' },
                    include: { subject: { select: { name: true } } }
                },
                attendance: { select: { status: true } }
            },
            orderBy: { rollNumber: 'asc' }
        });

        const analyticsData = students.map(student => {
            // Calculate overall GPA from grades
            const grades = student.grades;
            const gpa = grades.length > 0
                ? grades.reduce((sum, g) => sum + (g.percentage / 25), 0) / grades.length
                : 0;

            // Calculate attendance percentage
            const totalDays = student.attendance.length;
            const presentDays = student.attendance.filter(a => a.status === 'PRESENT').length;
            const attendance = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

            // Determine risk level
            let riskLevel: 'Critical' | 'Monitor' | 'On Track' = 'On Track';
            if (gpa < 2.0 || attendance < 70) {
                riskLevel = 'Critical';
            } else if (gpa < 3.0 || attendance < 85) {
                riskLevel = 'Monitor';
            }

            // Map grades by subject
            const gradesBySubject: Record<string, string> = {};
            grades.forEach(g => {
                gradesBySubject[g.subject.name] = g.letterGrade || 'N/A';
            });

            return {
                id: student.id,
                name: `${student.user.firstName} ${student.user.lastName}`,
                overallGPA: Number(gpa.toFixed(1)),
                attendance,
                riskLevel,
                grades: gradesBySubject
            };
        });

        return NextResponse.json({
            success: true,
            data: analyticsData
        });

    } catch (error) {
        console.error('Analytics Fetch Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch analytics' }, { status: 500 });
    }
}
