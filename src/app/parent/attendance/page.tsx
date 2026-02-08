'use client';

import { useState, useEffect } from 'react';

interface Child {
    id: string;
    name: string;
    initials: string;
    grade: string;
}

interface AttendanceRecord {
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
}

export default function ParentAttendancePage() {
    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

    useEffect(() => {
        // Load children
        const savedChildren = localStorage.getItem('parentChildren');
        if (savedChildren) {
            const parsed = JSON.parse(savedChildren);
            setChildren(parsed);
            if (parsed.length > 0) setSelectedChildId(parsed[0].id);
        }

        // Mock attendance data for February 2026
        const mockAttendance: AttendanceRecord[] = [
            { date: '2026-02-03', status: 'present' },
            { date: '2026-02-04', status: 'present' },
            { date: '2026-02-05', status: 'late' },
            { date: '2026-02-06', status: 'present' },
            { date: '2026-02-07', status: 'present' },
            { date: '2026-02-10', status: 'absent' },
            { date: '2026-02-11', status: 'excused' },
            { date: '2026-02-12', status: 'present' },
            { date: '2026-02-13', status: 'present' },
            { date: '2026-02-14', status: 'present' },
        ];
        setAttendance(mockAttendance);
    }, []);

    const selectedChild = children.find(c => c.id === selectedChildId);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const getAttendanceForDate = (day: number) => {
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return attendance.find(a => a.date === dateStr);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return 'bg-green-500 text-white';
            case 'absent': return 'bg-red-500 text-white';
            case 'late': return 'bg-orange-500 text-white';
            case 'excused': return 'bg-blue-500 text-white';
            default: return 'bg-white text-gray-900 hover:bg-gray-50';
        }
    };

    const changeMonth = (delta: number) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Calculate statistics
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'present').length;
    const lateDays = attendance.filter(a => a.status === 'late').length;
    const absentDays = attendance.filter(a => a.status === 'absent').length;
    const excusedDays = attendance.filter(a => a.status === 'excused').length;
    const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Attendance</h1>

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
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                    <p className="text-xs uppercase opacity-80 mb-1">Attendance Rate</p>
                    <p className="text-3xl font-bold">{attendanceRate}%</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Present</p>
                    <p className="text-3xl font-bold text-green-600">{presentDays}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Late</p>
                    <p className="text-3xl font-bold text-orange-600">{lateDays}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Absent</p>
                    <p className="text-3xl font-bold text-red-600">{absentDays}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Excused</p>
                    <p className="text-3xl font-bold text-blue-600">{excusedDays}</p>
                </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="size-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
                    <button
                        onClick={() => changeMonth(1)}
                        className="size-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-semibold text-gray-500 text-sm py-2">
                            {day}
                        </div>
                    ))}

                    {/* Empty cells for offset */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}

                    {/* Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const record = getAttendanceForDate(day);
                        const statusColor = record ? getStatusColor(record.status) : 'bg-white text-gray-900 hover:bg-gray-50';

                        return (
                            <div
                                key={day}
                                className={`aspect-square flex items-center justify-center rounded-lg border-2 ${
                                    record ? 'border-transparent' : 'border-gray-200'
                                } ${statusColor} font-semibold transition-colors cursor-pointer`}
                                title={record ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : 'No record'}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="size-4 rounded bg-green-500"></div>
                        <span className="text-sm text-gray-600">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-4 rounded bg-orange-500"></div>
                        <span className="text-sm text-gray-600">Late</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-4 rounded bg-red-500"></div>
                        <span className="text-sm text-gray-600">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-4 rounded bg-blue-500"></div>
                        <span className="text-sm text-gray-600">Excused</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-4 rounded border-2 border-gray-200 bg-white"></div>
                        <span className="text-sm text-gray-600">No Record</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
