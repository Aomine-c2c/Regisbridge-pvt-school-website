'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface StudentAttendance {
    studentId: string;
    name: string;
    rollNumber: string;
    status: string; // PRESENT, ABSENT, LATE, EXCUSED
    notes: string;
}

export default function TeacherAttendancePage() {
    const { toast } = useToast();
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState<StudentAttendance[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await fetch('/api/teacher/dashboard', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const json = await res.json();
                if (json.success && json.data.classes) {
                    // Remove duplicates just in case
                    const uniqueClasses = Array.from(new Map(json.data.classes.map((item:any) => [item.id, item])).values());
                    setClasses(uniqueClasses);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchClasses(); 
    }, []);

    // Fetch Students when Class + Date selected
    const fetchAttendance = async () => {
        if (!selectedClassId || !date) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/attendance/class/${selectedClassId}?date=${date}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
            if (json.success) {
                setStudents(json.data.students);
            } else {
                toast({ title: 'Error', description: json.message, variant: 'destructive' });
            }
        } catch (error) {
            console.error(error);
            toast({ title: 'Error', description: 'Failed to load students', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [selectedClassId, date]);

    const handleMarkChange = (studentId: string, status: string) => {
        setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, status } : s));
    };

    const handleNoteChange = (studentId: string, notes: string) => {
        setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, notes } : s));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/attendance/mark', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({
                    classId: selectedClassId, // Not strictly used by backend validation yet but good to pass
                    date,
                    records: students.map(s => ({
                        studentId: s.studentId,
                        status: s.status,
                        notes: s.notes
                    }))
                })
            });
            const json = await res.json();
            if (json.success) {
                toast({ title: 'Success', description: 'Attendance saved successfully' });
            } else {
                 toast({ title: 'Error', description: json.message, variant: 'destructive' });
            }
        } catch (error) {
            console.error(error);
            toast({ title: 'Error', description: 'Failed to save attendance', variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Daily Attendance Register</h1>
            
            {/* Controls */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                    <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedClassId}
                        onChange={(e: any) => setSelectedClassId(e.target.value)}
                    >
                        <option value="">-- Select Class --</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                        type="date" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={date}
                        onChange={(e: any) => setDate(e.target.value)}
                    />
                </div>

                <button 
                    onClick={fetchAttendance}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                    Reload
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center py-10">Loading class list...</div>
            ) : selectedClassId ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                     <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-600">Student</th>
                                <th className="text-center p-4 font-medium text-gray-600">Status</th>
                                <th className="text-left p-4 font-medium text-gray-600">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.length > 0 ? students.map(student => (
                                <tr key={student.studentId} className="hover:bg-gray-50/50">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{student.name}</div>
                                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            {['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleMarkChange(student.studentId, status)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                                                        student.status === status
                                                            ? getStatusColor(status)
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {status.charAt(0)}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            placeholder="Optional notes..."
                                            className="w-full text-sm p-1 border-b border-gray-200 focus:border-brand-navy outline-none bg-transparent"
                                            value={student.notes || ''}
                                            onChange={(e: any) => handleNoteChange(student.studentId, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-500">
                                        No students found in this class.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                     </table>
                     
                     <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-brand-navy text-white px-6 py-2 rounded-lg hover:bg-brand-navy/90 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Register'}
                        </button>
                     </div>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                    Please select a class to mark attendance.
                </div>
            )}
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case 'PRESENT': return 'bg-green-100 text-green-700 border border-green-200';
        case 'ABSENT': return 'bg-red-100 text-red-700 border border-red-200';
        case 'LATE': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
        case 'EXCUSED': return 'bg-blue-100 text-blue-700 border border-blue-200';
        default: return 'bg-gray-100 text-gray-500';
    }
}
