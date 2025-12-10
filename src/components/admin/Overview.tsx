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
import { enrollmentMarch2021, enrollmentSummary } from '@/lib/seed-data-enrollment';
import { staffStats } from '@/lib/seed-data-staff';
import { feeBreakdown2021 } from '@/lib/seed-data-financial';

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

  // Real enrollment data from March-April 2021
  const gradeDistribution = enrollmentMarch2021
    .filter(record => record.currentTotal > 0)
    .map((record, index) => ({
      name: record.grade,
      value: record.currentTotal,
      fill: ['#1C1A75', '#2D2B8F', '#3D3BAF', '#10B981', '#059669', '#F59E0B', '#EF4444', '#DC2626', '#7C3AED', '#6366F1', '#8B5CF6', '#A78BFA'][index % 12],
    }));

  // Staff distribution by department (real 2021 data)
  const staffDistribution = [
    { department: 'Administration', count: staffStats.departments.administration, fill: '#1C1A75' },
    { department: 'ECD', count: staffStats.departments.ecd, fill: '#10B981' },
    { department: 'Primary', count: staffStats.departments.primary, fill: '#F59E0B' },
    { department: 'ICT', count: staffStats.departments.ict, fill: '#EF4444' },
  ];

  // Fee structure breakdown (real 2021 data)
  const feeBreakdownChart = [
    { category: 'ECD Total', amount: feeBreakdown2021.ecd.total, fill: '#1C1A75' },
    { category: 'Primary Total', amount: feeBreakdown2021.primary.total, fill: '#10B981' },
    { category: 'Boarding', amount: feeBreakdown2021.boarding.newFee, fill: '#F59E0B' },
  ];

  // Enrollment growth data (March-April 2021)
  const enrollmentGrowth = [
    { period: 'March 15', students: enrollmentSummary.opening.total, male: enrollmentSummary.opening.male, female: enrollmentSummary.opening.female },
    { period: 'April 21', students: enrollmentSummary.current.total, male: enrollmentSummary.current.male, female: enrollmentSummary.current.female },
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

      {/* Stats Grid - Real 2021 Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={enrollmentSummary.current.total}
          description="April 21, 2021"
          icon={GraduationCap}
          trend={{ value: enrollmentSummary.growth.percentage, isPositive: true }}
        />
        <StatsCard
          title="Total Staff"
          value={staffStats.totalStaff}
          description="14 qualified teachers"
          icon={Users}
        />
        <StatsCard
          title="ECD Students"
          value={enrollmentMarch2021.filter(r => r.grade.includes('ECD')).reduce((sum, r) => sum + r.currentTotal, 0)}
          description={`${((enrollmentMarch2021.filter(r => r.grade.includes('ECD')).reduce((sum, r) => sum + r.currentTotal, 0) / enrollmentSummary.current.total) * 100).toFixed(0)}% of total`}
          icon={GraduationCap}
        />
        <StatsCard
          title="Primary Students"
          value={enrollmentMarch2021.filter(r => r.grade.includes('Grade')).reduce((sum, r) => sum + r.currentTotal, 0)}
          description={`${((enrollmentMarch2021.filter(r => r.grade.includes('Grade')).reduce((sum, r) => sum + r.currentTotal, 0) / enrollmentSummary.current.total) * 100).toFixed(0)}% of total`}
          icon={FileText}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Growth (March-April 2021) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Enrollment Growth (March-April 2021)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="male" fill="#1C1A75" name="Male" stackId="a" />
                <Bar dataKey="female" fill="#10B981" name="Female" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p className="font-semibold text-green-600">+{enrollmentSummary.growth.absolute} students (+{enrollmentSummary.growth.percentage.toFixed(1)}%)</p>
              <p className="text-xs mt-1">Total: {enrollmentSummary.current.total} students</p>
            </div>
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

        {/* Staff Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-5 w-5" />
              Staff by Department (2021)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={staffDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1C1A75" name="Staff Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Structure Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="h-5 w-5" />
              Fee Structure 2021 (USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feeBreakdownChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, amount }) => `${category}: $${amount}`}
                  outerRadius={80}
                  dataKey="amount"
                >
                  {feeBreakdownChart.map((entry, index) => (
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
              onClick={() => window.location.href = '/admin/data-entry'}
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Data Entry Tool</span>
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
