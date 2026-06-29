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

        // Fetch classes where the user is a form tutor
        const teacherUser = await db.user.findUnique({
            where: { id: user.userId },
            include: {
                teacherProfile: {
                    include: {
                        classesManaged: {
                            include: {
                                _count: { select: { students: true } }
                            }
                        },
                        subjectsTaught: {
                            include: {
                                subject: true
                            }
                        }
                    }
                }
            }
        });

        if (!teacherUser || !teacherUser.teacherProfile) {
            return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
        }

        // Security Check
        if (undefined && undefined !== tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant mismatch' }, { status: 403 });
        }

        const profile = teacherUser.teacherProfile;

        // 1. Form Classes they manage
        const formClasses = profile.classesManaged.map(c => ({
            id: c.id,
            name: c.name,
            grade: c.gradeLevel, // Changed from grade
            role: 'Form Tutor',
            subject: 'All Subjects (Form Tutor)',
            studentsCount: c._count.students
        }));

        // 2. Subject Classes
        const enrichedClasses = [...formClasses];

        return NextResponse.json({
            success: true,
            data: enrichedClasses
        });

    } catch (error) {
        console.error('Teacher Classes Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch classes' },
            { status: 500 }
        );
    }
}
