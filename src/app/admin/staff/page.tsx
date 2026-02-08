'use client';

import React, { useEffect, useState } from 'react';

interface StaffProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  lastActive: string;
  email: string;
}

interface ActivityLogItem {
    id: number;
    text: string;
    time: string;
    type: string;
}

interface HRAdminData {
  metrics: {
    totalStaff: number;
    activeStaff: number;
    academicPercentage: number;
    attendanceToday: number;
    pendingLeaves: number;
    renewalsDue: number;
  };
  staffList: StaffProfile[];
  activityLog: ActivityLogItem[];
}

export default function StaffPage() {
  const [data, setData] = useState<HRAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDepartment, setFilterDepartment] = useState('All Departments');
  const [filterRole, setFilterRole] = useState('All Roles');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hr/dashboard/admin');
        if (!response.ok) throw new Error('Failed to fetch HR data');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred while loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) return null;

  // Filter Logic
  const filteredStaff = data.staffList.filter(staff => {
      if (filterDepartment !== 'All Departments' && staff.department !== filterDepartment) return false;
      // Role filtering would need more complex logic based on role string, skipping for MVP simplicity or add basic check
      return true;
  });

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#111521] text-[#111318] dark:text-[#e2e8f0] font-sans">
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#616b89] mb-1">
              <span>Admin Portal</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#1349ec] font-medium">HR Dashboard</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#0a192f] dark:text-white">Staff Command Center</h1>
            <p className="text-[#616b89] mt-2">Manage personnel, track attendance, and oversee contract renewals.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold text-[#111318] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1349ec] hover:bg-[#0c32a6] rounded-lg text-sm font-bold text-white transition-colors shadow-sm shadow-blue-500/30">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Onboard New Staff
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Card 1: Total Staff */}
          <div className="bg-white dark:bg-[#1a202c] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#1349ec]"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[#616b89] text-xs font-bold uppercase tracking-wider">Total Staff</p>
                <h3 className="text-2xl font-black text-[#111318] dark:text-white mt-1">{data.metrics.totalStaff}</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[#1349ec]">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Active</span>
                  <span className="font-bold text-[#111318] dark:text-gray-200">{Math.round((data.metrics.activeStaff / data.metrics.totalStaff) * 100) || 0}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#1349ec] h-1.5 rounded-full" style={{ width: `${(data.metrics.activeStaff / data.metrics.totalStaff) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Attendance */}
          <div className="bg-white dark:bg-[#1a202c] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[#616b89] text-xs font-bold uppercase tracking-wider">Attendance Today</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-black text-[#111318] dark:text-white">{data.metrics.attendanceToday}%</h3>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span>+2%
                  </span>
                </div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
            </div>
            <p className="text-xs text-[#616b89]">{data.metrics.totalStaff - Math.round((data.metrics.attendanceToday/100) * data.metrics.totalStaff)} staff members absent today</p>
          </div>

          {/* Card 3: Pending Leave */}
          <div className="bg-white dark:bg-[#1a202c] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[#616b89] text-xs font-bold uppercase tracking-wider">Pending Leave</p>
                <h3 className="text-2xl font-black text-[#111318] dark:text-white mt-1">{data.metrics.pendingLeaves}</h3>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 relative">
                {data.metrics.pendingLeaves > 0 && <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-white"></span>}
                <span className="material-symbols-outlined">rule</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Action Required</span>
            </div>
          </div>

          {/* Card 4: Renewals */}
          <div className="bg-white dark:bg-[#1a202c] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[#616b89] text-xs font-bold uppercase tracking-wider">Renewals Due</p>
                <h3 className="text-2xl font-black text-[#111318] dark:text-white mt-1">{data.metrics.renewalsDue}</h3>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                <span className="material-symbols-outlined">contract</span>
              </div>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
               {/* Mock avatars for renewals */}
               <div className="size-6 rounded-full ring-2 ring-white dark:ring-[#1a202c] bg-gray-200 flex items-center justify-center text-[8px] font-bold">SJ</div>
               <div className="flex items-center justify-center size-6 rounded-full ring-2 ring-white dark:ring-[#1a202c] bg-gray-100 text-[10px] font-bold text-gray-500">Due</div>
            </div>
          </div>
        </div>

        {/* Main Workspace (Table + Sidebar) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Staff Directory Section (Left) */}
          <div className="xl:col-span-9 bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col">
            {/* Toolbar */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
              <h3 className="text-lg font-bold text-[#111318] dark:text-white">Staff Directory</h3>
              <div className="flex flex-wrap items-center gap-3">
                {/* Filters */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select 
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 bg-[#f0f1f4] dark:bg-gray-800 text-sm font-medium rounded-lg border-none focus:ring-0 text-[#111318] dark:text-white cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <option>All Departments</option>
                      {Array.from(new Set(data.staffList.map(s => s.department))).map(d => <option key={d}>{d}</option>)}
                    </select>
                    <span className="material-symbols-outlined text-gray-500 absolute right-2 top-2 pointer-events-none text-[20px]">expand_more</span>
                  </div>
                </div>
                {/* Table Search */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400 text-[20px]">search</span>
                  <input className="pl-9 pr-4 py-2 bg-white dark:bg-[#101522] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-[#1349ec] focus:ring-1 focus:ring-[#1349ec] w-48 lg:w-64" placeholder="Search name or ID..." type="text" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f9fafb] dark:bg-gray-800/50 sticky top-0 z-10 text-xs uppercase text-[#616b89] font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Staff Member</th>
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Role</th>
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Department</th>
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Status</th>
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">Last Active</th>
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredStaff.length === 0 ? (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500">No staff found.</td></tr>
                  ) : (
                      filteredStaff.map((staff) => (
                        <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                            <div className={`size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0`}>
                                {staff.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#111318] dark:text-white">{staff.name}</p>
                                <p className="text-xs text-[#616b89]">ID: #{staff.id}</p>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#111318] dark:text-gray-200">{staff.role}</td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            {staff.department}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            staff.status === 'Active' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-transparent' 
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-transparent'
                            }`}>
                            {staff.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#616b89]">{staff.lastActive}</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-[#1349ec] transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                            <span className="material-symbols-outlined">more_vert</span>
                            </button>
                        </td>
                        </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <p className="text-sm text-[#616b89]">Showing {filteredStaff.length} staff</p>
            </div>
          </div>

          {/* Quick Actions Sidebar (Right) */}
          <div className="xl:col-span-3 flex flex-col gap-6">
            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-5">
              <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1349ec]">bolt</span>
                Quick Actions
              </h3>
              <div className="flex flex-col gap-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#1349ec]/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#111318] dark:text-white text-sm group-hover:text-[#1349ec]">Onboard New Staff</span>
                    <span className="material-symbols-outlined text-gray-400 text-[18px] group-hover:text-[#1349ec]">arrow_forward</span>
                  </div>
                  <p className="text-xs text-[#616b89]">Start background check & entry</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#1349ec]/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#111318] dark:text-white text-sm group-hover:text-[#1349ec]">Generate Staff Report</span>
                    <span className="material-symbols-outlined text-gray-400 text-[18px] group-hover:text-[#1349ec]">arrow_forward</span>
                  </div>
                  <p className="text-xs text-[#616b89]">Download PDF summary</p>
                </button>
              </div>
            </div>

            {/* Activity Log Mini-feed */}
            <div className="bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#111318] dark:text-white">Activity Log</h3>
                <a className="text-xs font-semibold text-[#1349ec] hover:underline" href="#">View All</a>
              </div>
              <div className="space-y-5 relative">
                {/* Timeline Line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700"></div>
                {data.activityLog.map((log) => (
                    <div key={log.id} className="flex gap-4 relative">
                    <div className="size-5 rounded-full bg-blue-100 border-2 border-white dark:border-[#1a202c] z-10 flex items-center justify-center shrink-0">
                        <div className="size-2 rounded-full bg-[#1349ec]"></div>
                    </div>
                    <div>
                        <p className="text-sm text-[#111318] dark:text-gray-200 leading-tight">{log.text}</p>
                        <p className="text-xs text-[#616b89] mt-1">{log.time}</p>
                    </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
