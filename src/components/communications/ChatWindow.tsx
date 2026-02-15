"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Loader2 } from "lucide-react";
import { MessageBubble } from './MessageBubble';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}



interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  createdAt: string;
  readBy: { user: { firstName: string } }[];
}

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
  initialMessages?: Message[];
}

export function ChatWindow({ conversationId, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Polling for now
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/communications/conversations/${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        // data returned is ordered by orderBy: { createdAt: 'desc' } in API? 
        // Let's check API. Yes, getMessages does `orderBy: { createdAt: 'desc' }`.
        // So we should reverse it for display (oldest at top).
        setMessages(data.reverse());
      }
    } catch (error) {
      console.error("Failed to load messages", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch('/api/communications/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: newMessage
        })
      });

      if (res.ok) {
        setNewMessage("");
        fetchMessages(); // Refresh immediately
      }
    } catch (error) {
      console.error("Failed to send", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Header */}
      <div className="h-16 border-b bg-white flex items-center justify-between px-6 flex-shrink-0">
        <div>
          <h2 className="font-bold text-slate-800">Chat</h2>
          {/* Could put participant names here */}
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
        {loading ? (
          <div className="flex justify-center pt-10">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              isMe={msg.senderId === currentUserId}
              senderName={msg.sender.firstName}
              timestamp={new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              read={msg.readBy.length > 0} // Rudimentary "read" check
            />
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSend} className="flex gap-2 items-end">
          <button type="button" className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all resize-none max-h-32 min-h-[48px]"
              rows={1}
            />
          </div>
          <button 
            type="submit" 
            disabled={!newMessage.trim() || sending}
            className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
