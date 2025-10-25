import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MessageSquare, Video, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, startOfDay } from 'date-fns';

interface Meeting {
  id: string;
  parentName: string;
  parentEmail: string;
  teacherName: string;
  studentName: string;
  date: Date;
  time: string;
  duration: number;
  topic: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingType: 'in-person' | 'virtual';
  notes?: string;
}

interface MeetingSchedulerProps {
  userRole?: 'parent' | 'teacher' | 'admin';
  userName?: string;
  userEmail?: string;
}

export function MeetingScheduler({
  userRole = 'parent',
  userName = 'Anonymous User',
  userEmail = 'user@example.com'
}: MeetingSchedulerProps) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [topic, setTopic] = useState('');
  const [teacher, setTeacher] = useState('');
  const [studentName, setStudentName] = useState('');
  const [meetingType, setMeetingType] = useState<'in-person' | 'virtual'>('virtual');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockMeetings: Meeting[] = [
      {
        id: '1',
        parentName: 'John Smith',
        parentEmail: 'john@example.com',
        teacherName: 'Mrs. Johnson',
        studentName: 'Sarah Smith',
        date: addDays(new Date(), 2),
        time: '14:00',
        duration: 30,
        topic: 'Progress Review',
        status: 'confirmed',
        meetingType: 'virtual',
        notes: 'Discussing Sarah\'s recent test results'
      },
      {
        id: '2',
        parentName: 'Mary Davis',
        parentEmail: 'mary@example.com',
        teacherName: 'Mr. Brown',
        studentName: 'Michael Davis',
        date: addDays(new Date(), 5),
        time: '10:00',
        duration: 45,
        topic: 'Behavioral Concerns',
        status: 'pending',
        meetingType: 'in-person',
        notes: 'Recent behavioral issues in class'
      }
    ];
    setMeetings(mockMeetings);
  }, []);

  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '13:00', '13:30', '14:00',
    '14:30', '15:00', '15:30', '16:00'
  ];

  const teachers = [
    'Mrs. Johnson (Grade 1)',
    'Mr. Brown (Grade 2)',
    'Ms. Davis (Grade 3)',
    'Mr. Wilson (Grade 4)',
    'Mrs. Garcia (Grade 5)',
    'Mr. Lee (Grade 6)',
    'Ms. Taylor (Grade 7)'
  ];

  const handleBookMeeting = () => {
    if (!selectedDate || !selectedTime || !topic || !teacher || !studentName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      parentName: userName,
      parentEmail: userEmail,
      teacherName: teacher,
      studentName,
      date: selectedDate,
      time: selectedTime,
      duration,
      topic,
      status: 'pending',
      meetingType,
      notes,
    };

    setMeetings(prev => [...prev, newMeeting]);
    setIsBookingDialogOpen(false);

    // Reset form
    setSelectedDate(new Date());
    setSelectedTime('');
    setDuration(30);
    setTopic('');
    setTeacher('');
    setStudentName('');
    setMeetingType('virtual');
    setNotes('');

    toast({
      title: "Meeting Requested",
      description: "Your meeting request has been submitted and is pending approval.",
    });
  };

  const updateMeetingStatus = (meetingId: string, status: Meeting['status']) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id === meetingId
          ? { ...meeting, status }
          : meeting
      )
    );

    toast({
      title: "Meeting Updated",
      description: `Meeting status changed to ${status}.`,
    });
  };

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Meeting['status']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75]">Parent-Teacher Meetings</h2>
          <p className="text-gray-600">Schedule and manage your parent-teacher conferences</p>
        </div>
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1C1A75] hover:bg-[#1C1A75]/90">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Parent-Teacher Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student's full name"
                />
              </div>
              <div>
                <Label htmlFor="teacher">Teacher</Label>
                <Select value={teacher} onValueChange={setTeacher}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="meetingType">Meeting Type</Label>
                <Select value={meetingType} onValueChange={(value: 'in-person' | 'virtual') => setMeetingType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtual">Virtual (Video Call)</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Brief description of the meeting topic"
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information or concerns"
                  rows={3}
                />
              </div>
              <Button onClick={handleBookMeeting} className="w-full bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                Request Meeting
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {meeting.meetingType === 'virtual' ? (
                      <Video className="h-5 w-5 text-blue-500" />
                    ) : (
                      <User className="h-5 w-5 text-green-500" />
                    )}
                    <CardTitle className="text-lg">{meeting.topic}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(meeting.status)}>
                    {getStatusIcon(meeting.status)}
                    <span className="ml-1 capitalize">{meeting.status}</span>
                  </Badge>
                </div>
                {userRole === 'teacher' && meeting.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateMeetingStatus(meeting.id, 'confirmed')}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateMeetingStatus(meeting.id, 'cancelled')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
              <CardDescription>
                {format(meeting.date, 'EEEE, MMMM d, yyyy')} at {meeting.time} ({meeting.duration} minutes)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Student:</strong> {meeting.studentName}</p>
                  <p><strong>Parent:</strong> {meeting.parentName}</p>
                  <p><strong>Teacher:</strong> {meeting.teacherName}</p>
                </div>
                <div>
                  <p><strong>Type:</strong> {meeting.meetingType === 'virtual' ? 'Virtual Meeting' : 'In-Person Meeting'}</p>
                  {meeting.notes && (
                    <div className="mt-2">
                      <p><strong>Notes:</strong></p>
                      <p className="text-gray-600">{meeting.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              {meeting.status === 'confirmed' && meeting.meetingType === 'virtual' && (
                <div className="mt-4">
                  <Button className="bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                    <Video className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {meetings.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings scheduled</h3>
              <p className="text-gray-600">Schedule your first parent-teacher meeting to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}