import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { messagingService } from "@/services/messaging-service";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id || !session?.user?.tenantId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversations = await messagingService.getConversations(
      session.user.id,
      session.undefined
    );

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("[CONVERSATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id || !session?.user?.tenantId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { participantIds, type, subject, initialMessage } = body;

    if (!participantIds || !Array.isArray(participantIds)) {
      return new NextResponse("Invalid participants", { status: 400 });
    }

    // Ensure current user is in participants
    if (!participantIds.includes(session.user.id)) {
        participantIds.push(session.user.id);
    }

    const conversation = await messagingService.createConversation({
      participantIds,
      type: type || 'DIRECT',
      subject,
      initialMessage,
      senderId: session.user.id
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("[CONVERSATIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
