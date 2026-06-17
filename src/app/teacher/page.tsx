'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import {
  Users,
  ClipboardList,
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  GraduationCap,
  Plus,
  Search,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AtRiskStudentsWidget } from '@/components/analytics/AtRiskStudentsWidget';
import { AcademicTrendsWidget } from '@/components/analytics/AcademicTrendsWidget';
import { ClassInsightsCard } from '@/components/analytics/ClassInsightsCard';

interface TeacherData {
  profile: {
    name: string;
    department: string;
    formClass: string;
    role: string;
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
    subject?: string;
  }>;
  recentSubmissions: Array<{
    student: string;
    assignment: string;
    time: string;
    avatar?: string;
  }>;
  classes: Array<{
    id: string;
    name: string;
  }>;
}

export default function TeacherCommandCenter() {
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
             // Handle auth error - ideally redirect
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

  // Mock data fallback
  const d = data || {
      profile: { name: 'Teacher', department: 'Loading...', formClass: '...', role: 'Teacher' },
      stats: { totalStudents: 0, pendingGrading: 0, classesToday: 0, alerts: 0 },
      schedule: [],
      recentSubmissions: [],
      classes: []
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
            <p className="text-muted-foreground text-sm">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-navy">
            {getGreeting()}, {d.profile.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground">
            {d.profile.department} Department • {d.profile.formClass !== 'N/A' ? `Form Tutor: ${d.profile.formClass}` : 'No Form Class'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
             <CalendarIcon className="h-4 w-4" />
             Schedule
          </Button>
          <Button className="gap-2 bg-brand-primary hover:bg-brand-primary/90">
             <Plus className="h-4 w-4" />
             New Assignment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{d.stats.totalStudents}</div>
            <p className="text-xs text-blue-600/80 mt-1">Across all classes</p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-md transition-shadow cursor-pointer border-l-4 ${d.stats.pendingGrading > 0 ? 'border-l-amber-500 bg-amber-50/30' : 'bg-white'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-navy">Needs Grading</CardTitle>
            <ClipboardList className={`h-4 w-4 ${d.stats.pendingGrading > 0 ? 'text-amber-600' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-navy">{d.stats.pendingGrading}</div>
            <p className="text-xs text-muted-foreground mt-1">
                {d.stats.pendingGrading > 0 ? 'Submissions pending review' : 'All caught up!'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-navy">Classes Today</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-navy">{d.stats.classesToday}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled sessions</p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-md transition-shadow cursor-pointer ${d.stats.alerts > 0 ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${d.stats.alerts > 0 ? 'text-red-700' : 'text-brand-navy'}`}>Alerts</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${d.stats.alerts > 0 ? 'text-red-600' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${d.stats.alerts > 0 ? 'text-red-700' : 'text-brand-navy'}`}>{d.stats.alerts}</div>
            <p className={`text-xs mt-1 ${d.stats.alerts > 0 ? 'text-red-600/80' : 'text-muted-foreground'}`}>Attention required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">

        {/* Analytics Section - Full Width on Mobile, Col-span-7 on Desktop */}
        <div className="md:col-span-7 grid gap-6 md:grid-cols-2 mb-2">
            <AtRiskStudentsWidget endpoint="/api/teacher/analytics/at-risk" />
            <AcademicTrendsWidget endpoint="/api/teacher/analytics/trends" />
        </div>
        
        {/* Main Left Column (Schedule & Submissions) */}
        <div className="md:col-span-4 space-y-6">
            
            {/* Today's Schedule Information */}
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-brand-primary" />
                        Today's Schedule
                    </CardTitle>
                    <CardDescription>Your timeline for {format(new Date(), 'EEEE, MMMM do')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {d.schedule.length > 0 ? (
                        <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-2">
                            {d.schedule.map((item, i) => (
                                <div key={i} className="relative pl-6">
                                    <span className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white ring-1 ring-slate-200 ${item.status === 'upcoming' ? 'bg-brand-primary' : 'bg-slate-300'}`}></span>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div>
                                            <p className="text-sm font-bold text-brand-navy">{item.time}</p>
                                            <h4 className="font-semibold text-base mt-0.5">{item.class}</h4>
                                            {item.room && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> {item.room}</p>}
                                        </div>
                                        <Badge variant={item.status === 'upcoming' ? 'default' : 'secondary'} className="w-fit">
                                            {item.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                             No classes scheduled for today. Enjoy your prep time!
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Recent Submissions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {d.recentSubmissions.length > 0 ? d.recentSubmissions.map((sub, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-xs font-bold">
                                            {sub.student.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{sub.student}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{sub.assignment}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-muted-foreground block">{new Date(sub.time).toLocaleDateString()}</span>
                                    <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-700 p-0 mt-1">Review</Button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-muted-foreground">No recent submissions found.</div>
                        )}
                        <Button variant="outline" className="w-full text-sm">View All Submissions</Button>
                    </div>
                </CardContent>
            </Card>

        </div>

        {/* Right Column (Quick Actions & Tools) */}
        <div className="md:col-span-3 space-y-6">
            
            {/* Quick Actions Panel */}
            <Card className="bg-brand-navy text-white border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                    <Link href="/teacher/attendance" className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-center gap-2">
                        <Users className="h-6 w-6 text-brand-gold" />
                        <span className="text-xs font-medium">Attendance</span>
                    </Link>
                    <Link href="/teacher/grades" className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-center gap-2">
                        <GraduationCap className="h-6 w-6 text-brand-gold" />
                        <span className="text-xs font-medium">Gradebook</span>
                    </Link>
                    <Link href="/teacher/assignments/create" className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-center gap-2">
                        <Plus className="h-6 w-6 text-brand-gold" />
                        <span className="text-xs font-medium">Create New</span>
                    </Link>
                    <Link href="/teacher/resources" className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-center gap-2">
                        <BookOpen className="h-6 w-6 text-brand-gold" />
                        <span className="text-xs font-medium">Resources</span>
                    </Link>
                </CardContent>
            </Card>

            {/* Teaching Groups List */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">My Classes</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                    {d.classes.length > 0 ? d.classes.map((cls: any) => (
                         <div key={cls.id} className="group flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-brand-primary/20 hover:bg-blue-50/50 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    {cls.name.substring(0, 2)}
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-brand-navy">{cls.name}</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-brand-primary transition-colors" />
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No classes assigned.</p>
                    )}
                    <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">View All Classes</Button>
                </CardContent>
            </Card>
            
            {/* AI Class Insights */}
            {d.classes.length > 0 && (
                <div className="space-y-2">
                     <p className="text-xs font-semibold text-brand-navy/70 uppercase tracking-wider px-1">
                        AI Assistant
                     </p>
                    <ClassInsightsCard 
                        classId={d.classes[0].id} 
                        schoolClassName={d.classes[0].name} 
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

