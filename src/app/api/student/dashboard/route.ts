import { NextRequest, NextResponse } from 'next/server';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        // 1. Fetch Student Profile with Class & User
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const studentProfile: any = await db.student.findUnique({
            where: { userId: user.userId },
            include: {
                class: {
                    include: {
                        classTeacher: {
                            include: { user: true }
                        }
                    }
                },
                user: true
            }
        });

        if (!studentProfile) {
             return NextResponse.json({ success: false, message: 'Profile not found' }, { status: 404 });
        }
        
        const tenantIdUser = studentProfile.undefined || tenantId; // Fallback or strict check?
        if (tenantIdUser && tenantIdUser !== tenantId) {
             return NextResponse.json({ success: false, message: 'Profile mismatch' }, { status: 403 });
        }

        const studentId = studentProfile.id;
        const classId = studentProfile.class?.id; // Access via relation

        // 2. Execute Independent Queries in Parallel
        const [
            subjectsData,
            todaySchedule,
            recentGrades,
            attendanceStats,
            housePoints
        ] = await Promise.all([
            // A. Fetch Subjects & Assignments
            (async () => {
                let subjectIds: string[] = [];
                if (classId) {
                    const classSubjects = await db.timetablePeriod.findMany({
                        where: { classId },
                        select: { subjectId: true },
                        distinct: ['subjectId']
                    });
                    subjectIds = classSubjects.map((p: { subjectId: string }) => p.subjectId);
                }

                if (subjectIds.length === 0) return [];

                const validAssignments = await db.assignment.findMany({
                    where: {
                        subjectId: { in: subjectIds },
                        status: 'ACTIVE', 
                        dueDate: { gte: new Date() }
                    },
                    take: 5,
                    orderBy: { dueDate: 'asc' },
                    include: { subject: { select: { name: true } } }
                });

                const assignmentIds = validAssignments.map(a => a.id);
                if (assignmentIds.length === 0) return validAssignments;

                const mySubmissions = await db.assignmentSubmission.findMany({
                    where: {
                        studentId,
                        assignmentId: { in: assignmentIds }
                    },
                    select: { assignmentId: true }
                });
                
                const submittedIds = new Set(mySubmissions.map(s => s.assignmentId));
                return validAssignments.filter(a => !submittedIds.has(a.id));
            })(),

            // B. Timetable
            (async () => {
                if (!classId) return [];
                const dayMap = [7, 1, 2, 3, 4, 5, 6]; 
                const todayInt = dayMap[new Date().getDay()];

                const schedule = await db.timetablePeriod.findMany({
                    where: {
                        classId,
                        dayOfWeek: todayInt
                    },
                    include: { subject: true },
                    orderBy: { startTime: 'asc' }
                });

                return schedule.map((s, index) => ({
                    id: s.id,
                    subject: s.subject.name,
                    time: `${s.startTime}-${s.endTime}`,
                    room: s.room || 'Room TBD',
                    status: index === 0 ? 'now' : 'upcoming', 
                    teacher: 'Staff' 
                }));
            })(),

            // C. Recent Grades
            db.grade.findMany({
                where: { studentId },
                orderBy: { updatedAt: 'desc' },
                take: 4,
                include: { subject: { select: { name: true } } }
            }),

            // D. Attendance Stats
            (async () => {
                const [present, total] = await Promise.all([
                    db.attendance.count({ where: { studentId, status: 'PRESENT' } }),
                    db.attendance.count({ where: { studentId } })
                ]);
                return { present, total };
            })(),

            // E. Mock House Points (or fetch from DB if model existed)
            Promise.resolve(1247)
        ]);

        const pendingAssignments = subjectsData as any[]; 
        const timetable = todaySchedule as any[];
        
        const formattedGrades = recentGrades.map(g => ({
            label: g.subject.name,
            value: g.score,
            max: g.maxScore,
            color: (g.score / g.maxScore) >= 0.8 ? 'primary' : 'gray'
        }));

        const attendanceRate = attendanceStats.total > 0 
            ? ((attendanceStats.present / attendanceStats.total) * 100).toFixed(0) + '%' 
            : '100%';

        return NextResponse.json({
            success: true,
            data: {
                profile: {
                    name: `${studentProfile.user.firstName} ${studentProfile.user.lastName}`,
                    grade: studentProfile.class?.name || 'N/A',
                    id: studentProfile.admissionIdentifier || studentProfile.id,
                    house: 'Windsor'
                },
                stats: {
                    pendingAssignments: pendingAssignments.length,
                    upcomingTests: 1, // Static for now
                    attendance: attendanceRate,
                    housePoints
                },
                timetable,
                assignments: pendingAssignments.map(a => ({
                    subject: a.subject.name,
                    title: a.title,
                    due: a.dueDate.toISOString(),
                    priority: 'medium'
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
