'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
}

interface Message {
    id: string;
    content: string;
    from: 'parent' | 'teacher';
    timestamp: string;
}

interface Conversation {
    id: string;
    teacherName: string;
    subject: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
}

export default function ParentMessagesPage() {
    const { toast } = useToast();
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Load children
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        }

        // Mock conversations
        const mockConvs: Conversation[] = [
            {
                id: '1',
                teacherName: 'Mrs. Roberts',
                subject: 'Homeroom Teacher',
                lastMessage: 'Thank you for attending the conference.',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                unread: false
            },
            {
                id: '2',
                teacherName: 'Mr. Chen',
                subject: 'Science',
                lastMessage: "I wanted to discuss Emma's recent project.",
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                unread: true
            },
            {
                id: '3',
                teacherName: 'Ms. Davis',
                subject: 'History',
                lastMessage: 'The permission slip has been received.',
                timestamp: new Date(Date.now() - 172800000).toISOString(),
                unread: false
            }
        ];
        setConversations(mockConvs);
    }, []);

    useEffect(() => {
        if (selectedConv) {
            // Load messages
            const mockMessages: Message[] = [
                { id: '1', content: 'Hello, I wanted to discuss my child\'s recent performance.', from: 'parent', timestamp: new Date(Date.now() - 172800000).toISOString() },
                { id: '2', content: 'Of course! Your child has been doing very well. Let me share some details.', from: 'teacher', timestamp: new Date(Date.now() - 168600000).toISOString() },
                { id: '3', content: 'That\'s great to hear! Thank you for the feedback.', from: 'parent', timestamp: new Date(Date.now() - 86400000).toISOString() }
            ];
            setMessages(mockMessages);

            // Mark as read
            const updated = conversations.map(c =>
                c.id === selectedConv ? { ...c, unread: false } : c
            );
            setConversations(updated);
        }
    }, [selectedConv]);

    const selectedChild = children.find(c => c.id === selectedChildId);
    const selectedConversation = conversations.find(c => c.id === selectedConv);

    const handleSend = () => {
        if (!newMessage.trim() || !selectedConv) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            content: newMessage,
            from: 'parent',
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, newMsg]);

        // Update conversation
        const updated = conversations.map(c =>
            c.id === selectedConv
                ? { ...c, lastMessage: newMessage, timestamp: new Date().toISOString() }
                : c
        );
        setConversations(updated);

        setNewMessage('');
        toast({ title: '✅ Message sent' });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header with Child Selector */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Messages</h1>

                {selectedChild && (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="size-12 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold flex-shrink-0">
                            {selectedChild.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <select
                                value={selectedChildId || ''}
                                onChange={(e) => setSelectedChildId(e.target.value)}
                                className="w-full p-2 font-semibold text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-navy"
                            >
                                {children.map(child => (
                                    <option key={child.id} value={child.id}>
                                        {child.name} - Grade {child.grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                </div>
            )}
            </div>

            {/* Messages Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
                {/* Conversations List */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-900">Conversations</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedConv(conv.id)}
                                className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                                    selectedConv === conv.id ? 'bg-blue-50 border-l-4 border-l-brand-navy' : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-semibold flex-shrink-0">
                                        {conv.teacherName.substring(0, 2)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">{conv.teacherName}</h3>
                                            {conv.unread && <span className="size-2 bg-blue-600 rounded-full flex-shrink-0"></span>}
                                        </div>
                                        <p className="text-xs text-gray-500 mb-1">{conv.subject}</p>
                                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(conv.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Messages Thread */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                                <div className="size-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-semibold">
                                    {selectedConversation.teacherName.substring(0, 2)}
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900">{selectedConversation.teacherName}</h2>
                                    <p className="text-xs text-gray-500">{selectedConversation.subject}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.from === 'parent' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-md px-4 py-2 rounded-2xl ${
                                            msg.from === 'parent'
                                                ? 'bg-brand-navy text-white'
                                                : 'bg-gray-200 text-gray-900'
                                        }`}>
                                            <p>{msg.content}</p>
                                            <p className={`text-xs mt-1 ${
                                                msg.from === 'parent' ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                                {new Date(msg.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                                        placeholder="Type a message..."
                                        className="flex-1 p-2 border rounded-lg"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-opacity-90 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-6xl mb-4">mail</span>
                                <p>Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
