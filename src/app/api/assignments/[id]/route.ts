
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// GET /api/assignments/[id]
export async function GET(
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

        if (!payload) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const assignmentId = id;
        const role = payload.role;
        const userId = payload.userId;

        // Base include
        const include: any = {
            subject: true
        };

        if (role === 'teacher' || role === 'admin') {
            // Teachers see all submissions with student details
            include.submissions = {
                include: {
                    student: {
                        include: {
                            user: { select: { firstName: true, lastName: true } }
                        }
                    }
                }
            };
        } else if (role === 'student') {
            // Students see their own submission
            // We need to resolve Student ID first
             const student = await prisma.student.findUnique({
                where: { userId }
            });
            if (student) {
                include.submissions = {
                    where: { studentId: student.id }
                };
            }
        }

        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId },
            include
        });

        if (!assignment) {
            return NextResponse.json({ success: false, message: 'Assignment not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: assignment
        });

    } catch (error) {
        console.error('Get Assignment Detail Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
