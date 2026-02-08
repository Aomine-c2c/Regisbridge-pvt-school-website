import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch classes where the user is a teacher for a subject OR a form tutor
        const teacherProfile = await prisma.user.findUnique({
            where: { id: user.userId },
            include: {
                classes: { // Form tutor classes
                    include: {
                        _count: { select: { subjects: true } } // Just some metadata
                    }
                }, 
                teacherSubjects: { // Subjects they teach
                    include: {
                        classes: { // Classes taking this subject
                           include: {
                               _count: { select: { subjects: true } }
                           }
                        }
                    }
                }
            }
        });

        if (!teacherProfile) {
            return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
        }

        // Aggregate classes
        // 1. Form Classes they manage
        const formClasses = teacherProfile.classes.map(c => ({
            id: c.id,
            name: c.name,
            grade: c.grade,
            role: 'Form Tutor',
            subject: 'All Subjects (Form Tutor)',
            studentsCount: 0 // We'll need another query or include to get this accurate count if not in Class model relation directly
        }));

        // 2. Subject Classes
        const subjectClasses = teacherProfile.teacherSubjects.flatMap(sub => 
            sub.classes.map(c => ({
                id: c.id,
                name: c.name,
                grade: c.grade,
                role: 'Subject Teacher',
                subject: sub.name,
                studentsCount: 0
            }))
        );

        // Merge (though duplicates shouldn't occur for exact same Subject+Class combo usually)
        const allClasses = [...formClasses, ...subjectClasses];

        // For real student counts, we might need to fetch students by grade/class
        // Since Student model has `currentGrade`, and Class has `grade`, we can map them.
        // This is N+1 if not careful, but for MVP let's do a grouped count.
        
        const gradeCounts = await prisma.student.groupBy({
            by: ['currentGrade'],
            _count: { userId: true }
        });
        
        const countMap = new Map(gradeCounts.map(g => [g.currentGrade, g._count.userId]));

        const enrichedClasses = allClasses.map(c => ({
            ...c,
            studentsCount: countMap.get(c.grade) || 0
        }));

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
