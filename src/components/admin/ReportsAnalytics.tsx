'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Users, TrendingUp, DollarSign, GraduationCap, BarChart as BarChartIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ReportsAnalytics() {
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/reports/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
     return <div className="p-8 text-center">Loading analytics...</div>;
  }

  if (!stats) {
     return <div className="p-8 text-center">Failed to load analytics.</div>;
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Reports & Analytics"
        description="Comprehensive view of school performance"
        action={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        }
      />

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.students.total}</div>
            <p className="text-xs text-muted-foreground">Across all grades</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teaching Staff</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.staff.teachers}</div>
            <p className="text-xs text-muted-foreground">Active teachers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendance.rate}%</div>
            <p className="text-xs text-muted-foreground">Today's average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.finance.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pending: ${stats.finance.pending.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Student Distribution Chart (Simple Bar Visualization) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
              <CardDescription>Number of students per grade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.students.byGrade.map((g: any) => {
                    const percentage = stats.students.total > 0 ? (g.count / stats.students.total) * 100 : 0;
                    return (
                        <div key={g.grade} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Grade {g.grade}</span>
                                <span className="text-muted-foreground">{g.count} students</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                            </div>
                        </div>
                    );
                })}
                {stats.students.byGrade.length === 0 && <p className="text-sm text-gray-500">No student data available.</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
              <CardHeader>
                  <CardTitle>Attendance Breakdown</CardTitle>
                  <CardDescription>Today's status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      {['present', 'absent', 'late', 'excused'].map((status) => {
                          const count = stats.attendance.breakdown.find((b: any) => b.status === status)?.count || 0;
                          const totalMarked = stats.attendance.breakdown.reduce((acc: any, curr: any) => acc + curr.count, 0);
                          const percentage = totalMarked > 0 ? (count / totalMarked) * 100 : 0;
                          
                          let colorClass = 'bg-gray-500';
                          if (status === 'present') colorClass = 'bg-green-500';
                          if (status === 'absent') colorClass = 'bg-red-500';
                          if (status === 'late') colorClass = 'bg-yellow-500';
                          if (status === 'excused') colorClass = 'bg-blue-500';

                          return (
                              <div key={status} className="space-y-1">
                                  <div className="flex items-center justify-between text-sm capitalize">
                                      <span className="font-medium">{status}</span>
                                      <span className="text-muted-foreground">{count}</span>
                                  </div>
                                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                      <div className={`h-full ${colorClass}`} style={{ width: `${percentage}%` }} />
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
