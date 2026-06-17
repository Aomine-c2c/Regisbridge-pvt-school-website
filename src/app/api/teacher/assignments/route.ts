import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        // Fetch assignments for subjects this teacher teaches
        const assignments = await db.assignment.findMany({
            where: {
                subject: {
                teachers: {
                    some: {
                        teacher: { // specific to TeacherSubject join table
                            user: {
                                id: user.userId
                            }
                        }
                    }
                }
                }
            },
            include: {
                subject: { select: { name: true } },
                _count: { select: { submissions: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (assignments as any[]).map(a => ({
            id: a.id,
            title: a.title,
            subject: a.subject.name,
            type: a.type,
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

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        const body = await request.json();
        const { title, description, subjectId, dueDate, totalPoints, assignmentType } = body;

        if (!title || !subjectId || !dueDate) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const newAssignment = await db.assignment.create({
            data: {
                title,
                description,
                subjectId,
                dueDate: new Date(dueDate),
                maxScore: parseInt(totalPoints) || 100,
                type: assignmentType || 'HOMEWORK',
                status: 'DRAFT',
            }
        });

        return NextResponse.json({ success: true, data: newAssignment, message: 'Assignment created' });

    } catch (error) {
        console.error('Assignment Create Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to create assignment' }, { status: 500 });
    }
}
