import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/services/ai-service";
import { requireAdmin } from "@/lib/api/auth-middleware";

export async function POST(req: NextRequest) {
  try {
    const { error, user } = await requireAdmin(req); 
    if (error) return error;

        if (!tenantId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { studentId } = body;

    if (!studentId) {
      return new NextResponse("Missing studentId", { status: 400 });
    }

    const prediction = await aiService.predictDropoutRisk(studentId);
    
    return NextResponse.json({ prediction });

  } catch (error) {
    console.error("Dropout Prediction Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
