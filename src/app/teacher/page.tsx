'use client';

import { useEffect, useState } from 'react';
import { MaterialIcon } from '@/components/ui/material-icon';
import { StatCard } from '@/components/ui/stat-card';
import { BadgeNew } from '@/components/ui/badge-new';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface TeacherData {
  profile: {
    name: string;
    department: string;
    formClass: string;
  };
  stats: {
    totalStudents: number;
    pendingGrading: number;
    classesToday: number;
    alerts: number;
  };
  schedule: Array<{
    time: string;
    class: string;
    room: string;
    status: string;
  }>;
  recentSubmissions: Array<{
    student: string;
    assignment: string;
    time: string;
  }>;
}

export default function TeacherDashboard() {
  const { toast } = useToast();
  const [data, setData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/teacher/dashboard', {
             headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
             }
        });
        
        if (res.status === 401 || res.status === 403) {
             // Handle auth error
        }

        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch teacher dashboard', error);
        toast({ title: 'Error', description: 'Could not load dashboard data', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [toast]);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Motivational message based on stats
  const getMotivationalMessage = () => {
    if (d.stats.pendingGrading === 0) return "🎉 All caught up on grading! Great work!";
    if (d.stats.pendingGrading <= 5) return "💪 You're almost there! Just a few more to grade.";
    if (d.stats.alerts > 0) return "⚠️ Some students need your attention today.";
    return "📚 Ready to make a difference today!";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">Loading dashboard...</div>;
  }

  // Fallback data
  const d = data || {
      profile: { name: 'Teacher', department: 'General', formClass: 'None' },
      stats: { totalStudents: 0, pendingGrading: 0, classesToday: 0, alerts: 0 },
      schedule: [],
      recentSubmissions: []
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Enhanced Hero Section */}
        <div className="bg-gradient-to-r from-brand-navy to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-6 sm:mb-8">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-brand-gold">wb_sunny</span>
              <div>
                <p className="text-sm text-blue-200">{getGreeting()},</p>
                <h2 className="text-2xl sm:text-3xl font-black">{d.profile.name}</h2>
              </div>
            </div>
            <p className="text-blue-100 mt-2 text-sm sm:text-base">{d.profile.department} Department • {d.profile.formClass !== 'N/A' && `Form Tutor: ${d.profile.formClass}`}</p>
            <p className="text-brand-gold font-medium mt-3">{getMotivationalMessage()}</p>
          </div>
        </div>

        {/* Enhanced Stat Cards with Gradients */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Students */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-3xl opacity-80">people</span>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">Total</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-1">{d.stats.totalStudents}</div>
            <p className="text-sm text-blue-100">Students</p>
          </div>

          {/* Pending Grading */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-3xl opacity-80">assignment</span>
              {d.stats.pendingGrading > 0 && (
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full animate-pulse">Urgent</span>
              )}
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-1">{d.stats.pendingGrading}</div>
            <p className="text-sm text-orange-100">Pending Grading</p>
          </div>

          {/* Classes Today */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-3xl opacity-80">event</span>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">Today</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-1">{d.stats.classesToday}</div>
            <p className="text-sm text-green-100">Classes</p>
          </div>

          {/* Alerts */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-3xl opacity-80">warning</span>
              {d.stats.alerts > 0 && (
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">!</span>
              )}
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-1">{d.stats.alerts}</div>
            <p className="text-sm text-red-100">Alerts</p>
          </div>
        </div>

        {/* Actionable Insights Bar */}
        {(d.stats.pendingGrading > 0 || d.stats.alerts > 0) && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg mb-6 sm:mb-8">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 text-2xl">lightbulb</span>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 mb-2">Action Required</h3>
                <div className="space-y-1 text-sm text-amber-800">
                  {d.stats.pendingGrading > 0 && (
                    <p>• <a href="/teacher/grades" className="font-medium underline hover:text-amber-900">{d.stats.pendingGrading} assignment{d.stats.pendingGrading !== 1 ? 's' : ''} waiting for your review</a></p>
                  )}
                  {d.stats.alerts > 0 && (
                    <p>• <a href="/teacher/attendance" className="font-medium underline hover:text-amber-900">{d.stats.alerts} student{d.stats.alerts !== 1 ? 's need' : ' needs'} your attention</a></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {d.schedule.length > 0 ? d.schedule.map((item, i) => (
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
                )) : (
                    <div className="text-center py-6 text-gray-500">No classes scheduled for today.</div>
                )}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Recent Submissions</h3>
              <div className="space-y-2">
                {d.recentSubmissions.length > 0 ? d.recentSubmissions.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.student}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.assignment}</p>
                    </div>
                    <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(item.time), { addSuffix: true })}</span>
                  </div>
                )) : (
                    <div className="text-center py-6 text-gray-500">No pending submissions.</div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: 'edit_note', label: 'Mark Attendance', href: '/teacher/attendance' },
                  { icon: 'grade', label: 'Enter Grades', href: '/teacher/grades' },
                  { icon: 'assignment', label: 'Create Assignment', href: '/teacher/assignments' },
                  { icon: 'class', label: 'My Classes', href: '/teacher/classes' }
                ].map((action, i) => (
                  <a key={i} href={action.href} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left">
                    <MaterialIcon icon={action.icon} className="text-design-primary" />
                    <span className="font-medium">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>

             {/* Class Performance (Visual Only Logic for now) */}
             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Class Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average Score</span>
                    <span className="text-sm font-bold">--%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-design-primary h-2 rounded-full" style={{ width: '0%' }} />
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
