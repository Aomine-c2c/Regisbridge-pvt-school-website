'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function AdminConsolePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PremiumHeader />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-brand-navy text-white p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Admin Console</h2>
            <p className="text-sm text-gray-300 mt-1">Management Dashboard</p>
          </div>

          <nav className="space-y-2">
            {[
              { icon: 'dashboard', label: 'Overview', href: '/admin', active: true },
              { icon: 'groups', label: 'User Management', href: '/admin/users' },
              { icon: 'school', label: 'Student Records', href: '/admin/students' },
              { icon: 'person', label: 'Staff Directory', href: '/admin/staff' },
              { icon: 'insert_chart', label: 'Analytics', href: '/admin/analytics' },
              { icon: 'settings', label: 'System Settings', href: '/admin/settings' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">System Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Students', value: '450', icon: 'school' },
                { label: 'Total Staff', value: '85', icon: 'person' },
                { label: 'Active Courses', value: '120', icon: 'menu_book' },
                { label: 'System Health', value: '98%', icon: 'check_circle' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-brand-navy">{stat.icon}</span>
                  </div>
                  <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'person_add', label: 'Add User' },
                  { icon: 'upload', label: 'Bulk Import' },
                  { icon: 'download', label: 'Export Data' },
                  { icon: 'mail', label: 'Send Notice' },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-brand-navy hover:bg-brand-navy/5 transition-all"
                  >
                    <span className="material-symbols-outlined text-brand-navy text-[32px]">{action.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: 'New student enrolled', time: '10 minutes ago' },
                  { action: 'Staff member updated profile', time: '1 hour ago' },
                  { action: 'System backup completed', time: '3 hours ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700">{activity.action}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
