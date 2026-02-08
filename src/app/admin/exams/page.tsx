'use client';

import React, { useEffect, useState } from 'react';

interface ExamSchedule {
  id: string;
  paperCode: string;
  paperName: string;
  date: string;
  time: string;
  candidates: number;
  venue: string;
  status: string;
}

interface ExamAdminData {
  metrics: {
    totalSessions: number;
    invigilatorsAssigned: string;
    venueConflicts: number;
    studentsRegistered: number;
  };
  schedules: ExamSchedule[];
}

export default function ExamSessionManagementPage() {
  const [data, setData] = useState<ExamAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/exams/dashboard/admin');
        if (!response.ok) throw new Error('Failed to fetch exams data');
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

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f7f8] dark:bg-[#111521]">
      {/* Header */}
      <header className="bg-white dark:bg-[#1a202c] border-b border-[#dcdee5] dark:border-[#2d3748] px-6 py-4 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <a className="text-[#646d87] dark:text-gray-400 hover:text-primary" href="#">Home</a>
          <span className="text-[#646d87] dark:text-gray-400">/</span>
          <a className="text-[#646d87] dark:text-gray-400 hover:text-primary" href="#">Academics</a>
          <span className="text-[#646d87] dark:text-gray-400">/</span>
          <span className="text-[#111317] dark:text-white font-medium">Exam Session Management</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#111317] dark:text-white mb-1">Exam Session Management</h1>
            <p className="text-[#646d87] dark:text-gray-400 text-sm md:text-base">Master planning center for O-Level and A-Level national and internal examinations.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2d3748] border border-[#dcdee5] dark:border-[#4a5568] rounded-lg text-[#111317] dark:text-white text-sm font-bold hover:bg-[#f0f1f4] dark:hover:bg-[#4a5568] transition-colors">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Collision Check</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Create New Session</span>
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-[#1a202c] rounded-lg p-5 border border-[#dcdee5] dark:border-[#2d3748] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#646d87] dark:text-gray-400 text-sm font-medium mb-1">Total Exam Sessions</p>
                <h3 className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.totalSessions}</h3>
              </div>
              <span className="text-[#07883d] bg-[#07883d]/10 px-2 py-0.5 rounded text-xs font-bold">+12%</span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a202c] rounded-lg p-5 border border-[#dcdee5] dark:border-[#2d3748] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#646d87] dark:text-gray-400 text-sm font-medium mb-1">Invigilators Assigned</p>
                <h3 className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.invigilatorsAssigned}</h3>
              </div>
              <div className="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined text-sm">warning</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a202c] rounded-lg p-5 border border-[#dcdee5] dark:border-[#2d3748] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#646d87] dark:text-gray-400 text-sm font-medium mb-1">Venue Conflicts</p>
                <h3 className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.venueConflicts}</h3>
              </div>
              <span className="text-[#646d87] dark:text-gray-400 text-xs font-medium bg-[#f0f1f4] dark:bg-[#2d3748] px-2 py-0.5 rounded">All Clear</span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a202c] rounded-lg p-5 border border-[#dcdee5] dark:border-[#2d3748] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#646d87] dark:text-gray-400 text-sm font-medium mb-1">Students Registered</p>
                <h3 className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.studentsRegistered}</h3>
              </div>
              <span className="text-[#07883d] bg-[#07883d]/10 px-2 py-0.5 rounded text-xs font-bold">+5%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Calendar View Placeholder - Can be made interactive later */}
          <div className="xl:w-1/3 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a202c] rounded-lg border border-[#dcdee5] dark:border-[#2d3748] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#f0f1f4] dark:border-[#2d3748] flex justify-between items-center">
                <h2 className="text-base font-bold text-[#111317] dark:text-white">Session Calendar</h2>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-[#f0f1f4] dark:hover:bg-[#2d3748] rounded text-[#646d87] dark:text-gray-400">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <span className="text-sm font-semibold text-[#111317] dark:text-white">Current Month</span>
                  <button className="p-1 hover:bg-[#f0f1f4] dark:hover:bg-[#2d3748] rounded text-[#646d87] dark:text-gray-400">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-center min-h-[300px] text-gray-500">
                  Calendar integration coming soon.
              </div>
            </div>
            {/* Conflicts Alert */}
            <div className="bg-white dark:bg-[#1a202c] rounded-lg border border-[#dcdee5] dark:border-[#2d3748] shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
                <h3 className="text-base font-bold text-[#111317] dark:text-white">Collision Check</h3>
              </div>
              <p className="text-sm text-[#646d87] dark:text-gray-400 mb-4">No critical collisions detected for the current session plan.</p>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
              <p className="text-xs text-[#646d87] dark:text-gray-500 text-right">System verified just now</p>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="flex-1 bg-white dark:bg-[#1a202c] rounded-lg border border-[#dcdee5] dark:border-[#2d3748] shadow-sm flex flex-col min-h-[500px]">
            <div className="p-4 border-b border-[#f0f1f4] dark:border-[#2d3748] flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-4">
                <h2 className="text-lg font-bold text-[#111317] dark:text-white">Scheduled Exams</h2>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative grow sm:grow-0">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#646d87] dark:text-gray-400 text-[20px]">search</span>
                  <input
                    className="pl-9 pr-4 py-1.5 w-full sm:w-64 border border-[#dcdee5] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] rounded-md text-sm text-[#111317] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Search papers..."
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fa] dark:bg-[#1f2937] text-[#646d87] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-[#dcdee5] dark:border-[#2d3748]">
                    <th className="p-4 w-12 text-center">
                      <input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
                    </th>
                    <th className="p-4">Exam Paper</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Candidates</th>
                    <th className="p-4">Venue</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f1f4] dark:divide-[#2d3748] text-sm text-[#111317] dark:text-gray-200">
                  {data.schedules.length === 0 ? (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500">No scheduled exams found.</td></tr>
                  ) : (
                      data.schedules.map((exam) => (
                        <tr key={exam.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                            <td className="p-4 text-center">
                            <input className="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
                            </td>
                            <td className="p-4">
                            <div className="font-bold text-[#111317] dark:text-white">{exam.paperCode}</div>
                            <div className="text-xs text-[#646d87] dark:text-gray-400">{exam.paperName}</div>
                            </td>
                            <td className="p-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#646d87] text-[16px]">calendar_today</span>
                                <span>{exam.date}</span>
                            </div>
                            <div className="text-xs text-[#646d87] dark:text-gray-400 mt-1 pl-6">{exam.time}</div>
                            </td>
                            <td className="p-4 font-medium">{exam.candidates} Students</td>
                            <td className="p-4">
                            <span className="px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800 text-xs font-semibold">{exam.venue}</span>
                            </td>
                            <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                exam.status === 'Finalized' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${exam.status === 'Finalized' ? 'bg-green-600' : 'bg-amber-600'}`}></span>
                                {exam.status}
                            </span>
                            </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-[#f0f1f4] dark:border-[#2d3748] flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#646d87] dark:text-gray-400">Showing {data.schedules.length} entries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
