import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const payload = await verifyAccessToken(token);

        if (!payload || (payload.role !== 'admin' && payload.role !== 'administrator')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const dateString = searchParams.get('date') || new Date().toISOString().split('T')[0];
        
        // We want strict date matching. 
        // Prisma DateTime stores milliseconds. 
        // Best approach for daily attendance: use a range for the whole day.
        const startDate = new Date(dateString);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);

        // 1. Get Overall Stats for the day
        const dailyRecords = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            // Adding classTeacher relation through student and class for potential future use or detailed reports
            include: {
                student: {
                    include: {
                        class: {
                            include: {
                                classTeacher: {
                                    include: {
                                        user: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                                email: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const stats = {
            total_marked: dailyRecords.length,
            present: dailyRecords.filter(r => r.status === 'PRESENT').length,
            absent: dailyRecords.filter(r => r.status === 'ABSENT').length,
            late: dailyRecords.filter(r => r.status === 'LATE').length,
            excused: dailyRecords.filter(r => r.status === 'EXCUSED').length
        };

        // 2. We might want to see which classes have marked attendance.
        // This is complex because "Class" isn't directly on Attendance, only Student.
        // We can group by Student -> Class Grade? 
        // Or we can fetch all Classes and count how many students in them have records.
        // For MVP Report: Just return the raw stats and maybe a list of recent absentees.

        const absentees = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate
                },
                status: 'ABSENT'
            },
            include: {
                student: {
                    include: { user: { select: { firstName: true, lastName: true } } }
                }
            },
            take: 20 // Limit
        });

        const formattedAbsentees = absentees.map(r => ({
            id: r.studentId,
            name: `${r.student.user.firstName} ${r.student.user.lastName}`,
            grade: r.student.currentGrade,
            reason: r.remarks || 'No reason provided'
        }));

        return NextResponse.json({
            success: true,
            data: {
                date: dateString,
                stats,
                absentees: formattedAbsentees
            }
        });

    } catch (error) {
        console.error('Admin Attendance Report Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
