import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { requireAdmin } from '@/lib/api/auth-middleware';
import { Prisma } from '@prisma/client';
import { auditService } from '@/services/audit-service';

// GET /api/admin/users
export async function GET(request: NextRequest) {
  try {
    // Verify Admin Access
    const authResult = await requireAdmin(request);
    if (authResult.error) {
      return authResult.error;
    }

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;



    const where: Prisma.UserWhereInput = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { firstName: { contains: search } }, 
        { lastName: { contains: search } },
        { email: { contains: search } }
      ];
    }

    const [users, total] = await db.$transaction([
      db.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          phoneNumber: true
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.user.count({ where })
    ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create User
export async function POST(request: NextRequest) {
  try {
    // Verify Admin Access
    const authResult = await requireAdmin(request);
    if (authResult.error) {
       return authResult.error;
    }

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const body = await request.json();
    const { firstName, lastName, email, password, role } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findFirst({
      where: { email }
    });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        status: 'active'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    // Audit Log
    await auditService.log({
      action: 'USER_CREATE',
      resource: 'User',
      resourceId: newUser.id,
      userId: authResult.user?.userId, // Admin ID
      tenantId: tenantId,
      details: { firstName, lastName, email, role, status: 'active' }
    });

    return NextResponse.json({
      success: true,
      user: newUser,
      message: 'User created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
