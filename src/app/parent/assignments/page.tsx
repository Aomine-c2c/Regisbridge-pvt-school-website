'use client';

import { useState, useEffect } from 'react';

interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
}

interface Assignment {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number;
    maxGrade?: number;
}

export default function ParentAssignmentsPage() {
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        // Load children
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        }

        // Mock assignments
        const mockAssignments: Assignment[] = [
            { id: '1', title: 'Math Homework - Chapter 5', subject: 'Mathematics', dueDate: '2026-02-10', status: 'pending' },
            { id: '2', title: 'Science Project Presentation', subject: 'Science', dueDate: '2026-02-12', status: 'pending' },
            { id: '3', title: 'English Essay - Shakespeare', subject: 'English', dueDate: '2026-02-09', status: 'submitted' },
            { id: '4', title: 'History Research Paper', subject: 'History', dueDate: '2026-02-15', status: 'pending' },
            { id: '5', title: 'Art Portfolio Piece', subject: 'Art', dueDate: '2026-01-30', status: 'graded', grade: 95, maxGrade: 100 },
            { id: '6', title: 'Math Quiz - Algebra', subject: 'Mathematics', dueDate: '2026-01-25', status: 'graded', grade: 88, maxGrade: 100 },
            { id: '7', title: 'Science Lab Report', subject: 'Science', dueDate: '2026-01-28', status: 'graded', grade: 92, maxGrade: 100 },
        ];
        setAssignments(mockAssignments);
    }, []);

    const selectedChild = children.find(c => c.id === selectedChildId);

    const upcomingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'submitted');
    const completedAssignments = assignments.filter(a => a.status === 'graded');

    const getDaysUntilDue = (dueDate: string) => {
        const due = new Date(dueDate);
        const now = new Date();
        const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const getStatusBadge = (assignment: Assignment) => {
        if (assignment.status === 'graded') {
            return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Graded</span>;
        }
        if (assignment.status === 'submitted') {
            return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Submitted</span>;
        }
        
        const days = getDaysUntilDue(assignment.dueDate);
        if (days < 0) {
            return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Overdue</span>;
        }
        if (days === 0) {
            return <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Due Today</span>;
        }
        if (days <= 2) {
            return <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Due in {days} day{days > 1 ? 's' : ''}</span>;
        }
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">Upcoming</span>;
    };

    const displayAssignments = activeTab === 'upcoming' ? upcomingAssignments : completedAssignments;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Assignments</h1>

                {/* Child Selector */}
                {selectedChild && (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
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

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                            activeTab === 'upcoming'
                                ? 'border-brand-navy text-brand-navy'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Upcoming ({upcomingAssignments.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                            activeTab === 'completed'
                                ? 'border-brand-navy text-brand-navy'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Completed ({completedAssignments.length})
                    </button>
                </div>
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
                {displayAssignments.map(assignment => (
                    <div key={assignment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <span className="material-symbols-outlined">assignment</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 mb-1">{assignment.title}</h3>
                                        <p className="text-sm text-gray-500">{assignment.subject}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 ml-13 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">event</span>
                                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    {assignment.status === 'graded' && assignment.grade !== undefined && (
                                        <span className="flex items-center gap-1 font-semibold text-green-600">
                                            <span className="material-symbols-outlined text-sm">grade</span>
                                            {assignment.grade}/{assignment.maxGrade} ({Math.round((assignment.grade / assignment.maxGrade!) * 100)}%)
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {getStatusBadge(assignment)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {displayAssignments.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">assignment</span>
                    <p className="text-gray-500">
                        {activeTab === 'upcoming' ? 'No upcoming assignments' : 'No completed assignments'}
                    </p>
                </div>
            )}
        </div>
    );
}
