import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Fetch Student Profile
        const studentProfile = await prisma.student.findUnique({
            where: { userId: user.userId },
            include: {
                user: { select: { firstName: true, lastName: true } },
                attendance: { where: { status: 'present' } } // To count attendance
            }
        });

        if (!studentProfile) {
             return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
        }

        // Fetch Pending Assignments
        // Assignments for their grade/subject that they haven't submitted yet
        // OR submitted but not graded? "Pending" usually means "To Do"
        
        // Find assignments for their grade
        // We need to know which subjects they take. 
        // MVP: Fetch assignments for their `currentGrade`.
        const gradeAssignments = await prisma.assignment.findMany({
            where: {
                grade: studentProfile.currentGrade,
                status: 'ACTIVE',
                dueDate: { gte: new Date() } // Future due date
            },
            take: 5,
            orderBy: { dueDate: 'asc' },
            include: { subject: true }
        });

        // Check which ones are NOT submitted by this student
        // This requires an extra check. 
        // Optimization: Fetch submissions for these assignments by this student 
        const assignmentIds = gradeAssignments.map(a => a.id);
        const mySubmissions = await prisma.assignmentSubmission.findMany({
            where: {
                studentId: studentProfile.id,
                assignmentId: { in: assignmentIds }
            },
            select: { assignmentId: true }
        });
        
        const submittedIds = new Set(mySubmissions.map(s => s.assignmentId));
        const pendingAssignments = gradeAssignments.filter(a => !submittedIds.has(a.id));

        // Upcoming Timetable - Real Data from DB
        const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        
        // Find class first (similar logic to Timetable API, reuse logic if possible, or repeat for MVP)
        const studentClass = await prisma.class.findFirst({
            where: {
                grade: studentProfile.currentGrade,
                ...(studentProfile.section ? { name: { contains: studentProfile.section } } : {})
            }
        });

        let timetable: any[] = [];

        if (studentClass) {
            const todaySchedule = await prisma.classSchedule.findMany({
                where: {
                    classId: studentClass.id,
                    dayOfWeek: todayName
                },
                include: {
                    subject: { include: { teacher: { select: { firstName: true, lastName: true } } } }
                },
                orderBy: { startTime: 'asc' }
            });

            timetable = todaySchedule.map((s: any, index: number) => ({
                id: s.id,
                subject: s.subject.name,
                time: `${s.startTime}-${s.endTime}`,
                room: s.room || s.subject.grade || 'Room TBD', // Fallback
                status: index === 0 ? 'now' : 'upcoming', // Simple logic
                teacher: s.subject.teacher ? `${s.subject.teacher.firstName} ${s.subject.teacher.lastName}` : 'Staff'
            }));
        }

        // Recent Grades
        const recentGrades = await prisma.grade.findMany({
            where: { studentId: studentProfile.id },
            orderBy: { gradedAt: 'desc' },
            take: 4,
            include: { subject: { select: { name: true } } }
        });

        const formattedGrades = recentGrades.map(g => ({
            label: g.subject.name,
            value: g.percentage,
            color: g.percentage >= 80 ? 'primary' : 'gray'
        }));

        // House Points (Mocked if not in schema, currently not in schema)
        // Using a static value or a field if we add it later.
        const housePoints = 1247; 

        return NextResponse.json({
            success: true,
            data: {
                profile: {
                    name: `${studentProfile.user.firstName} ${studentProfile.user.lastName}`,
                    grade: studentProfile.currentGrade,
                    id: studentProfile.rollNumber, 
                    house: 'Windsor' // Mocked
                },
                stats: {
                    pendingAssignments: pendingAssignments.length,
                    upcomingTests: 1, // Mocked
                    attendance: '95%', // Mocked/Calced
                    housePoints
                },
                timetable,
                assignments: pendingAssignments.map(a => ({
                    subject: a.subject.name,
                    title: a.title,
                    due: a.dueDate.toISOString(),
                    priority: 'medium' // Logic can refine this
                })),
                grades: formattedGrades
            }
        });

    } catch (error) {
        console.error('Student Dashboard Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
