import { NextRequest, NextResponse } from "next/server";
import { rbacService } from "@/services/rbac-service";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
    if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const { name, description, permissionIds } = body;

    // We can reuse upsert logic or be more specific. 
    // Upsert matches by name+tenant, so if name changes we need careful handling.
    // For now, let's assume editing ID maps to upsert logic if name stays same, 
    // or we might need a specific update by ID function in service.
    // Let's implement specific update here using DB directly to be safe about ID.
    
    const db = (tenantId);
    
    // Check if system role
    const existing = await db.role.findUnique({ where: { id } });
    if (!existing) return new NextResponse("Role not found", { status: 404 });
    
    // Perform update
    const role = await db.role.update({
        where: { id },
        data: { 
            name, 
            description,
            permissions: {
                deleteMany: {},
                create: permissionIds.map((pid: string) => ({ permissionId: pid }))
            }
        }
    });
    
    return NextResponse.json(role);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating role", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
    if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

  const db = (tenantId);
  try {
    const role = await db.role.findUnique({ where: { id } });
    if (role?.isSystem) {
        return new NextResponse("Cannot delete system role", { status: 400 });
    }

    await db.role.delete({ where: { id } });
    return new NextResponse("Role deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting role", { status: 500 });
  }
}
