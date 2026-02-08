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

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get motivational message based on stats
  const getMotivationalMessage = () => {
    const pending = d.stats.pendingAssignments;
    if (pending === 0) return 'All caught up! Great work! 🎉';
    if (pending <= 2) return 'Just a few tasks left. Keep it up! 💪';
    return 'Stay focused—you\'ve got this! 🚀';
  };

  // Calculate GPA from grades
  const calculateGPA = () => {
    if (!d.grades || d.grades.length === 0) return '0.0';
    const total = d.grades.reduce((sum: number, g: any) => sum + (g.percentage / 25), 0);
    return (total / d.grades.length).toFixed(1);
  };

  // Deadline urgency calculator
  const getDeadlineUrgency = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilDue < 0) return { level: 'overdue', color: 'red', icon: 'error' };
    if (hoursUntilDue < 24) return { level: 'urgent', color: 'red', icon: 'warning' };
    if (hoursUntilDue < 72) return { level: 'soon', color: 'orange', icon: 'schedule' };
    return { level: 'normal', color: 'gray', icon: 'schedule' };
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
            {/* Enhanced Welcome Section */}
            <div className="bg-gradient-to-r from-brand-navy to-blue-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-4xl text-brand-gold">wb_sunny</span>
                      <div>
                        <p className="text-sm text-blue-200">{getGreeting()},</p>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{d.profile.name}</h1>
                      </div>
                    </div>
                    <p className="text-blue-100 mt-3 text-base max-w-2xl">
                      {getMotivationalMessage()}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30">
                      <span className="size-2 rounded-full bg-green-400 animate-pulse"></span>
                      Term 3 Active
                    </span>
                    {d.stats.pendingAssignments === 0 && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 text-brand-gold">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        All Caught Up!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Row with Better Hierarchy */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Attendance */}
              <Link href="/student/attendance" className="group">
                <div className="bg-white p-6 rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Attendance Rate</p>
                      <h3 className="text-3xl font-black text-gray-900 mt-2">{attendancePercentage}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <span className="material-symbols-outlined text-2xl">diversity_3</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-green-600">
                    <span className="material-symbols-outlined text-base mr-1">trending_up</span>
                    +2% from last month
                  </div>
                </div>
              </Link>

              {/* House Points */}
              <Link href="/student/house" className="group">
                <div className="bg-white p-6 rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">House Points</p>
                      <h3 className="text-3xl font-black text-gray-900 mt-2">
                        {d.stats.housePoints || 95}
                        <span className="text-lg text-gray-400 font-medium ml-1">pts</span>
                      </h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-100 transition-colors">
                      <span className="material-symbols-outlined text-2xl">star</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-purple-600">
                    <span className="material-symbols-outlined text-base mr-1">check_circle</span>
                    Top 15% in {d.profile.house}
                  </div>
                </div>
              </Link>

              {/* GPA */}
              <Link href="/student/grades" className="group">
                <div className="bg-white p-6 rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Current GPA</p>
                      <h3 className="text-3xl font-black text-gray-900 mt-2">{calculateGPA()}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-100 transition-colors">
                      <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-gray-500">
                    <span className="material-symbols-outlined text-base mr-1">update</span>
                    Updated Today
                  </div>
                </div>
              </Link>

              {/* Assignments Pending with urgency */}
              <Link href="/student/assignments" className="group">
                <div className={`p-6 rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full ${
                  d.stats.pendingAssignments > 5 ? 'bg-red-50 border-red-200 hover:border-red-400' :
                  d.stats.pendingAssignments > 2 ? 'bg-orange-50 border-orange-200 hover:border-orange-400' :
                  d.stats.pendingAssignments > 0 ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-400' :
                  'bg-green-50 border-green-200 hover:border-green-400'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Assignments Due</p>
                      <h3 className="text-3xl font-black text-gray-900 mt-2">{d.stats.pendingAssignments}</h3>
                    </div>
                    <div className={`p-3 rounded-xl transition-colors ${
                      d.stats.pendingAssignments > 5 ? 'bg-red-100 text-red-600' :
                      d.stats.pendingAssignments > 2 ? 'bg-orange-100 text-orange-600' :
                      d.stats.pendingAssignments > 0 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <span className="material-symbols-outlined text-2xl">
                        {d.stats.pendingAssignments === 0 ? 'check_circle' : 'assignment_late'}
                      </span>
                    </div>
                  </div>
                  <div className={`mt-4 flex items-center text-xs font-bold ${
                    d.stats.pendingAssignments > 5 ? 'text-red-700' :
                    d.stats.pendingAssignments > 2 ? 'text-orange-700' :
                    d.stats.pendingAssignments > 0 ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    <span className="material-symbols-outlined text-base mr-1">
                      {d.stats.pendingAssignments === 0 ? 'celebration' : 'warning'}
                    </span>
                    {d.stats.pendingAssignments === 0 ? 'All caught up!' : '2 due within 24h'}
                  </div>
                </div>
              </Link>
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
                    {d.assignments.slice(0, 3).map((assignment, index) => {
                      const urgency = getDeadlineUrgency(assignment.due);
                      return (
                        <div
                          key={index}
                          className={`p-5 hover:bg-gray-50 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-l-4 ${
                            urgency.level === 'overdue' ? 'border-l-red-500 bg-red-50/30' :
                            urgency.level === 'urgent' ? 'border-l-orange-500 bg-orange-50/30' :
                            urgency.level === 'soon' ? 'border-l-yellow-500' :
                            'border-l-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`size-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                              index === 0 ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700' :
                              index === 1 ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700' :
                              'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700'
                            }`}>
                              <span className="material-symbols-outlined text-2xl font-bold">
                                {index === 0 ? 'science' : index === 1 ? 'history_edu' : 'calculate'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-gray-900 mb-1">{assignment.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="font-medium">{assignment.subject}</span>
                                <span className="text-gray-300">•</span>
                                <span className="flex items-center gap-1">
                                  <span className={`material-symbols-outlined text-sm text-${urgency.color}-600`}>{urgency.icon}</span>
                                  {assignment.status === 'OVERDUE' ? (
                                    <span className="font-bold text-red-600">Overdue</span>
                                  ) : (
                                    <span>Due {formatDistanceToNow(new Date(assignment.due), { addSuffix: true })}</span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            {urgency.level === 'urgent' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">
                                <span className="material-symbols-outlined text-sm">priority_high</span>
                                Urgent
                              </span>
                            )}
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                              assignment.status === 'SUBMITTED' ? 'bg-green-100 text-green-700 border border-green-200' :
                              assignment.status === 'OVERDUE' ? 'bg-red-100 text-red-700 border border-red-200' :
                              'bg-yellow-100 text-yellow-700 border border-yellow-200'
                            }`}>
                              {assignment.status === 'SUBMITTED' ? '✓ Submitted' :
                               assignment.status === 'OVERDUE' ? '⚠ Overdue' : '○ Pending'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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
