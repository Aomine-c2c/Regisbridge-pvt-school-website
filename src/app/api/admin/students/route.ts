import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { requireAdmin } from '@/lib/api/auth-middleware';
import { Prisma } from '@prisma/client';

// GET /api/admin/students - List all students with filters
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult.error) return authResult.error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade');
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;



    const where: Prisma.StudentWhereInput = {};

    if (search) {
      where.OR = [
        { user: { firstName: { contains: search } } }, 
        { user: { lastName: { contains: search } } },
        { user: { email: { contains: search } } },
        { rollNumber: { contains: search } },
      ];
    }

    if (grade) {
      where.currentGrade = grade;
    }

    // Status is on the User model
    if (status) {
      where.user = { id: { not: '' }, status: status as string }; 
    }

    const [students, total] = await db.$transaction([
      db.student.findMany({
        where,
        skip,
        take: limit,
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
        orderBy: { createdAt: 'desc' },
      }),
      db.student.count({ where }),
    ]);

    // Flatten response structure to match frontend expectations
    const flattenedStudents = students.map((student) => ({
      id: student.id,
      studentId: student.userId, // Mapping userId to studentId for frontend
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      email: student.user.email,
      dateOfBirth: student.dateOfBirth?.toISOString(),
      grade: student.currentGrade,
      className: student.section || '',
      enrollmentDate: student.enrollmentDate.toISOString(),
      status: student.user.status, // user status
      phoneNumber: student.user.phoneNumber,
      address: student.address,
      parentInfo: {
        name: student.parentName,
        email: student.parentEmail,
        phone: student.parentPhone,
        relationship: 'Parent', // Default for now
      },
      rollNumber: student.rollNumber,
    }));

    return NextResponse.json({
      success: true,
      data: {
        data: flattenedStudents,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST /api/admin/students - Enroll a new student
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult.error) return authResult.error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      // gender, // unused
      grade,
      className, // section
      phoneNumber,
      address,
      parentName,
      parentEmail,
      parentPhone,
      gender,
      medicalAllergies,
      medicalMedications,
      medicalNotes,
    } = body;

    // Basic validation
    if (!email || !firstName || !lastName || !grade) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check existing email
    const existingUser = await db.user.findFirst({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already exists' },
        { status: 409 }
      );
    }

    // Generate credentials
    const defaultPassword = `Student${new Date().getFullYear()}!`;
    const hashedPassword = await hashPassword(defaultPassword);
    
    // Generate Roll Number (Simple auto-increment logic mock)
    const count = await db.student.count();
    const rollNumber = `${new Date().getFullYear()}${(count + 1).toString().padStart(4, '0')}`;

    // Transaction to create User and Student keys
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: 'STUDENT',
          status: 'ACTIVE',
          phoneNumber,
        },
      });

      const student = await tx.student.create({
        data: {
          userId: user.id,
          admissionIdentifier: rollNumber,
          gender: gender || 'OTHER',
          currentGrade: grade,
          section: className,
          rollNumber,
          parentName,
          parentEmail,
          parentPhone,
          address,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          medicalNotes: `${medicalNotes || ''} ${medicalAllergies ? 'Allergies: ' + medicalAllergies : ''} ${medicalMedications ? 'Meds: ' + medicalMedications : ''}`.trim(),
        },
      });

      return { user, student };
    });

    return NextResponse.json({
      success: true,
      message: 'Student enrolled successfully',
      data: {
        id: result.student.id,
        email: result.user.email,
        rollNumber: result.student.rollNumber,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error enrolling student:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to enroll student' },
      { status: 500 }
    );
  }
}
