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
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" className="text-design-primary" size="3xl" />
            <h1 className="text-xl font-bold">Staff Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <MaterialIcon icon="notifications" className="text-gray-600 dark:text-gray-400 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-design-primary text-white flex items-center justify-center font-bold">
              {d.profile.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mb-2">Good Morning, {d.profile.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{d.profile.department} Department • {d.profile.formClass !== 'N/A' && `Form Tutor: ${d.profile.formClass}`}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon="people" label="Total Students" value={d.stats.totalStudents.toString()} />
          <StatCard icon="assignment" label="Pending Grading" value={d.stats.pendingGrading.toString()} />
          <StatCard icon="event" label="Classes Today" value={d.stats.classesToday.toString()} />
          <StatCard icon="warning" label="Alerts" value={d.stats.alerts.toString()} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
