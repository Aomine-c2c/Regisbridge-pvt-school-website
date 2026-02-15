'use client';

import { useEffect, useState } from 'react';
import { MaterialIcon } from '@/components/ui/material-icon';
import { BadgeNew } from '@/components/ui/badge-new';
import { useToast } from '@/components/ui/use-toast';
// import { useRouter } from 'next/navigation';

interface ClassItem {
    id: string;
    name: string;
    grade: string;
    role: string;
    subject: string;
    studentsCount: number;
}

export default function MyClassesPage() {
    const { toast } = useToast();
    // const router = useRouter();
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await fetch('/api/teacher/classes', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const json = await res.json();
                if (json.success) {
                    setClasses(json.data);
                } else {
                    toast({ title: 'Error', description: json.message || 'Failed to load classes', variant: 'destructive' });
                }
            } catch (error) {
                console.error(error);
                toast({ title: 'Error', description: 'Failed to load classes', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, [toast]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark p-6">
             <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MaterialIcon icon="class" className="text-design-primary" />
                    My Classes
                </h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage the classes you teach.</p>
            </header>

            {loading ? (
                <div>Loading classes...</div>
            ) : classes.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <MaterialIcon icon="school" className="text-gray-300 mx-auto mb-4" size="4xl" />
                    <h3 className="text-lg font-medium text-gray-900">No Classes Assigned</h3>
                    <p className="text-gray-500">You haven't been assigned to any classes or subjects yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cls) => (
                        <div key={`${cls.id}-${cls.subject}`} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <BadgeNew variant={cls.role === 'Form Tutor' ? 'primary' : 'secondary'}>
                                    {cls.role}
                                </BadgeNew>
                                <MaterialIcon icon="more_vert" className="text-gray-400 cursor-pointer" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {cls.grade} {cls.name}
                            </h3>
                            <p className="text-sm font-medium text-design-primary mb-4">{cls.subject}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                <div className="flex items-center gap-1">
                                    <MaterialIcon icon="people" size="sm" />
                                    <span>{cls.studentsCount} Students</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MaterialIcon icon="meeting_room" size="sm" />
                                    <span>Room 3B</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    Attendance
                                </button>
                                <button className="flex-1 py-2 px-4 bg-design-primary text-white rounded-lg text-sm font-medium hover:bg-design-primary/90 transition-colors">
                                    View Class
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
