import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        if (!user) {
             return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const tenantId = request.headers.get('x-tenant-id');
        if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = getTenantDb(tenantId);

        // 1. Fetch Teacher Details & Profile
        const teacherUser = await db.user.findUnique({
            where: { id: user.userId },
            include: {
                teacherProfile: {
                    include: {
                        classesManaged: true, // Form Tutor classes
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
        if (teacherUser.tenantId && teacherUser.tenantId !== tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant mismatch' }, { status: 403 });
        }

        const profile = teacherUser.teacherProfile;
        const subjectIds = profile.subjectsTaught.map(s => s.subjectId);

        // 2. Execute Independent Queries in Parallel
        const [
            studentCount,
            pendingGradingCount,
            todaySchedule,
            recentSubmissions
        ] = await Promise.all([
            // Student Count (Total students in classes managed by teacher)
            db.student.count({
                where: {
                    classId: { in: profile.classesManaged.map(c => c.id) }
                }
            }),

            // Pending Grading (Submissions with status SUBMITTED for assignments by this teacher)
            db.assignmentSubmission.count({
                where: {
                    status: 'SUBMITTED',
                    assignment: {
                        subjectId: { in: subjectIds }
                    }
                }
            }),

            // Today's Schedule
            db.timetablePeriod.findMany({
                where: {
                    subjectId: { in: subjectIds },
                    dayOfWeek: new Date().getDay() || 7 // 1-7 (Mon-Sun)
                },
                include: {
                    class: true,
                    subject: true
                },
                orderBy: { startTime: 'asc' }
            }),

            // Recent Submissions
            db.assignmentSubmission.findMany({
                where: {
                    assignment: {
                        subjectId: { in: subjectIds }
                    }
                },
                take: 5,
                orderBy: { submittedAt: 'desc' },
                include: {
                    student: {
                        include: { user: true }
                    },
                    assignment: true
                }
            })
        ]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedSubmissions = recentSubmissions.map((sub: any) => ({
            id: sub.id,
            studentName: `${sub.student.user.firstName} ${sub.student.user.lastName}`,
            assignmentTitle: sub.assignment.title,
            submittedAt: sub.submittedAt.toISOString(),
            status: sub.status
        }));

        const stats = [
            { title: 'Total Students', value: studentCount, change: '+0%', icon: 'Users' },
            { title: 'Pending Grading', value: pendingGradingCount, change: '0', icon: 'FileText' },
            { title: 'Classes Today', value: todaySchedule.length, change: '0', icon: 'Clock' },
            { title: 'Avg. Attendance', value: '92%', change: '+0%', icon: 'CheckCircle' }
        ];
        
        const schedule = todaySchedule.map((c: any) => ({
            id: c.id,
            subject: c.subject.name,
            class: c.class.name,
            time: `${c.startTime} (${c.durationMin} min)`,
            venue: c.venue || 'N/A'
        }));

        return NextResponse.json({
            success: true,
            data: {
                profile: {
                    name: `${teacherUser.firstName} ${teacherUser.lastName}`,
                    role: teacherUser.role,
                    department: profile.subjectsTaught[0]?.subject.name || 'General',
                    formClass: profile.classesManaged[0]?.name || 'N/A'
                },
                stats,
                schedule,
                recentSubmissions: formattedSubmissions,
                classes: [
                    ...profile.classesManaged.map(c => ({ id: c.id, name: `${c.gradeLevel} - ${c.name} (Form)` })),
                ] 
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
