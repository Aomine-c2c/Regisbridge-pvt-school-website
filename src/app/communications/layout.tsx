import React from 'react';
import { getSession } from "@/lib/auth-server";
import { redirect } from 'next/navigation';
import { ConversationList } from "@/components/communications/ConversationList";

export default async function CommunicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50">
      <div className="w-80 h-full flex-shrink-0">
        <ConversationList currentUserId={session.user.id} />
      </div>
      <div className="flex-1 flex flex-col h-full min-w-0">
        {children}
      </div>
    </div>
  );
}
