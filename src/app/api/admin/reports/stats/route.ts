import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireAdmin(req);
    if (error) return error;

    const tenantId = req.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    // 1. Student Stats
    const totalStudents = await db.student.count();
    
    // Group by grade level (fetched via relational query since groupBy doesn't support relations)
    const allStudents = await db.student.findMany({
      select: {
        class: {
          select: { gradeLevel: true }
        }
      }
    });
    
    const gradeMap = new Map<string, number>();
    allStudents.forEach(s => {
      const grade = s.class?.gradeLevel || 'Unassigned';
      gradeMap.set(grade, (gradeMap.get(grade) || 0) + 1);
    });

    const studentsByGrade = Array.from(gradeMap.entries()).map(([grade, count]) => ({
      grade,
      count
    }));

    // 2. Staff Stats
    const totalTeachers = await db.user.count({
      where: { role: 'teacher' }
    });

    // 3. Attendance Stats (Today)
    const today = new Date();
    const attendanceToday = await db.attendance.groupBy({
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
    
    // Total marked attendance today 
    const attendanceRate = totalStudents > 0 
      ? Math.round(((presentCount + lateCount) / totalStudents) * 100) 
      : 0;

    // 4. Financial Stats
    // Scope manually via student relation
    const financials = await db.feePayment.aggregate({
      _sum: {
        amountPaid: true
      },
      where: {
        student: {
            tenantId: tenantId
        }
      }
    });

    const totalPaid = financials._sum.amountPaid || 0;

    // Calculate total expected (simplified: students * fee per grade)
    // In a production app, this would be more granular based on FeeStructure per student
    const feeStructures = await db.feeStructure.findMany();
    let totalExpected = 0;
    
    gradeMap.forEach((count, grade) => {
        const structure = feeStructures.find((f: any) => f.gradeLevel === grade);
        if (structure) {
            totalExpected += structure.amount * count;
        }
    });

    const pendingBalance = Math.max(0, totalExpected - totalPaid);

    return NextResponse.json({
      success: true,
      data: {
        students: {
            total: totalStudents,
            byGrade: studentsByGrade
        },
        staff: {
            teachers: totalTeachers
        },
        attendance: {
            rate: attendanceRate,
            breakdown: attendanceToday.map(a => ({ status: a.status, count: a._count.id }))
        },
        finance: {
            revenue: totalPaid,
            pending: pendingBalance
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
