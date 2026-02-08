'use client';

import React, { useState } from 'react';

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Year 10A");

  // Mock data for unassigned classes
  const unassignedClasses = [
    { id: 1, name: 'Chemistry 101', type: 'Lab', duration: '90m', color: 'blue', icon: 'science' },
    { id: 2, name: 'Adv. Calculus', type: 'Lecture', duration: '60m', color: 'purple', icon: 'calculate' },
    { id: 3, name: 'Art History', type: 'Studio', duration: '120m', color: 'orange', icon: 'palette' },
  ];

  // Mock data for subject blocks
  const subjectBlocks = [
    { id: 101, name: 'Biology Block A', details: 'Grade 10 • 3 Sections', color: 'emerald', icon: 'forest' }
  ];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-[#e2e8f0]">
      {/* Top Header - Simplified as per design, assuming main layout wrapper might exist but this page seems standalone-ish in design */}
      {/* Integrating into existing admin layout usually, but designs have specific headers. I will keep the page content focused. */}
      
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar: Draggables & Tools */}
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
            {/* Section 1: Unassigned Classes */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-[#94a3b8]">Unassigned Classes</h3>
                <span className="bg-gray-200 dark:bg-gray-700 text-[#646d87] dark:text-[#94a3b8] text-[10px] font-bold px-1.5 py-0.5 rounded">12</span>
              </div>
              <div className="space-y-2">
                {unassignedClasses.map((item) => (
                  <div key={item.id} className="group flex items-center gap-3 p-3 rounded-lg bg-[#f6f6f8] dark:bg-[#111521] border border-transparent hover:border-[#2957e0]/30 cursor-grab active:cursor-grabbing transition-all hover:shadow-sm">
                    <div className={`flex items-center justify-center size-8 rounded bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400`}>
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111317] dark:text-[#e2e8f0]">{item.name}</p>
                      <p className="text-xs text-[#646d87] dark:text-[#94a3b8]">{item.type} • {item.duration}</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-gray-400 opacity-0 group-hover:opacity-100">drag_indicator</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Subject Blocks */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-[#94a3b8]">Subject Blocks</h3>
                <span className="bg-gray-200 dark:bg-gray-700 text-[#646d87] dark:text-[#94a3b8] text-[10px] font-bold px-1.5 py-0.5 rounded">4</span>
              </div>
              <div className="space-y-2">
                {subjectBlocks.map((item) => (
                  <div key={item.id} className="group flex items-center gap-3 p-3 rounded-lg bg-[#f6f6f8] dark:bg-[#111521] border border-transparent hover:border-[#2957e0]/30 cursor-grab active:cursor-grabbing transition-all hover:shadow-sm">
                    <div className={`flex items-center justify-center size-8 rounded bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400`}>
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111317] dark:text-[#e2e8f0]">{item.name}</p>
                      <p className="text-xs text-[#646d87] dark:text-[#94a3b8]">{item.details}</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-gray-400 opacity-0 group-hover:opacity-100">drag_indicator</span>
                  </div>
                ))}
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
          <div className="flex-1 overflow-auto p-6">
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
                {/* 08:00 AM Row */}
                <div className="grid grid-cols-[100px_repeat(5,1fr)] min-h-[120px]">
                  <div className="p-4 text-xs font-medium text-[#646d87] dark:text-[#94a3b8] text-right bg-gray-50/50 dark:bg-gray-800/30">
                    08:00 AM
                  </div>
                  {/* Mon */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <div className="h-full w-full rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Math 101</span>
                        <span className="material-symbols-outlined text-[16px] text-blue-400">more_horiz</span>
                      </div>
                      <div className="mt-1 text-xs text-blue-600/80 dark:text-blue-400/80">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Rm 304</div>
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> Mr. Smith</div>
                      </div>
                    </div>
                  </div>
                  {/* Tue */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <div className="h-full w-full rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Bio Lab</span>
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">more_horiz</span>
                      </div>
                      <div className="mt-1 text-xs text-emerald-600/80 dark:text-emerald-400/80">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Lab 2</div>
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> Mrs. Davis</div>
                      </div>
                    </div>
                  </div>
                  {/* Wed */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    {/* Empty Slot */}
                  </div>
                  {/* Thu */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <div className="h-full w-full rounded-lg bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300">English Lit</span>
                        <span className="material-symbols-outlined text-[16px] text-purple-400">more_horiz</span>
                      </div>
                      <div className="mt-1 text-xs text-purple-600/80 dark:text-purple-400/80">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Rm 102</div>
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> Ms. Alcott</div>
                      </div>
                    </div>
                  </div>
                  {/* Fri */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <div className="h-full w-full rounded-lg bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-orange-700 dark:text-orange-300">History</span>
                        <span className="material-symbols-outlined text-[16px] text-orange-400">more_horiz</span>
                      </div>
                      <div className="mt-1 text-xs text-orange-600/80 dark:text-orange-400/80">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Rm 201</div>
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> Mr. Jones</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 09:00 AM Row */}
                <div className="grid grid-cols-[100px_repeat(5,1fr)] min-h-[120px]">
                  <div className="p-4 text-xs font-medium text-[#646d87] dark:text-[#94a3b8] text-right bg-gray-50/50 dark:bg-gray-800/30">
                    09:00 AM
                  </div>
                  {/* Mon: Conflict Example */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group bg-red-50/30 dark:bg-red-900/10 animate-pulse">
                    <div className="h-[48%] w-full rounded bg-white dark:bg-[#1e293b] border border-[#ef4444] shadow-sm p-1.5 mb-[4%] opacity-90">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#111317] dark:text-[#e2e8f0] truncate">Math 101 (Grp B)</span>
                        <span className="material-symbols-outlined text-[#ef4444] text-[14px]">error</span>
                      </div>
                      <div className="text-[10px] text-[#ef4444] font-medium truncate">Rm 304 (Double Booked)</div>
                    </div>
                    <div className="h-[48%] w-full rounded bg-white dark:bg-[#1e293b] border border-[#ef4444] shadow-sm p-1.5 opacity-90">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#111317] dark:text-[#e2e8f0] truncate">Physics (Grp A)</span>
                        <span className="material-symbols-outlined text-[#ef4444] text-[14px]">error</span>
                      </div>
                      <div className="text-[10px] text-[#ef4444] font-medium truncate">Rm 304 (Double Booked)</div>
                    </div>
                  </div>
                  {/* Tue */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    {/* Empty Slot */}
                  </div>
                  {/* Wed: Teacher Conflict */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group bg-red-50/30 dark:bg-red-900/10">
                    <div className="h-full w-full rounded-lg bg-white dark:bg-[#1e293b] border-2 border-dashed border-[#ef4444] p-2 flex flex-col justify-center items-center text-center">
                      <span className="material-symbols-outlined text-[#ef4444] text-2xl mb-1">person_alert</span>
                      <span className="text-xs font-bold text-[#111317] dark:text-[#e2e8f0]">Mr. Smith</span>
                      <span className="text-[10px] text-[#ef4444] font-bold uppercase mt-1">Schedule Overlap</span>
                    </div>
                  </div>
                  {/* Thu */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <div className="h-full w-full rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Math 102</span>
                        <span className="material-symbols-outlined text-[16px] text-blue-400">more_horiz</span>
                      </div>
                      <div className="mt-1 text-xs text-blue-600/80 dark:text-blue-400/80">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Rm 305</div>
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> Mr. Smith</div>
                      </div>
                    </div>
                  </div>
                  {/* Fri */}
                  <div className="p-2 border-l border-[#dcdee5] dark:border-[#334155] relative group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <div className="h-full w-full rounded-lg bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-teal-700 dark:text-teal-300">Comp Sci</span>
                        <span className="material-symbols-outlined text-[16px] text-teal-400">more_horiz</span>
                      </div>
                      <div className="mt-1 text-xs text-teal-600/80 dark:text-teal-400/80">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Lab 1</div>
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> Mrs. Lee</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10:00 AM Row */}
                <div className="grid grid-cols-[100px_repeat(5,1fr)] min-h-[120px]">
                   <div className="p-4 text-xs font-medium text-[#646d87] dark:text-[#94a3b8] text-right bg-gray-50/50 dark:bg-gray-800/30">
                     10:00 AM
                   </div>
                   <div className="col-span-5 p-1 relative">
                     <div className="w-full h-full rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                       <span className="text-sm font-bold text-[#646d87] dark:text-[#94a3b8] tracking-widest uppercase">Morning Break</span>
                     </div>
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
