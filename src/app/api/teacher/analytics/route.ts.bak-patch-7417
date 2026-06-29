import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { error } = await requireTeacher(request);
        if (error) return error;

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        const currentTerm = await db.term.findFirst({
            where: { name: 'Term 1' }, // TODO: Make dynamic based on system settings
            select: { id: true }
        });

        // Fetch students with their grades and attendance
        const students = await db.student.findMany({
            take: 20, 
            include: {
                user: { select: { firstName: true, lastName: true } },
                grades: {
                    where: { term: { id: currentTerm?.id } }, 
                    include: { subject: { select: { name: true } } }
                },
                attendance: { select: { status: true } }
            },
            orderBy: { user: { lastName: 'asc' } }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const analyticsData = students.map((student: any) => {
            // Calculate overall GPA from grades
            const grades = student.grades;
            const gpa = grades.length > 0
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? grades.reduce((sum: number, g: any) => sum + ((g.score / g.maxScore) * 4), 0) / grades.length 
                : 0;

            // Calculate attendance percentage
            const totalDays = student.attendance.length;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const presentDays = student.attendance.filter((a: any) => a.status === 'PRESENT').length;
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            grades.forEach((g: any) => {
                const percentage = (g.score / g.maxScore) * 100;
                let letter = 'F';
                if (percentage >= 90) letter = 'A';
                else if (percentage >= 80) letter = 'B';
                else if (percentage >= 70) letter = 'C';
                else if (percentage >= 60) letter = 'D';
                
                gradesBySubject[g.subject.name] = letter;
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
