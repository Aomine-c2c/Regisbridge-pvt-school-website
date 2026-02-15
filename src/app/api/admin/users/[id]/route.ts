import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        phoneNumber: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/[id] - Update User
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const body = await request.json();
    const { firstName, lastName, email, role, status, password } = body;

    const dataToUpdate: any = {
      firstName,
      lastName,
      email,
      role,
      status
    };

    if (password) {
      dataToUpdate.password = await hashPassword(password);
    }

    // Filter undefined
    Object.keys(dataToUpdate).forEach(key => 
      dataToUpdate[key] === undefined && delete dataToUpdate[key]
    );

    const updatedUser = await db.user.update({
      where: { id: id },
      data: dataToUpdate,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true
      }
    });

    // Audit Log
    try {
      const { auditService } = await import('@/services/audit-service');
      await auditService.log({
        action: 'UPDATE',
        resource: 'User',
        resourceId: id,
        details: { fields: Object.keys(dataToUpdate) },
        userId: request.headers.get('x-user-id') || undefined,
        tenantId: tenantId,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined
      });
    } catch (e) {
      console.error('Audit log failed', e);
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'User updated successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    await db.user.delete({
      where: { id: id }
    });

    // Audit Log
    try {
      const { auditService } = await import('@/services/audit-service');
      await auditService.log({
        action: 'DELETE',
        resource: 'User',
        resourceId: id,
        userId: request.headers.get('x-user-id') || undefined,
        tenantId: tenantId,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined
      });
    } catch (e) {
      console.error('Audit log failed', e);
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
