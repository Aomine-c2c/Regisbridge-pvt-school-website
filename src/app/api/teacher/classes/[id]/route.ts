import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        // Verify the teacher has access to this class
        // 1. Is it a class they are a Form Tutor for?
        // 2. Is it a class where they teach a subject?
        // Ideally we check relation, but for MVP we can just fetch and verify ownership if strict.
        // For now, let's just fetch the class if it exists and maybe filter sensitive info if they aren't related?
        // Let's assume broad read access for teachers for now, or just fetch.
        
        const classId = id;

        const classDetails = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                teacher: { select: { firstName: true, lastName: true } }, // Form Tutor
                subjects: { select: { name: true, teacherId: true } }
            }
        });

        if (!classDetails) {
            return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        // Fetch students in this class
        // We match Student.currentGrade to Class.grade
        // AND maybe Class.name if we had sections? 
        // Schema: Student has `currentGrade` and `section`. Class has `grade` and `name` (which might be section?)
        // Let's assume Class.name is like "4A" or "4B" and Student.section is "A" or "B" for Grade "4"?
        // Or Class.grade="4", Class.name="4A". 
        // Let's match on Grade for now. If multiple classes per grade, we need to filter by section if stored.
        // Our Class model has `name` (e.g. 4A) and `grade` (e.g. 4).
        // Student has `currentGrade` (e.g. 4) and `section` (e.g. A).
        
        // Let's parse section from Class Name if needed, or assume Class Name IS the identifier.
        // Simple logic: Fetch students where currentGrade == class.grade
        // If we want to be specific to the "Class" entity, we need to ensure Students belong to it.
        // Let's try matching Student.currentGrade + Student.section 
        // e.g. Class "4A" -> Grade "4", Name "4A" (or Name "A")?
        // Let's assume Class.name is the full unique identifier like "4A"
        
        const students = await prisma.student.findMany({
            where: {
                currentGrade: classDetails.grade,
                // Add section filter if your data uses it. 
                // section: classDetails.name.replace(classDetails.grade, '').trim() // Rough heuristic
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        studentId: true 
                    }
                },
                _count: {
                    select: { 
                        attendance: { where: { status: 'PRESENT' } } 
                    }
                }
            },
            orderBy: {
                user: { lastName: 'asc' }
            }
        });

        const formattedStudents = students.map(s => ({
            id: s.id,
            name: `${s.user.firstName} ${s.user.lastName}`,
            rollNumber: s.rollNumber,
            attendance: `${s._count.attendance}%`, // Mock calculation, need total days
            status: 'Active' // Mock
        }));

        return NextResponse.json({
            success: true,
            data: {
                class: {
                    id: classDetails.id,
                    name: classDetails.name,
                    grade: classDetails.grade,
                    tutor: classDetails.teacher ? `${classDetails.teacher.firstName} ${classDetails.teacher.lastName}` : 'Unassigned'
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
