'use client';

import { useEffect, useState } from 'react';
import { MaterialIcon } from '@/components/ui/material-icon';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

interface Student {
    id: string;
    name: string;
    rollNumber: string;
    attendance: string;
    status: string;
}

interface ClassDetails {
    id: string;
    name: string;
    grade: string;
    tutor: string;
}

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
    const { toast } = useToast();
    const router = useRouter();
    const [details, setDetails] = useState<ClassDetails | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const res = await fetch(`/api/teacher/classes/${params.id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const json = await res.json();
                if (json.success) {
                    setDetails(json.data.class);
                    setStudents(json.data.students);
                } else {
                    toast({ title: 'Error', description: json.message || 'Failed to load class', variant: 'destructive' });
                }
            } catch (error) {
                console.error(error);
                toast({ title: 'Error', description: 'Failed to load data', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        fetchClassData();
    }, [params.id, toast]);

    if (loading) return <div className="p-8 text-center">Loading class details...</div>;
    if (!details) return <div className="p-8 text-center">Class not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark p-6">
             <header className="mb-8 flex justify-between items-center">
                <div>
                    <Button variant="ghost" onClick={() => router.back()} className="mb-2 pl-0 hover:bg-transparent hover:text-design-primary">
                        <MaterialIcon icon="arrow_back" className="mr-2" />
                        Back to Classes
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {details.name} (Grade {details.grade})
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Form Tutor: {details.tutor}</p>
                </div>
                <div className="flex gap-3">
                     <Button variant="outline">
                        <MaterialIcon icon="download" className="mr-2" />
                        Export List
                     </Button>
                     <Button onClick={() => router.push(`/teacher/attendance?class=${details.id}`)}>
                        <MaterialIcon icon="edit_note" className="mr-2" />
                        Mark Attendance
                     </Button>
                </div>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Roll Number</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Attendance Rate</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.length > 0 ? students.map((bg) => (
                            <TableRow key={bg.id}>
                                <TableCell className="font-mono text-xs">{bg.rollNumber}</TableCell>
                                <TableCell className="font-medium">{bg.name}</TableCell>
                                <TableCell>{bg.attendance}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {bg.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        View Profile
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                    No students found in this class.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
