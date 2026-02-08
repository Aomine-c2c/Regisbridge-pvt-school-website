import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // 1. Fetch Teacher Details & Classes
        // We assume the user.userId links to the User model, which might be a teacher
        // We find the classes where this user is the class teacher OR teaches a subject
        
        const teacherProfile = await prisma.user.findUnique({
            where: { id: user.userId },
            include: {
                classes: true, // Classes they are the form tutor for
                teacherSubjects: { // Subjects they teach
                    include: {
                        classes: true // The classes where this subject is taught (if modeled that way, let's check schema assumption)
                         // Schema: Subject has classes Class[] ... wait, Subject has `classes` relation?
                         // Schema says: classes Class[] // If we want to link subjects to classes directly
                    }
                }
            }
        });

        if (!teacherProfile) {
            return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
        }

        // 2. Calculate Stats
        // Total Students: Sum of students in classes where this teacher teaches a subject
        // For simplicity, let's count students in the classes they are a form tutor for, 
        // OR distinct students across all subjects they teach.
        // allClassIds was unused

        const totalStudents = await prisma.student.count({
            where: {
                // Assuming Student has a way to link to Class. 
                // Schema: Student has `currentGrade`. Class has `grade`. 
                // We'll match Student.currentGrade to Class.grade
                currentGrade: { in: teacherProfile.classes.map(c => c.grade) } // Only for form tutor classes for now as rough proxy
            }
        });

        // Pending Grading: Assignments created by this teacher that have submissions needing grading
        const pendingGrading = await prisma.assignmentSubmission.count({
            where: {
                assignment: {
                    createdBy: user.userId
                },
                status: 'SUBMITTED', 
                score: null
            }
        });

        // Classes Today (Real Data)
        const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const todaySchedule = await prisma.classSchedule.findMany({
            where: {
                dayOfWeek: todayName,
                subject: {
                    teacherId: user.userId
                }
            },
            include: {
                subject: true,
                class: true
            },
            orderBy: { startTime: 'asc' }
        });

        const schedule = todaySchedule.map((s: any) => ({
            time: `${s.startTime} - ${s.endTime}`,
            class: `${s.class.name} (${s.subject.name})`,
            room: s.room || s.class.room || 'Room TBD',
            status: 'upcoming' // Logic can be improved to check current time
        }));


        // Recent Submissions
        const recentSubmissions = await prisma.assignmentSubmission.findMany({
            where: {
                assignment: {
                    createdBy: user.userId
                }
            },
            take: 5,
            orderBy: { submittedAt: 'desc' },
            include: {
                student: {
                    include: { user: { select: { firstName: true, lastName: true } } }
                },
                assignment: { select: { title: true } }
            }
        });

        const formattedSubmissions = recentSubmissions.map(sub => ({
             student: `${sub.student.user.firstName} ${sub.student.user.lastName}`,
             assignment: sub.assignment.title,
             time: sub.submittedAt.toISOString() // Format on frontend
        }));

        return NextResponse.json({
            success: true,
            data: {
                profile: {
                    name: `${teacherProfile.firstName} ${teacherProfile.lastName}`,
                    role: teacherProfile.role,
                    // Determine department or main subject
                    department: teacherProfile.teacherSubjects[0]?.name || 'General',
                    formClass: teacherProfile.classes[0]?.name || 'N/A'
                },
                stats: {
                    totalStudents,
                    pendingGrading,
                    classesToday: schedule.length,
                    alerts: 0 // Mock for now
                },
                schedule,
                recentSubmissions: formattedSubmissions,
                classes: [
                    ...teacherProfile.classes.map(c => ({ id: c.id, name: `${c.grade} - ${c.name} (Form)` })),
                    ...teacherProfile.teacherSubjects.flatMap(s => s.classes.map(c => ({ id: c.id, name: `${c.grade} - ${c.name} (${s.name})` })))
                ] // Combine Form classes and Subject classes for selection
            }
        });

    } catch (error) {
        console.error('Teacher Dashboard Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
