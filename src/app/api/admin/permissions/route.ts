import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  // Permissions are system-wide, not tenant specific usually, 
  // or shared. For now, fetch all from global generic prisma client 
  // or use tenant client if we want to support custom per-tenant perms later.
  // Using global prisma since Definition is shared, but usage is per tenant.
  try {
    const permissions = await prisma.permission.findMany({
        orderBy: { group: 'asc' }
    });
    return NextResponse.json(permissions);
  } catch (error) {
    return new NextResponse("Error fetching permissions", { status: 500 });
  }
}
