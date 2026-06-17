'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge'; // Check if badge-new or badge
import { Plus, Search, MoreVertical, Edit, Trash, FileText } from 'lucide-react';
import { getAllStudents, enrollStudent, deleteStudent } from '@/services/adminService';
import { Student, StudentFormData } from '@/types/admin';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function StudentManagement() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

  // Form State
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: 'male',
    grade: '',
    className: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentRelationship: 'Parent',
    address: '',
    phoneNumber: '',
    medicalAllergies: '',
    medicalMedications: '',
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (searchTerm) filters.search = searchTerm;
      if (statusFilter !== 'all') filters.status = statusFilter;
      if (gradeFilter !== 'all') filters.grade = gradeFilter;

      const response = await getAllStudents(filters);
      // Backend returns PaginatedResponse<Student>, but for now let's assume it puts data in data.data or just data if we changed it.
      // Checking adminService.ts: return response.data! which is PaginatedResponse<Student>
      // So we need response.data
      setStudents(response.data || []);
    } catch (error) {
      console.error('Failed to fetch students', error);
      toast({
        title: 'Error',
        description: 'Failed to load students. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, statusFilter, gradeFilter]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enrollStudent(formData);
      toast({
        title: 'Success',
        description: 'Student enrolled successfully',
      });
      setIsEnrollOpen(false);
      fetchStudents();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        gender: 'male',
        grade: '',
        className: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        parentRelationship: 'Parent',
        address: '',
        phoneNumber: '',
        medicalAllergies: '',
        medicalMedications: '',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to enroll student',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) return;
    
    try {
      await deleteStudent(id);
      toast({
        title: 'Success',
        description: 'Student deleted successfully',
      });
      fetchStudents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete student',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Student Management"
        description="Enroll and manage student records, grades, and attendance"
        action={
          <Button onClick={() => setIsEnrollOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Enroll Student
          </Button>
        }
      />
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
           <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Info</TableHead>
              <TableHead>Grade/Class</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Parent Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">Loading students...</TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">No students found</TableCell>
              </TableRow>
            ) : (
              students.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.firstName} {student.lastName}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Grade {student.grade}</div>
                    <div className="text-sm text-muted-foreground">Class {student.className}</div>
                  </TableCell>
                  <TableCell>{student.rollNumber || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{student.parentInfo?.name}</div>
                      <div className="text-muted-foreground">{student.parentInfo?.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {student.status || 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(student.id)}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enrollment Dialog */}
      <Dialog open={isEnrollOpen} onOpenChange={setIsEnrollOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enroll New Student</DialogTitle>
            <DialogDescription>
              Create a new student record and user account.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEnroll} className="space-y-6">
            {/* Student Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium border-b pb-2">Student Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input required value={formData.firstName} onChange={(e: any) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input required value={formData.lastName} onChange={(e: any) => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input required type="email" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={formData.dateOfBirth} onChange={(e: any) => setFormData({...formData, dateOfBirth: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Select value={formData.grade} onValueChange={(val: any) => setFormData({...formData, grade: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Class/Section</Label>
                  <Input value={formData.className} onChange={(e: any) => setFormData({...formData, className: e.target.value})} placeholder="e.g. 10A" />
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium border-b pb-2">Guardian Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Guardian Name</Label>
                  <Input required value={formData.parentName} onChange={(e: any) => setFormData({...formData, parentName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Guardian Email</Label>
                  <Input type="email" value={formData.parentEmail} onChange={(e: any) => setFormData({...formData, parentEmail: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input required value={formData.parentPhone} onChange={(e: any) => setFormData({...formData, parentPhone: e.target.value})} />
                </div>
                 <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Select value={formData.parentRelationship} onValueChange={(val: any) => setFormData({...formData, parentRelationship: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Guardian">Guardian</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Medical Info */}
             <div className="space-y-4">
              <h3 className="text-sm font-medium border-b pb-2">Medical Information (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label>Allergies</Label>
                  <Input value={formData.medicalAllergies} onChange={(e: any) => setFormData({...formData, medicalAllergies: e.target.value})} />
                </div>
                 <div className="space-y-2">
                  <Label>Medications</Label>
                  <Input value={formData.medicalMedications} onChange={(e: any) => setFormData({...formData, medicalMedications: e.target.value})} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEnrollOpen(false)}>Cancel</Button>
              <Button type="submit">Enroll Student</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
