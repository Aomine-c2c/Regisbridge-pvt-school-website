import { prisma } from "@/lib/db";
import { generateText } from "@/lib/ai/gemini-client";

export const aiService = {
  /**
   * Generates a risk analysis for a student based on their data.
   */
  async analyzeStudentRisk(studentId: string): Promise<string | null> {
    // 1. Check if we have a fresh cached insight (less than 24 hours old)
    const cached = await prisma.aiInsight.findFirst({
      where: {
        entityType: 'STUDENT',
        entityId: studentId,
        createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // 24 hours
      },
      orderBy: { createdAt: 'desc' }
    });

    if (cached) {
      return cached.insight;
    }

    // 2. Fetch Student Data
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { firstName: true, lastName: true } },
        class: { select: { name: true } },
        grades: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { subject: { select: { name: true } } }
        },
        attendance: {
          take: 30, // Last 30 records
          orderBy: { date: 'desc' }
        }
      }
    });

    if (!student) return null;

    // 3. Prepare Prompt
    const gradeSummary = student.grades.map(g => `${g.subject.name}: ${g.score}/${g.maxScore}`).join(', ');
    const absenceCount = student.attendance.filter((a: any) => a.status === 'ABSENT').length;
    const lateCount = student.attendance.filter((a: any) => a.status === 'LATE').length;

    const prompt = `
      Analyze the following student data and provide a brief implementation-focused risk assessment (max 3 sentences) and 2 specific intervention checks.
      
      Student: ${student.user.firstName} (Class: ${student.class?.name})
      Recent Grades: ${gradeSummary || "No recent grades"}
      Attendance (last 30 days): ${absenceCount} absences, ${lateCount} lates.
      
      Output format:
      Risk Level: [Low/Medium/High]
      Analysis: [Brief analysis]
      Intervention: [Actionable steps]
    `;

    // 4. Call AI
    const insight = await generateText(prompt);

    if (insight) {
      // 5. Cache Result
      await prisma.aiInsight.create({
        data: {
          entityType: 'STUDENT',
          entityId: studentId,
          insight
        }
      });
    }

    return insight;
  },

  /**
   * Generates a performance summary for a class.
   */
  async generateClassSummary(classId: string): Promise<string | null> {
     // 1. Check Cache
     const cached = await prisma.aiInsight.findFirst({
        where: {
          entityType: 'CLASS',
          entityId: classId,
          createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        },
        orderBy: { createdAt: 'desc' }
      });
  
      if (cached) return cached.insight;

      // 2. Fetch Data
      const schoolClass = await prisma.class.findUnique({
        where: { id: classId },
        include: {
            students: {
                include: {
                    grades: {
                        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } // Last 30 days
                    },
                    attendance: {
                        where: { date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } // Last 7 days
                    }
                }
            }
        }
      });

      if (!schoolClass) return null;

      // 3. Aggregate Data
      const totalStudents = schoolClass.students.length;
      let totalGrades = 0;
      let failingGrades = 0;
      let totalAbsences = 0;

      schoolClass.students.forEach((s: any) => {
          s.grades.forEach((g: any) => {
              totalGrades++;
              if ((g.score / g.maxScore) < 0.5) failingGrades++;
          });
          totalAbsences += s.attendance.filter((a: any) => a.status === 'ABSENT').length;
      });

      const prompt = `
        Provide a concise weekly summary for a school class.
        Class: ${schoolClass.name}
        Students: ${totalStudents}
        Recent Activity (30 days): ${totalGrades} grades recorded, ${failingGrades} failing.
        Recent Attendance (7 days): ${totalAbsences} total absences across class.

        Tone: Professional, encouraging but realistic. Max 50 words.
      `;

      // 4. Generate
      const insight = await generateText(prompt);

      if (insight) {
          await prisma.aiInsight.create({
              data: {
                  entityType: 'CLASS',
                  entityId: classId,
                  insight
              }
          });
      }

      return insight;
  },

  /**
   * Predicts potential student dropout risk based on attendance trends and academic decline.
   */
  async predictDropoutRisk(studentId: string): Promise<string | null> {
      // 1. Fetch Data (Last 90 days for trend analysis)
      const student = await prisma.student.findUnique({
          where: { id: studentId },
          include: {
              user: { select: { firstName: true, lastName: true } },
              attendance: {
                  where: { date: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
                  orderBy: { date: 'asc' }
              },
              grades: {
                  where: { createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
                  orderBy: { createdAt: 'asc' }
              }
          }
      });

      if (!student) return null;

      // 2. Prepare Trend Data
      const attendanceTrend = student.attendance.map((a: any) => a.status).join(',');
      const gradeTrend = student.grades.map((g: any) => (g.score / g.maxScore).toFixed(2)).join(',');

      const prompt = `
        Predict the dropout risk for a student by analyzing their 90-day attendance and academic trends.
        
        Student: ${student.user.firstName} ${student.user.lastName}
        Attendance Trend (Chronological): ${attendanceTrend || "None"}
        Academic Score Trend (Chronological): ${gradeTrend || "None"}

        Focus on:
        - Clusters of absences or lates in the last 30 days.
        - Downward slopes in academic performance.
        - Sudden changes in behavioral patterns.

        Format:
        Risk Level: [Low/Medium/High/Critical]
        Predicted Outcome: [1-sentence prediction]
        Primary Trigger: [What caused this risk?]
        Mitigation: [1 actionable intervention]
      `;

      return await generateText(prompt);
  }
};
