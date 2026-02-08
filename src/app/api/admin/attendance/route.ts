import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

// GET /api/admin/attendance?date=2023-10-27&grade=10
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const grade = searchParams.get('grade');

    if (!dateParam) {
      return NextResponse.json({ success: false, message: 'Date is required' }, { status: 400 });
    }

    const date = parseISO(dateParam);
    const startDate = startOfDay(date);
    const endDate = endOfDay(date);

    // 1. Fetch Students (optionally filter by grade)
    const whereStudent: any = {};
    if (grade && grade !== 'all') {
      whereStudent.currentGrade = grade;
    }

    const students = await prisma.student.findMany({
      where: whereStudent,
      include: {
        user: {
          select: { firstName: true, lastName: true }
        }
      },
      orderBy: { rollNumber: 'asc' }
    });

    // 2. Fetch existing attendance for this date
    // We filter by the students we just found to avoid fetching irrelevant records
    const studentIds = students.map(s => s.id);
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        studentId: { in: studentIds },
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // 3. Merge data
    const data = students.map(student => {
      const record = attendanceRecords.find(r => r.studentId === student.id);
      return {
        studentId: student.id, // Internal ID
        rollNumber: student.rollNumber, // Display ID
        studentName: student.user ? `${student.user.firstName} ${student.user.lastName}` : 'Unknown',
        grade: student.currentGrade,
        status: record ? record.status : null, // null implies not marked yet
        remarks: record ? record.notes : '',
        markedAt: record ? record.markedAt : null
      };
    });

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}

// POST /api/admin/attendance - Bulk record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, records } = body; // records: { studentId, status, remarks }[]

    if (!date || !records || !Array.isArray(records)) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload' },
        { status: 400 }
      );
    }

    const attendanceDate = parseISO(date); // Ensure we save with correct date time (usually start of day or specific time)

    // Use transaction/bulk operations
    // Prisma upsert doesn't support updateMany/createMany with different values per row easily in one query
    // So we loop with Promise.all for now or use a transaction.
    
    // Simplest approach: Transaction of upserts
    const operations = records.map((record: any) => {
        return prisma.attendance.upsert({
            where: {
                studentId_date: {
                    studentId: record.studentId,
                    date: attendanceDate
                }
            },
            update: {
                status: record.status,
                notes: record.remarks,
                markedBy: 'Admin', // Placeholder
                markedAt: new Date()
            },
            create: {
                studentId: record.studentId,
                date: attendanceDate,
                status: record.status,
                notes: record.remarks,
                markedBy: 'Admin',
                markedAt: new Date()
            }
        });
    });

    await prisma.$transaction(operations);

    return NextResponse.json({
      success: true,
      message: 'Attendance recorded successfully'
    });

  } catch (error) {
    console.error('Error recording attendance:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record attendance' },
      { status: 500 }
    );
  }
}
