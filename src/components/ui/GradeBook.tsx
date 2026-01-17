import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { TrendingUp, TrendingDown, Award, BookOpen, Users, Calendar, Filter, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import lmsService from '@/services/lmsService';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface GradeData {
  studentId: string;
  studentName: string;
  term: string;
  overallGrade: string;
  overallPercentage: number;
  gpa: number;
  classRank: number;
  totalStudents: number;
  subjects: SubjectGrade[];
  attendance: {
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };
}

interface SubjectGrade {
  name: string;
  grade: string;
  percentage: number;
  rank: number;
  totalStudents: number;
  assignments: AssignmentGrade[];
  tests: TestGrade[];
  trend: 'up' | 'down' | 'stable';
}

interface AssignmentGrade {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  date: Date;
  category: 'homework' | 'quiz' | 'project' | 'exam';
}

interface TestGrade {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  date: Date;
  weight: number;
}

interface GradeBookProps {
  userRole?: 'student' | 'parent' | 'teacher' | 'admin';
  studentId?: string;
  studentName?: string;
}

export function GradeBook({
  userRole = 'student',
  studentId = 'student-123',
  studentName = 'John Smith'
}: GradeBookProps) {
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('Term 2 2024');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadGradeData();
  }, [studentId, selectedTerm]);

  const loadGradeData = async () => {
    setIsLoading(true);
    try {
      const result = await lmsService.getGrades(studentId);
      if (result.success) {
        setGradeData(result.data);
      }

      // Also load progress data for analytics
      const progressResult = await lmsService.getStudentProgress(studentId);
      if (progressResult.success) {
        // Combine grade and progress data for comprehensive analytics
        logger.debug('Progress data loaded');
      }
    } catch (error) {
      console.error('Error loading grade data:', error);
      toast({
        title: "Error",
        description: "Failed to load grade book data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock comprehensive grade data for demonstration
  useEffect(() => {
    if (!gradeData) {
      const mockData: GradeData = {
        studentId,
        studentName,
        term: selectedTerm,
        overallGrade: 'A-',
        overallPercentage: 87.5,
        gpa: 3.7,
        classRank: 3,
        totalStudents: 25,
        subjects: [
          {
            name: 'Mathematics',
            grade: 'A',
            percentage: 92,
            rank: 3,
            totalStudents: 25,
            trend: 'up',
            assignments: [
              { id: '1', title: 'Chapter 5 Homework', score: 18, maxScore: 20, percentage: 90, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), category: 'homework' },
              { id: '2', title: 'Algebra Quiz', score: 45, maxScore: 50, percentage: 90, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), category: 'quiz' },
              { id: '3', title: 'Mid-term Exam', score: 88, maxScore: 100, percentage: 88, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), category: 'exam' },
            ],
            tests: [
              { id: '1', title: 'Unit Test 1', score: 85, maxScore: 100, percentage: 85, date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), weight: 0.3 },
              { id: '2', title: 'Unit Test 2', score: 92, maxScore: 100, percentage: 92, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), weight: 0.3 },
            ]
          },
          {
            name: 'English',
            grade: 'B+',
            percentage: 87,
            rank: 5,
            totalStudents: 25,
            trend: 'stable',
            assignments: [
              { id: '4', title: 'Essay Writing', score: 16, maxScore: 20, percentage: 80, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), category: 'project' },
              { id: '5', title: 'Reading Comprehension', score: 22, maxScore: 25, percentage: 88, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), category: 'quiz' },
            ],
            tests: [
              { id: '3', title: 'Literature Exam', score: 78, maxScore: 100, percentage: 78, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), weight: 0.4 },
            ]
          },
          {
            name: 'Science',
            grade: 'A-',
            percentage: 89,
            rank: 4,
            totalStudents: 25,
            trend: 'up',
            assignments: [
              { id: '6', title: 'Lab Report', score: 19, maxScore: 20, percentage: 95, date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), category: 'project' },
              { id: '7', title: 'Science Quiz', score: 23, maxScore: 25, percentage: 92, date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), category: 'quiz' },
            ],
            tests: [
              { id: '4', title: 'Science Mid-term', score: 82, maxScore: 100, percentage: 82, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), weight: 0.35 },
            ]
          }
        ],
        attendance: {
          present: 45,
          absent: 2,
          late: 1,
          percentage: 94
        }
      };
      setGradeData(mockData);
    }
  }, [studentId, studentName, selectedTerm, gradeData]);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  // Prepare chart data
  const performanceData = gradeData?.subjects.map(subject => ({
    subject: subject.name,
    percentage: subject.percentage,
    grade: subject.grade,
  })) || [];

  const attendanceData = [
    { name: 'Present', value: gradeData?.attendance.present || 0, color: '#10B981' },
    { name: 'Absent', value: gradeData?.attendance.absent || 0, color: '#EF4444' },
    { name: 'Late', value: gradeData?.attendance.late || 0, color: '#F59E0B' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C1A75]"></div>
        <span className="ml-2">Loading grade book...</span>
      </div>
    );
  }

  if (!gradeData) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grade data available</h3>
          <p className="text-gray-600">Grade information will appear here once available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75]">Grade Book & Analytics</h2>
          <p className="text-gray-600">Comprehensive academic performance tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Term 1 2024">Term 1 2024</SelectItem>
              <SelectItem value="Term 2 2024">Term 2 2024</SelectItem>
              <SelectItem value="Term 3 2024">Term 3 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradeData.overallGrade}</div>
            <p className="text-xs text-muted-foreground">
              {gradeData.overallPercentage}% average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradeData.gpa}</div>
            <p className="text-xs text-muted-foreground">
              Out of 4.0 scale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{gradeData.classRank}</div>
            <p className="text-xs text-muted-foreground">
              Out of {gradeData.totalStudents} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradeData.attendance.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {gradeData.attendance.present} days present
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gradeData.subjects.map((subject) => (
                    <div key={subject.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{subject.name}</span>
                        {getTrendIcon(subject.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                        <span className="text-sm text-gray-600">{subject.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gradeData.subjects
                    .flatMap(subject => subject.assignments)
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 5)
                    .map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{assignment.title}</p>
                          <p className="text-xs text-gray-600">
                            {format(assignment.date, 'MMM d')} • {assignment.category}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {assignment.percentage}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select subject for details" />
              </SelectTrigger>
              <SelectContent>
                {gradeData.subjects.map((subject) => (
                  <SelectItem key={subject.name} value={subject.name}>
                    {subject.name} ({subject.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSubject && (() => {
            const subject = gradeData.subjects.find(s => s.name === selectedSubject);
            if (!subject) return null;

            return (
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{subject.name} Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Overall Grade</span>
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade} ({subject.percentage}%)
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Class Rank</span>
                        <span>#{subject.rank} of {subject.totalStudents}</span>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assignment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subject.assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{assignment.title}</p>
                            <p className="text-xs text-gray-600">
                              {format(assignment.date, 'MMM d')} • {assignment.category}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {assignment.score}/{assignment.maxScore} ({assignment.percentage}%)
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })()}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#1C1A75" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="percentage" stroke="#1C1A75" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{gradeData.attendance.present}</div>
                <p className="text-sm text-gray-600">Days attended</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{gradeData.attendance.absent}</div>
                <p className="text-sm text-gray-600">Days missed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Late</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{gradeData.attendance.late}</div>
                <p className="text-sm text-gray-600">Late arrivals</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Overall Attendance</span>
                  <span className="font-bold">{gradeData.attendance.percentage}%</span>
                </div>
                <Progress value={gradeData.attendance.percentage} className="h-3" />
                <p className="text-sm text-gray-600">
                  Based on {gradeData.attendance.present + gradeData.attendance.absent} school days
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}