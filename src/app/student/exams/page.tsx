'use client';

import React, { useEffect, useState } from 'react';

interface ExamSchedule {
  id: string;
  date: string;
  formattedDate: string;
  time: string;
  subject: string;
  paper: string;
  venue: string;
  duration: string;
  durationFormatted: string;
}

interface NearestExam extends ExamSchedule {
    title: string;
    subtitle: string;
}

interface ExamStudentData {
  upcomingExams: ExamSchedule[];
  nearestExam: NearestExam | null;
}

export default function StudentExamSchedulePage() {
  const [data, setData] = useState<ExamStudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Countdown State
  const [timeLeft, setTimeLeft] = useState<{days: string, hours: string, mins: string, secs: string}>({
      days: '00', hours: '00', mins: '00', secs: '00'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/exams/dashboard/student');
        if (!response.ok) {
            if (response.status === 404) {
                 setError("Student profile not found.");
            } else {
                 throw new Error('Failed to fetch exams data');
            }
            return;
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

  // Countdown Logic
  useEffect(() => {
      if (!data?.nearestExam) return;

      const targetDate = new Date(`${data.nearestExam.date.split('T')[0]}T${data.nearestExam.time}`);
      
      const updateTimer = () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();

          if (diff <= 0) {
              setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
              return;
          }

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeLeft({
              days: days.toString().padStart(2, '0'),
              hours: hours.toString().padStart(2, '0'),
              mins: mins.toString().padStart(2, '0'),
              secs: secs.toString().padStart(2, '0')
          });
      };

      updateTimer(); // Initial call
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval);
  }, [data?.nearestExam]);


  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c] px-4 md:px-10 py-3 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4 text-[#111317] dark:text-white">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h2 className="text-[#111317] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Student Portal</h2>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 lg:gap-9">
            <a className="text-[#646d87] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
            <a className="text-primary dark:text-blue-400 text-sm font-bold leading-normal" href="#">Exams</a>
            <a className="text-[#646d87] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Grades</a>
            <a className="text-[#646d87] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Resources</a>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col items-center flex-1 w-full py-8 px-4 md:px-10 overflow-y-auto">
        <div className="w-full max-w-6xl space-y-8 pb-10">
          {/* Hero Section: Countdown & Action */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Countdown Card */}
            <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-center">
              {data.nearestExam ? (
                  <>
                    <div className="flex flex-col gap-2 mb-6">
                        <h1 className="text-[#111317] dark:text-white tracking-light text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">
                        {data.nearestExam.title}
                        </h1>
                        <p className="text-[#646d87] dark:text-slate-400 text-base font-normal leading-normal">
                        {data.nearestExam.subtitle}
                        </p>
                    </div>
                    <div className="flex gap-3 md:gap-4 w-full">
                        <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-16 md:h-20 grow items-center justify-center rounded-lg px-3 bg-[#f0f1f4] dark:bg-slate-800 border-2 border-transparent dark:border-slate-700">
                            <p className="text-[#111317] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">{timeLeft.days}</p>
                        </div>
                        <div className="flex items-center justify-center"><p className="text-[#646d87] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Days</p></div>
                        </div>
                        <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-16 md:h-20 grow items-center justify-center rounded-lg px-3 bg-[#f0f1f4] dark:bg-slate-800 border-2 border-transparent dark:border-slate-700">
                            <p className="text-[#111317] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">{timeLeft.hours}</p>
                        </div>
                        <div className="flex items-center justify-center"><p className="text-[#646d87] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Hours</p></div>
                        </div>
                        <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-16 md:h-20 grow items-center justify-center rounded-lg px-3 bg-[#f0f1f4] dark:bg-slate-800 border-2 border-transparent dark:border-slate-700">
                            <p className="text-[#111317] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">{timeLeft.mins}</p>
                        </div>
                        <div className="flex items-center justify-center"><p className="text-[#646d87] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Mins</p></div>
                        </div>
                        <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-16 md:h-20 grow items-center justify-center rounded-lg px-3 bg-[#f0f1f4] dark:bg-slate-800 border-2 border-transparent dark:border-slate-700">
                            <p className="text-[#111317] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em]">{timeLeft.secs}</p>
                        </div>
                        <div className="flex items-center justify-center"><p className="text-[#646d87] dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Secs</p></div>
                        </div>
                    </div>
                  </>
              ) : (
                  <div className="text-center py-8">
                      <h3 className="text-xl font-bold text-[#111317] dark:text-white mb-2">No Upcoming Exams</h3>
                      <p className="text-[#646d87] dark:text-slate-400">You're all clear! No exams scheduled for your grade.</p>
                  </div>
              )}
            </div>
            {/* Call to Action Card */}
            <div className="bg-primary text-white rounded-xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="material-symbols-outlined text-[200px]">assignment</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Candidate Slip Ready</h3>
                <p className="text-blue-100 mb-6 max-w-sm">Ensure you print your candidate slip and bring it to the examination venue. Digital copies are not accepted.</p>
              </div>
              <div className="relative z-10">
                <button className="flex w-full md:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-primary hover:bg-blue-50 transition-colors gap-3 text-base font-bold leading-normal tracking-[0.015em] shadow-sm">
                  <span className="material-symbols-outlined">download</span>
                  <span className="truncate">Download Candidate Slip</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Exam Schedule Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-between items-end gap-3 px-1">
              <div className="flex min-w-72 flex-col gap-1">
                <p className="text-[#111317] dark:text-white text-2xl font-bold leading-tight tracking-[-0.033em]">Exam Schedule</p>
                <p className="text-[#646d87] dark:text-slate-400 text-sm font-normal leading-normal">View your upcoming examination dates, venues, and revision materials.</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  Sync to Calendar
                </button>
              </div>
            </div>
            
            {/* Table Container */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-4 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 uppercase">Date & Time</th>
                      <th className="p-4 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 uppercase">Subject & Paper</th>
                      <th className="p-4 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 uppercase">Venue</th>
                      <th className="p-4 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 uppercase">Duration</th>
                      <th className="p-4 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 uppercase text-right">Revision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.upcomingExams.length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-500">No exams scheduled.</td></tr>
                    ) : (
                        data.upcomingExams.map((exam, index) => (
                            <tr key={exam.id} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${index === 0 ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                                <td className="p-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#111317] dark:text-white">{exam.formattedDate}</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{exam.time}</span>
                                </div>
                                </td>
                                <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">school</span>
                                    </div>
                                    <div className="flex flex-col">
                                    <span className="font-semibold text-[#111317] dark:text-white">{exam.subject}</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{exam.paper}</span>
                                    </div>
                                </div>
                                </td>
                                <td className="p-4">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    {exam.venue}
                                </div>
                                </td>
                                <td className="p-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                                    {exam.durationFormatted}
                                </span>
                                </td>
                                <td className="p-4 text-right">
                                <a className="inline-flex items-center gap-1 text-primary hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors" href="#">
                                    <span>Resources</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </a>
                                </td>
                            </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Footer-like Note */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg">
            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 shrink-0">warning</span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-yellow-800 dark:text-yellow-500">Important Notice</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400/80">
                Students must arrive at the examination venue at least 15 minutes before the scheduled start time. 
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
