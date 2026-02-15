import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// GET /api/assignments
// Fetch assignments based on role
export async function GET(request: NextRequest) {
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

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status'); // Optional filter

        const where: any = {};
        if (status) where.status = status;

        if (payload.role === 'teacher') {
            // Teachers see assignments they created
            where.createdBy = payload.userId;
        } else if (payload.role === 'student') {
            // Students see assignments for their current grade
            // 1. Fetch Student Grade
            const student = await prisma.student.findUnique({
                where: { userId: payload.userId }
            });

            if (!student) {
                return NextResponse.json({ success: false, message: 'Student profile not found' }, { status: 404 });
            }

            where.gradeLevel = student.currentGrade;
            // Optionally filter by status 'ACTIVE' for students? Or let them see all.
            // Let's default to all, but arguably 'ARCHIVED' might be hidden.
            if (!status) where.status = 'ACTIVE'; 
        } else if (payload.role === 'admin') {
            // Admins see all (maybe refined later)
        } else {
             return NextResponse.json({ success: false, message: 'Unauthorized role' }, { status: 403 });
        }

        const assignments = await prisma.assignment.findMany({
            where,
            include: {
                subject: true, // Include subject name
                _count: {
                    select: { submissions: true }
                }
            },
            orderBy: { dueDate: 'asc' }
        });

        return NextResponse.json({
            success: true,
            data: assignments
        });

    } catch (error) {
        console.error('Get Assignments Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/assignments
// Create a new assignment (Teacher only)
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const payload = await verifyAccessToken(token);

        if (!payload || (payload.role !== 'teacher' && payload.role !== 'admin')) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        const body = await request.json();
        const { title, description, subjectId, grade, dueDate, totalPoints, assignmentType } = body;

        // Basic validation
        if (!title || !subjectId || !grade || !dueDate || !totalPoints) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const newAssignment = await prisma.assignment.create({
            data: {
                title,
                description: description || '',
                subjectId,
                gradeLevel: grade,
                dueDate: new Date(dueDate),
                maxScore: Number(totalPoints),
                type: assignmentType || 'HOMEWORK',
                createdBy: payload.userId,
                status: 'ACTIVE'
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Assignment created successfully',
            data: newAssignment
        });

    } catch (error) {
        console.error('Create Assignment Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
