'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
    id: string;
    content: string;
    from: 'teacher' | 'student';
    timestamp: string;
}

interface Conversation {
    id: string;
    studentName: string;
    studentAvatar:string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
}

interface Template {
    id: string;
    name: string;
    category: string;
    content: string;
}

export default function TeacherMessagesPage() {
    const { toast } = useToast();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConv, setSelectedConv] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterUnread, setFilterUnread] = useState(false);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [showTemplates, setShowTemplates] = useState(false);

    useEffect(() => {
        // Load conversations
        const savedConvs = localStorage.getItem('teacherConversations');
        if (savedConvs) {
            setConversations(JSON.parse(savedConvs));
        } else {
            // Mock conversations
            const mockConvs: Conversation[] = [
                { id: '1', studentName: 'Emma Wilson', studentAvatar: 'EW', lastMessage: 'Thank you for the feedback!', timestamp: new Date(Date.now() - 3600000).toISOString(), unread: true },
                { id: '2', studentName: 'James Chen', studentAvatar: 'JC', lastMessage: 'When is the assignment due?', timestamp: new Date(Date.now() - 7200000).toISOString(), unread: false },
                { id: '3', studentName: 'Sofia Rodriguez', studentAvatar: 'SR', lastMessage: 'I have a question about...', timestamp: new Date(Date.now() - 86400000).toISOString(), unread: true }
            ];
            setConversations(mockConvs);
            localStorage.setItem('teacherConversations', JSON.stringify(mockConvs));
        }

        // Load templates
        const savedTemplates = localStorage.getItem('messageTemplates');
        if (savedTemplates) {
            setTemplates(JSON.parse(savedTemplates));
        } else {
            // Default templates
            const defaults: Template[] = [
                { id: '1', name: 'Greeting', category: 'greeting', content: 'Hello! I hope you\'re doing well. ' },
                { id: '2', name: 'Assignment Reminder', category: 'reminder', content: 'Reminder: Your assignment is due tomorrow. Please make sure to submit it on time.' },
                { id: '3', name: 'Praise', category: 'praise', content: 'Great work on your recent assignment! Keep up the excellent effort.' },
                { id: '4', name: 'Concern', category: 'concern', content: 'I\'ve noticed you\'ve been absent lately. Is everything okay? Let me know if you need any support.' }
            ];
            setTemplates(defaults);
            localStorage.setItem('messageTemplates', JSON.stringify(defaults));
        }
    }, []);

    useEffect(() => {
        if (selectedConv) {
            // Load messages for selected conversation
            const savedMessages = localStorage.getItem(`messages_${selectedConv}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            } else {
                // Mock messages
                const mockMessages: Message[] = [
                    { id: '1', content: 'Hi, I have a question about the homework.', from: 'student', timestamp: new Date(Date.now() - 7200000).toISOString() },
                    { id: '2', content: 'Of course! What would you like to know?', from: 'teacher', timestamp: new Date(Date.now() - 7000000).toISOString() },
                    { id: '3', content: 'Can you explain problem 5?', from: 'student', timestamp: new Date(Date.now() - 3600000).toISOString() }
                ];
                setMessages(mockMessages);
            }

            // Mark as read
            const updated = conversations.map(c =>
                c.id === selectedConv ? { ...c, unread: false } : c
            );
            setConversations(updated);
            localStorage.setItem('teacherConversations', JSON.stringify(updated));
        }
    }, [selectedConv]);

    const handleSend = () => {
        if (!newMessage.trim() || !selectedConv) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            content: newMessage,
            from: 'teacher',
            timestamp: new Date().toISOString()
        };

        const updated = [...messages, newMsg];
        setMessages(updated);
        localStorage.setItem(`messages_${selectedConv}`, JSON.stringify(updated));

        // Update conversation last message
        const updatedConvs = conversations.map(c =>
            c.id === selectedConv 
                ? { ...c, lastMessage: newMessage, timestamp: new Date().toISOString() }
                : c
        );
        setConversations(updatedConvs);
        localStorage.setItem('teacherConversations', JSON.stringify(updatedConvs));

        setNewMessage('');
        toast({ title: '✅ Message sent' });
    };

    const insertTemplate = (content: string) => {
        setNewMessage(prev => prev + content);
        setShowTemplates(false);
        toast({ title: 'Template inserted' });
    };

    const filteredConversations = conversations
        .filter(c => !filterUnread || c.unread)
        .filter(c => c.studentName.toLowerCase().includes(searchQuery.toLowerCase()));

    const selectedConversation = conversations.find(c => c.id === selectedConv);

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Messages</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                {/* Left Sidebar - Conversations */}
                <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full p-2 border rounded-md mb-3"
                        />
                        <button
                            onClick={() => setFilterUnread(!filterUnread)}
                            className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                filterUnread
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {filterUnread ? 'Showing Unread' : 'Show Unread Only'}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedConv(conv.id)}
                                className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                                    selectedConv === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-semibold flex-shrink-0">
                                        {conv.studentAvatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">{conv.studentName}</h3>
                                            {conv.unread && <span className="size-2 bg-blue-600 rounded-full flex-shrink-0"></span>}
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(conv.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Messages */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                                <div className="size-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-semibold">
                                    {selectedConversation.studentAvatar}
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-900">{selectedConversation.studentName}</h2>
                                    <p className="text-xs text-gray-500">Student</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.from === 'teacher' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-md px-4 py-2 rounded-2xl ${
                                            msg.from === 'teacher'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-900'
                                        }`}>
                                            <p>{msg.content}</p>
                                            <p className={`text-xs mt-1 ${
                                                msg.from === 'teacher' ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                                {new Date(msg.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-200">
                                {showTemplates && (
                                    <div className="mb-3 p-3 bg-gray-50 rounded-lg max-h-40 overflow-y-auto">
                                        <h3 className="text-sm font-semibold mb-2">Quick Templates</h3>
                                        <div className="space-y-1">
                                            {templates.map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => insertTemplate(t.content)}
                                                    className="w-full text-left px-3 py-2 text-sm hover:bg-white rounded transition-colors"
                                                >
                                                    <span className="font-medium">{t.name}:</span> {t.content.slice(0, 50)}...
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowTemplates(!showTemplates)}
                                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        title="Templates"
                                    >
                                        <span className="material-symbols-outlined">bookmark</span>
                                    </button>
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
