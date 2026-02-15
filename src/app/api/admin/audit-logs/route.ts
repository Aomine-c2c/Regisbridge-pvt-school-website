import { NextRequest, NextResponse } from "next/server";
import { auditService } from "@/services/audit-service";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");

  if (!tenantId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    
    // In a real app we might want filtering by userId, resource, etc.
    // For now, simple list.
    const logs = await auditService.getLogs(tenantId, limit);
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
