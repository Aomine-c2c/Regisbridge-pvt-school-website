'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Announcement {
    id: string;
    title: string;
    content: string;
    className: string;
    priority: 'normal' | 'urgent';
    timestamp: string;
    scheduledFor?: string;
}

interface ClassOption {
    id: string;
    name: string;
}

export default function TeacherAnnouncementsPage() {
    const { toast } = useToast();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    
    // Form state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
    
    // Mock classes
    const [classes] = useState<ClassOption[]>([
        { id: '1', name: '10A - Mathematics' },
        { id: '2', name: '10B - Mathematics' },
        { id: '3', name: '11A - Physics' }
    ]);

    useEffect(() => {
        // Load announcements from localStorage
        const saved = localStorage.getItem('teacherAnnouncements');
        if (saved) {
            setAnnouncements(JSON.parse(saved));
        }
    }, []);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newAnnouncement: Announcement = {
            id: Date.now().toString(),
            title,
            content,
            className: classes.find(c => c.id === selectedClass)?.name || '',
            priority,
            timestamp: new Date().toISOString()
        };

        const updated = [newAnnouncement, ...announcements];
        setAnnouncements(updated);
        localStorage.setItem('teacherAnnouncements', JSON.stringify(updated));

        toast({ 
            title: priority === 'urgent' ? '🚨 Urgent announcement sent!' : '✅ Announcement posted',
            description: `Sent to ${newAnnouncement.className}` 
        });

        // Reset form
        setTitle('');
        setContent('');
        setSelectedClass('');
        setPriority('normal');
        setShowCreate(false);
    };

    const analytics = {
        total: announcements.length,
        urgent: announcements.filter(a => a.priority === 'urgent').length,
        classesReached: new Set(announcements.map(a => a.className)).size
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Announcements</h1>
                <button 
                    onClick={() => setShowCreate(!showCreate)}
                    className="flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    <span className="material-symbols-outlined">campaign</span>
                    <span className="hidden sm:inline">Create Announcement</span>
                    <span className="sm:hidden">New</span>
                </button>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">campaign</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Total</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.total}</div>
                    <div className="text-sm opacity-90">Announcements</div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">warning</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Urgent</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.urgent}</div>
                    <div className="text-sm opacity-90">High Priority</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">groups</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Reach</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.classesReached}</div>
                    <div className="text-sm opacity-90">Classes</div>
                </div>
            </div>

            {/* Create Form */}
            {showCreate && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">New Announcement</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                <select 
                                    required
                                    value={selectedClass}
                                    onChange={e => setSelectedClass(e.target.value)}
                                    className="w-full p-2 border rounded-md bg-white"
                                >
                                    <option value="">Select a class...</option>
                                    {classes.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPriority('normal')}
                                        className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                                            priority === 'normal'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Normal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPriority('urgent')}
                                        className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                                            priority === 'urgent'
                                                ? 'bg-red-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        🚨 Urgent
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input 
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="e.g., Important: Class Rescheduled"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea 
                                required
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="w-full p-2 border rounded-md h-32"
                                placeholder="Write your announcement here..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Tip: Be clear and concise for better engagement</p>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button 
                                type="button"
                                onClick={() => setShowCreate(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className={`px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors ${
                                    priority === 'urgent' ? 'bg-red-600' : 'bg-brand-navy'
                                }`}
                            >
                                {priority === 'urgent' ? '🚨 Send Urgent' : 'Post Announcement'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
                {announcements.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">campaign</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements yet</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Create your first announcement to communicate with your classes.
                        </p>
                        <button 
                            onClick={() => setShowCreate(true)}
                            className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Create Announcement
                        </button>
                    </div>
                ) : (
                    announcements.map(announcement => (
                        <div 
                            key={announcement.id}
                            className={`bg-white rounded-lg p-5 shadow-sm border-l-4 ${
                                announcement.priority === 'urgent' 
                                    ? 'border-red-500' 
                                    : 'border-blue-500'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                                        {announcement.priority === 'urgent' && (
                                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                                🚨 URGENT
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="material-symbols-outlined text-sm">groups</span>
                                        <span>{announcement.className}</span>
                                        <span>•</span>
                                        <span>{new Date(announcement.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
