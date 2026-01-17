import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Zap, BarChart3, PieChart, Activity, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';

interface StudentInsight {
  studentId: string;
  studentName: string;
  riskLevel: 'low' | 'medium' | 'high';
  predictedGrade: string;
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  engagementScore: number;
  lastAssessment: Date;
}

interface ClassAnalytics {
  classId: string;
  className: string;
  averagePerformance: number;
  attendanceRate: number;
  engagementTrend: 'up' | 'down' | 'stable';
  atRiskStudents: number;
  topPerformers: number;
  improvementAreas: string[];
}

interface AIPrediction {
  type: 'grade' | 'engagement' | 'risk' | 'recommendation';
  prediction: string;
  confidence: number;
  timeframe: string;
  actionable: boolean;
}

interface AIInsightsDashboardProps {
  userRole?: 'student' | 'parent' | 'teacher' | 'admin';
  studentId?: string;
  classId?: string;
}

export function AIInsightsDashboard({
  userRole = 'teacher',
  studentId,
  classId
}: AIInsightsDashboardProps) {
  const [insights, setInsights] = useState<StudentInsight[]>([]);
  const [classAnalytics, setClassAnalytics] = useState<ClassAnalytics[]>([]);
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadAIData();
  }, [userRole, studentId, classId, selectedTimeframe]);

  const loadAIData = async () => {
    setIsLoading(true);
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock AI-generated insights
      const mockInsights: StudentInsight[] = [
        {
          studentId: '1',
          studentName: 'John Smith',
          riskLevel: 'low',
          predictedGrade: 'A-',
          confidence: 87,
          strengths: ['Mathematics', 'Problem Solving', 'Critical Thinking'],
          weaknesses: ['Reading Comprehension', 'Time Management'],
          recommendations: [
            'Focus on reading comprehension exercises',
            'Practice time management techniques',
            'Continue strong performance in mathematics'
          ],
          engagementScore: 85,
          lastAssessment: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          studentId: '2',
          studentName: 'Mary Johnson',
          riskLevel: 'medium',
          predictedGrade: 'B',
          confidence: 72,
          strengths: ['Creative Writing', 'Art', 'Social Studies'],
          weaknesses: ['Mathematics', 'Science', 'Test Anxiety'],
          recommendations: [
            'Additional support in mathematics',
            'Stress management techniques',
            'Peer tutoring for science concepts'
          ],
          engagementScore: 68,
          lastAssessment: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          studentId: '3',
          studentName: 'David Brown',
          riskLevel: 'high',
          predictedGrade: 'C+',
          confidence: 91,
          strengths: ['Physical Education', 'Team Sports'],
          weaknesses: ['Academic Subjects', 'Study Skills', 'Attendance'],
          recommendations: [
            'Immediate intervention required',
            'Study skills training program',
            'Attendance monitoring and support',
            'Parental involvement increase'
          ],
          engagementScore: 45,
          lastAssessment: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        }
      ];

      const mockClassAnalytics: ClassAnalytics[] = [
        {
          classId: 'grade-7',
          className: 'Grade 7',
          averagePerformance: 78,
          attendanceRate: 94,
          engagementTrend: 'up',
          atRiskStudents: 3,
          topPerformers: 8,
          improvementAreas: ['Mathematics', 'Reading Comprehension'],
        },
        {
          classId: 'grade-6',
          className: 'Grade 6',
          averagePerformance: 82,
          attendanceRate: 96,
          engagementTrend: 'stable',
          atRiskStudents: 1,
          topPerformers: 12,
          improvementAreas: ['Science Projects'],
        }
      ];

      const mockPredictions: AIPrediction[] = [
        {
          type: 'grade',
          prediction: 'Overall class performance expected to improve by 8% next term',
          confidence: 85,
          timeframe: '3 months',
          actionable: true,
        },
        {
          type: 'engagement',
          prediction: 'Student engagement will increase with new interactive learning methods',
          confidence: 78,
          timeframe: '6 weeks',
          actionable: true,
        },
        {
          type: 'risk',
          prediction: '3 students identified as at-risk for academic challenges',
          confidence: 92,
          timeframe: 'immediate',
          actionable: true,
        },
        {
          type: 'recommendation',
          prediction: 'Implement peer tutoring program for better outcomes',
          confidence: 88,
          timeframe: 'next month',
          actionable: true,
        }
      ];

      setInsights(mockInsights);
      setClassAnalytics(mockClassAnalytics);
      setPredictions(mockPredictions);

    } catch (error) {
      console.error('Error loading AI data:', error);
      toast({
        title: "Error",
        description: "Failed to load AI insights.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Prepare chart data
  const performanceData = insights.map(insight => ({
    name: insight.studentName.split(' ')[0],
    performance: insight.engagementScore,
    predicted: parseFloat(insight.predictedGrade.charAt(0)) * 20 + 60, // Convert grade to percentage
    risk: insight.riskLevel === 'high' ? 3 : insight.riskLevel === 'medium' ? 2 : 1,
  }));

  const riskDistribution = [
    { name: 'Low Risk', value: insights.filter(i => i.riskLevel === 'low').length, color: '#10B981' },
    { name: 'Medium Risk', value: insights.filter(i => i.riskLevel === 'medium').length, color: '#F59E0B' },
    { name: 'High Risk', value: insights.filter(i => i.riskLevel === 'high').length, color: '#EF4444' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C1A75]"></div>
        <span className="ml-2">Analyzing data with AI...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75] flex items-center gap-2">
            <Brain className="h-6 w-6" />
            AI Insights Dashboard
          </h2>
          <p className="text-gray-600">Machine learning-powered analytics and predictions</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#1C1A75] hover:bg-[#1C1A75]/90">
            <Zap className="mr-2 h-4 w-4" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* AI Predictions Alert */}
      <div className="grid gap-4 md:grid-cols-2">
        {predictions.slice(0, 2).map((prediction, index) => (
          <Alert key={index} className={`${
            prediction.type === 'risk' ? 'border-red-200 bg-red-50' :
            prediction.type === 'recommendation' ? 'border-blue-200 bg-blue-50' :
            'border-green-200 bg-green-50'
          }`}>
            <Target className="h-4 w-4" />
            <AlertTitle>AI Prediction</AlertTitle>
            <AlertDescription>
              <p className="font-medium">{prediction.prediction}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                <span className="text-sm text-gray-600">• {prediction.timeframe}</span>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students Analyzed</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{insights.length}</div>
                <p className="text-xs text-muted-foreground">
                  AI-powered insights generated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {insights.filter(i => i.riskLevel === 'high').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(insights.reduce((acc, i) => acc + i.engagementScore, 0) / insights.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Student engagement score
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94%</div>
                <p className="text-xs text-muted-foreground">
                  Prediction accuracy rate
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance vs Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={performanceData}>
                    <CartesianGrid />
                    <XAxis dataKey="performance" name="Engagement" />
                    <YAxis dataKey="predicted" name="Predicted Grade %" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Students" dataKey="predicted" fill="#1C1A75" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.studentId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1C1A75] rounded-full flex items-center justify-center text-white font-bold">
                        {insight.studentName.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.studentName}</CardTitle>
                        <CardDescription>
                          Last assessment: {insight.lastAssessment.toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(insight.riskLevel)}>
                        {insight.riskLevel.toUpperCase()} RISK
                      </Badge>
                      <Badge variant="outline">
                        Predicted: {insight.predictedGrade}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Strengths
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {insight.strengths.map((strength, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Areas for Improvement
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {insight.weaknesses.map((weakness, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">AI Recommendations</h4>
                    <div className="space-y-2">
                      {insight.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Engagement Score</p>
                        <p className="text-xs text-gray-600">Based on participation and activity</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{insight.engagementScore}%</p>
                        <Progress value={insight.engagementScore} className="w-20 h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="performance" stroke="#1C1A75" strokeWidth={2} />
                    <Line type="monotone" dataKey="predicted" stroke="#D4AF37" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement vs Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="performance" stackId="1" stroke="#1C1A75" fill="#1C1A75" />
                    <Area type="monotone" dataKey="predicted" stackId="2" stroke="#D4AF37" fill="#D4AF37" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {classAnalytics.map((analytics) => (
                  <div key={analytics.classId} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{analytics.className}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Performance</span>
                        <span className="font-medium">{analytics.averagePerformance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Attendance</span>
                        <span className="font-medium">{analytics.attendanceRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">At-Risk Students</span>
                        <span className="font-medium text-red-600">{analytics.atRiskStudents}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {getTrendIcon(analytics.engagementTrend)}
                        <span className="text-sm capitalize">{analytics.engagementTrend} trend</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            {predictions.map((prediction, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {prediction.type === 'risk' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {prediction.type === 'grade' && <TrendingUp className="h-5 w-5 text-green-500" />}
                      {prediction.type === 'engagement' && <Activity className="h-5 w-5 text-blue-500" />}
                      {prediction.type === 'recommendation' && <Target className="h-5 w-5 text-purple-500" />}
                      {prediction.type.charAt(0).toUpperCase() + prediction.type.slice(1)} Prediction
                    </CardTitle>
                    <Badge variant={prediction.confidence > 80 ? "default" : "secondary"}>
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{prediction.prediction}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{prediction.timeframe}</Badge>
                      {prediction.actionable && (
                        <Badge className="bg-green-100 text-green-800">Actionable</Badge>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}