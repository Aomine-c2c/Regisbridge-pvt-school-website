import React, { useState, useEffect } from 'react';
import { BookOpen, Play, FileText, Download, CheckCircle, Clock, Users, Award, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import lmsService from '@/services/lmsService';
import { format } from 'date-fns';

interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
  enrolledStudents: number;
  lessons: number;
  progress: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'submitted' | 'graded';
  description: string;
  points: number;
}

interface LearningPlatformProps {
  studentId?: string;
  studentName?: string;
}

export function LearningPlatform({
  studentId = 'student-123',
  studentName = 'John Smith'
}: LearningPlatformProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseContent, setCourseContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('courses');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load courses
      const coursesResult = await lmsService.getCourses(studentId);
      if (coursesResult.success) {
        setCourses(coursesResult.data);
      }

      // Load assignments
      const assignmentsResult = await lmsService.getAssignments(studentId);
      if (assignmentsResult.success) {
        setAssignments(assignmentsResult.data);
      }
    } catch (error) {
      console.error('Error loading LMS data:', error);
      toast({
        title: "Error",
        description: "Failed to load learning platform data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCourseContent = async (courseId: string) => {
    try {
      const result = await lmsService.getCourseContent(courseId);
      if (result.success) {
        setCourseContent(result.data);
      }
    } catch (error) {
      console.error('Error loading course content:', error);
    }
  };

  const handleAssignmentSubmit = async (assignmentId: string, file: File) => {
    try {
      const result = await lmsService.submitAssignment(assignmentId, file, studentId);
      if (result.success) {
        toast({
          title: "Assignment Submitted",
          description: "Your assignment has been submitted successfully.",
        });

        // Update assignment status
        setAssignments(prev =>
          prev.map(assignment =>
            assignment.id === assignmentId
              ? { ...assignment, status: 'submitted' as const }
              : assignment
          )
        );
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit assignment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'graded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="h-3 w-3" />;
      case 'graded': return <Award className="h-3 w-3" />;
      case 'in-progress': return <Clock className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C1A75]"></div>
        <span className="ml-2">Loading learning platform...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75]">Online Learning Platform</h2>
          <p className="text-gray-600">Access your courses, assignments, and learning resources</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Welcome back, {studentName}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline">{course.progress}%</Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Teacher: {course.teacher}</span>
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedCourse(course);
                        loadCourseContent(course.id);
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#1C1A75]" />
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription>{assignment.course}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1 capitalize">{assignment.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {assignment.points} points
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Due: {format(assignment.dueDate, 'MMM d, yyyy')}
                    </span>
                    {assignment.status !== 'submitted' && assignment.status !== 'graded' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            Submit Assignment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Assignment</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Upload your completed assignment file below.
                            </p>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleAssignmentSubmit(assignment.id, file);
                                }
                              }}
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1C1A75] mb-2">76%</div>
                  <Progress value={76} className="mb-4" />
                  <p className="text-sm text-gray-600">Keep up the great work!</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="font-medium">Math Whiz</p>
                      <p className="text-sm text-gray-600">Completed 80% of mathematics course</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">Speed Reader</p>
                      <p className="text-sm text-gray-600">Completed 10 reading assignments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Mathematics Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Formula Sheet (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Video Tutorial
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Science Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Lab Safety Guide (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Experiment Videos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  English Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Literature Guide (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Discussion Forum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Content Modal */}
      {selectedCourse && courseContent && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                {courseContent.modules?.map((module: any) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {module.lessons?.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' ? (
                                <Play className="h-5 w-5 text-blue-500" />
                              ) : (
                                <FileText className="h-5 w-5 text-gray-500" />
                              )}
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <p className="text-sm text-gray-600">
                                  {Math.floor(lesson.duration / 60)} minutes
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.completed && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                              <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                                {lesson.completed ? 'Review' : 'Start'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}