'use client';

import { useState, useEffect } from 'react';

interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
}

interface SubjectGrade {
    id: string;
    subject: string;
    icon: string;
    currentGrade: number;
    letterGrade: string;
    teacher: string;
    trend: 'up' | 'down' | 'stable';
    lastUpdated: string;
}

export default function ParentGradesPage() {
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [grades, setGrades] = useState<SubjectGrade[]>([]);

    useEffect(() => {
        // Load children
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        }

        // Mock grades data
        const mockGrades: SubjectGrade[] = [
            { id: '1', subject: 'Mathematics', icon: 'calculate', currentGrade: 88, letterGrade: 'B+', teacher: 'Mrs. Roberts', trend: 'up', lastUpdated: '2 days ago' },
            { id: '2', subject: 'English', icon: 'menu_book', currentGrade: 92, letterGrade: 'A', teacher: 'Mr. Thompson', trend: 'stable', lastUpdated: '1 week ago' },
            { id: '3', subject: 'Science', icon: 'science', currentGrade: 85, letterGrade: 'B', teacher: 'Mr. Chen', trend: 'up', lastUpdated: '3 days ago' },
            { id: '4', subject: 'History', icon: 'public', currentGrade: 78, letterGrade: 'C+', teacher: 'Ms. Davis', trend: 'down', lastUpdated: '1 day ago' },
            { id: '5', subject: 'Art', icon: 'palette', currentGrade: 95, letterGrade: 'A', teacher: 'Mrs. Martinez', trend: 'stable', lastUpdated: '1 week ago' },
            { id: '6', subject: 'Physical Education', icon: 'sports_soccer', currentGrade: 90, letterGrade: 'A-', teacher: 'Coach Johnson', trend: 'up', lastUpdated: '4 days ago' },
        ];
        setGrades(mockGrades);
    }, []);

    const selectedChild = children.find(c => c.id === selectedChildId);

    const getGradeColor = (grade: number) => {
        if (grade >= 90) return 'from-green-500 to-green-600';
        if (grade >= 80) return 'from-blue-500 to-blue-600';
        if (grade >= 70) return 'from-orange-500 to-orange-600';
        return 'from-red-500 to-red-600';
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return 'trending_up';
            case 'down': return 'trending_down';
            default: return 'trending_flat';
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'up': return 'text-green-600';
            case 'down': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const averageGrade = grades.length > 0 
        ? Math.round(grades.reduce((sum, g) => sum + g.currentGrade, 0) / grades.length)
        : 0;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header with Child Selector */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Grades Overview</h1>

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

                {/* Overall Average */}
                <div className={`bg-gradient-to-br ${getGradeColor(averageGrade)} rounded-xl p-6 text-white shadow-lg mb-8`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm uppercase opacity-80 mb-2">Overall Average</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-bold">{averageGrade}%</span>
                                <span className="text-2xl font-semibold opacity-90">
                                    {averageGrade >= 90 ? 'A' : averageGrade >= 80 ? 'B' : averageGrade >= 70 ? 'C' : 'D'}
                                </span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-6xl opacity-20">school</span>
                    </div>
                </div>
            </div>

            {/* Subject Grades Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grades.map(grade => (
                    <div key={grade.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        {/* Subject Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`size-12 rounded-lg bg-gradient-to-br ${getGradeColor(grade.currentGrade)} flex items-center justify-center text-white`}>
                                    <span className="material-symbols-outlined text-2xl">{grade.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{grade.subject}</h3>
                                    <p className="text-xs text-gray-500">{grade.teacher}</p>
                                </div>
                            </div>
                            <span className={`material-symbols-outlined ${getTrendColor(grade.trend)}`}>
                                {getTrendIcon(grade.trend)}
                            </span>
                        </div>

                        {/* Grade Display */}
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-4xl font-bold text-gray-900">{grade.currentGrade}%</span>
                            <span className="text-xl font-semibold text-gray-500">{grade.letterGrade}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${getGradeColor(grade.currentGrade)}`}
                                style={{ width: `${grade.currentGrade}%` }}
                            ></div>
                        </div>

                        {/* Last Updated */}
                        <p className="text-xs text-gray-400">Updated {grade.lastUpdated}</p>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {grades.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">grade</span>
                    <p className="text-gray-500">No grades available yet</p>
                </div>
            )}
        </div>
    );
}
