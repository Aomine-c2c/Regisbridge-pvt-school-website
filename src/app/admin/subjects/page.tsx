'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  MoreVertical,
  Plus,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SubjectRecord {
  id: string;
  name: string;
  code: string;
  description: string;
  teachers: {
    teacher: {
      user: {
        firstName: string;
        lastName: string;
      }
    }
  }[];
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<SubjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        const res = await fetch('/api/admin/subjects', { headers });
        const json = await res.json();
        
        if (json.success) {
          setSubjects(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch subjects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(sub => {
    return sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           sub.code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Subject Catalog</h1>
          <p className="text-slate-500">Manage course offerings and teacher assignments.</p>
        </div>
        <Button className="bg-brand-navy hover:bg-brand-navy/90">
          <Plus className="mr-2 h-4 w-4" /> Add Subject
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Subjects</p>
            <h3 className="text-2xl font-bold text-slate-900">{subjects.length}</h3>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-pink-50 text-pink-600 rounded-lg">
             <GraduationCap className="h-6 w-6" />
           </div>
           <div>
             <p className="text-sm font-medium text-slate-500">Active Teachers</p>
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
                  placeholder="Search by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
             </div>
             <Button variant="outline" size="icon">
                 <Filter className="h-4 w-4" />
             </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Subject Name</th>
                <th className="px-6 py-4">Assigned Teachers</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading subjects...</td></tr>
               ) : filteredSubjects.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">No subjects found.</td></tr>
               ) : (
                  filteredSubjects.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500 bg-slate-50/50 w-[100px]">
                        {sub.code}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{sub.name}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {sub.teachers && sub.teachers.length > 0 ? (
                           <div className="flex -space-x-2 overflow-hidden">
                             {sub.teachers.map((t, i) => (
                               <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600" title={`${t.teacher.user.firstName} ${t.teacher.user.lastName}`}>
                                 {t.teacher.user.firstName[0]}
                               </div>
                             ))}
                             {sub.teachers.length > 3 && (
                               <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
                                 +{sub.teachers.length - 3}
                               </div>
                             )}
                           </div>
                        ) : (
                           <span className="text-slate-400 italic text-xs">No teachers assigned</span>
                        )}
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
