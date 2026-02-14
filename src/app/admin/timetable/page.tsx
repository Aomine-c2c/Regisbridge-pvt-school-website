'use client';

import React, { useState } from 'react';

interface ScheduleItem {
  id: string;
  subject: {
    name: string;
  };
  startTime: string;
  endTime: string;
  room?: string;
}

type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type ScheduleData = Partial<Record<WeekDay, ScheduleItem[]>>;

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("");

  const [classes, setClasses] = useState<{id: string, name: string}[]>([]);
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [loading, setLoading] = useState(true);

  // Fetch Classes for dropdown
  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        const res = await fetch('/api/admin/classes', { headers });
        const json = await res.json();
        if (json.success) {
          setClasses(json.data);
          if (json.data.length > 0 && !selectedClass) {
             setSelectedClass(json.data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };
    fetchClasses();
  }, [selectedClass]);

  // Fetch Schedule when class changes
  React.useEffect(() => {
    if (!selectedClass) return;
    
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        const res = await fetch(`/api/admin/timetable?classId=${selectedClass}`, { headers });
        const json = await res.json();
        if (json.success) {
          setSchedule(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [selectedClass]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-[#e2e8f0]">
      {/* Top Header - Simplified as per design, assuming main layout wrapper might exist but this page seems standalone-ish in design */}
      {/* Integrating into existing admin layout usually, but designs have specific headers. I will keep the page content focused. */}
      
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-80 flex-shrink-0 flex flex-col border-r border-[#dcdee5] dark:border-[#334155] bg-white dark:bg-[#1e293b] overflow-y-auto z-10">
          <div className="p-6 border-b border-[#dcdee5] dark:border-[#334155]">
            <h1 className="text-xl font-bold tracking-tight mb-1">Timetable Engine</h1>
            <p className="text-sm text-[#646d87] dark:text-[#94a3b8]">Fall Semester 2024</p>
            <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-[#2957e0] hover:bg-[#1a3bb0] text-white px-4 py-3 text-sm font-bold shadow-md shadow-blue-500/20 transition-all">
              <span className="material-symbols-outlined text-lg">auto_fix_high</span>
              Generate AI Schedule
            </button>
          </div>
          
          <div className="flex-1 p-4 space-y-6">
            {/* Section 1: Select Class */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-[#94a3b8]">Select Class</h3>
              </div>
              <div className="px-2">
                 <select 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full rounded-lg border-[#dcdee5] dark:border-[#334155] bg-[#f6f6f8] dark:bg-[#111521] text-sm py-2 px-3"
                 >
                    <option value="">Select a Class...</option>
                    {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                 </select>
              </div>
            </div>

            {/* Section 3: Constraints */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-[#94a3b8]">Constraints</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-[#dcdee5] dark:border-[#334155] opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex items-center justify-center size-8 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                    <span className="material-symbols-outlined text-lg">person_off</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111317] dark:text-[#e2e8f0]">Teacher Unavailable</p>
                    <p className="text-xs text-[#646d87] dark:text-[#94a3b8]">Drag to block time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace: Calendar Grid */}
        <section className="flex-1 flex flex-col min-w-0 bg-[#f6f6f8] dark:bg-[#111521] relative">
          {/* Context Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1e293b] border-b border-[#dcdee5] dark:border-[#334155]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#ef4444]/10 text-[#ef4444] px-3 py-1.5 rounded-full border border-[#ef4444]/20">
                <span className="material-symbols-outlined text-sm font-bold">warning</span>
                <span className="text-xs font-bold uppercase tracking-wide">2 Conflicts Detected</span>
              </div>
              <div className="h-4 w-px bg-[#dcdee5] dark:border-[#334155]"></div>
              <p className="text-sm text-[#646d87] dark:text-[#94a3b8]">Last saved: <span className="text-[#111317] dark:text-[#e2e8f0] font-medium">Just now</span></p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#646d87] dark:text-[#94a3b8] hover:bg-[#f6f6f8] dark:hover:bg-[#111521] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                Filter View
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#646d87] dark:text-[#94a3b8] hover:bg-[#f6f6f8] dark:hover:bg-[#111521] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-lg">settings</span>
                Settings
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] hover:bg-[#f6f6f8] dark:hover:bg-gray-800 text-[#111317] dark:text-[#e2e8f0] text-sm font-bold rounded-lg shadow-sm transition-all">
                <span className="material-symbols-outlined text-lg">download</span>
                Export
              </button>
            </div>
          </div>

          {/* Calendar Grid Container */}
          <div className="flex-1 overflow-auto p-6 relative">
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-[#1e293b]/50 backdrop-blur-sm">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              </div>
            )}
            <div className="min-w-[1000px] bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-[#dcdee5] dark:border-[#334155] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[100px_repeat(5,1fr)] bg-gray-50 dark:bg-gray-800/50 border-b border-[#dcdee5] dark:border-[#334155]">
                <div className="p-4 text-xs font-bold text-[#646d87] dark:text-[#94a3b8] uppercase tracking-wider text-center flex items-center justify-center">Time</div>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
                  <div key={day} className={`p-4 text-center ${i > 0 ? 'border-l border-[#dcdee5] dark:border-[#334155]' : ''}`}>
                    <span className="block text-sm font-bold text-[#111317] dark:text-[#e2e8f0]">{day}</span>
                    <span className="text-xs text-[#646d87] dark:text-[#94a3b8]">Day {i + 1}</span>
                  </div>
                ))}
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#dcdee5] dark:divide-[#334155]">
                {/* 08:00 AM Row - Full Grid Row */}
                <div className="grid grid-cols-[100px_repeat(5,1fr)] min-h-[120px]">
                   {/* Time Column */}
                   <div className="p-4 text-xs font-medium text-[#646d87] dark:text-[#94a3b8] text-right bg-gray-50/50 dark:bg-gray-800/30 border-r border-[#dcdee5] dark:border-[#334155]">
                     08:00 AM
                   </div>

                   {/* Monday Column */}
                   <div className="relative p-2 border-r border-[#dcdee5] dark:border-[#334155]">
                       {schedule['Monday']?.map((s: ScheduleItem) => (
                          <div key={s.id} className="absolute inset-0 p-2 z-10">
                              <div className="h-full w-full rounded-lg bg-blue-50 border-l-4 border-blue-500 p-2 shadow-sm">
                                <div className="text-xs font-bold text-blue-700 truncate">{s.subject.name}</div>
                                <div className="text-[10px] text-blue-500">{s.startTime} - {s.endTime}</div>
                                <div className="text-[10px] text-blue-400 truncate">{s.room}</div>
                              </div>
                          </div>
                       ))}
                       {!schedule['Monday'] && <div className="h-full flex items-center justify-center text-xs text-gray-300">Free</div>}
                   </div>

                   {/* Tuesday Column */}
                   <div className="relative p-2 border-r border-[#dcdee5] dark:border-[#334155]">
                       {schedule['Tuesday']?.map((s: ScheduleItem) => (
                          <div key={s.id} className="absolute inset-0 p-2 z-10">
                                <div className="h-full w-full rounded-lg bg-purple-50 border-l-4 border-purple-500 p-2 shadow-sm">
                                      <div className="text-xs font-bold text-purple-700 truncate">{s.subject.name}</div>
                                      <div className="text-[10px] text-purple-500">{s.startTime} - {s.endTime}</div>
                                </div>
                          </div>
                       ))}
                   </div>

                    {/* Wednesday Column */}
                    <div className="relative p-2 border-r border-[#dcdee5] dark:border-[#334155]">
                       {schedule['Wednesday']?.map((s: ScheduleItem) => (
                          <div key={s.id} className="absolute inset-0 p-2 z-10">
                                <div className="h-full w-full rounded-lg bg-emerald-50 border-l-4 border-emerald-500 p-2 shadow-sm">
                                      <div className="text-xs font-bold text-emerald-700 truncate">{s.subject.name}</div>
                                      <div className="text-[10px] text-emerald-500">{s.startTime} - {s.endTime}</div>
                                </div>
                          </div>
                       ))}
                   </div>

                    {/* Thursday Column */}
                    <div className="relative p-2 border-r border-[#dcdee5] dark:border-[#334155]">
                       {schedule['Thursday']?.map((s: ScheduleItem) => (
                          <div key={s.id} className="absolute inset-0 p-2 z-10">
                                <div className="h-full w-full rounded-lg bg-orange-50 border-l-4 border-orange-500 p-2 shadow-sm">
                                      <div className="text-xs font-bold text-orange-700 truncate">{s.subject.name}</div>
                                      <div className="text-[10px] text-orange-500">{s.startTime} - {s.endTime}</div>
                                </div>
                          </div>
                       ))}
                   </div>

                    {/* Friday Column */}
                    <div className="relative p-2">
                       {schedule['Friday']?.map((s: ScheduleItem) => (
                          <div key={s.id} className="absolute inset-0 p-2 z-10">
                                <div className="h-full w-full rounded-lg bg-pink-50 border-l-4 border-pink-500 p-2 shadow-sm">
                                      <div className="text-xs font-bold text-pink-700 truncate">{s.subject.name}</div>
                                      <div className="text-[10px] text-pink-500">{s.startTime} - {s.endTime}</div>
                                </div>
                          </div>
                       ))}
                   </div>
                </div>
              </div>
            </div>
            
            {/* Legend/Footer info */}
            <div className="mt-6 px-6 py-3 bg-white dark:bg-[#1e293b] rounded-lg border border-[#dcdee5] dark:border-[#334155] flex flex-wrap items-center gap-6 text-xs text-[#646d87] dark:text-[#94a3b8] shadow-sm">
                <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-blue-500"></span> Core</div>
                <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-emerald-500"></span> Science</div>
                <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-purple-500"></span> Humanities</div>
                <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-pink-500"></span> Arts</div>
                <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-orange-500"></span> History</div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">keyboard_command_key</span>
                    <span>Hold CMD to multi-select</span>
                </div>
            </div>
          </div>
        </section>

        {/* Right Panel: Properties (Hidden on mobile) */}
        <aside className="w-72 hidden xl:flex flex-col border-l border-[#dcdee5] dark:border-[#334155] bg-white dark:bg-[#1e293b] z-10">
          <div className="p-5 border-b border-[#dcdee5] dark:border-[#334155]">
            <h2 className="font-bold text-[#111317] dark:text-[#e2e8f0]">Selection Details</h2>
          </div>
          <div className="p-5 flex-1 overflow-y-auto">
            {/* Selected Item Placeholder - In a real app this would depend on selectedSubject state */}
            <div className="flex flex-col gap-4">
              <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-4xl">functions</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111317] dark:text-[#e2e8f0]">Mathematics 101</h3>
                <p className="text-sm text-[#646d87] dark:text-[#94a3b8]">Grade 10 • Core Subject</p>
              </div>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-xs font-bold text-[#646d87] dark:text-[#94a3b8] uppercase mb-1">Assigned Teacher</label>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#f6f6f8] dark:bg-[#111521]">
                    <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">JS</div>
                    <span className="text-sm font-medium text-[#111317] dark:text-[#e2e8f0]">Mr. John Smith</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#646d87] dark:text-[#94a3b8] uppercase mb-1">Room</label>
                  <select className="w-full rounded-lg border-[#dcdee5] dark:border-[#334155] bg-[#f6f6f8] dark:bg-[#111521] text-sm py-2">
                    <option>Rm 304 (Capacity: 30)</option>
                    <option>Rm 305 (Capacity: 25)</option>
                    <option>Lab 1 (Capacity: 20)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#646d87] dark:text-[#94a3b8] uppercase mb-1">Requirements</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-[#646d87] dark:text-[#94a3b8] border border-[#dcdee5] dark:border-[#334155]">Projector</span>
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-[#646d87] dark:text-[#94a3b8] border border-[#dcdee5] dark:border-[#334155]">Whiteboard</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#dcdee5] dark:border-[#334155]">
                  <label className="block text-xs font-bold text-[#ef4444] uppercase mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    Active Conflicts
                  </label>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg">
                    <p className="text-xs text-red-800 dark:text-red-200 font-medium">Room 304 is double booked at 09:00 AM on Monday.</p>
                    <button className="mt-2 text-xs font-bold text-red-600 dark:text-red-400 hover:underline">Find Alternative Room</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#dcdee5] dark:border-[#334155]">
            <button className="w-full py-2 rounded-lg border border-[#dcdee5] dark:border-[#334155] text-[#646d87] dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
              Remove from Schedule
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
