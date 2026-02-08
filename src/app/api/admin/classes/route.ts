import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/admin/classes - List all classes
export async function GET(request: NextRequest) {
  try {
    // Optional filters
    const searchParams = request.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const academicYear = searchParams.get('academicYear');

    const where: any = {};
    if (grade) where.grade = grade;
    if (academicYear) where.academicYear = academicYear;

    const classes = await prisma.class.findMany({
      where,
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        _count: {
          select: {
            // students: true // Implicit relation count handling differs, explicit easier?
            // Since we didn't add students explicit relation yet, we can't count them easily if it's not defined.
            // But we defined 'students Student[]' in the Class model I just appended? 
            // Wait, I put `students Student[]` in the schema append snippet?
            // Let me check my previous tool call content (Step 385).
            // content: "teacher User? ... students Student[] ..." ?? 
            // NO. In Step 385 replacement content, I REMOVED `students Student[]` and wrote "// Relations to other existing models if needed".
            // So `_count` for students will fail if I try to use it here.
            // I will remove student count for now until I link Student model to Class.
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: classes
    });

  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

// POST /api/admin/classes - Create new class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, grade, academicYear, teacherId, room, capacity } = body;

    // Validation
    if (!name || !grade || !academicYear) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check availability if teacher assigned? (Basic checks for now)

    const newClass = await prisma.class.create({
      data: {
        name,
        grade,
        academicYear,
        teacherId: teacherId || null,
        room,
        capacity: capacity ? parseInt(capacity) : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Class created successfully',
      data: newClass
    });

  } catch (error: any) {
    console.error('Error creating class:', error);
    // Unique constraint violation
    if (error.code === 'P2002') {
       return NextResponse.json(
        { success: false, message: 'Class already exists for this grade and year' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create class' },
      { status: 500 }
    );
  }
}
