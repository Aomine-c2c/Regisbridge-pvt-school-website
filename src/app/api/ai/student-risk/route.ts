import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/services/ai-service";
import { requireAdmin } from "@/lib/api/auth-middleware";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth Check (Admins or Teachers)
    // For now, using requireAdmin as a baseline, but teachers should access this too.
    // In a real app, we'd have specific permissions.
    const { error, user } = await requireAdmin(req); 
    // TODO: Allow teachers too.
    if (error) return error;

    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { studentId } = body;

    if (!studentId) {
      return new NextResponse("Missing studentId", { status: 400 });
    }

    const insight = await aiService.analyzeStudentRisk(tenantId, studentId);
    
    return NextResponse.json({ insight });

  } catch (error) {
    console.error("AI Service Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
