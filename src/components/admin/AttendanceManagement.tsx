'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Calendar as CalendarIcon,
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  TrendingUp,
  Save
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface AttendanceRecord {
  studentId: string;
  rollNumber: string;
  studentName: string;
  grade: string;
  status: 'present' | 'absent' | 'late' | 'excused' | null;
  remarks?: string;
}

export function AttendanceManagement() {
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const stats = {
    totalStudents: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length,
    excused: attendance.filter(a => a.status === 'excused').length,
    attendanceRate: attendance.length > 0 
      ? Math.round((attendance.filter(a => a.status === 'present' || a.status === 'late').length / attendance.length) * 100)
      : 0
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const res = await fetch(`/api/admin/attendance?date=${formattedDate}&grade=${selectedGrade}`);
      const data = await res.json();
      if (data.success) {
        setAttendance(data.data);
      } else {
        toast({ title: 'Error', description: 'Failed to fetch data', variant: 'destructive' });
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Connection failed', variant: 'destructive' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate, selectedGrade]);

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendance(prev =>
      prev.map(record =>
        record.studentId === studentId
          ? { ...record, status }
          : record
      )
    );
  };

  const handleBulkMark = (status: 'present' | 'absent') => {
    setAttendance(prev =>
      prev.map(record => ({ ...record, status }))
    );
  };

  const saveAttendance = async () => {
    try {
      const recordsToSave = attendance.filter(a => a.status !== null).map(a => ({
        studentId: a.studentId,
        status: a.status,
        remarks: a.remarks
      }));

      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: format(selectedDate, 'yyyy-MM-dd'),
          records: recordsToSave
        })
      });

      const data = await res.json();
      if (data.success) {
        toast({ title: 'Success', description: 'Attendance saved successfully' });
      } else {
         toast({ title: 'Error', description: data.message, variant: 'destructive' });
      }
    } catch (error) {
       toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    }
  };

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Attendance Management"
        description="Track and manage student attendance records"
        action={
             <Button onClick={saveAttendance} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" /> Total
            </CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stats.totalStudents}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" /> Present
            </CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-green-600">{stats.present}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-600">
              <XCircle className="h-4 w-4" /> Absent
            </CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-red-600">{stats.absent}</p></CardContent>
        </Card>
         <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-yellow-600">
              <Clock className="h-4 w-4" /> Late
            </CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-yellow-600">{stats.late}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-600">
              <TrendingUp className="h-4 w-4" /> Rate
            </CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</p></CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {[9, 10, 11, 12].map(g => (
                    <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
             <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkMark('present')}>All Present</Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkMark('absent')}>All Absent</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : filteredAttendance.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8">No students found</TableCell></TableRow>
              ) : (
                filteredAttendance.map((record) => (
                  <TableRow key={record.studentId}>
                    <TableCell className="font-medium">{record.rollNumber}</TableCell>
                    <TableCell>{record.studentName}</TableCell>
                    <TableCell>{record.grade}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status ? record.status.toUpperCase() : 'NOT MARKED'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant={record.status === 'present' ? 'default' : 'ghost'} onClick={() => handleMarkAttendance(record.studentId, 'present')} className="h-8 w-8 p-0 text-green-600 bg-green-50 hover:bg-green-100">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant={record.status === 'absent' ? 'default' : 'ghost'} onClick={() => handleMarkAttendance(record.studentId, 'absent')} className="h-8 w-8 p-0 text-red-600 bg-red-50 hover:bg-red-100">
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant={record.status === 'late' ? 'default' : 'ghost'} onClick={() => handleMarkAttendance(record.studentId, 'late')} className="h-8 w-8 p-0 text-yellow-600 bg-yellow-50 hover:bg-yellow-100">
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
