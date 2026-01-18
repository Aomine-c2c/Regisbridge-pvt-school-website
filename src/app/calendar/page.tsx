'use client';

import { useState } from 'react';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const CALENDAR_EVENTS = [
  { date: '2026-02-15', title: 'Parent-Teacher Conference', type: 'Academic', color: 'blue' },
  { date: '2026-02-20', title: 'Rugby Match vs St. Johns', type: 'Sports', color: 'green' },
  { date: '2026-02-25', title: 'Winter Concert', type: 'Arts', color: 'purple' },
  { date: '2026-03-01', title: 'Term Break Begins', type: 'Holiday', color: 'red' },
];

export default function CalendarPage() {
  const [selectedMonth] = useState('February 2026');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
            <p className="text-gray-600 mt-1">View all school events, term dates, and important deadlines</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMonth}</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
                  </div>
                </div>
                
                {/* Calendar Grid Placeholder */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">{day}</div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="aspect-square border border-gray-200 rounded-lg p-2 hover:bg-brand-navy/5 cursor-pointer">
                      <div className="text-sm font-medium">{(i % 28) + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {CALENDAR_EVENTS.map((event, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 bg-${event.color}-100 text-${event.color}-700`}>
                        {event.type}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{event.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Term Dates 2025-26</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold">Term 1</p>
                    <p className="text-gray-200">Sep 1 - Dec 15</p>
                  </div>
                  <div>
                    <p className="font-bold">Term 2</p>
                    <p className="text-gray-200">Jan 6 - Mar 20</p>
                  </div>
                  <div>
                    <p className="font-bold">Term 3</p>
                    <p className="text-gray-200">Apr 7 - Jun 25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
