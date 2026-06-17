'use client';

import { useState, useEffect } from 'react';


interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
    overallGrade: number;
    attendanceRate: number;
    upcomingAssignments: number;
    unreadAnnouncements: number;
}

interface ActivityItem {
    id: string;
    type: 'grade' | 'assignment' | 'announcement' | 'attendance';
    title: string;
    timestamp: string;
    detail: string;
}

export default function ParentDashboard() {
    // const { toast } = useToast();
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

    useEffect(() => {
        // Load children data
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        } else {
            // Mock data
            const mockChildren: Child[] = [
                {
                    id: '1',
                    name: 'Emma Anderson',
                    initials: 'EA',
                    grade: '8A',
                    overallGrade: 88,
                    attendanceRate: 95,
                    upcomingAssignments: 4,
                    unreadAnnouncements: 2
                },
                {
                    id: '2',
                    name: 'James Anderson',
                    initials: 'JA',
                    grade: '10B',
                    overallGrade: 92,
                    attendanceRate: 98,
                    upcomingAssignments: 3,
                    unreadAnnouncements: 1
                }
            ];
            setChildren(mockChildren);
            setSelectedChildId(mockChildren[0].id);
            localStorage.setItem('parentChildren', JSON.stringify(mockChildren));
        }

        // Mock recent activity
        const mockActivity: ActivityItem[] = [
            { id: '1', type: 'grade', title: 'Mathematics - Test Result', timestamp: '2 hours ago', detail: 'Score: 88/100' },
            { id: '2', type: 'assignment', title: 'Science Project Due', timestamp: 'Tomorrow', detail: 'Due: Feb 10, 2026' },
            { id: '3', type: 'announcement', title: 'Parent-Teacher Conference', timestamp: 'Today', detail: 'Feb 15, 10:00 AM' },
            { id: '4', type: 'attendance', title: 'Present - Full Day', timestamp: 'Today', detail: 'All classes attended' }
        ];
        setRecentActivity(mockActivity);
    }, []);

    const selectedChild = children.find(c => c.id === selectedChildId);

    const getGradeColor = (grade: number) => {
        if (grade >= 90) return { bg: 'from-green-500 to-green-600', text: 'Excellent' };
        if (grade >= 75) return { bg: 'from-blue-500 to-blue-600', text: 'Good' };
        if (grade >= 60) return { bg: 'from-orange-500 to-orange-600', text: 'Fair' };
        return { bg: 'from-red-500 to-red-600', text: 'Needs Attention' };
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'grade': return 'grade';
            case 'assignment': return 'assignment';
            case 'announcement': return 'campaign';
            case 'attendance': return 'event_available';
            default: return 'info';
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'grade': return 'bg-purple-100 text-purple-600';
            case 'assignment': return 'bg-blue-100 text-blue-600';
            case 'announcement': return 'bg-orange-100 text-orange-600';
            case 'attendance': return 'bg-green-100 text-green-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header with Child Selector */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-500 mb-6">Student progress and academic overview.</p>

                {/* Child Selector */}
                {selectedChild && (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="size-14 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {selectedChild.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <select
                                value={selectedChildId || ''}
                                onChange={(e: any) => setSelectedChildId(e.target.value)}
                                className="w-full p-2 font-semibold text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-navy focus:border-transparent"
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

            {selectedChild && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* Overall Grade */}
                        <div className={`bg-gradient-to-br ${getGradeColor(selectedChild.overallGrade).bg} rounded-xl p-6 text-white shadow-lg`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-3xl">school</span>
                                <span className="text-xs uppercase opacity-80">Overall Grade</span>
                            </div>
                            <div className="text-4xl font-bold mb-1">{selectedChild.overallGrade}%</div>
                            <div className="text-sm opacity-90">{getGradeColor(selectedChild.overallGrade).text}</div>
                        </div>

                        {/* Attendance */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-3xl">event_available</span>
                                <span className="text-xs uppercase opacity-80">Attendance</span>
                            </div>
                            <div className="text-4xl font-bold mb-1">{selectedChild.attendanceRate}%</div>
                            <div className="text-sm opacity-90">Attendance Rate</div>
                        </div>

                        {/* Assignments */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-3xl">assignment</span>
                                <span className="text-xs uppercase opacity-80">Assignments</span>
                            </div>
                            <div className="text-4xl font-bold mb-1">{selectedChild.upcomingAssignments}</div>
                            <div className="text-sm opacity-90">Due This Week</div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-3xl">campaign</span>
                                <span className="text-xs uppercase opacity-80">Announcements</span>
                            </div>
                            <div className="text-4xl font-bold mb-1">{selectedChild.unreadAnnouncements}</div>
                            <div className="text-sm opacity-90">Unread Messages</div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">history</span>
                            Recent Activity
                        </h2>
                        <div className="space-y-3">
                            {recentActivity.map(activity => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className={`size-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)} flex-shrink-0`}>
                                        <span className="material-symbols-outlined text-xl">{getActivityIcon(activity.type)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                                        <p className="text-sm text-gray-500">{activity.detail}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.timestamp}</span>
                                </div>
                            ))}
                        </div>

                        {recentActivity.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <span className="material-symbols-outlined text-5xl mb-2">inbox</span>
                                <p>No recent activity</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        <a
                            href="/parent/grades"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-navy hover:shadow-md transition-all group"
                        >
                            <div className="size-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">grade</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">View Grades</p>
                                <p className="text-xs text-gray-500">All subjects</p>
                            </div>
                        </a>

                        <a
                            href="/parent/assignments"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-navy hover:shadow-md transition-all group"
                        >
                            <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">assignment</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Assignments</p>
                                <p className="text-xs text-gray-500">Due & completed</p>
                            </div>
                        </a>

                        <a
                            href="/parent/messages"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-navy hover:shadow-md transition-all group"
                        >
                            <div className="size-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Messages</p>
                                <p className="text-xs text-gray-500">Teacher communication</p>
                            </div>
                        </a>

                        <a
                            href="/parent/reports"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-navy hover:shadow-md transition-all group"
                        >
                            <div className="size-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Reports</p>
                                <p className="text-xs text-gray-500">Report cards & transcripts</p>
                            </div>
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
