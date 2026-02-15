import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// POST /api/assignments/[id]/grade
// Note: [id] here usually refers to the assignment ID, but grading targets a specific submission.
// Ideally, the route implies we are grading a generic thing.
// Better API design: POST /api/assignments/submission/[submissionId]/grade
// But based on the file structure `src/app/api/assignments/[id]/grade`, let's assume `id` could be submissionId OR we pass studentId in body.
// Let's stick to: we need to identify *which* submission.
// Common pattern: POST /api/assignments/[assignmentId]/grade
// Body: { studentId, score, feedback }

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

        if (!payload || payload.role !== 'teacher') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Only teachers can grade.' }, { status: 403 });
        }

        const assignmentId = id;
        const body = await request.json();
        const { studentId, score, feedback } = body;

        if (!studentId || score === undefined) {
             return NextResponse.json({ success: false, message: 'Missing studentId or score' }, { status: 400 });
        }

        // Verify assignment belongs to teacher? (Optional strict check)
        // For MVP, allow any teacher to grade (or trust them).

        // Update Submission
        // We use upsert in case the student hasn't "submitted" but the teacher wants to give a grade (e.g. 0 for missing)
        const submission = await prisma.assignmentSubmission.upsert({
            where: {
                assignmentId_studentId: {
                    assignmentId,
                    studentId
                }
            },
            update: {
                score: Number(score),
                remarks: feedback,
                gradedBy: { connect: { id: payload.userId } },
                gradedAt: new Date(),
                status: 'GRADED'
            },
            create: {
                assignmentId,
                studentId,
                score: Number(score),
                remarks: feedback,
                gradedBy: { connect: { id: payload.userId } },
                gradedAt: new Date(),
                status: 'GRADED'
            }
        });

        // Also create a "Grade" record? 
        // The schema has a `Grade` model linked to `Subject` and `Student`.
        // Ideally, individual assignment grades might roll up into a final Grade.
        // For now, let's just store it in AssignmentSubmission. 
        // We can trigger a separate "Calculate Term Grade" process later.

        return NextResponse.json({
            success: true,
            message: 'Grade recorded successfully',
            data: submission
        });

    } catch (error) {
        console.error('Grading Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
