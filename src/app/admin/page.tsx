'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';


interface AdminStats {
  totalEnrollment: number;
  enrollmentChange: number;
  facultyStaff: number;
  staffChange: number;
  dailyAttendance: number;
  attendanceChange: number;
  outstandingFees: number;
  overdueAccounts: number;
}

interface Activity {
  icon: string;
  color: string;
  title: string;
  time: string;
  detail: string;
}

interface RecentAdmission {
  name: string;
  grade: string;
  status: string;
  date: string;
  statusColor: string;
}

export default function AdminDashboardCommandCenter() {
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [recentAdmissions, setRecentAdmissions] = useState<RecentAdmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        if (json.success) {
          setStats(json.data.stats || getMockStats());
          setActivities(json.data.activities || getMockActivities());
          setRecentAdmissions(json.data.recentAdmissions || []);
        } else {
          setStats(getMockStats());
          setActivities(getMockActivities());
          setRecentAdmissions([]);
        }
      } catch (error) {
        console.error(error);
        setStats(getMockStats());
        setActivities(getMockActivities());
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getMockStats = (): AdminStats => ({
    totalEnrollment: 1245,
    enrollmentChange: 12,
    facultyStaff: 142,
    staffChange: 4,
    dailyAttendance: 96.8,
    attendanceChange: -0.5,
    outstandingFees: 42000,
    overdueAccounts: 28,
  });

  const getMockActivities = (): Activity[] => [
    { icon: 'edit_document', color: 'blue', title: 'New enrollment application received', time: '2 mins ago', detail: 'Applicant #4029' },
    { icon: 'payments', color: 'yellow', title: 'Tuition payment processed', time: '15 mins ago', detail: '$12,500.00' },
    { icon: 'campaign', color: 'gray', title: 'Emergency drill scheduled', time: '1 hr ago', detail: 'System Admin' },
  ];

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading dashboard...</div>;

  const currentStats = stats || getMockStats();

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 font-sans">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 z-10">
          <h2 className="text-xl font-bold text-gray-900">Command Center</h2>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                className="h-10 w-80 rounded-lg border-none bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
                placeholder="Search students, staff, reports..."
                type="text"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Enrollment */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Enrollment</h3>
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-800">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentStats.totalEnrollment.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-green-600 font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> {currentStats.enrollmentChange}%
                  </span>
                  <span className="text-gray-500">vs last year</span>
                </div>
              </div>
            </div>

            {/* Faculty Staff */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Faculty Staff</h3>
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <span className="material-symbols-outlined text-[20px]">school</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentStats.facultyStaff}</div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-green-600 font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> {currentStats.staffChange}%
                  </span>
                  <span className="text-gray-500">new hires</span>
                </div>
              </div>
            </div>

            {/* Daily Attendance */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Daily Attendance</h3>
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{currentStats.dailyAttendance}%</div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-red-500 font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px]">trending_down</span> {Math.abs(currentStats.attendanceChange)}%
                  </span>
                  <span className="text-gray-500">vs yesterday</span>
                </div>
              </div>
            </div>

            {/* Outstanding Fees */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Outstanding Fees</h3>
                  <div className="p-2 bg-red-50 rounded-lg text-red-500">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">${(currentStats.outstandingFees / 1000).toFixed(0)}k</div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-gray-500">{currentStats.overdueAccounts} accounts overdue</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Financial Overview Chart */}
            <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Revenue vs Outstanding</h3>
                  <p className="text-sm text-gray-500">Fiscal Year 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-800"></span>
                    <span className="text-xs text-gray-500">Collected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                    <span className="text-xs text-gray-500">Pending</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="relative h-64 w-full flex items-end justify-between gap-4 px-2">
                {/* Background grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-xs text-gray-500">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 w-full h-0"></div>
                  ))}
                </div>

                {/* Quarters */}
                {[
                  { collected: 65, pending: 15 },
                  { collected: 72, pending: 10 },
                  { collected: 55, pending: 25 },
                  { collected: 80, pending: 5 },
                ].map((quarter, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 z-10 group">
                    <div className="w-full max-w-[40px] flex flex-col-reverse h-52 gap-1">
                      <div
                        className="bg-blue-800 w-full rounded-t-sm group-hover:bg-blue-700 transition-colors"
                        style={{ height: `${quarter.collected}%` }}
                      ></div>
                      <div
                        className="bg-gray-300 w-full rounded-b-sm group-hover:bg-gray-400 transition-colors"
                        style={{ height: `${quarter.pending}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">Q{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Performance & Activity */}
            <div className="flex flex-col gap-6">
              {/* Performance Index */}
              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Performance Index</h3>
                  <span className="material-symbols-outlined text-gray-400">more_horiz</span>
                </div>
                <div className="relative flex items-center justify-center py-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gray-900">85%</span>
                    <p className="text-xs text-gray-500 mt-1">Target: 90%</p>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500 mt-2">Overall institution academic rating based on recent standardized testing.</p>
              </div>

              {/* Activity Log */}
              <div className="flex-1 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Log</h3>
                <div className="flex flex-col gap-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 text-${activity.color}-600 flex items-center justify-center flex-shrink-0`}>
                        <span className="material-symbols-outlined text-sm">{activity.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-900 font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time} • {activity.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Admissions Table */}
          <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Recent Admissions</h3>
              <button className="text-sm font-medium text-blue-800 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              {recentAdmissions.length > 0 ? (
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Grade</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Application Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentAdmissions.map((student, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                          {student.name.substring(0, 2)}
                        </div>
                        {student.name}
                      </td>
                      <td className="px-6 py-4">{student.grade}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full bg-${student.statusColor}-50 px-2 py-1 text-xs font-medium text-${student.statusColor}-700 ring-1 ring-inset ring-${student.statusColor}-600/20`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{student.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-500 hover:text-blue-800 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <div className="p-6 text-center text-gray-500">No recent admissions found.</div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
