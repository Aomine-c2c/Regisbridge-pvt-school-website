'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardStatCard } from '@/components/admin/dashboard-stat-card';
import { AtRiskStudentsWidget } from '@/components/analytics/AtRiskStudentsWidget';
import { AcademicTrendsWidget } from '@/components/analytics/AcademicTrendsWidget';
import { 
  Users, 
  GraduationCap, 
  School, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  Activity,
  ShieldCheck,
  Bell,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardData {
  totalStudents: number;
  totalStaff: number;
  activeCourses: number;
  systemHealth: string;
  recentActivity: { action: string; time: string }[];
}

export default function AdminDashboardCommandCenter() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = {
    students: data?.totalStudents || 0,
    staff: data?.totalStaff || 0,
    classes: data?.activeCourses || 0,
    revenue: 42500, // Mock
  };

  const activities = data?.recentActivity?.length ? data.recentActivity : [
    { action: 'New enrollment application received', time: '2 mins ago' },
    { action: 'Tuition payment processed ($12,500)', time: '15 mins ago' },
    { action: 'System maintenance scheduled', time: '1 hr ago' },
  ];

  if (loading) {
     return (
        <div className="flex h-full w-full items-center justify-center p-8">
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
                <p className="text-muted-foreground text-sm">Loading admin console...</p>
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
    <div className="space-y-6">
      
      {/* Admin Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 translate-y-[-10%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 translate-x-[-10%] translate-y-[10%] rounded-full bg-brand-gold/10 blur-2xl" />
        
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-200/80">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Admin Console</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
              {getGreeting()}, Administrator
            </h1>
            <p className="max-w-xl text-blue-100/80">
              System performance is optimal. You have <span className="font-bold text-white">3 pending approvals</span> requiring your attention.
            </p>
          </div>
          
          <div className="flex gap-3">
             <Button variant="outline" className="bg-white/5 text-white border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                <Activity className="mr-2 h-4 w-4" />
                System Health
             </Button>
             <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-bold">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
             </Button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Enrollment"
          value={stats.students.toLocaleString()}
          icon={Users}
          trend={{ value: 12, label: "vs last year", positive: true }}
          description="active students"
          className="border-l-4 border-l-brand-primary"
        />
        <DashboardStatCard
          title="Faculty & Staff"
          value={stats.staff}
          icon={GraduationCap}
          trend={{ value: 4, label: "new hires", positive: true }}
          description="total employees"
          className="border-l-4 border-l-purple-500"
        />
        <DashboardStatCard
          title="Active Classes"
          value={stats.classes}
          icon={School}
          description="ongoing courses"
          className="border-l-4 border-l-blue-400"
        />
        <DashboardStatCard
          title="Monthly Revenue"
          value={`$${(stats.revenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend={{ value: 8.2, label: "vs last month", positive: true }}
          description="fees collected"
          className="border-l-4 border-l-emerald-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Revenue Chart Placeholder */}
        <Card className="col-span-4 border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly tuition and fee collection analysis.</CardDescription>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <TrendingUp className="mr-1 h-3 w-3" /> +12.5% Growth
                </Badge>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[300px] w-full bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Simulated Chart Bars */}
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-8 pb-0 opacity-30 group-hover:opacity-40 transition-opacity">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                        <div key={i} className="w-6 bg-brand-primary rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                
                <div className="z-10 text-center bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
                    <p className="font-semibold text-brand-navy">Revenue Analytics Module</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">Connecting to Finance API...</p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system events and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-slate-300'}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-brand-navy">{activity.action}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs text-brand-primary hover:text-brand-primary/80 hover:bg-blue-50">
                View All Activity <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* AI Insights Widget - New Addition */}
        <div className="col-span-7">
           <div className="grid gap-4 md:grid-cols-2">
               <AtRiskStudentsWidget />
               <AcademicTrendsWidget />
           </div>
        </div>
      </div>

       {/* Quick Links / Actions */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           {['Add Student', 'Create Invoice', 'Schedule Class', 'Send Announcement'].map((action) => (
               <Button key={action} variant="outline" className="h-16 border-2 border-slate-100 hover:border-brand-primary/20 hover:bg-blue-50/50 text-brand-navy font-semibold transition-all shadow-sm hover:shadow-md">
                   {action}
               </Button>
           ))}
       </div>

    </div>
  );
}

