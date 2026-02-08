import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { startOfDay, endOfDay, subDays } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    // 1. Student Stats
    const totalStudents = await prisma.student.count();
    const studentsByGrade = await prisma.student.groupBy({
      by: ['currentGrade'],
      _count: {
        id: true
      }
    });

    // 2. Staff Stats
    const totalTeachers = await prisma.user.count({
      where: { role: 'teacher' }
    });

    // 3. Attendance Stats (Today)
    const today = new Date();
    const attendanceToday = await prisma.attendance.groupBy({
      by: ['status'],
      where: {
        date: {
          gte: startOfDay(today),
          lte: endOfDay(today)
        }
      },
      _count: {
        id: true
      }
    });
    
    // Calculate attendance rate for today
    const presentCount = attendanceToday.find(a => a.status === 'present')?.['_count'].id || 0;
    const lateCount = attendanceToday.find(a => a.status === 'late')?.['_count'].id || 0;
    // const absentCount = attendanceToday.find(a => a.status === 'absent')?.['_count'].id || 0;
    
    // Total marked attendance today (to calculate rate based on marked, or based on total students?)
    // Usually rate = (Present + Late) / Total Active Students
    const attendanceRate = totalStudents > 0 
      ? Math.round(((presentCount + lateCount) / totalStudents) * 100) 
      : 0;

    // 4. Financial Stats
    const financials = await prisma.feePayment.aggregate({
      _sum: {
        paidAmount: true,
        balance: true
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        students: {
            total: totalStudents,
            byGrade: studentsByGrade.map(g => ({ grade: g.currentGrade, count: g._count.id }))
        },
        staff: {
            teachers: totalTeachers
        },
        attendance: {
            rate: attendanceRate,
            breakdown: attendanceToday.map(a => ({ status: a.status, count: a._count.id }))
        },
        finance: {
            revenue: financials._sum.paidAmount || 0,
            pending: financials._sum.balance || 0
        }
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
