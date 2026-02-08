'use client';

import { useState, useEffect } from 'react';

interface AttendanceRecord {
    id: string;
    date: string;
    status: string;
    notes?: string;
}

interface Stats {
    total: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    rate: string;
}

export default function StudentAttendancePage() {
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await fetch('/api/student/attendance', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const json = await res.json();
                if (json.success) {
                    setAttendance(json.attendance);
                    setStats(json.statistics);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading attendance records...</div>;

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">My Attendance</h1>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">Attendance Rate</div>
                        <div className="text-2xl font-bold text-brand-navy">{stats.rate}%</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200 bg-green-50">
                        <div className="text-sm text-green-700 mb-1">Present</div>
                        <div className="text-2xl font-bold text-green-800">{stats.present}</div>
                    </div>
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200 bg-red-50">
                        <div className="text-sm text-red-700 mb-1">Absent</div>
                        <div className="text-2xl font-bold text-red-800">{stats.absent}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200 bg-yellow-50">
                        <div className="text-sm text-yellow-700 mb-1">Late</div>
                        <div className="text-2xl font-bold text-yellow-800">{stats.late}</div>
                    </div>
                </div>
            )}

            {/* Attendance List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-medium text-gray-600">Date</th>
                            <th className="p-4 font-medium text-gray-600">Status</th>
                            <th className="p-4 font-medium text-gray-600">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {attendance.length > 0 ? attendance.map(record => (
                            <tr key={record.id} className="hover:bg-gray-50/50">
                                <td className="p-4 text-gray-900">
                                    {new Date(record.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                <td className="p-4">
                                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                                        {record.status}
                                     </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{record.notes || '-'}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">
                                    No attendance records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'PRESENT': return 'bg-green-100 text-green-700';
        case 'ABSENT': return 'bg-red-100 text-red-700';
        case 'LATE': return 'bg-yellow-100 text-yellow-700';
        case 'EXCUSED': return 'bg-blue-100 text-blue-700';
        default: return 'bg-gray-100 text-gray-500';
    }
}
