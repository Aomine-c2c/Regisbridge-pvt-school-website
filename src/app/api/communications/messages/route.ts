import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { messagingService } from "@/services/messaging-service";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id || !session?.user?.tenantId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { conversationId, content, attachments } = body;

    if (!conversationId || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const message = await messagingService.sendMessage({
      tenantId: session.user.tenantId,
      conversationId,
      senderId: session.user.id,
      content,
      attachments
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
