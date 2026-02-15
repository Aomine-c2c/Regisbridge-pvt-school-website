import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { messagingService } from "@/services/messaging-service";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session?.user?.id || !session?.user?.tenantId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id: conversationId } = await params;

    const messages = await messagingService.getMessages(
      session.user.tenantId,
      conversationId,
      session.user.id
    );

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[CONVERSATION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session?.user?.id || !session?.user?.tenantId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const { id: conversationId } = await params;
        
        await messagingService.markAsRead(conversationId, session.user.id);

        return new NextResponse("Marked as read", { status: 200 });

    } catch (error) {
        console.error("[CONVERSATION_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
