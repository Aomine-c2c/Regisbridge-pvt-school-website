import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        // Fetch teacher (User) with their subjects
        const teacher = await prisma.user.findUnique({
            where: { id: user!.userId },
            select: {
                teacherSubjects: {
                    select: {
                        id: true,
                        name: true,
                        code: true
                    }
                }
            }
        });

        if (!teacher) {
            return NextResponse.json({ success: false, message: 'Teacher not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: teacher.teacherSubjects });
    } catch (err) {
         
        console.error('Teacher subjects fetch error:', err);
        return NextResponse.json({ success: false, message: 'Failed to fetch subjects' }, { status: 500 });
    }
}
