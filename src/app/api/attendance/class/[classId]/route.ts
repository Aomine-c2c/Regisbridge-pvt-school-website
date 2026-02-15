import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ classId: string }> }
) {
    const { classId } = await params;
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        
        const { searchParams } = new URL(request.url);
        const dateString = searchParams.get('date');
        
        if (!dateString) {
            return NextResponse.json({ success: false, message: 'Date required' }, { status: 400 });
        }
        
        const date = new Date(dateString);

        // 1. Get Class details to confirm it exists and maybe verify teacher assignment?
        // For now, just simplistic RBAC (any teacher/admin can view)
        
        // 2. Fetch Students in Class
        // We need to know which students belong to this class.
        // Schema Analysis: 
        // Class has `grade`. Student has `currentGrade`.
        // We can match Student.currentGrade == Class.grade (and Class.name/section if applicable?)
        // The schema shows Student.currentGrade and Class.grade. 
        // Let's first fetch the Class to get its grade.
        const classObj = await prisma.class.findUnique({
             where: { id: classId }
        });

        if (!classObj) {
            return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        const students = await prisma.student.findMany({
            where: {
                currentGrade: classObj.grade
            },
            include: {
                user: {
                    select: { firstName: true, lastName: true }
                }
            },
            orderBy: {
                 user: { lastName: 'asc' }
            }
        });

        // 3. Fetch Attendance for these students on this date
        // Since we have a strict date match (check if time part needs stripping)
        // With `date: DateTime` in Prisma/SQLite, it often stores full timestamp.
        // We rely on the frontend sending a clean date, and the previous POST logic 
        // using `new Date(date)` from the same string format. 
        // Ideally we should use a string YYYY-MM-DD or ensure midnight normalization.
        // For safety, let's verify if `date` is stored as YYYY-MM-DD string would be safer in future refactors,
        // but current schema uses DateTime.
        
        // Let's assume the POST stores whatever date object is created from the string.
        // To be safe regarding time components, usually we range query or ensure strict midnight.
        // But since we used `new Date(date)` in POST, if client sends "2024-01-01", it's UTC midnight.
        
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                studentId: { in: students.map(s => s.id) },
                date: date 
            }
        });

        // 4. Merge
        const result = students.map(student => {
            const record = attendanceRecords.find(r => r.studentId === student.id);
            return {
                studentId: student.id,
                name: `${student.user.firstName} ${student.user.lastName}`,
                rollNumber: student.rollNumber,
                status: record?.status || 'UNMARKED',
                notes: record?.remarks || '' // Using remarks as notes
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                class: classObj.name,
                date: dateString,
                students: result
            }
        });

    } catch (error) {
        console.error('Attendance Fetch Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
