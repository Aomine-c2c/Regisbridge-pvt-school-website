import { NextRequest, NextResponse } from "next/server";
import { getTenantDb } from "@/lib/db";
import { rbacService } from "@/services/rbac-service";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");
  if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

  const db = getTenantDb(tenantId);
  try {
    const roles = await db.role.findMany({
      include: {
        _count: { select: { users: true } },
        permissions: { include: { permission: true } }
      }
    });
    return NextResponse.json(roles);
  } catch (error) {
    return new NextResponse("Error fetching roles", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");
  if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { name, description, permissionIds } = body;

    const role = await rbacService.upsertRole(tenantId, name, permissionIds, description);
    return NextResponse.json(role);
  } catch (error) {
    return new NextResponse("Error creating role", { status: 500 });
  }
}
