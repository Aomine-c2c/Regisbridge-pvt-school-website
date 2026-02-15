import React from 'react';
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  isMe: boolean;
  senderName: string;
  timestamp: string;
  read?: boolean;
}

export function MessageBubble({ content, isMe, senderName, timestamp, read }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isMe ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm",
        isMe 
          ? "bg-slate-900 text-white rounded-br-none" 
          : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
      )}>
        {!isMe && (
          <p className="text-xs text-slate-500 mb-1 font-medium">{senderName}</p>
        )}
        <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1 text-[10px]",
          isMe ? "text-slate-300 justify-end" : "text-slate-400"
        )}>
          <span>{timestamp}</span>
          {isMe && read && <span>• Read</span>}
        </div>
      </div>
    </div>
  );
}
