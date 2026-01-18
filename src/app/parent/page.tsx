'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import { StatBarList, NoticeBoard } from '@/components';

const STUDENT_DATA = {
  name: 'Emma Wilson',
  grade: 'Year 11',
  house: 'Churchill House',
  id: 'RB-2024-1156',
};

const UPCOMING_EVENTS = [
  {
    date: '2026-02-15',
    dateLabel: 'Tomorrow',
    title: 'Parent-Teacher Conference',
    time: '2:00 PM - 5:00 PM',
    location: 'Main Hall',
    priority: 'high' as const,
  },
  {
    date: '2026-02-20',
    dateLabel: null,
    title: 'Payment Reminder: Term 2 Fees Due',
    description: 'Please ensure payment is completed by February 20th',
    priority: 'high' as const,
  },
];

const FEE_STATUS = [
  { subject: 'Tuition (Term 2)', value: 85, total: 100, color: 'green' as const },
  { subject: 'Boarding Fees', value: 100, total: 100, color: 'green' as const },
  { subject: 'Extra Activities', value: 60, total: 100, color: 'yellow' as const },
];

export default function ParentPortalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PremiumHeader />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-brand-navy text-white p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Parent Portal</h2>
            <p className="text-sm text-gray-300 mt-1">Welcome, Mrs. Wilson</p>
          </div>

          <nav className="space-y-2">
            {[
              { icon: 'home', label: 'Dashboard', href: '/parent', active: true },
              { icon: 'person', label: 'Student Profile', href: '/parent/profile' },
              { icon: 'school', label: 'Academic Progress', href: '/parent/academics' },
              { icon: 'payment', label: 'Fees & Payments', href: '/parent/financial' },
              { icon: 'event', label: 'Calendar', href: '/parent/calendar' },
              { icon: 'mail', label: 'Messages', href: '/parent/messages' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
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
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of {STUDENT_DATA.name}'s academic journey</p>
            </div>

            {/* Student Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-brand-navy/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-brand-navy text-4xl">person</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{STUDENT_DATA.name}</h2>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      {STUDENT_DATA.grade}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">home</span>
                      {STUDENT_DATA.house}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">badge</span>
                      ID: {STUDENT_DATA.id}
                    </div>
                  </div>
                </div>
                <Link
                  href="/parent/profile"
                  className="px-6 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white rounded-lg font-medium transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Academic Performance */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Overall Average', value: '87%', color: 'green' },
                      { label: 'Attendance', value: '96%', color: 'green' },
                      { label: 'Assignments', value: '18/20', color: 'yellow' },
                      { label: 'Class Rank', value: '5th', color: 'blue' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className={`text-2xl font-black text-${stat.color}-600 mb-1`}>{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fee Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Fee Payment Status</h3>
                    <Link href="/parent/financial" className="text-brand-navy font-medium text-sm hover:underline">
                      View Details
                    </Link>
                  </div>
                  <StatBarList stats={FEE_STATUS} />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'grade', title: 'New Grade Posted: Mathematics', time: '2 hours ago' },
                      { type: 'message', title: 'Message from Form Tutor', time: '1 day ago' },
                      { type: 'payment', title: 'Payment Received: Term 2 Tuition', time: '3 days ago' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-brand-navy text-[18px]">
                            {activity.type === 'grade' ? 'grade' : activity.type === 'message' ? 'mail' : 'payment'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <NoticeBoard notices={UPCOMING_EVENTS} />

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { icon: 'payment', label: 'Make Payment', href: '/parent/financial' },
                      { icon: 'event', label: 'Book Meeting', href: '/parent/meetings' },
                      { icon: 'mail', label: 'Send Message', href: '/parent/messages' },
                      { icon: 'download', label: 'Download Reports', href: '/parent/reports' },
                    ].map((action) => (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-brand-navy hover:bg-brand-navy/5 transition-all group"
                      >
                        <span className="material-symbols-outlined text-gray-600 group-hover:text-brand-navy text-[20px]">
                          {action.icon}
                        </span>
                        <span className="font-medium text-gray-700 group-hover:text-brand-navy">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
