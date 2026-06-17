import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    try {
        const { error } = await requireTeacher(request);
        if (error) return error;

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        // Verify class belongs to tenant
        const classDetails = await db.class.findUnique({
            where: { id }, // id is globally unique
            include: {
                classTeacher: { 
                    include: { user: { select: { firstName: true, lastName: true } } } 
                },
                timetable: {
                    include: {
                        subject: true
                    }
                }
            }
        });

        if (!classDetails) {
            return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }
        
        if (undefined && undefined !== tenantId) {
             return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 }); // Hide existence
        }

        // Distinct subjects from timetable
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uniqueSubjects = Array.from(new Set((classDetails as any).timetable.map((t: any) => t.subject.name)));

        const students = await db.student.findMany({
            where: {
                classId: classDetails.id
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                _count: {
                    select: { 
                        attendance: { where: { status: 'PRESENT' } } 
                    }
                }
            },
            orderBy: {
                admissionIdentifier: 'asc'
            }
        });

        const formattedStudents = students.map(s => ({
            id: s.id,
            name: `${s.user.firstName} ${s.user.lastName}`,
            rollNumber: s.admissionIdentifier,
            attendance: `${s._count.attendance}%`, 
            status: 'Active' 
        }));

        return NextResponse.json({
            success: true,
            data: {
                class: {
                    id: classDetails.id,
                    name: classDetails.name,
                    grade: classDetails.gradeLevel,
                    tutor: classDetails.classTeacher ? `${classDetails.classTeacher.user.firstName} ${classDetails.classTeacher.user.lastName}` : 'Unassigned',
                    subjects: uniqueSubjects
                },
                students: formattedStudents
            }
        });

    } catch (error) {
        console.error('Class Details Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch class details' },
            { status: 500 }
        );
    }
}
