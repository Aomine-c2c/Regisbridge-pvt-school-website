import { getSession } from "@/lib/auth-server";
import { redirect } from 'next/navigation';
import { ChatWindow } from "@/components/communications/ChatWindow";

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <ChatWindow 
      conversationId={id} 
      currentUserId={session.user.id} 
    />
  );
}
