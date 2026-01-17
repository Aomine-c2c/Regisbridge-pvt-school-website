'use client';

import { MaterialIcon } from '@/components/ui/material-icon';
import { StatCard } from '@/components/ui/stat-card';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="admin_panel_settings" className="text-design-primary" size="3xl" />
            <h1 className="text-xl font-bold">Admin Console</h1>
          </div>
          <div className="flex items-center gap-4">
            <MaterialIcon icon="settings" className="text-gray-600 dark:text-gray-400 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-design-primary text-white flex items-center justify-center font-bold">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-2">School Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Academic Year 2024-2025</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard icon="people" label="Total Students" value="856" trend="+12" />
          <StatCard icon="person" label="Staff Members" value="68" />
          <StatCard icon="account_balance_wallet" label="Revenue (Monthly)" value="$245K" trend="+8%" />
          <StatCard icon="school" label="Graduation Rate" value="98%" />
          <StatCard icon="rate_review" label="Avg. Rating" value="4.8/5" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Enrollment & Finance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrollment by Level */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Enrollment by Level</h3>
              <div className="space-y-4">
                {[
                  { level: 'ECD', count: 85, capacity: 100 },
                  { level: 'Primary', count: 320, capacity: 350 },
                  { level: 'Secondary', count: 285, capacity: 300 },
                  { level: 'Sixth Form', count: 166, capacity: 180 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.level}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.count}/{item.capacity} students</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-design-primary h-3 rounded-full" 
                        style={{ width: `${(item.count / item.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Financial Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400 mb-1">Fees Collected</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">$2.1M</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 mb-1">Outstanding</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">$385K</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Scholarships</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">$156K</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Expenses</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">$1.8M</p>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {[
                  { action: 'New student enrolled', user: 'Admissions Dept', time: '10 mins ago', icon: 'person_add' },
                  { action: 'Fee payment received', user: 'Finance Office', time: '25 mins ago', icon: 'payments' },
                  { action: 'Report card generated', user: 'Academic Office', time: '1 hour ago', icon: 'description' },
                  { action: 'Staff meeting scheduled', user: 'Admin', time: '2 hours ago', icon: 'event' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <MaterialIcon icon={item.icon} className="text-design-primary mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.user} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Quick Access & Alerts */}
          <div className="space-y-6">
            {/* System Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">System Management</h3>
              <div className="space-y-2">
                {[
                  { icon: 'people', label: 'User Management' },
                  { icon: 'payments', label: 'Fee Management' },
                  { icon: 'description', label: 'Reports & Analytics' },
                  { icon: 'settings', label: 'System Settings' },
                  { icon: 'security', label: 'Access Control' }
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left">
                    <MaterialIcon icon={item.icon} className="text-design-primary" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">System Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Server maintenance scheduled</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Tomorrow 2:00 AM</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">23 fee reminders pending</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">Requires attention</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-design-primary to-blue-700 text-white rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">New Applications</span>
                  <span className="text-2xl font-bold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Staff Hired</span>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Events Held</span>
                  <span className="text-2xl font-bold">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
