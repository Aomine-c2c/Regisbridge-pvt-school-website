'use client';

import React, { useState, useEffect } from 'react';
import { 
  School, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClassRecord {
  id: string;
  name: string;
  gradeLevel: string;
  section: string | null;
  classTeacher: {
    user: {
      firstName: string;
      lastName: string;
    }
  } | null;
  _count?: {
    students?: number;
  };
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        const res = await fetch('/api/admin/classes', { headers });
        const json = await res.json();
        
        if (json.success) {
          setClasses(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All Grades' || cls.gradeLevel === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Class Management</h1>
          <p className="text-slate-500">Manage academic classes, sections, and teacher assignments.</p>
        </div>
        <Button className="bg-brand-navy hover:bg-brand-navy/90">
          <Plus className="mr-2 h-4 w-4" /> Add Class
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <School className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Classes</p>
            <h3 className="text-2xl font-bold text-slate-900">{classes.length}</h3>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
             <Users className="h-6 w-6" />
           </div>
           <div>
             <p className="text-sm font-medium text-slate-500">Total Students</p>
             <h3 className="text-2xl font-bold text-slate-900">--</h3>
             {/* Placeholder until aggregation is added */}
           </div>
        </div>
         <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Class Size</p>
              <h3 className="text-2xl font-bold text-slate-900">--</h3>
            </div>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
               <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                 <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="Filter by Grade" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="All Grades">All Grades</SelectItem>
                   <SelectItem value="10">Grade 10</SelectItem>
                   <SelectItem value="11">Grade 11</SelectItem>
                   <SelectItem value="12">Grade 12</SelectItem>
                 </SelectContent>
               </Select>
               <Button variant="outline" size="icon">
                 <Filter className="h-4 w-4" />
               </Button>
             </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-4">Class Name</th>
                <th className="px-6 py-4">Grade Level</th>
                <th className="px-6 py-4">Class Teacher</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading classes...</td></tr>
               ) : filteredClasses.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">No classes found.</td></tr>
               ) : (
                  filteredClasses.map((cls) => (
                    <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{cls.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          Grade {cls.gradeLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {cls.classTeacher ? (
                           <div className="flex items-center gap-2">
                             <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                               {cls.classTeacher.user.firstName[0]}
                             </div>
                             {cls.classTeacher.user.firstName} {cls.classTeacher.user.lastName}
                           </div>
                        ) : (
                           <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {cls._count?.students || 0} Students
                      </td>
                      <td className="px-6 py-4 text-right">
                         <Button variant="ghost" size="icon" className="h-8 w-8">
                           <MoreVertical className="h-4 w-4" />
                         </Button>
                      </td>
                    </tr>
                  ))
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
