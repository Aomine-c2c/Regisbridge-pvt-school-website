'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Save,
  Search
} from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  rollNumber: string;
  studentName: string;
  grade: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | null;
  remarks: string;
  markedAt: string | null;
}

export default function AttendancePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Filters
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [grade, setGrade] = useState<string>('10');
  
  // Data
  const [students, setStudents] = useState<AttendanceRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Attendance Data
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        date: date,
        grade: grade
      });
      
      const res = await fetch(`/api/admin/attendance?${queryParams.toString()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      
      if (json.success) {
        setStudents(json.data);
      } else {
        toast({ title: "Error", description: json.message, variant: "destructive" });
        setStudents([]);
      }
    } catch (_error) {
      console.error("Failed to fetch attendance:", _error);
      toast({ title: "Error", description: "Failed to load student list", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [date, grade, toast]);

  // Load data on filter change
  useEffect(() => {
    fetchAttendance();
  }, [date, grade, fetchAttendance]);

  // Handle Marking
  const handleMark = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setStudents(prev => prev.map(s => 
      s.studentId === studentId ? { ...s, status } : s
    ));
  };

  const handleRemarkChange = (studentId: string, remarks: string) => {
    setStudents(prev => prev.map(s => 
      s.studentId === studentId ? { ...s, remarks } : s
    ));
  };

  // Mark All functionality
  const markAll = (status: 'PRESENT' | 'ABSENT') => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  // Submit Data
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        date: date,
        records: students
          .filter(s => s.status !== null) // Only send marked records
          .map(s => ({
            studentId: s.studentId,
            status: s.status,
            remarks: s.remarks
          }))
      };

      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      
      if (json.success) {
        toast({ title: "Success", description: "Attendance saved successfully" });
        fetchAttendance(); // Refresh to show "markedAt" timestamps if needed
      } else {
        toast({ title: "Error", description: json.message, variant: "destructive" });
      }
    } catch (error) {
       console.error("Failed to save attendance:", error);
       toast({ title: "Error", description: "Failed to save records", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: filteredStudents.length,
    present: filteredStudents.filter(s => s.status === 'PRESENT').length,
    absent: filteredStudents.filter(s => s.status === 'ABSENT').length,
    late: filteredStudents.filter(s => s.status === 'LATE').length,
    unmarked: filteredStudents.filter(s => s.status === null).length,
  };

  return (
    <div className="flex flex-col h-full space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Student Attendance</h1>
          <p className="text-slate-500">Manage daily attendance records for students.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg border shadow-sm flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 size={16} />
                    <span className="font-bold">{stats.present}</span> Present
                </div>
                <div className="w-px h-4 bg-slate-200"></div>
                <div className="flex items-center gap-2 text-red-600">
                    <XCircle size={16} />
                    <span className="font-bold">{stats.absent}</span> Absent
                </div>
                <div className="w-px h-4 bg-slate-200"></div>
                <div className="flex items-center gap-2 text-orange-600">
                    <Clock size={16} />
                    <span className="font-bold">{stats.late}</span> Late
                </div>
            </div>
            <Button onClick={handleSubmit} disabled={submitting || loading} className="bg-brand-navy hover:bg-brand-navy/90">
                <Save className="mr-2 h-4 w-4" />
                {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
      </div>

      {/* Controls Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end md:items-center">
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="grid gap-1.5 flex-1">
                <label className="text-xs font-semibold text-slate-500">Date</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e: any) => setDate(e.target.value)}
                        className="pl-9 h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>
            <div className="grid gap-1.5 flex-1 w-[180px]">
                <label className="text-xs font-semibold text-slate-500">Grade Level</label>
                <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="flex-1 w-full">
            <div className="grid gap-1.5 w-full md:max-w-md ml-auto">
                 <label className="text-xs font-semibold text-slate-500">Search Students</label>
                 <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search by name or ID..." 
                        value={searchQuery}
                        onChange={(e: any) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                 </div>
            </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
         <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-semibold text-slate-700">Class Register: Grade {grade}</h3>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => markAll('PRESENT')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                    Mark All Present
                </Button>
            </div>
         </div>
         
         <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3">Roll No.</th>
                        <th className="px-6 py-3">Student Name</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3">Remarks</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {loading ? (
                         <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading student list...</td></tr>
                    ) : filteredStudents.length === 0 ? (
                         <tr><td colSpan={4} className="p-8 text-center text-slate-500">No students found for this grade.</td></tr>
                    ) : (
                        filteredStudents.map((student: any) => (
                            <tr key={student.studentId} className={`hover:bg-slate-50 transition-colors ${student.status === 'ABSENT' ? 'bg-red-50/30' : ''}`}>
                                <td className="px-6 py-4 font-mono text-slate-600">{student.rollNumber || '-'}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{student.studentName}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button 
                                            onClick={() => handleMark(student.studentId, 'PRESENT')}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                                                student.status === 'PRESENT' 
                                                ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' 
                                                : 'border-transparent text-slate-400 hover:bg-slate-100'
                                            }`}
                                        >
                                            <CheckCircle2 size={20} className={student.status === 'PRESENT' ? 'fill-current' : ''} />
                                            <span className="text-[10px] font-bold">Present</span>
                                        </button>

                                        <button 
                                            onClick={() => handleMark(student.studentId, 'ABSENT')}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                                                student.status === 'ABSENT' 
                                                ? 'bg-red-50 border-red-200 text-red-700 shadow-sm' 
                                                : 'border-transparent text-slate-400 hover:bg-slate-100'
                                            }`}
                                        >
                                            <XCircle size={20} className={student.status === 'ABSENT' ? 'fill-current' : ''} />
                                            <span className="text-[10px] font-bold">Absent</span>
                                        </button>

                                        <button 
                                            onClick={() => handleMark(student.studentId, 'LATE')}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                                                student.status === 'LATE' 
                                                ? 'bg-orange-50 border-orange-200 text-orange-700 shadow-sm' 
                                                : 'border-transparent text-slate-400 hover:bg-slate-100'
                                            }`}
                                        >
                                            <Clock size={20} className={student.status === 'LATE' ? 'fill-current' : ''} />
                                            <span className="text-[10px] font-bold">Late</span>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Input 
                                        placeholder="Add remark..." 
                                        value={student.remarks || ''}
                                        onChange={(e: any) => handleRemarkChange(student.studentId, e.target.value)}
                                        className="h-8 text-xs w-full min-w-[150px]"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
         </div>
         <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
            Attendance records are automatically visible to parents and students via their portals.
         </div>
      </div>
    </div>
  );
}
