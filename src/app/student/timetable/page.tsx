'use client';

import { useState, useEffect } from 'react';
import { PremiumHeader } from '@/components/layout/PremiumHeader';
import { PremiumFooter } from '@/components/layout/PremiumFooter';
import { useToast } from '@/components/ui/use-toast';

interface Lesson {
    time: string;
    subject: string;
    teacher: string;
    room: string;
    type: 'lesson' | 'break';
}

interface WeeklySchedule {
    [key: string]: Lesson[];
}

export default function WeeklyTimetablePage() {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<WeeklySchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('Monday');

  useEffect(() => {
    const fetchTimetable = async () => {
        try {
            const res = await fetch('/api/student/timetable', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (res.status === 401) {
                // handle auth redirect if needed
                return;
            }

            const json = await res.json();
            if (json.success) {
                setSchedule(json.data);
                // Set active day to today if it's a weekday
                const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(today)) {
                    setActiveDay(today);
                }
            }
        } catch (error) {
            console.error(error);
            toast({ title: 'Error', description: 'Failed to load timetable', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    fetchTimetable();
  }, [toast]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeDay === day 
                      ? 'bg-brand-gold text-brand-navy font-bold' 
                      : 'bg-brand-navy text-white hover:bg-brand-navy-dark'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[400px]">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
                </div>
            ) : !schedule ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    Failed to load timetable data.
                </div>
            ) : schedule[activeDay] ? (
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
                      {schedule[activeDay].map((lesson, i) => (
                        <tr key={i} className={`border-b border-gray-200 ${lesson.type === 'break' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-4 font-medium text-gray-900">{lesson.time}</td>
                          <td className={`px-6 py-4 font-bold ${lesson.type === 'break' ? 'text-gray-500 italic' : 'text-brand-navy'}`}>
                            {lesson.subject}
                          </td>
                          <td className="px-6 py-4 text-gray-700">{lesson.teacher}</td>
                          <td className="px-6 py-4 text-gray-600">{lesson.room}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            ) : (
                <div className="p-8 text-center text-gray-500">No classes scheduled for this day.</div>
            )}
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

