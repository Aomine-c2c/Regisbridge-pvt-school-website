'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PremiumHeader } from '@/components/layout/PremiumHeader';
import { StatBarList, NoticeBoard } from '@/components';

interface StaffMetrics {
  studentsEnrolled: number;
  averageAttendance: string;
  pendingReviews: number;
  meetings: number;
}

interface ClassSchedule {
  id: string;
  time: string;
  class: string;
  subject: string;
  room: string;
  students: number;
}

interface Notice {
  id: string;
  date: string;
  dateLabel?: string;
  title: string;
  time?: string;
  location?: string;
  description?: string;
  priority: 'high' | 'normal';
}

interface StaffDashboardData {
  metrics: StaffMetrics;
  todaysClasses: ClassSchedule[];
  notices: Notice[];
}

const GRADE_STATS = [
  { label: 'Reports Submitted', value: 85, maxValue: 100, color: 'gold' as const },
  { label: 'Attendance Recorded', value: 100, maxValue: 100, color: 'green' as const },
  { label: 'Lesson Plans Updated', value: 75, maxValue: 100, color: 'gold' as const },
];

export default function StaffPortalPage() {
  const [data, setData] = useState<StaffDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hr/dashboard/staff');
        if (!response.ok) {
             // For safety, if unauthorized/not found, we might want to redirect or show placeholder
             // But for now, just show error
             throw new Error('Failed to fetch dashboard data');
        }
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-navy"></div>
      </div>
    );
  }

  // Fallback to placeholder if error (optional, but good for demo if API fails)
  // For now, I'll render the error state
  if (error) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) return null;

  const STAFF_STATS = [
    { stat: data.metrics.studentsEnrolled.toString(), label: 'Students Enrolled' },
    { stat: data.metrics.averageAttendance, label: 'Average Attendance' },
    { stat: data.metrics.pendingReviews.toString(), label: 'Pending Reviews' },
    { stat: data.metrics.meetings.toString(), label: 'Staff Meetings This Month' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PremiumHeader />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-brand-navy text-white p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Staff Portal</h2>
            <p className="text-sm text-gray-300 mt-1">Welcome</p>
          </div>

          <nav className="space-y-2">
            {[
              { icon: 'home', label: 'Dashboard', href: '/staff', active: true },
              { icon: 'groups', label: 'My Classes', href: '/staff/classes' },
              { icon: 'assignment', label: 'Grades & Reports', href: '/staff/grades' },
              { icon: 'event', label: 'Schedule', href: '/staff/schedule' },
              { icon: 'folder', label: 'Resources', href: '/staff/resources' },
              { icon: 'settings', label: 'Settings', href: '/staff/settings' },
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
              <p className="text-gray-600 mt-1">Overview of your teaching schedule and responsibilities</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {STAFF_STATS.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-black text-brand-navy mb-2">{stat.stat}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Today's Classes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Classes</h3>
                  {data.todaysClasses.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No classes scheduled for today.</p>
                  ) : (
                    <div className="space-y-4">
                        {data.todaysClasses.map((lesson, index) => (
                        <div key={lesson.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-16 text-center">
                            <div className="text-sm font-bold text-brand-navy">{lesson.time}</div>
                            </div>
                            <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{lesson.class}</h4>
                            <p className="text-xs text-gray-500 mb-1">{lesson.subject}</p>
                            <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">door_front</span>
                                {lesson.room}
                                </span>
                                <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">groups</span>
                                {lesson.students} students
                                </span>
                            </div>
                            </div>
                            <Link
                            href={`/staff/classes/${index}`}
                            className="px-4 py-2 bg-brand-navy text-white rounded-lg font-medium hover:bg-brand-navy-dark transition-colors text-sm"
                            >
                            View Class
                            </Link>
                        </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Task Progress */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Task Progress</h3>
                  <StatBarList stats={GRADE_STATS} />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'grade', text: 'Submitted grades for Year 11 Math Test', time: '2 hours ago' },
                      { type: 'message', text: 'New message from Sarah Chen (Parent)', time: '5 hours ago' },
                      { type: 'document', text: 'Updated lesson plan for Unit 5', time: '1 day ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <span className="material-symbols-outlined text-brand-navy mt-1">
                          {activity.type === 'grade' ? 'fact_check' : activity.type === 'message' ? 'mail' : 'description'}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-900">{activity.text}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <NoticeBoard notices={data.notices} />

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { icon: 'add', label: 'Create Assignment', href: '/staff/assignments/new' },
                      { icon: 'grade', label: 'Enter Grades', href: '/staff/grades' },
                      { icon: 'event', label: 'Book Meeting Room', href: '/staff/rooms' },
                      { icon: 'upload', label: 'Upload Resources', href: '/staff/resources' },
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
