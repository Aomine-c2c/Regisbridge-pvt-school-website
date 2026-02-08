'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface StudentData {
  profile: {
    name: string;
    grade: string;
    id: string;
    house: string;
  };
  stats: {
    pendingAssignments: number;
    upcomingTests: number;
    attendance: string;
    housePoints: number;
  };
  subjects: Array<{
    id: string;
    name: string;
    teacher: string;
    teacherAvatar?: string;
    grade: string;
    progress: number;
  }>;
  timetable: any[];
  assignments: Array<{
    id: string;
    title: string;
    subject: string;
    due: string;
    status: 'PENDING' | 'SUBMITTED' | 'OVERDUE';
    priority: 'high' | 'medium' | 'low';
  }>;
  grades: any[];
  performanceTrend: Array<{ term: string; score: number }>;
}

export default function StudentAcademicCommandCenter() {
  const { toast } = useToast();
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/student/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch student dashboard', error);
        toast({ title: 'Error', description: 'Could not load dashboard data', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const d = data || {
    profile: { name: 'Student', grade: '11', id: '0000', house: 'Science Stream' },
    stats: { pendingAssignments: 0, upcomingTests: 0, attendance: '0%', housePoints: 0 },
    subjects: [],
    timetable: [],
    assignments: [],
    grades: [],
    performanceTrend: []
  };

  // Calculate GPA from grades
  const calculateGPA = () => {
    if (!d.grades || d.grades.length === 0) return '0.0';
    const total = d.grades.reduce((sum: number, g: any) => sum + (g.percentage / 25), 0);
    return (total / d.grades.length).toFixed(1);
  };

  // Calculate attendance percentage
  const attendancePercentage = d.stats.attendance || '98%';

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 h-full flex-shrink-0 transition-colors duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="size-8 text-blue-600">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight tracking-tight text-gray-900">Regisbridge Academy</h1>
            <p className="text-xs text-gray-500">Student Portal</p>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4 gap-2 overflow-y-auto">
          {/* Student Profile */}
          <div className="flex items-center gap-3 px-3 py-1 mb-4">
            <div 
              className="bg-blue-100 rounded-full size-10 ring-2 ring-blue-200 flex items-center justify-center"
            >
              <span className="text-sm font-bold text-blue-600">{d.profile.name.substring(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-gray-900">{d.profile.name}</h2>
              <p className="text-xs text-gray-500">Grade {d.profile.grade} • {d.profile.house}</p>
            </div>
          </div>

          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2">Main Menu</p>

          <Link
            href="/student"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 group transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link href="/student/subjects" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all group">
            <span className="material-symbols-outlined text-[22px] group-hover:text-blue-600">library_books</span>
            <span className="text-sm font-medium">Subjects</span>
          </Link>

          <Link href="/student/timetable" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all group">
            <span className="material-symbols-outlined text-[22px] group-hover:text-blue-600">calendar_month</span>
            <span className="text-sm font-medium">Timetable</span>
          </Link>

          <Link href="/student/assignments" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all group">
            <span className="material-symbols-outlined text-[22px] group-hover:text-blue-600">assignment</span>
            <span className="text-sm font-medium">Assignments</span>
          </Link>

          <Link href="/student/grades" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all group">
            <span className="material-symbols-outlined text-[22px] group-hover:text-blue-600">insights</span>
            <span className="text-sm font-medium">Results</span>
          </Link>

          <div className="mt-auto">
            <Link href="/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all">
              <span className="material-symbols-outlined text-[22px]">help</span>
              <span className="text-sm font-medium">Support</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0 z-10">
          <button className="md:hidden p-2 text-gray-600">
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">search</span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Search subjects, assignments..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Title & Welcome */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900">Academic Command Center</h1>
                <p className="text-gray-500 mt-1">Here is your academic overview for Term 3.</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <span className="size-2 rounded-full bg-green-500"></span>
                  Active Term
                </span>
              </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Attendance */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{attendancePercentage}</h3>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <span className="material-symbols-outlined">diversity_3</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-medium text-green-600">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  +2% from last month
                </div>
              </div>

              {/* Behavior Score - Calculated from data */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Academic Status</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      {d.stats.housePoints || 95}
                      <span className="text-lg text-gray-400 font-medium">/100</span>
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-medium text-green-600">
                  <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                  Excellent Standing
                </div>
              </div>

              {/* GPA */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current GPA</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{calculateGPA()}</h3>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-medium text-gray-500">
                  <span className="material-symbols-outlined text-sm mr-1">update</span>
                  Last updated: Today
                </div>
              </div>

              {/* Assignments Pending */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Assignments Due</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{d.stats.pendingAssignments}</h3>
                  </div>
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                    <span className="material-symbols-outlined">assignment_late</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-medium text-gray-500">
                  2 due tomorrow
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Trend & Assignments (2/3 width) */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Performance Trend Chart */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Performance Trend</h3>
                    <select className="bg-gray-50 border-none text-xs font-semibold text-gray-600 rounded-lg py-1 px-3 focus:ring-0 cursor-pointer">
                      <option>This Year</option>
                      <option>Last Year</option>
                    </select>
                  </div>
                  <div className="relative h-64 w-full">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                      <div className="w-full border-b border-dashed border-gray-200 h-0"></div>
                      <div className="w-full border-b border-dashed border-gray-200 h-0"></div>
                      <div className="w-full border-b border-dashed border-gray-200 h-0"></div>
                      <div className="w-full border-b border-dashed border-gray-200 h-0"></div>
                      <div className="w-full border-b border-gray-200 h-0"></div>
                    </div>
                    {/* SVG Chart */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                      <defs>
                        <linearGradient id="gradientBlue" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2"></stop>
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <path d="M0,120 Q50,110 100,80 T200,60 T300,40 T400,30" fill="url(#gradientBlue)" stroke="none"></path>
                      <path d="M0,120 Q50,110 100,80 T200,60 T300,40 T400,30" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="3"></path>
                      <circle className="fill-white stroke-blue-600 stroke-2" cx="100" cy="80" r="4"></circle>
                      <circle className="fill-white stroke-blue-600 stroke-2" cx="200" cy="60" r="4"></circle>
                      <circle className="fill-white stroke-blue-600 stroke-2" cx="300" cy="40" r="4"></circle>
                      <circle className="fill-white stroke-blue-600 stroke-2" cx="400" cy="30" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex justify-between mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <span>Term 1</span>
                    <span>Term 2</span>
                    <span>Term 3</span>
                    <span>Term 4</span>
                  </div>
                </div>

                {/* Upcoming Assignments */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Assignments</h3>
                    <Link href="/student/assignments" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      View All
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {d.assignments.slice(0, 3).map((assignment, index) => (
                      <div
                        key={index}
                        className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            index === 0 ? 'bg-orange-100 text-orange-600' :
                            index === 1 ? 'bg-blue-100 text-blue-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            <span className="material-symbols-outlined text-xl">
                              {index === 0 ? 'science' : index === 1 ? 'history_edu' : 'calculate'}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{assignment.title}</h4>
                            <p className="text-xs text-gray-500">{assignment.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            {assignment.status === 'OVERDUE' ? 'Overdue' : formatDistanceToNow(new Date(assignment.due), { addSuffix: true })}
                          </span>
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            assignment.status === 'SUBMITTED' ? 'bg-green-100 text-green-700' :
                            assignment.status === 'OVERDUE' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {assignment.status === 'SUBMITTED' ? 'Submitted' :
                             assignment.status === 'OVERDUE' ? 'Overdue' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                    {d.assignments.length === 0 && (
                      <div className="p-8 text-center text-gray-500">
                        No upcoming assignments
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Subjects (1/3 width) */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Enrolled Subjects</h3>
                  <button className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                    <span className="material-symbols-outlined text-xl">add</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {d.subjects.slice(0, 3).map((subject, index) => (
                    <div
                      key={subject.id}
                      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-blue-500 transition-colors group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                          <span className="text-sm font-bold text-gray-600">
                            {subject.teacher.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          subject.grade >= 'A' ? 'bg-green-100 text-green-700' :
                          subject.grade >= 'B' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {subject.grade}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {subject.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{subject.teacher}</p>
                      <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${subject.progress}%` }}></div>
                      </div>
                      <p className="text-[10px] text-right text-gray-400 mt-1">{subject.progress}% Complete</p>
                    </div>
                  ))}
                  <button className="w-full py-3 text-sm font-medium text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                    View All {d.subjects.length} Subjects
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Spacer */}
            <div className="h-10"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
