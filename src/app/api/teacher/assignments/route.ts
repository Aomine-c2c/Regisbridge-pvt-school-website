import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch assignments created by this teacher
        const assignments = await prisma.assignment.findMany({
            where: {
                createdBy: user.userId
            },
            include: {
                subject: { select: { name: true } },
                _count: { select: { submissions: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Format
        const data = assignments.map(a => ({
            id: a.id,
            title: a.title,
            subject: a.subject.name,
            grade: a.grade,
            type: a.assignmentType,
            dueDate: a.dueDate,
            status: a.status,
            submissionsCount: a._count.submissions
        }));

        return NextResponse.json({
            success: true,
            data
        });

    } catch (error) {
        console.error('Assignments Fetch Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch assignments' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { title, description, subjectId, grade, dueDate, totalPoints, assignmentType } = body;

        if (!title || !subjectId || !grade || !dueDate) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const newAssignment = await prisma.assignment.create({
            data: {
                title,
                description,
                subjectId,
                grade,
                dueDate: new Date(dueDate),
                totalPoints: parseInt(totalPoints),
                assignmentType: assignmentType || 'HOMEWORK',
                status: 'ACTIVE',
                createdBy: user.userId
            }
        });

        return NextResponse.json({ success: true, data: newAssignment, message: 'Assignment created' });

    } catch (error) {
        console.error('Assignment Create Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to create assignment' }, { status: 500 });
    }
}
