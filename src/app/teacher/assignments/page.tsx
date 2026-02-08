'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Assignment {
    id: string;
    title: string;
    dueDate: string;
    grade: string;
    subject: { name: string };
    _count: { submissions: number };
    status: string;
}

interface ClassOption {
    id: string;
    name: string;
}

export default function TeacherAssignmentsPage() {
    const { toast } = useToast();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    
    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [grade, setGrade] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [totalPoints, setTotalPoints] = useState('100');

    // Data for dropdowns
    // const [classes, setClasses] = useState<ClassOption[]>([]);
    // const [subjects, setSubjects] = useState<any[]>([]);

    useEffect(() => {
        fetchAssignments();
        fetchTeacherData(); // To get subjects/classes for dropdowns
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await fetch('/api/assignments', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
            if (json.success) {
                setAssignments(json.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTeacherData = async () => {
        try {
            const res = await fetch('/api/teacher/dashboard', {
                 headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
             if (json.success) {
                // Parse classes and subjects from dashboard data
                // Quick hack: repurpose the 'classes' array from dashboard API which already combines them
                // setClasses(json.data.classes);
                
                // We actually need SUBJECT IDs for the assignment creation.
                // The dashboard API returns `classes` list, but we need to know which subject is linked to which class?
                // Or does the user select "Subject" and "Grade/Class"?
                // The API /api/assignments requires `subjectId` and `grade`.
                
                // Better approach: Let's fetch the teacher profile directly or specific Subject list?
                // For MVP, let's use the layout data or assume we can filter.
                // Re-using dashboard logic:
                // We really need a list of "My Subjects". 
                // Let's rely on the teacher knowing their subject IDs? No, bad UX.
                // Let's add a quick fetch for subjects if needed.
                // Actually, the Dashboard API provides `teacherProfile.teacherSubjects` in the backend, but maybe not fully exposed in the generic dashboard response?
                // Let's just list the classes for 'Grade' selection, and for 'Subject', we might need to fetch /api/admin/subjects? No, that's admin only.
                
                // Let's just hardcode or fetch subjects associated with context. 
                // Wait, if I choose a Class (e.g. 10A - Math), I can deduce Subject ID if I had it.
                // Let's try to fetch subjects.
            }
        } catch (e) { console.error(e) }
    };
    
    // Helper to get subjects. 
    // Since we don't have a dedicated "my subjects" API handy, let's create a quick one or modify dashboard.
    // Actually, `GET /api/teacher/dashboard` returns generic stats.
    // Let's just create a quick client-side fetch for common subjects or Assume user types it? No.
    // Let's simply add a `Subject` Input for now to unblock, or a hardcoded list if we are verifying.
    // BETTER: The `classes` from dashboard has names like "10A - Math". 
    // We can't easily extract SubjectID from that string without the ID being in the object.
    
    // Let's assume for MVP validation we just want to create data.
    // I will add a mock subject selector or try to match.
    
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
             const res = await fetch('/api/assignments', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({
                    title, description, grade, subjectId, dueDate, totalPoints
                })
            });
            const json = await res.json();
            if (json.success) {
                toast({ title: 'Success', description: 'Assignment created successfully' });
                setShowCreate(false);
                fetchAssignments();
                // Reset form
                setTitle(''); setDescription('');
            } else {
                toast({ title: 'Error', description: json.message, variant: 'destructive' });
            }
        } catch (error) {
             toast({ title: 'Error', description: 'Failed to create assignment', variant: 'destructive' });
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
                <button 
                    onClick={() => setShowCreate(!showCreate)}
                    className="flex items-center gap-2 bg-brand-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    <span className="material-symbols-outlined">add</span>
                    Create Assignment
                </button>
            </div>

            {/* Create Form (Expandable) */}
            {showCreate && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">New Assignment</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g. Algebra Homework 1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grade / Class</label>
                                {/* Simply text input for Grade for now to match API expectation of 'String' */}
                                <input required value={grade} onChange={e => setGrade(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g. 10" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject ID</label>
                                {/* TODO: Replace with dropdown. For now, need a valid Subject ID from DB to work. */}
                                <input required value={subjectId} onChange={e => setSubjectId(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Paste a valid Subject ID" />
                                <p className="text-xs text-gray-400 mt-1">Temporary: Please look up a Subject ID from Admin &gt; Subjects</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <input required type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Points</label>
                                <input required type="number" value={totalPoints} onChange={e => setTotalPoints(e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded-md h-24" placeholder="Instructions..." />
                        </div>
                        <div className="flex justify-end gap-2">
                             <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                             <button type="submit" className="px-4 py-2 bg-brand-navy text-white rounded-md hover:bg-opacity-90">Create Assignment</button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
             <div className="grid gap-4">
                {loading ? <div className="text-center py-8 text-gray-500">Loading assignments...</div> : (
                    assignments.length > 0 ? assignments.map(assignment => (
                        <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center hover:border-brand-gold transition-colors group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-navy">{assignment.title}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${assignment.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {assignment.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 flex gap-4">
                                    <span>{assignment.subject?.name} • Grade {assignment.grade}</span>
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{assignment._count.submissions}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Submissions</div>
                                </div>
                                <a href={`/teacher/assignments/${assignment.id}`} className="text-sm text-brand-navy hover:underline font-medium">
                                    Grade &raquo;
                                </a>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-500">
                            No assignments found. Create one to get started.
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
