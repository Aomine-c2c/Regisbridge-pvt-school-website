'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IDCard, TimetableGrid, StatBarList, NoticeBoard } from '@/components';
import type { TimetableLesson } from '@/components/ui/TimetableGrid';
import type { Notice } from '@/components/ui/NoticeBoard';

// Sample data
const TIMETABLE_LESSONS: TimetableLesson[] = [
  {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Mr. Davidson',
    room: 'Room 204',
    startTime: '09:00 AM',
    duration: '60 min',
    icon: 'calculate',
    status: 'past',
  },
  {
    id: '2',
    subject: 'Physics',
    teacher: 'Dr. Chen',
    room: 'Lab 3',
    startTime: '10:15 AM',
    duration: '60 min',
    icon: 'science',
    status: 'past',
  },
  {
    id: '3',
    subject: 'English Literature',
    teacher: 'Mrs. Thompson',
    room: 'Room 105',
    startTime: '11:30 AM',
    duration: '60 min',
    icon: 'menu_book',
    status: 'current',
  },
  {
    id: '4',
    subject: 'Chemistry',
    teacher: 'Mr. Wilson',
    room: 'Lab 1',
    startTime: '01:30 PM',
    duration: '60 min',
    icon: 'biotech',
    status: 'next',
  },
  {
    id: '5',
    subject: 'History',
    teacher: 'Ms. Roberts',
    room: 'Room 301',
    startTime: '02:45 PM',
    duration: '60 min',
    icon: 'history_edu',
    status: 'upcoming',
  },
];

const NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Sports Day Registrations Open',
    date: '2026-01-17',
    dateLabel: 'Today',
    category: 'Sports',
   urgent: false,
  },
  {
    id: '2',
    title: 'End of Term Exam Schedule Released',
    date: '2026-01-16',
    dateLabel: 'Yesterday',
    category: 'Academic',
    urgent: false,
  },
  {
    id: '3',
    title: 'New Library Hours for Finals Week',
    date: '2026-01-15',
    dateLabel: 'Jan 15',
    category: 'Facilities',
    urgent: false,
  },
];

const GRADE_STATS = [
  { label: 'Mathematics', value: 88, color: 'primary' as const },
  { label: 'Physics', value: 92, color: 'primary' as const },
  { label: 'English Lit', value: 76, color: 'gray' as const },
  { label: 'Chemistry', value: 85, color: 'primary' as const },
];

export default function StudentPortal() {
  return (
    <div className="bg-gray-50 text-gray-900 h-screen flex overflow-hidden font-display">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-navy text-white hidden md:flex flex-col shadow-2xl z-20 shrink-0">
        {/* Header */}
        <div className="h-20 flex items-center px-6 gap-3 border-b border-white/10">
          <div className="size-10 bg-white rounded-lg flex items-center justify-center text-brand-navy shadow-sm">
            <span className="material-symbols-outlined text-[28px]">school</span>
          </div>
          <div>
            <h2 className="text-lg font-bold leading-none tracking-tight">Regisbridge</h2>
            <span className="text-xs font-medium opacity-70 uppercase tracking-wider">Student Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="px-2 mb-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Menu</div>
          <Link
            href="/student"
            className="flex items-center gap-3 px-3 py-3 bg-white/10 text-white rounded-lg transition-colors border-l-4 border-brand-gold"
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
          <Link
            href="/student/timetable"
            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined text-[22px]">calendar_today</span>
            <span className="text-sm font-medium">My Timetable</span>
          </Link>
          <Link
            href="/student/assignments"
            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined text-[22px]">assignment</span>
            <span className="text-sm font-medium">Assignments</span>
            <span className="ml-auto bg-brand-gold text-brand-navy text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </Link>
          <Link
            href="/student/grades"
            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined text-[22px]">grade</span>
            <span className="text-sm font-medium">Grades</span>
          </Link>
          <Link
            href="/student/library"
            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined text-[22px]">local_library</span>
            <span className="text-sm font-medium">Library</span>
          </Link>

          <div className="px-2 mt-6 mb-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
            Activities
          </div>
          <Link
            href="/student-life"
            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined text-[22px]">groups</span>
            <span className="text-sm font-medium">Clubs & Sports</span>
          </Link>
          <Link
            href="/student/house"
            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white rounded-lg transition-colors border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-sm font-medium">House Points</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="bg-white/20 rounded-full size-10 border-2 border-white/30 flex items-center justify-center">
              <span className="text-sm font-bold">JA</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">James Anderson</p>
              <p className="text-xs text-white/60 truncate">Year 10 - Windsor House</p>
            </div>
            <span className="material-symbols-outlined text-white/60 ml-auto text-[20px]">logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 z-10 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900">My Dashboard</h1>
            <p className="text-xs text-gray-500">Friday, January 17, 2026</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative flex items-center justify-center size-9 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-2 size-2 bg-brand-gold rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-navy-dark rounded-xl p-6 mb-8 text-white shadow-lg relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Welcome back, James! 👋</h2>
                <p className="text-white/90">You have 3 assignments due this week and 1 upcoming test.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Timetable Component */}
                <TimetableGrid
                  lessons={TIMETABLE_LESSONS}
                  onViewFull={() => window.location.href = '/student/timetable'}
                />

                {/* Upcoming Assignments */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-gold">assignment</span>
                    Upcoming Assignments
                  </h3>
                  <div className="space-y-3">
                    {[
                      { subject: 'Mathematics', title: 'Calculus Problem Set 5', due: 'Jan 19', priority: 'high' },
                      { subject: 'Physics', title: 'Lab Report: Momentum', due: 'Jan 20', priority: 'medium' },
                      { subject: 'English', title: 'Essay: Shakespeare Analysis', due: 'Jan 22', priority: 'medium' },
                    ].map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-brand-navy transition-all"
                      >
                        <div>
                          <p className="font-bold text-gray-900">{assignment.title}</p>
                          <p className="text-xs text-gray-500">{assignment.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-700">Due {assignment.due}</p>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              assignment.priority === 'high'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-amber-100 text-amber-600'
                            }`}
                          >
                            {assignment.priority === 'high' ? 'Urgent' : 'Soon'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column - Sidebar */}
              <div className="flex flex-col gap-6">
                {/* Student ID Card */}
                <IDCard
                  studentName="James Anderson"
                  studentId="2023-1047"
                  house="Windsor"
                  grade="Year 10"
                  photo="https://i.pravatar.cc/150?img=12"
                />

                {/* Exam Results */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-gray-900 text-lg font-bold leading-tight">Recent Grades</h3>
                  </div>
                  <StatBarList stats={GRADE_STATS} />
                </section>

                {/* School Notices */}
                <NoticeBoard notices={NOTICES} maxDisplay={3} />

                {/* House Points */}
                <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2">Windsor House</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-black text-green-600">1,247</span>
                    <span className="text-sm text-gray-600">points</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    You contributed <span className="font-bold text-green-600">45 points</span> this term
                  </p>
                  <Link
                    href="/student/house"
                    className="text-sm font-bold text-green-600 hover:underline flex items-center gap-1"
                  >
                    View Leaderboard
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
