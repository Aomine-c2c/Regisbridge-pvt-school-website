"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Plus, Search, MessageSquare, Loader2 } from "lucide-react";

// Types matching the API response
interface User {
  firstName: string;
  lastName: string;
  role: string;
}

interface Participant {
  user: User;
  userId: string;
}

interface Message {
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  type: 'DIRECT' | 'GROUP';
  subject: string | null;
  participants: Participant[];
  messages: Message[];
  updatedAt: string;
  // We'll calculate unread count based on current user logic if needed, 
  // currently the API returns generic conversation data. 
  // Ideally, the API should return `unreadCount` specific to the user.
}

interface ConversationListProps {
  currentUserId: string;
}

export function ConversationList({ currentUserId }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetchConversations();
    // Poll every 10 seconds for new messages
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/communications/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Failed to fetch conversations", error);
    } finally {
      setLoading(false);
    }
  };

  const getConversationTitle = (conv: Conversation) => {
    if (conv.type === 'GROUP' && conv.subject) return conv.subject;
    
    // For direct messages, show the other person's name
    const otherParticipants = conv.participants.filter(p => p.userId !== currentUserId);
    if (otherParticipants.length === 0) return "Me";
    if (otherParticipants.length === 1) {
      const u = otherParticipants[0].user;
      return `${u.firstName} ${u.lastName}`;
    }
    return otherParticipants.map(p => p.user.firstName).join(", ");
  };

  const getPreview = (conv: Conversation) => {
    if (conv.messages.length > 0) {
      return conv.messages[0].content;
    }
    return "No messages yet";
  };

  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Messages</h2>
          <button className="p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && conversations.length === 0 ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="divide-y">
            {conversations.map((conv) => {
              const isActive = pathname === `/communications/${conv.id}`;
              const title = getConversationTitle(conv);
              const preview = getPreview(conv);
              
              return (
                <Link 
                  key={conv.id} 
                  href={`/communications/${conv.id}`}
                  className={cn(
                    "block p-4 hover:bg-slate-50 transition-colors",
                    isActive && "bg-slate-50 border-l-4 border-slate-900 pl-[1.25rem]"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={cn("font-medium text-sm truncate pr-2", isActive ? "text-slate-900" : "text-slate-700")}>
                      {title}
                    </h3>
                    {/* Time could go here */}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {preview}
                  </p>
                </Link>
              );
            })}
            
            {conversations.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conversations yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
