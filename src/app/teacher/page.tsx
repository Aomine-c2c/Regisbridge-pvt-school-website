'use client';

import { MaterialIcon } from '@/components/ui/material-icon';
import { StatCard } from '@/components/ui/stat-card';
import { BadgeNew } from '@/components/ui/badge-new';

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" className="text-design-primary" size="3xl" />
            <h1 className="text-xl font-bold">Staff Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <MaterialIcon icon="notifications" className="text-gray-600 dark:text-gray-400 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-design-primary text-white flex items-center justify-center font-bold">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-2">Good Morning, Mr. Doe</h2>
          <p className="text-gray-600 dark:text-gray-400">Mathematics Department • Form 4 Tutor</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon="people" label="Total Students" value="156" />
          <StatCard icon="assignment" label="Pending Grading" value="23" />
          <StatCard icon="event" label="Classes Today" value="5" />
          <StatCard icon="warning" label="Alerts" value="2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {[
                  { time: '8:00 AM', class: '4A Mathematics', room: 'Room 201', status: 'upcoming' },
                  { time: '10:00 AM', class: '4B Mathematics', room: 'Room 201', status: 'upcoming' },
                  { time: '2:00 PM', class: 'Tutor Session', room: 'Office', status: 'upcoming' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm font-bold text-design-primary">{item.time}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{item.class}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.room}</p>
                    </div>
                    <BadgeNew variant="primary" size="sm">Active</BadgeNew>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Recent Submissions</h3>
              <div className="space-y-2">
                {[
                  { student: 'John Smith', assignment: 'Algebra Problem Set', time: '2 hours ago' },
                  { student: 'Mary Johnson', assignment: 'Algebra Problem Set', time: '3 hours ago' },
                  { student: 'David Lee', assignment: 'Geometry Quiz', time: '5 hours ago' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.student}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.assignment}</p>
                    </div>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: 'edit_note', label: 'Mark Attendance' },
                  { icon: 'grade', label: 'Enter Grades' },
                  { icon: 'assignment', label: 'Create Assignment' },
                  { icon: 'forum', label: 'Message Parents' }
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left">
                    <MaterialIcon icon={action.icon} className="text-design-primary" />
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Class Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Class 4A Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average Score</span>
                    <span className="text-sm font-bold">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-design-primary h-2 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Attendance Rate</span>
                    <span className="text-sm font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
