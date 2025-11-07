'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import socketService from '@/services/socket';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
  messageType: 'text' | 'image' | 'file';
}

interface ChatWidgetProps {
  userId?: string;
  userName?: string;
  userAvatar?: string;
  roomId?: string;
}

export function ChatWidget({
  userId = 'anonymous',
  userName = 'Anonymous User',
  userAvatar,
  roomId = 'general'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Connect to socket when chat is opened
      socketService.connect(userId);

      // Join the general room
      socketService.joinRoom(roomId);

      // Set up event listeners
      socketService.onMessage((data) => {
        const message: Message = {
          id: data.id || Date.now().toString(),
          userId: data.userId,
          userName: data.userName,
          userAvatar: data.userAvatar,
          message: data.message,
          timestamp: new Date(data.timestamp),
          messageType: data.messageType || 'text',
        };
        setMessages(prev => [...prev, message]);
      });

      socketService.onUserJoined((data) => {
        setOnlineUsers(prev => [...prev, data.userId]);
        toast({
          title: "User joined",
          description: `${data.userName} joined the chat`,
        });
      });

      socketService.onUserLeft((data) => {
        setOnlineUsers(prev => prev.filter(id => id !== data.userId));
      });

      socketService.onTyping((data) => {
        if (data.userId !== userId) {
          setIsTyping(true);
        }
      });

      socketService.onStopTyping(() => {
        setIsTyping(false);
      });
    }

    return () => {
      if (!isOpen) {
        socketService.disconnect();
      }
    };
  }, [isOpen, isMinimized, userId, roomId, toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socketService.sendMessage(roomId, newMessage.trim());
      setNewMessage('');

      // Stop typing indicator
      socketService.stopTyping(roomId);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // Handle typing indicator
    socketService.startTyping(roomId);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      socketService.stopTyping(roomId);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-[#1C1A75] hover:bg-[#1C1A75]/90 shadow-lg"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        {onlineUsers.length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
            {onlineUsers.length}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 ${isMinimized ? 'h-14' : 'h-96'} shadow-xl border-2 border-[#D4AF37]`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            School Chat
            {onlineUsers.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {onlineUsers.length} online
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 text-sm py-4">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.userId !== userId && (
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.userAvatar} />
                          <AvatarFallback className="text-xs">
                            {message.userName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                          message.userId === userId
                            ? 'bg-[#1C1A75] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.userId !== userId && (
                          <div className="font-medium text-xs mb-1">
                            {message.userName}
                          </div>
                        )}
                        <div>{message.message}</div>
                        <div className={`text-xs mt-1 ${
                          message.userId === userId ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">?</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-[#1C1A75] hover:bg-[#1C1A75]/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}