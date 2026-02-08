import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/admin/students/[id] - Get student details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const student = await prisma.student.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
            phoneNumber: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    const formattedStudent = {
      id: student.id,
      studentId: student.userId,
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      email: student.user.email,
      dateOfBirth: student.dateOfBirth?.toISOString(),
      grade: student.currentGrade,
      className: student.section || '',
      enrollmentDate: student.enrollmentDate.toISOString(),
      status: student.user.status,
      phoneNumber: student.user.phoneNumber,
      address: student.address,
      parentInfo: {
        name: student.parentName,
        email: student.parentEmail,
        phone: student.parentPhone,
        relationship: 'Parent',
      },
      rollNumber: student.rollNumber,
    };

    return NextResponse.json({
      success: true,
      data: formattedStudent,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch student details' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/students/[id] - Update student
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      grade,
      className,
      phoneNumber,
      address,
      parentName,
      parentEmail,
      parentPhone,
    } = body;

    // Get student to find linked user
    const student = await prisma.student.findUnique({
      where: { id: id },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    // Update Transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: student.userId },
        data: {
          firstName,
          lastName,
          phoneNumber,
        },
      }),
      prisma.student.update({
        where: { id: id },
        data: {
          currentGrade: grade,
          section: className,
          address,
          parentName,
          parentEmail,
          parentPhone,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Student updated successfully',
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update student' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/students/[id] - Delete student
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const student = await prisma.student.findUnique({
      where: { id: id },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: 'Student not found' },
        { status: 404 }
      );
    }

    // Delete user (Cascade will handle student record, but let's be safe and rely on cascade defined in schema)
    // Schema says: user User @relation(fields: [userId], references: [id], onDelete: Cascade)
    // So deleting user deletes student.
    
    await prisma.user.delete({
      where: { id: student.userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
