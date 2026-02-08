'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Plus, BookOpen, GraduationCap, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function AcademicManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('classes');
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]); // We'll fetch subjects if API exists or stub for now
  const [loading, setLoading] = useState(true);
  const [isClassOpen, setIsClassOpen] = useState(false);

  // Class Form
  const [classForm, setClassForm] = useState({
    name: '',
    grade: '',
    academicYear: new Date().getFullYear().toString(),
    room: '',
    capacity: '30'
  });

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/admin/classes');
      const data = await res.json();
      if (data.success) {
        setClasses(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async () => {
     // Placeholder for subjects fetching if API existed
     // For now just empty or stub
  };

  useEffect(() => {
    setLoading(true);
    if (activeTab === 'classes') fetchClasses();
    else fetchSubjects();
    setLoading(false);
  }, [activeTab]);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classForm)
      });
      
      const data = await res.json();
      if (data.success) {
        toast({ title: 'Success', description: 'Class created successfully' });
        setIsClassOpen(false);
        fetchClasses();
        // Reset form
        setClassForm({ ...classForm, name: '', room: '' });
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to create class', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Exception occurred', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Academic Management"
        description="Manage classes, subjects, and timetables"
        action={
          <Button onClick={() => setIsClassOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Class
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <div className="p-4 bg-white rounded-lg border shadow-sm flex items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Classes</p>
            <h3 className="text-2xl font-bold">{classes.length}</h3>
          </div>
        </div>
        {/* Add more stats if needed */}
      </div>

      <Tabs defaultValue="classes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="mt-4">
           <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">No classes found</TableCell></TableRow>
                ) : (
                  classes.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.grade}</TableCell>
                      <TableCell>{c.teacher ? `${c.teacher.firstName} ${c.teacher.lastName}` : 'Unassigned'}</TableCell>
                      <TableCell>{c.room || 'N/A'}</TableCell>
                      <TableCell>{c.academicYear}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="mt-4">
          <div className="p-8 text-center text-muted-foreground border rounded-lg bg-gray-50">
             <BookOpen className="mx-auto h-10 w-10 mb-2 opacity-50" />
             <p>Subject management coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* CREATE CLASS DIALOG */}
      <Dialog open={isClassOpen} onOpenChange={setIsClassOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateClass} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label>Class Name (e.g. 10-A)</Label>
                 <Input required value={classForm.name} onChange={e => setClassForm({...classForm, name: e.target.value})} placeholder="10-A" />
               </div>
               <div className="space-y-2">
                 <Label>Grade Level</Label>
                 <Select value={classForm.grade} onValueChange={val => setClassForm({...classForm, grade: val})}>
                    <SelectTrigger><SelectValue placeholder="Select Grade" /></SelectTrigger>
                    <SelectContent>
                      {[9, 10, 11, 12].map(g => (
                        <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>
                      ))}
                    </SelectContent>
                 </Select>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                 <Label>Room No.</Label>
                 <Input value={classForm.room} onChange={e => setClassForm({...classForm, room: e.target.value})} />
               </div>
               <div className="space-y-2">
                 <Label>Capacity</Label>
                 <Input type="number" value={classForm.capacity} onChange={e => setClassForm({...classForm, capacity: e.target.value})} />
               </div>
             </div>

             <div className="space-y-2">
               <Label>Academic Year</Label>
               <Input value={classForm.academicYear} onChange={e => setClassForm({...classForm, academicYear: e.target.value})} />
             </div>

             <DialogFooter>
               <Button type="submit">Create Class</Button>
             </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
