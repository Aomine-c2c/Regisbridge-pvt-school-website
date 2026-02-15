import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/services/ai-service";
import { requireAdmin } from "@/lib/api/auth-middleware";

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireAdmin(req);
    if (error) return error;

    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { classId } = body;

    if (!classId) {
      return new NextResponse("Missing classId", { status: 400 });
    }

    const summary = await aiService.generateClassSummary(tenantId, classId);
    
    return NextResponse.json({ summary });

  } catch (error) {
    console.error("AI Service Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
