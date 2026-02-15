'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  GraduationCap, 
  TrendingUp, 
  Trophy,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  timetable: Array<{
    id: string;
    subject: string;
    time: string;
    room: string;
    status: string;
    teacher: string;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    subject: string;
    due: string;
    status: 'PENDING' | 'SUBMITTED' | 'OVERDUE';
    priority: 'high' | 'medium' | 'low';
  }>;
  grades: Array<{
    label: string,
    value: number,
    max: number,
    color: string
  }>;
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
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [toast]);

  const d = data || {
    profile: { name: 'Student', grade: '11', id: '0000', house: 'Science Stream' },
    stats: { pendingAssignments: 0, upcomingTests: 0, attendance: '0%', housePoints: 0 },
    subjects: [],
    timetable: [],
    assignments: [],
    grades: []
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
            <p className="text-muted-foreground text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 p-1">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-navy to-blue-700 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 translate-y-[-10%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 translate-x-[-10%] translate-y-[10%] rounded-full bg-brand-gold/20 blur-2xl" />
        
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-100">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{format(new Date(), 'EEEE, MMMM do, yyyy')}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {getGreeting()}, {d.profile.name.split(' ')[0]}
            </h1>
            <p className="max-w-xl text-blue-100/90">
              You have <span className="font-bold text-white">{d.stats.pendingAssignments} pending assignments</span> and your next class starts in <span className="font-bold text-white">45 minutes</span>.
            </p>
          </div>
          
          <div className="flex gap-3">
             <Button className="bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm">
                View Timetable
             </Button>
             <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold shadow-lg shadow-brand-gold/20">
                Check Assignments
             </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Attendance</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold">{d.stats.attendance}</h3>
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +2%
                </span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
               <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">House Points</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold">{d.stats.housePoints}</h3>
                <span className="text-xs font-medium text-muted-foreground">Rank #12</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
               <Trophy className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold">{d.stats.pendingAssignments}</h3>
                <span className="text-xs font-medium text-orange-600">Pending</span>
                </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <BookOpen className="h-5 w-5" />
            </div>
            </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Term GPA</p>
                <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold">3.8</h3>
                <span className="text-xs font-medium text-emerald-600">Top 10%</span>
                </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <GraduationCap className="h-5 w-5" />
            </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Main Feed / Left Column */}
        <div className="lg:col-span-4 space-y-6">
            <Tabs defaultValue="assignments" className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <TabsList>
                        <TabsTrigger value="assignments">Next Up</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    </TabsList>
                    <Link href="/student/assignments" className="text-xs font-medium text-brand-primary hover:underline">
                        View all
                    </Link>
                </div>
                
                <TabsContent value="assignments" className="space-y-4">
                    {d.assignments.slice(0, 4).map((assignment) => {
                        const isOverdue = new Date(assignment.due) < new Date();
                        return (
                            <Card key={assignment.id} className="overflow-hidden border-l-4 border-l-brand-gold hover:bg-slate-50 transition-colors cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                        {assignment.subject.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{assignment.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                            <span>{assignment.subject}</span>
                                            <span>•</span>
                                            <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                                                Due {formatDistanceToNow(new Date(assignment.due), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        assignment.status === 'SUBMITTED' ? "default" : 
                                        isOverdue ? "destructive" : "secondary"
                                    }>
                                        {assignment.status === 'SUBMITTED' ? 'Done' : isOverdue ? 'Overdue' : 'Todo'}
                                    </Badge>
                                </CardContent>
                            </Card>
                        )
                    })}
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                    {d.timetable.length > 0 ? (
                        d.timetable.map((classSession) => (
                             <Card key={classSession.id}>
                                <CardContent className="p-4 flex items-center gap-4">
                                     <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-slate-100 shrink-0">
                                        <span className="text-xs font-bold text-slate-500">{classSession.time.split('-')[0]}</span>
                                     </div>
                                     <div className="flex-1">
                                        <h4 className="font-semibold text-sm">{classSession.subject}</h4>
                                        <p className="text-xs text-muted-foreground">{classSession.room} • {classSession.teacher}</p>
                                     </div>
                                     <div className="text-right">
                                         <Badge variant={classSession.status === 'now' ? 'default' : 'outline'}>
                                             {classSession.status === 'now' ? 'Now' : 'Upcoming'}
                                         </Badge>
                                     </div>
                                </CardContent>
                             </Card>
                        ))
                    ) : (
                        <div className="text-center p-8 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                            No classes scheduled for today.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-6">
            {/* Subject Progress */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Subject Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    {d.subjects.map((subject) => (
                        <div key={subject.id} className="space-y-2">
                             <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{subject.name}</span>
                                <span className="text-muted-foreground">{subject.progress}%</span>
                             </div>
                             <Progress value={subject.progress} className="h-2" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Upcoming Events / Notices */}
            <Card className="bg-gradient-to-br from-brand-navy to-slate-900 text-white border-none">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-brand-gold" />
                        Notice Board
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm border-l-2 border-brand-gold pl-3 py-1">
                        <p className="font-medium text-white">Science Fair Registration</p>
                        <p className="text-xs text-slate-300 mt-1">Deadline for project submission is next Friday.</p>
                    </div>
                    <div className="text-sm border-l-2 border-blue-400 pl-3 py-1">
                        <p className="font-medium text-white">Holiday Reminder</p>
                        <p className="text-xs text-slate-300 mt-1">School will be closed on Monday for Bank Holiday.</p>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
