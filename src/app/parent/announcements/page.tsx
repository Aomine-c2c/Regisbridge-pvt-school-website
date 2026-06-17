'use client';

import { useState, useEffect } from 'react';

interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
}

interface Announcement {
    id: string;
    title: string;
    content: string;
    className: string;
    teacher: string;
    priority: 'normal' | 'urgent';
    timestamp: string;
}

export default function ParentAnnouncementsPage() {
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [filterPriority, setFilterPriority] = useState<'all' | 'urgent'>('all');

    useEffect(() => {
        // Load children
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        }

        // Load announcements from teacher system
        const savedAnnouncements = localStorage.getItem('teacherAnnouncements');
        if (savedAnnouncements) {
            setAnnouncements(JSON.parse(savedAnnouncements));
        } else {
            // Mock announcements
            const mockAnnouncements: Announcement[] = [
                {
                    id: '1',
                    title: 'Parent-Teacher Conference',
                    content: 'Parent-teacher conferences will be held on February 15th from 9 AM to 5 PM. Please sign up for a time slot.',
                    className: '8A',
                    teacher: 'Mrs. Roberts',
                    priority: 'urgent',
                    timestamp: new Date(Date.now() - 3600000).toISOString()
                },
                {
                    id: '2',
                    title: 'Field Trip Permission Slip',
                    content: 'Students in Grade 8 will be visiting the Natural History Museum on February 20th. Please sign and return the permission slip by February 12th.',
                    className: '8A',
                    teacher: 'Mr. Chen',
                    priority: 'normal',
                    timestamp: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: '3',
                    title: 'Math Homework Extension',
                    content: 'Due to the holiday, the math homework due date has been extended to February 18th.',
                    className: '8A',
                    teacher: 'Mrs. Roberts',
                    priority: 'normal',
                    timestamp: new Date(Date.now() - 172800000).toISOString()
                },
                {
                    id: '4',
                    title: 'Science Fair Registration',
                    content: 'Registration for the annual science fair is now open! Students interested in participating should register by March 1st.',
                    className: '10B',
                    teacher: 'Dr. Martinez',
                    priority: 'normal',
                    timestamp: new Date(Date.now() - 259200000).toISOString()
                }
            ];
            setAnnouncements(mockAnnouncements);
        }
    }, []);

    const selectedChild = children.find(c => c.id === selectedChildId);

    // Filter announcements by child's class and priority
    const filteredAnnouncements = announcements
        .filter(a => selectedChild && a.className === selectedChild.grade)
        .filter(a => filterPriority === 'all' || a.priority === 'urgent')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const urgentCount = announcements.filter(a => 
        selectedChild && a.className === selectedChild.grade && a.priority === 'urgent'
    ).length;

    const getTimeAgo = (timestamp: string) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffMs = now.getTime() - then.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays} days ago`;
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Announcements</h1>

                {/* Child Selector */}
                {selectedChild && (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                        <div className="size-12 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold flex-shrink-0">
                            {selectedChild.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <select
                                value={selectedChildId || ''}
                                onChange={(e: any) => setSelectedChildId(e.target.value)}
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

                {/* Filter Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setFilterPriority('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterPriority === 'all'
                                ? 'bg-brand-navy text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All Announcements
                    </button>
                    <button
                        onClick={() => setFilterPriority('urgent')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterPriority === 'urgent'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Urgent Only ({urgentCount})
                    </button>
                </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
                {filteredAnnouncements.map(announcement => (
                    <div
                        key={announcement.id}
                        className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${
                            announcement.priority === 'urgent'
                                ? 'border-red-500'
                                : 'border-blue-500'
                        } hover:shadow-md transition-shadow`}
                    >
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{announcement.title}</h3>
                                    {announcement.priority === 'urgent' && (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">warning</span>
                                            URGENT
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">person</span>
                                        {announcement.teacher}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">groups</span>
                                        Class {announcement.className}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        {getTimeAgo(announcement.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredAnnouncements.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">campaign</span>
                    <p className="text-gray-500">
                        {filterPriority === 'urgent' 
                            ? 'No urgent announcements'
                            : 'No announcements for this class'}
                    </p>
                </div>
            )}
        </div>
    );
}
