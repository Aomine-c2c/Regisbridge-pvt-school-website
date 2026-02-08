'use client';

import React from 'react';

export default function AttendancePage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-[#e2e8f0]">
      {/* Top Navbar skipped (part of layout usually) */}
      
      <main className="flex flex-1 overflow-hidden">
        {/* Left Panel: Calendar & Scheduler */}
        <section className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] relative">
          {/* Breadcrumbs & Header */}
          <div className="px-6 pt-5 pb-2 shrink-0">
            <div className="flex flex-wrap gap-2 mb-2 items-center text-sm">
              <span className="text-[#646d87] font-medium">Dashboard</span>
              <span className="text-[#646d87] material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-[#646d87] font-medium">HR Management</span>
              <span className="text-[#646d87] material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-[#111317] dark:text-white font-semibold">Leave & Substitution</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#111317] dark:text-white">Leave Calendar</h1>
                <p className="text-[#646d87] text-sm mt-1">Manage staff absences and coverage for Spring Semester 2024</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] rounded-lg text-sm font-medium text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-[#1349ec] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-none">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  New Request
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center shrink-0">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] rounded-lg text-sm text-[#646d87] hover:text-[#111317] dark:hover:text-white transition-colors">
                  <span>Department: <b>All</b></span>
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] rounded-lg text-sm text-[#646d87] hover:text-[#111317] dark:hover:text-white transition-colors">
                  <span>Type: <b>All Leaves</b></span>
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>
              <div className="h-9 w-[1px] bg-[#dcdee5] dark:bg-[#334155] mx-1 hidden md:block"></div>
              <div className="flex items-center bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] rounded-lg px-3 py-2 w-full md:w-64">
                <span className="material-symbols-outlined text-[#646d87] text-[18px]">search</span>
                <input className="border-none bg-transparent focus:ring-0 p-0 text-sm ml-2 w-full text-[#111317] dark:text-white placeholder:text-[#646d87]" placeholder="Find staff member..." type="text" />
              </div>
            </div>
            
            {/* View Switcher & Date Nav */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white dark:bg-[#1e293b] rounded-lg p-1 border border-[#dcdee5] dark:border-[#334155]">
                <button className="px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-[#646d87]">Day</button>
                <button className="px-3 py-1 rounded text-sm font-medium bg-[#1349ec]/10 text-[#1349ec] shadow-sm">Week</button>
                <button className="px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-[#646d87]">Month</button>
              </div>
              <div className="flex items-center gap-1">
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-[#646d87] transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="text-sm font-semibold text-[#111317] dark:text-white min-w-[100px] text-center">Oct 12 - 18</span>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-[#646d87] transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid Container */}
          <div className="flex-1 overflow-auto px-6 pb-6 no-scrollbar">
            <div className="bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] rounded-xl shadow-sm min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-[200px_repeat(5,_1fr)] border-b border-[#dcdee5] dark:border-[#334155] sticky top-0 bg-white dark:bg-[#1e293b] z-10 rounded-t-xl">
                <div className="p-4 text-xs font-bold uppercase tracking-wider text-[#646d87] border-r border-[#dcdee5] dark:border-[#334155] bg-gray-50/50 dark:bg-gray-800/50">Staff Member</div>
                <div className="p-3 text-center border-r border-[#dcdee5] dark:border-[#334155] last:border-r-0">
                  <div className="text-xs text-[#646d87] font-medium uppercase">Mon</div>
                  <div className="text-lg font-bold text-[#111317] dark:text-white">12</div>
                </div>
                <div className="p-3 text-center border-r border-[#dcdee5] dark:border-[#334155] last:border-r-0 bg-[#1349ec]/5">
                  <div className="text-xs text-[#1349ec] font-bold uppercase">Tue</div>
                  <div className="text-lg font-bold text-[#1349ec]">13</div>
                </div>
                {['14', '15', '16'].map((date, i) => (
                   <div key={date} className="p-3 text-center border-r border-[#dcdee5] dark:border-[#334155] last:border-r-0">
                    <div className="text-xs text-[#646d87] font-medium uppercase">{['Wed', 'Thu', 'Fri'][i]}</div>
                    <div className="text-lg font-bold text-[#111317] dark:text-white">{date}</div>
                  </div>
                ))}
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-[200px_repeat(5,_1fr)] border-b border-[#dcdee5] dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="p-4 flex items-center gap-3 border-r border-[#dcdee5] dark:border-[#334155]">
                  <div className="size-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">SJ</div>
                  <div>
                    <p className="text-sm font-semibold text-[#111317] dark:text-white">Sarah Jenkins</p>
                    <p className="text-xs text-[#646d87]">Science Dept</p>
                  </div>
                </div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155] relative col-span-3">
                  {/* Multi-day event */}
                  <div className="absolute inset-y-2 left-2 right-2 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 rounded text-xs p-2 flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-red-700 dark:text-red-300">Sick Leave</span>
                      <span className="bg-white dark:bg-gray-800 text-[#111317] dark:text-white px-1.5 py-0.5 rounded text-[10px] shadow-sm border border-gray-200 dark:border-gray-600">Pending Sub</span>
                    </div>
                    <span className="text-red-600/80 dark:text-red-400 text-[10px] mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">warning</span> No Coverage
                    </span>
                  </div>
                </div>
                <div className="border-r border-[#dcdee5] dark:border-[#334155] hidden"></div>
                <div className="border-r border-[#dcdee5] dark:border-[#334155] hidden"></div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]"></div>
                <div className="p-1"></div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-[200px_repeat(5,_1fr)] border-b border-[#dcdee5] dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="p-4 flex items-center gap-3 border-r border-[#dcdee5] dark:border-[#334155]">
                  <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">MR</div>
                  <div>
                    <p className="text-sm font-semibold text-[#111317] dark:text-white">Mark Rivera</p>
                    <p className="text-xs text-[#646d87]">Math Dept</p>
                  </div>
                </div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]"></div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]">
                  {/* Single day event */}
                  <div className="h-full bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded text-xs p-2 flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow mx-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300">Prof. Dev</span>
                    <span className="text-blue-600/80 dark:text-blue-400 text-[10px] mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span> Sub: A. Thompson
                    </span>
                  </div>
                </div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]"></div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]"></div>
                <div className="p-1"></div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-[200px_repeat(5,_1fr)] border-b border-[#dcdee5] dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="p-4 flex items-center gap-3 border-r border-[#dcdee5] dark:border-[#334155]">
                  <div className="size-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">EC</div>
                  <div>
                    <p className="text-sm font-semibold text-[#111317] dark:text-white">Emily Chen</p>
                    <p className="text-xs text-[#646d87]">Math Dept</p>
                  </div>
                </div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]"></div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155]"></div>
                <div className="p-1 border-r border-[#dcdee5] dark:border-[#334155] col-span-2 relative">
                  {/* Pending event */}
                  <div className="absolute inset-y-2 left-2 right-2 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-dashed border-yellow-400 rounded text-xs p-2 flex flex-col justify-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-yellow-700 dark:text-yellow-500">Requested</span>
                    </div>
                    <span className="text-yellow-600/80 dark:text-yellow-400 text-[10px] mt-1">Pending Approval</span>
                  </div>
                </div>
                <div className="border-r border-[#dcdee5] dark:border-[#334155] hidden"></div>
                <div className="p-1"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Action Panel */}
        <aside className="w-[400px] bg-white dark:bg-[#1e293b] border-l border-[#dcdee5] dark:border-[#334155] flex flex-col shrink-0 z-10 shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#dcdee5] dark:border-[#334155]">
            <button className="flex-1 py-4 text-sm font-bold text-[#1349ec] border-b-2 border-[#1349ec] bg-[#1349ec]/5">
              Pending Requests <span className="ml-2 bg-[#1349ec] text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
            </button>
            <button className="flex-1 py-4 text-sm font-medium text-[#646d87] hover:text-[#111317] dark:hover:text-white transition-colors">
              Substitution Needs <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-1.5 py-0.5 rounded-full">1</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
            {/* Request Card 1 (Active) */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-[#334155] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#1349ec]"></div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                   <div className="size-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-sm text-pink-600">EC</div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111317] dark:text-white">Emily Chen</h3>
                    <p className="text-xs text-[#646d87]">Math Teacher • Grade 10</p>
                  </div>
                </div>
                <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Personal</span>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#646d87] text-[18px]">calendar_month</span>
                  <span className="text-sm font-medium text-[#111317] dark:text-white">Oct 14 - Oct 15</span>
                  <span className="text-xs text-[#646d87] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">2 Days</span>
                </div>
                <p className="text-xs text-[#646d87] italic">"Attending a family wedding out of town."</p>
              </div>
              {/* Leave Balance */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#646d87]">Personal Leave Balance</span>
                  <span className="font-semibold text-[#111317] dark:text-white">5/10 Days</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              {/* Conflict Warning */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg p-3 mb-4 flex gap-2">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[18px] shrink-0">warning</span>
                <div>
                  <p className="text-xs font-bold text-red-800 dark:text-red-300">Staffing Conflict</p>
                  <p className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">2 other Math teachers are absent on Oct 14.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex justify-center items-center py-2 px-4 rounded-lg border border-[#dcdee5] dark:border-[#334155] text-sm font-medium text-[#646d87] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Deny
                </button>
                <button className="flex justify-center items-center py-2 px-4 rounded-lg bg-[#1349ec] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 dark:shadow-none">
                  Approve
                </button>
              </div>
            </div>
            
            {/* Substitution Widget (Inline) */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#111317] dark:text-white uppercase tracking-wider">Quick Substitute</h3>
                <a className="text-xs text-[#1349ec] font-medium hover:underline" href="#">View All Needs</a>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3 text-orange-800 dark:text-orange-200">
                  <span className="material-symbols-outlined">person_alert</span>
                  <span className="text-sm font-bold">Uncovered Class</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-[#1e293b] p-2.5 rounded-lg border border-orange-100 dark:border-gray-600 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#646d87] text-xs">Absent:</span>
                      <span className="font-medium text-[#111317] dark:text-white">Sarah Jenkins</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#646d87] text-xs">Class:</span>
                      <span className="font-medium text-[#111317] dark:text-white">Grade 9 Biology (Per 3)</span>
                    </div>
                  </div>
                  <div className="relative">
                    <select className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-[#1e293b] border border-[#dcdee5] dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-[#1349ec] focus:border-transparent appearance-none text-[#111317] dark:text-white">
                      <option disabled selected value="">Select Relief Teacher</option>
                      <option value="1">Amanda Thompson (Free)</option>
                      <option value="2">Robert Fox (Free)</option>
                      <option value="3">Lisa Ray (On Call)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#646d87]">
                      <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-[#111317] dark:bg-white text-white dark:text-[#111317] py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-[18px]">assignment_add</span>
                    Assign Substitute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
