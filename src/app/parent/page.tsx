'use client';

import { MaterialIcon } from '@/components/ui/material-icon';
import { StatCard } from '@/components/ui/stat-card';
import { BadgeNew } from '@/components/ui/badge-new';
import Link from 'next/link';

/**
 * Parent Portal Dashboard - Redesigned
 * Modern dashboard with quick actions, student info, and updates
 */

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" className="text-design-primary" size="3xl" />
            <h1 className="text-xl font-bold">Parent Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <MaterialIcon icon="notifications" className="text-gray-600 dark:text-gray-400 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-design-primary text-white flex items-center justify-center font-bold">
              AM
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-2">Welcome, Mr. Mutimbire</h2>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your child</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
<StatCard icon="grade" label="Overall Grade" value="87%" trend="+3%" />
          <StatCard icon="assignment" label="Assignments Due" value="4" />
          <StatCard icon="event" label="Upcoming Events" value="6" />
          <StatCard icon="account_balance_wallet" label="Balance Due" value="$2,450" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Student Info & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Student Profile</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h4 className="font-bold">Armut Mutimbire</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Form 4A • Student ID: 2024-0156</p>
                  <BadgeNew variant="success" size="sm">Active</BadgeNew>
                </div>
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Recent Grades</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', grade: '92%', status: 'success' },
                  { subject: 'Physics', grade: '88%', status: 'success' },
                  { subject: 'English', grade: '76%', status: 'warning' },
                  { subject: 'Chemistry', grade: '85%', status: 'success' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-medium">{item.subject}</span>
                    <BadgeNew variant={item.status as any}>{item.grade}</BadgeNew>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Upcoming Assignments</h3>
              <div className="space-y-3">
                {[
                  { title: 'Physics Lab Report', due: 'Oct 28, 2023', subject: 'Physics' },
                  { title: 'English Essay', due: 'Oct 30, 2023', subject: 'English' },
                  { title: 'Math Problem Set', due: 'Nov 2, 2023', subject: 'Math' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <MaterialIcon icon="assignment" className="text-design-primary mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.subject} • Due {item.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Announcements */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: 'payments', label: 'Pay Fees', href: '#' },
                  { icon: 'calendar_month', label: 'View Calendar', href: '#' },
                  { icon: 'message', label: 'Message Teacher', href: '#' },
                  { icon: 'download', label: 'Download Report', href: '#' }
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    <MaterialIcon icon={action.icon} className="text-design-primary" />
                    <span className="font-medium">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">School Announcements</h3>
              <div className="space-y-4">
                {[
                  { title: 'Parent-Teacher Meetings', date: 'Nov 5' },
                  { title: 'Sports Day Preparations', date: 'Nov 10' },
                  { title: 'End of Term Exams', date: 'Dec 1-8' }
                ].map((item, i) => (
                  <div key={i} className="pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <h4 className="font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">This Week's Attendance</h3>
              <div className="flex justify-around">
                {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${i < 4 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} flex items-center justify-center font-bold mb-1`}>
                      {i < 4 ? '✓' : day}
                    </div>
                    <span className="text-xs text-gray-600">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
