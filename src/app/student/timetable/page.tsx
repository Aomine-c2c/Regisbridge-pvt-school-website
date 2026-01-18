'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import { TimetableGrid } from '@/components';

const FULL_WEEK_SCHEDULE = {
  Monday: [
    { time: '8:00-9:00', subject: 'Mathematics', teacher: 'Dr. Anderson', room: 'Room 204' },
    { time: '9:15-10:15', subject: 'English Literature', teacher: 'Ms. Parker', room: 'Room 105' },
    { time: '10:30-11:30', subject: 'Physics', teacher: 'Mr. Kumar', room: 'Lab 3' },
    { time: '11:45-12:45', subject: 'History', teacher: 'Dr. Chen', room: 'Room 301' },
    { time: '13:00-14:00', subject: 'Lunch Break', teacher: '', room: 'Dining Hall' },
    { time: '14:00-15:00', subject: 'French', teacher: 'Mme. Dubois', room: 'Room 210' },
    { time: '15:15-16:15', subject: 'PE', teacher: 'Coach Williams', room: 'Sports Hall' },
  ],
  Tuesday: [
    { time: '8:00-9:00', subject: 'Chemistry', teacher: 'Dr. Martinez', room: 'Lab 2' },
    { time: '9:15-10:15', subject: 'Mathematics', teacher: 'Dr. Anderson', room: 'Room 204' },
    { time: '10:30-11:30', subject: 'English Literature', teacher: 'Ms. Parker', room: 'Room 105' },
    { time: '11:45-12:45', subject: 'Art', teacher: 'Ms. Rodriguez', room: 'Art Studio' },
    { time: '13:00-14:00', subject: 'Lunch Break', teacher: '', room: 'Dining Hall' },
    { time: '14:00-15:00', subject: 'Biology', teacher: 'Dr. Thompson', room: 'Lab 1' },
    { time: '15:15-16:15', subject: 'Music', teacher: 'Mr. Harrison', room: 'Music Room' },
  ],
  // Similar for other days...
};

export default function WeeklyTimetablePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Weekly Timetable - Year 11</h1>
            <p className="text-gray-600 mt-1">Full week schedule with all lessons and activities</p>
          </div>

          {/* Day Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <button
                  key={day}
                  className="px-6 py-3 bg-brand-navy text-white rounded-lg font-medium whitespace-nowrap first:bg-brand-gold first:text-brand-navy"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brand-navy text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Time</th>
                    <th className="px-6 py-4 text-left font-bold">Subject</th>
                    <th className="px-6 py-4 text-left font-bold">Teacher</th>
                    <th className="px-6 py-4 text-left font-bold">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_WEEK_SCHEDULE.Monday.map((lesson, i) => (
                    <tr key={i} className={`border-b border-gray-200 ${lesson.subject === 'Lunch Break' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{lesson.time}</td>
                      <td className="px-6 py-4 font-bold text-brand-navy">{lesson.subject}</td>
                      <td className="px-6 py-4 text-gray-700">{lesson.teacher}</td>
                      <td className="px-6 py-4 text-gray-600">{lesson.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Print & Export */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-brand-navy hover:bg-brand-navy-dark text-white py-3 rounded-lg font-bold transition-colors">
              Print Timetable
            </button>
            <button className="flex-1 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5 py-3 rounded-lg font-bold transition-colors">
              Download PDF
            </button>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
