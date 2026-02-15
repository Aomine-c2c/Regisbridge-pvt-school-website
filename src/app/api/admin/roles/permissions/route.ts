import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function POST(request: NextRequest) {
  try {
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
    const { role, permissions } = body;

    if (!role || !permissions) {
      return NextResponse.json(
        { message: 'Role and permissions are required' },
        { status: 400 }
      );
    }

    // Update all users with the specified role
    const updateResult = await db.user.updateMany({
      where: { role: role },
      data: {
        permissions: JSON.stringify(permissions)
      }
    });

    return NextResponse.json({
      success: true,
      message: `Permissions updated for ${updateResult.count} users with role ${role}`,
      count: updateResult.count
    });

  } catch (error) {
    console.error('Error updating role permissions:', error);
    return NextResponse.json(
      { message: 'Failed to update permissions' },
      { status: 500 }
    );
  }
}
