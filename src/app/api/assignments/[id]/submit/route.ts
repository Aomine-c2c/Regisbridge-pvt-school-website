import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// POST /api/assignments/[id]/submit
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const payload = await verifyAccessToken(token);

        if (!payload || payload.role !== 'student') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Only students can submit.' }, { status: 403 });
        }

        const assignmentId = id;
        const body = await request.json();
        const { content, fileUrl } = body;

        if (!content && !fileUrl) {
            return NextResponse.json({ success: false, message: 'Submission must contain content or a file.' }, { status: 400 });
        }

        // Get Student ID
        const student = await prisma.student.findUnique({
            where: { userId: payload.userId }
        });

        if (!student) {
            return NextResponse.json({ success: false, message: 'Student profile not found' }, { status: 404 });
        }

        // Verify Assignment exists and is active
        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId }
        });

        if (!assignment) {
            return NextResponse.json({ success: false, message: 'Assignment not found' }, { status: 404 });
        }

        if (assignment.status !== 'ACTIVE') {
            // Optional: Block submissions for archived? Let's allow for now but maybe warn.
        }

        // Upsert Submission
        const submission = await prisma.assignmentSubmission.upsert({
            where: {
                assignmentId_studentId: {
                    assignmentId,
                    studentId: student.id
                }
            },
            update: {
                content,
                fileUrl,
                status: 'SUBMITTED',
                submittedAt: new Date()
            },
            create: {
                assignmentId,
                studentId: student.id,
                content,
                fileUrl,
                status: 'SUBMITTED'
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Assignment submitted successfully',
            data: submission
        });

    } catch (error) {
        console.error('Submit Assignment Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
