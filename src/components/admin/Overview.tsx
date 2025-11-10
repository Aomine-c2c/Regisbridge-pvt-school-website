// Overview Component - Dashboard with statistics and charts
import { useEffect, useState } from 'react';
import { StatsCard } from './shared/StatsCard';
import { AdminHeader } from './shared/AdminHeader';
import { Users, GraduationCap, DollarSign, FileText, TrendingUp, Clock, PieChart as PieChartIcon, Send, FileDown, Database, Mail, BarChart3 } from 'lucide-react';
import { getDashboardStats, getEnrollmentData, getRevenueData, getActivityLogs } from '@/services/adminService';
import type { DashboardStats, EnrollmentData, RevenueData, ActivityLog } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

export function Overview() {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, enrollData, revData, logsData] = await Promise.all([
        getDashboardStats(),
        getEnrollmentData(new Date().getFullYear()),
        getRevenueData(new Date().getFullYear()),
        getActivityLogs(10),
      ]);

      setStats(statsData);
      setEnrollmentData(enrollData);
      setRevenueData(revData);
      setActivityLogs(logsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock data for new charts
  const gradeDistribution = [
    { name: 'Grade 8', value: 120, fill: '#1C1A75' },
    { name: 'Grade 9', value: 145, fill: '#2D2B8F' },
    { name: 'Grade 10', value: 130, fill: '#10B981' },
    { name: 'Grade 11', value: 110, fill: '#F59E0B' },
    { name: 'Grade 12', value: 95, fill: '#EF4444' },
  ];

  const teacherWorkload = [
    { teacher: 'Mr. Smith', assignments: 12, classes: 5 },
    { teacher: 'Ms. Johnson', assignments: 15, classes: 6 },
    { teacher: 'Dr. Williams', assignments: 10, classes: 4 },
    { teacher: 'Mrs. Brown', assignments: 14, classes: 5 },
    { teacher: 'Mr. Davis', assignments: 11, classes: 4 },
  ];

  const feePaymentStatus = [
    { status: 'Paid', value: 450, fill: '#10B981' },
    { status: 'Pending', value: 120, fill: '#F59E0B' },
    { status: 'Overdue', value: 30, fill: '#EF4444' },
  ];

  const handleQuickAction = (action: string) => {
    toast({
      title: 'Quick Action',
      description: `${action} - Feature coming soon!`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C1A75] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening with your school."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          description="All system users"
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Active Students"
          value={stats?.activeStudents || 0}
          description="Currently enrolled"
          icon={GraduationCap}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatsCard
          title="Revenue (This Month)"
          value={`$${(stats?.revenueThisMonth || 0).toLocaleString()}`}
          description="Monthly earnings"
          icon={DollarSign}
          trend={{ value: 8.4, isPositive: true }}
        />
        <StatsCard
          title="Pending Applications"
          value={stats?.pendingApplications || 0}
          description="Awaiting review"
          icon={FileText}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Enrollment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1C1A75"
                  strokeWidth={2}
                  name="New Enrollments"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#10B981" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* New Enhanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PieChartIcon className="h-5 w-5" />
              Student Distribution by Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Teacher Workload Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-5 w-5" />
              Teacher Workload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teacherWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="teacher" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="assignments" fill="#1C1A75" name="Assignments" />
                <Bar dataKey="classes" fill="#10B981" name="Classes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Payment Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="h-5 w-5" />
              Fee Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feePaymentStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {feePaymentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleQuickAction('Send Announcement')}
            >
              <Send className="h-5 w-5" />
              <span className="text-xs">Send Announcement</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleQuickAction('Generate Report')}
            >
              <FileDown className="h-5 w-5" />
              <span className="text-xs">Generate Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleQuickAction('Export Data')}
            >
              <Database className="h-5 w-5" />
              <span className="text-xs">Export Data</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleQuickAction('Bulk Email')}
            >
              <Mail className="h-5 w-5" />
              <span className="text-xs">Bulk Email</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleQuickAction('View Analytics')}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">View Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleQuickAction('Backup Database')}
            >
              <Database className="h-5 w-5" />
              <span className="text-xs">Backup Database</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalTeachers || 0}</p>
            <p className="text-sm text-gray-500">Active faculty members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Parents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalParents || 0}</p>
            <p className="text-sm text-gray-500">Registered parents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.attendanceRate || 0}%</p>
            <p className="text-sm text-gray-500">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLogs && activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500">
                      by {log.userName} • {new Date(log.timestamp).toLocaleString()}
                    </p>
                    {log.details && (
                      <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No recent activity to display
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
