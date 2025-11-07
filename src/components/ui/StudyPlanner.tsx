import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, CheckCircle, Circle, Plus, Edit, Trash2, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

interface StudyTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: Date;
  estimatedTime: number; // in minutes
  actualTime?: number;
  createdDate: Date;
  completedDate?: Date;
  tags: string[];
}

interface StudySession {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  tasks: string[]; // task IDs
  completed: boolean;
  notes?: string;
}

interface StudyPlannerProps {
  studentId?: string;
  studentName?: string;
}

export function StudyPlanner({
  studentId = 'student-123',
  studentName = 'John Smith'
}: StudyPlannerProps) {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTask, setSelectedTask] = useState<StudyTask | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    subject: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    estimatedTime: number;
    tags: string;
  }>({
    title: '',
    description: '',
    subject: '',
    priority: 'medium',
    dueDate: '',
    estimatedTime: 60,
    tags: '',
  });
  const [sessionFormData, setSessionFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '19:00',
    endTime: '20:00',
    notes: '',
  });
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockTasks: StudyTask[] = [
      {
        id: '1',
        title: 'Complete Mathematics Chapter 5',
        description: 'Review quadratic equations and practice problems',
        subject: 'Mathematics',
        priority: 'high',
        status: 'in-progress',
        dueDate: addDays(new Date(), 2),
        estimatedTime: 90,
        actualTime: 45,
        createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        tags: ['math', 'chapter5', 'quadratic'],
      },
      {
        id: '2',
        title: 'Write English Essay',
        description: 'Essay on Shakespeare\'s influence on modern literature',
        subject: 'English',
        priority: 'medium',
        status: 'pending',
        dueDate: addDays(new Date(), 5),
        estimatedTime: 120,
        createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tags: ['english', 'essay', 'shakespeare'],
      },
      {
        id: '3',
        title: 'Science Lab Report',
        description: 'Document findings from photosynthesis experiment',
        subject: 'Science',
        priority: 'high',
        status: 'completed',
        dueDate: addDays(new Date(), 1),
        estimatedTime: 60,
        actualTime: 75,
        createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        tags: ['science', 'lab', 'photosynthesis'],
      }
    ];

    const mockSessions: StudySession[] = [
      {
        id: '1',
        date: new Date(),
        startTime: '19:00',
        endTime: '20:30',
        tasks: ['1'],
        completed: true,
        notes: 'Good progress on math problems',
      },
      {
        id: '2',
        date: addDays(new Date(), 1),
        startTime: '18:30',
        endTime: '20:00',
        tasks: ['2'],
        completed: false,
      }
    ];

    setTasks(mockTasks);
    setSessions(mockSessions);
  }, []);

  const subjects = [
    'Mathematics',
    'English',
    'Science',
    'Social Studies',
    'History',
    'Geography',
    'Art',
    'Music',
    'Physical Education',
  ];

  const handleCreateTask = () => {
    if (!formData.title || !formData.subject || !formData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      priority: formData.priority,
      status: 'pending',
      dueDate: new Date(formData.dueDate),
      estimatedTime: formData.estimatedTime,
      createdDate: new Date(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    setTasks(prev => [...prev, newTask]);
    setIsTaskDialogOpen(false);

    // Reset form
    setFormData({
      title: '',
      description: '',
      subject: '',
      priority: 'medium',
      dueDate: '',
      estimatedTime: 60,
      tags: '',
    });

    toast({
      title: "Task Created",
      description: `Study task "${newTask.title}" has been added to your planner.`,
    });
  };

  const handleCreateSession = () => {
    if (!sessionFormData.startTime || !sessionFormData.endTime) {
      toast({
        title: "Missing Information",
        description: "Please set start and end times for the study session.",
        variant: "destructive",
      });
      return;
    }

    const newSession: StudySession = {
      id: Date.now().toString(),
      date: new Date(sessionFormData.date),
      startTime: sessionFormData.startTime,
      endTime: sessionFormData.endTime,
      tasks: [],
      completed: false,
      notes: sessionFormData.notes,
    };

    setSessions(prev => [...prev, newSession]);
    setIsSessionDialogOpen(false);

    // Reset form
    setSessionFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '19:00',
      endTime: '20:00',
      notes: '',
    });

    toast({
      title: "Study Session Created",
      description: "Study session has been scheduled.",
    });
  };

  const updateTaskStatus = (taskId: string, status: StudyTask['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status,
              completedDate: status === 'completed' ? new Date() : task.completedDate
            }
          : task
      )
    );

    if (status === 'completed') {
      toast({
        title: "Task Completed",
        description: "Great job! Task marked as completed.",
      });
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Study task has been removed.",
    });
  };

  const getPriorityColor = (priority: StudyTask['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: StudyTask['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task =>
      isSameDay(task.dueDate, date) || isSameDay(task.createdDate, date)
    );
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => isSameDay(session.date, date));
  };

  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task =>
    task.status !== 'completed' && task.dueDate < new Date()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75]">Study Planner</h2>
          <p className="text-gray-600">Organize your study schedule and track progress</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Study Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="taskTitle">Task Title</Label>
                  <Input
                    id="taskTitle"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="taskSubject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taskDescription">Description</Label>
                  <Textarea
                    id="taskDescription"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Task description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="taskPriority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                    <Input
                      id="estimatedTime"
                      type="number"
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 60 }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="taskDueDate">Due Date</Label>
                  <Input
                    id="taskDueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="taskTags">Tags (comma-separated)</Label>
                  <Input
                    id="taskTags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="math, chapter5, important"
                  />
                </div>
                <Button onClick={handleCreateTask} className="w-full bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Study Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sessionDate">Date</Label>
                  <Input
                    id="sessionDate"
                    type="date"
                    value={sessionFormData.date}
                    onChange={(e) => setSessionFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={sessionFormData.startTime}
                      onChange={(e) => setSessionFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={sessionFormData.endTime}
                      onChange={(e) => setSessionFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sessionNotes">Notes (Optional)</Label>
                  <Textarea
                    id="sessionNotes"
                    value={sessionFormData.notes}
                    onChange={(e) => setSessionFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Session notes or goals"
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreateSession} className="w-full bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                  Schedule Session
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              Active study tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedTasks / totalTasks) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              Currently working on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Study Schedule</CardTitle>
          <CardDescription>
            Week of {format(weekStart, 'MMMM d')} - {format(weekEnd, 'MMMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayTasks = getTasksForDate(day);
              const daySessions = getSessionsForDate(day);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-32 p-2 border rounded-lg ${
                    isToday ? 'border-[#1C1A75] bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium text-sm mb-2">
                    {format(day, 'EEE d')}
                  </div>

                  {/* Sessions for this day */}
                  {daySessions.map((session) => (
                    <div key={session.id} className="mb-2 p-2 bg-purple-100 rounded text-xs">
                      <div className="font-medium">{session.startTime} - {session.endTime}</div>
                      {session.notes && (
                        <div className="text-gray-600 truncate">{session.notes}</div>
                      )}
                    </div>
                  ))}

                  {/* Tasks for this day */}
                  {dayTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="mb-1 p-1 bg-gray-100 rounded text-xs">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(task.status)}
                        <span className="truncate">{task.title}</span>
                      </div>
                    </div>
                  ))}

                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Study Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                    className="text-gray-400 hover:text-green-500"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <div className="flex-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{task.subject}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Due: {format(task.dueDate, 'MMM d')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateTaskStatus(task.id, 'in-progress')}
                    disabled={task.status === 'completed'}
                  >
                    {task.status === 'in-progress' ? 'In Progress' : 'Start'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No study tasks yet</h3>
                <p className="text-gray-600">Create your first study task to get organized.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}