import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';
import { Prisma } from '@prisma/client';

// GET /api/admin/classes - List all classes
export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    // Optional filters
    const searchParams = request.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const academicYearId = searchParams.get('academicYearId'); 



    const where: Prisma.ClassWhereInput = {};
    if (grade) where.gradeLevel = grade; 
    if (academicYearId) where.academicYearId = academicYearId;

    const classes = await db.class.findMany({
      where,
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
        },
        _count: {
          select: {
            // Placeholder for when students relation is explicit if needed
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
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const body = await request.json();
    const { name, gradeLevel, academicYearId, classTeacherId } = body;

    // Validation
    if (!name || !gradeLevel || !academicYearId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newClass = await db.class.create({
      data: {
        name,
        gradeLevel,
        academicYearId,
        classTeacherId: classTeacherId || null,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Class created successfully',
      data: newClass
    });

  } catch (error: unknown) {
    console.error('Error creating class:', error);
    // Unique constraint violation
    if ((error as any).code === 'P2002') {
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
