import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Student Profile
        const student = await prisma.student.findUnique({
            where: { userId: user.userId }
        });

        if (!student) return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });

        // Get Assignments for their grade
        const assignments = await prisma.assignment.findMany({
            where: {
                grade: student.currentGrade,
                status: 'ACTIVE'
            },
            include: {
                subject: { select: { name: true } }
            },
            orderBy: { dueDate: 'asc' }
        });

        // Get Submissions by this student
        const submissions = await prisma.assignmentSubmission.findMany({
            where: {
                studentId: student.id,
                assignmentId: { in: assignments.map(a => a.id) }
            }
        });

        const submissionMap = new Map(submissions.map(s => [s.assignmentId, s]));

        const data = assignments.map(a => {
            const sub = submissionMap.get(a.id);
            return {
                id: a.id,
                title: a.title,
                subject: a.subject.name,
                description: a.description,
                dueDate: a.dueDate,
                status: sub ? 'SUBMITTED' : (new Date(a.dueDate) < new Date() ? 'OVERDUE' : 'PENDING'),
                grade: sub?.score ? `${sub.score}/${a.totalPoints}` : null,
                feedback: sub?.feedback || null,
                submissionDate: sub?.submittedAt || null
            };
        });

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Student Assignments Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch assignments' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const student = await prisma.student.findUnique({ where: { userId: user.userId } });
        if (!student) return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });

        const body = await request.json();
        const { assignmentId, content } = body;

        if (!assignmentId || !content) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        // Upsert submission
        await prisma.assignmentSubmission.upsert({
            where: {
                assignmentId_studentId: {
                    assignmentId,
                    studentId: student.id
                }
            },
            update: {
                content,
                submittedAt: new Date(),
                status: 'SUBMITTED' // Re-submit if allowed
            },
            create: {
                assignmentId,
                studentId: student.id,
                content,
                status: 'SUBMITTED'
            }
        });

        return NextResponse.json({ success: true, message: 'Assignment submitted' });

    } catch (error) {
        console.error('Assignment Submission Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to submit' }, { status: 500 });
    }
}
