import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

// Helper to verify student access (similar to grades route)
async function verifyStudentAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' };
    }

    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);

    if (!payload) {
        return { authorized: false, error: 'Invalid token' };
    }

    // Allow if user is the student, or if user is admin/teacher (logic can be expanded)
    // For now, strict on student role or just valid token for MVP
    return { authorized: true, userId: payload.userId, role: payload.role };
}

export async function GET(request: NextRequest) {
    try {
        const auth = await verifyStudentAccess(request);
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            );
        }

        // Get student details to know their grade
        const student = await prisma.student.findUnique({
            where: { userId: auth.userId },
            include: { user: true }
        });

        if (!student) {
            return NextResponse.json(
                { success: false, message: 'Student profile not found' },
                { status: 404 }
            );
        }

        // Fetch subjects for this student's grade
        // In a real app with Class/Period models, we'd fetch those.
        // We use the student's currentGrade to find their Class.
        // Assuming 1 class per grade for MVP or we just grab the first class matching the grade.
        // Better: Student should have a classId. Schema has `section` and `currentGrade`.
        // Let's find the Class entity that matches grade/section if possible, or matches the grade.
        
        // Find the class for this student
        // Currently Student model has `currentGrade` and `section`.
        // Class model has `grade` and `name` (which might be the section).
        const studentClass = await prisma.class.findFirst({
            where: {
                grade: student.currentGrade,
                // Match section if available (User input "Section A" vs Class Name "10-A" might be tricky)
                // For MVP, just match grade. Or better, fetch schedules for ANY class with this grade?
                // No, schedule is per class.
                // Let's try to match name to section if section exists.
                ...(student.section ? { name: { contains: student.section } } : {})
            }
        });

        if (!studentClass) {
             return NextResponse.json({ success: true, data: {} });
        }

        const scheduleEntries = await prisma.classSchedule.findMany({
            where: { classId: studentClass.id },
            include: {
                subject: {
                    include: { teacher: { select: { firstName: true, lastName: true } } }
                }
            }
        });

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const fullSchedule: Record<string, any[]> = {};

        days.forEach(day => {
            const dayEntries = scheduleEntries.filter((e: any) => e.dayOfWeek === day);
            
            // Map DB entries to Frontend "Lesson" shape
            const lessons = dayEntries.map((entry: any) => ({
                id: entry.id,
                time: `${entry.startTime}-${entry.endTime}`,
                subject: entry.subject.name,
                teacher: entry.subject.teacher 
                    ? `${entry.subject.teacher.firstName.charAt(0)}. ${entry.subject.teacher.lastName}` 
                    : 'Staff',
                room: entry.room || entry.class.room || 'TBA',
                type: 'lesson' as const
            } as any));

            // Add Lunch Break (hardcoded for now as it's usually standard)
            // Or only add if no lesson overlaps 13:00?
            lessons.push({
                id: `break-${day}`,
                time: '13:00-14:00',
                subject: 'Lunch Break',
                teacher: '',
                room: 'Dining Hall',
                type: 'break' as const
            });

            // Sort by time
            lessons.sort((a: any, b: any) => {
                const timeA = a.time.split('-')[0];
                const timeB = b.time.split('-')[0];
                return timeA.localeCompare(timeB);
            });

            fullSchedule[day] = lessons;
        });

        return NextResponse.json({
            success: true,
            data: fullSchedule
        });

    } catch (error) {
        console.error('Timetable API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
