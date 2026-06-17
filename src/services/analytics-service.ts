import { prisma } from "@/lib/db";

export interface AtRiskStudent {
  studentId: string;
  name: string;
  gradeLevel: string;
  attendanceRate: number;
  averageGrade: number;
  riskFactors: string[]; // "Low Attendance", "Failing Grades", etc.
}

export const analyticsService = {
  /**
   * Identifies students at risk based on attendance (< 85%) and grades (< 50%).
   */
  async getAtRiskStudents(filters?: { classId?: string; teacherId?: string }): Promise<AtRiskStudent[]> {
    const atRiskStudents: AtRiskStudent[] = [];

    const whereClause: any = {};
    
    // If a specific class is requested
    if (filters?.classId) {
        whereClause.classId = filters.classId;
    }
    
    // If filtering by teacher (User ID), find students in classes managed by this teacher
    // Note: This relies on Class -> classTeacher -> User relation
    if (filters?.teacherId) {
        whereClause.class = {
            classTeacher: {
                userId: filters.teacherId
            }
        };
    }

    // 1. Fetch all students for the tenant with their Class and latest data
    // optimizing by selecting only necessary fields could be better, but for now fetch widely
    const students = await prisma.student.findMany({
      where: whereClause,
      include: {
        user: { select: { firstName: true, lastName: true } },
        class: { select: { name: true, gradeLevel: true } },
        attendance: {
            where: {
                date: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30)) // Last 30 days
                }
            }
        },
        grades: {
            take: 20, // Check last 20 grades to get a recent average
            orderBy: { createdAt: 'desc' },
            include: { subject: { select: { name: true } } }
        }
      },
    });

    for (const student of students) {
      const riskFactors: string[] = [];
      let attendanceRate = 100;
      let averageGrade = 100;

      // 2. Calculate Attendance Rate (Last 30 days)
      if (student.attendance.length > 0) {
        const totalDays = student.attendance.length;
        const presentDays = student.attendance.filter(a => 
            a.status === 'PRESENT' || a.status === 'LATE'
        ).length;
        attendanceRate = (presentDays / totalDays) * 100;
      } else {
          // No attendance records - assume 100% or ignore? 
          // Let's assume 100 to give benefit of doubt currently
          attendanceRate = 100;
      }

      if (attendanceRate < 85) {
        riskFactors.push("Low Attendance");
      }

      // 3. Calculate Average Grade
      if (student.grades.length > 0) {
        let totalPercentage: number = 0;
        student.grades.forEach(grade => {
            const percentage = (grade.score / grade.maxScore) * 100;
            totalPercentage += percentage;
        });
        averageGrade = totalPercentage / student.grades.length;
      } else {
          // No grades yet
          averageGrade = 100; 
      }

      if (averageGrade < 50) {
        riskFactors.push("Failing Grades");
      }

      // 4. Determine if At-Risk
      if (riskFactors.length > 0) {
        atRiskStudents.push({
          studentId: student.id,
          name: `${student.user.firstName} ${student.user.lastName}`,
          gradeLevel: student.class?.name || 'Unassigned',
          attendanceRate: Number(attendanceRate.toFixed(1)),
          averageGrade: Number(averageGrade.toFixed(1)),
          riskFactors
        });
      }
    }

    return atRiskStudents;
  },

  /**
   * Get class-level performance trends (Average Grade per Month)
   */
  async getAcademicTrends(filters?: { classId?: string; teacherId?: string }) {
    // Group grades by month for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const grades = await prisma.grade.findMany({
      where: { 
          createdAt: { gte: sixMonthsAgo },
          student: filters?.teacherId ? {
              class: {
                  classTeacher: {
                      userId: filters.teacherId
                  }
              }
          } : filters?.classId ? {
              classId: filters.classId
          } : undefined
      },
      select: { score: true, maxScore: true, createdAt: true }
    });

    const monthlyStats: Record<string, { total: number; count: number }> = {};

    grades.forEach(grade => {
        const month = grade.createdAt.toLocaleString('default', { month: 'short' });
        if (!monthlyStats[month]) {
            monthlyStats[month] = { total: 0, count: 0 };
        }
        monthlyStats[month].total += (grade.score / grade.maxScore) * 100;
        monthlyStats[month].count += 1;
    });

    return Object.entries(monthlyStats).map(([month, stats]) => ({
        month,
        average: Math.round(stats.total / stats.count)
    }));
  }
};
