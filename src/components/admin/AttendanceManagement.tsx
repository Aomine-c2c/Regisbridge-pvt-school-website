// AttendanceManagement Component - Track and manage student attendance
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
  Download, 
  Upload, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

interface AttendanceStats {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

// Mock data
const mockAttendance: AttendanceRecord[] = [
  { id: '1', studentId: 'REG25001', studentName: 'John Doe', grade: 'Grade 10', date: new Date(), status: 'present' },
  { id: '2', studentId: 'REG25002', studentName: 'Jane Smith', grade: 'Grade 10', date: new Date(), status: 'absent', remarks: 'Sick leave' },
  { id: '3', studentId: 'REG25003', studentName: 'Bob Johnson', grade: 'Grade 10', date: new Date(), status: 'late', remarks: 'Arrived 15 mins late' },
  { id: '4', studentId: 'REG25004', studentName: 'Alice Brown', grade: 'Grade 10', date: new Date(), status: 'present' },
  { id: '5', studentId: 'REG25005', studentName: 'Charlie Wilson', grade: 'Grade 10', date: new Date(), status: 'excused', remarks: 'Medical appointment' },
];

export function AttendanceManagement() {
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const stats: AttendanceStats = {
    totalStudents: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length,
    excused: attendance.filter(a => a.status === 'excused').length,
    attendanceRate: attendance.length > 0 
      ? Math.round((attendance.filter(a => a.status === 'present' || a.status === 'late').length / attendance.length) * 100)
      : 0
  };

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendance(prev =>
      prev.map(record =>
        record.studentId === studentId
          ? { ...record, status, date: selectedDate }
          : record
      )
    );
    toast({
      title: 'Attendance Updated',
      description: 'Student attendance has been marked successfully',
    });
  };

  const handleBulkMark = (status: 'present' | 'absent') => {
    setAttendance(prev =>
      prev.map(record => ({ ...record, status, date: selectedDate }))
    );
    toast({
      title: 'Bulk Update',
      description: `All students marked as ${status}`,
    });
  };

  const handleExportAttendance = () => {
    toast({
      title: 'Export Started',
      description: 'Attendance report is being generated...',
    });
  };

  const filteredAttendance = attendance.filter(record => {
    const matchesGrade = selectedGrade === 'all' || record.grade === selectedGrade;
    const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4" />;
      case 'absent':
        return <XCircle className="h-4 w-4" />;
      case 'late':
        return <Clock className="h-4 w-4" />;
      case 'excused':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Attendance Management"
        description="Track and manage student attendance records"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-600">
              <XCircle className="h-4 w-4" />
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-yellow-600">
              <Clock className="h-4 w-4" />
              Late
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-600">
              <TrendingUp className="h-4 w-4" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Date Picker */}
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

            {/* Grade Filter */}
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="Grade 8">Grade 8</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
                <SelectItem value="Grade 11">Grade 11</SelectItem>
                <SelectItem value="Grade 12">Grade 12</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search student by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportAttendance}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={() => handleBulkMark('present')}>
              Mark All Present
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkMark('absent')}>
              Mark All Absent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentId}</TableCell>
                    <TableCell>{record.studentName}</TableCell>
                    <TableCell>{record.grade}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {record.remarks || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAttendance(record.studentId, 'present')}
                          className="h-8 w-8 p-0 text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAttendance(record.studentId, 'absent')}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAttendance(record.studentId, 'late')}
                          className="h-8 w-8 p-0 text-yellow-600"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAttendance(record.studentId, 'excused')}
                          className="h-8 w-8 p-0 text-blue-600"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No attendance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
