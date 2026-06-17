'use client';

import { useState, useEffect } from 'react';

interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
}

interface Report {
    id: string;
    title: string;
    type: 'report_card' | 'progress' | 'transcript';
    term: string;
    date: string;
}

export default function ParentReportsPage() {
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        // Load children
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        }

        // Mock reports
        const mockReports: Report[] = [
            { id: '1', title: 'Term 1 Report Card', type: 'report_card', term: 'Term 1, 2026', date: '2026-01-20' },
            { id: '2', title: 'Mid-Term Progress Report', type: 'progress', term: 'Term 2, 2026', date: '2026-02-01' },
            { id: '3', title: 'Academic Transcript', type: 'transcript', term: '2025-2026', date: '2026-01-15' },
        ];
        setReports(mockReports);
    }, []);

    const selectedChild = children.find(c => c.id === selectedChildId);

    const getReportIcon = (type: string) => {
        switch (type) {
            case 'report_card': return 'description';
            case 'progress': return 'trending_up';
            case 'transcript': return 'history_edu';
            default: return 'description';
        }
    };

    const getReportColor = (type: string) => {
        switch (type) {
            case 'report_card': return 'from-blue-500 to-blue-600';
            case 'progress': return 'from-green-500 to-green-600';
            case 'transcript': return 'from-purple-500 to-purple-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Reports & Documents</h1>

                {/* Child Selector */}
                {selectedChild && (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
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
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map(report => (
                    <div key={report.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className={`size-16 rounded-lg bg-gradient-to-br ${getReportColor(report.type)} flex items-center justify-center text-white mb-4`}>
                            <span className="material-symbols-outlined text-3xl">{getReportIcon(report.type)}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{report.term}</p>
                        <p className="text-xs text-gray-400 mb-4">
                            Issued: {new Date(report.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-brand-navy text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Download
                            </button>
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                <span className="material-symbols-outlined text-sm">print</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {reports.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                    <p className="text-gray-500">No reports available</p>
                </div>
            )}
        </div>
    );
}
