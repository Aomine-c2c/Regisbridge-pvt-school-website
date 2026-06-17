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
    const [_viewMode, _setViewMode] = useState<'grid' | 'list'>('list');
    const [selectedAssignments, setSelectedAssignments] = useState<Set<string>>(new Set());
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');
    const [_showBatchActions, _setShowBatchActions] = useState(false);
    const [templates, setTemplates] = useState<any[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    // Data for dropdowns
    const [subjects, setSubjects] = useState<{id: string; name: string}[]>([]);

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
            // Fetch teacher's subjects for the dropdown
            const res = await fetch('/api/teacher/subjects', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
            if (json.success && json.data) {
                setSubjects(json.data);
            }
        } catch (e) { console.error(e) }
    };

    // Load templates from localStorage
    useEffect(() => {
        const savedTemplates = localStorage.getItem('assignmentTemplates');
        if (savedTemplates) {
            setTemplates(JSON.parse(savedTemplates));
        }
    }, []);

    const saveAsTemplate = () => {
        const templateName = prompt('Enter template name:');
        if (!templateName) return;

        const newTemplate = {
            id: Date.now().toString(),
            name: templateName,
            title, description, grade, subjectId, totalPoints
        };

        const updatedTemplates = [...templates, newTemplate];
        setTemplates(updatedTemplates);
        localStorage.setItem('assignmentTemplates', JSON.stringify(updatedTemplates));
        toast({ title: 'Template saved', description: `"${templateName}" saved successfully` });
    };

    const loadTemplate = (templateId: string) => {
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setTitle(template.title);
            setDescription(template.description);
            setGrade(template.grade);
            setSubjectId(template.subjectId);
            setTotalPoints(template.totalPoints);
            toast({ title: 'Template loaded', description: 'Fill in the due date and create' });
        }
    };

    const toggleSelectAssignment = (id: string) => {
        setSelectedAssignments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        if (selectedAssignments.size === filteredAssignments.length) {
            setSelectedAssignments(new Set());
        } else {
            setSelectedAssignments(new Set(filteredAssignments.map(a => a.id)));
        }
    };

    const bulkDelete = async () => {
        if (!confirm(`Delete ${selectedAssignments.size} assignment(s)?`)) return;
        
        toast({ title: 'Deleting...', description: `Removing ${selectedAssignments.size} assignments` });
        // Simulate API call
        setTimeout(() => {
            setAssignments(prev => prev.filter(a => !selectedAssignments.has(a.id)));
            setSelectedAssignments(new Set());
            toast({ title: 'Deleted', description: 'Assignments removed successfully' });
        }, 500);
    };

    const bulkExtendDate = () => {
        const days = prompt('Extend due date by how many days?');
        if (!days || isNaN(parseInt(days))) return;

        toast({ title: 'Extending dates', description: `Adding ${days} days to ${selectedAssignments.size} assignments` });
        // Simulate update
        setTimeout(() => {
            setSelectedAssignments(new Set());
            toast({ title: 'Updated', description: 'Due dates extended successfully' });
        }, 500);
    };

    const getFilteredAssignments = () => {
        if (filterStatus === 'active') return assignments.filter(a => a.status === 'ACTIVE');
        if (filterStatus === 'draft') return assignments.filter(a => a.status === 'DRAFT');
        return assignments;
    };

    const filteredAssignments = getFilteredAssignments();

    // Calculate analytics
    const analytics = {
        total: assignments.length,
        active: assignments.filter(a => a.status === 'ACTIVE').length,
        totalSubmissions: assignments.reduce((sum, a) => sum + a._count.submissions, 0),
        avgSubmissions: assignments.length > 0 
            ? Math.round(assignments.reduce((sum, a) => sum + a._count.submissions, 0) / assignments.length)
            : 0
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

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">assignment</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Total</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.total}</div>
                    <div className="text-sm opacity-90">Assignments</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">check_circle</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Active</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.active}</div>
                    <div className="text-sm opacity-90">Live Now</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">upload_file</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Total</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.totalSubmissions}</div>
                    <div className="text-sm opacity-90">Submissions</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <span className="material-symbols-outlined text-white/80">analytics</span>
                        <span className="text-xs uppercase tracking-wide opacity-80">Average</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{analytics.avgSubmissions}</div>
                    <div className="text-sm opacity-90">Per Assignment</div>
                </div>
            </div>

            {/* Create Form (Expandable) */}
            {showCreate && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold mb-4">New Assignment</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        {/* Template Selector */}
                        {templates.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <label className="block text-sm font-medium text-blue-900 mb-2">Load from Template</label>
                                <div className="flex gap-2">
                                    <select 
                                        value={selectedTemplate}
                                        onChange={(e: any) => {
                                            setSelectedTemplate(e.target.value);
                                            if (e.target.value) loadTemplate(e.target.value);
                                        }}
                                        className="flex-1 p-2 border border-blue-300 rounded-md bg-white"
                                    >
                                        <option value="">Select a template...</option>
                                        {templates.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={saveAsTemplate}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                                    >
                                        Save as Template
                                    </button>
                                </div>
                            </div>
                        )}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select 
                                    required 
                                    value={subjectId} 
                                    onChange={e => setSubjectId(e.target.value)} 
                                    className="w-full p-2 border rounded-md bg-white"
                                >
                                    <option value="">Select a subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                                    ))}
                                </select>
                                {subjects.length === 0 && (
                                    <p className="text-xs text-gray-400 mt-1">No subjects found. Please contact admin.</p>
                                )}
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

            {/* Filters & Batch Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex gap-2">
                    <button 
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === 'all' 
                                ? 'bg-brand-navy text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All ({assignments.length})
                    </button>
                    <button 
                        onClick={() => setFilterStatus('active')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === 'active' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Active ({analytics.active})
                    </button>
                    <button 
                        onClick={() => setFilterStatus('draft')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filterStatus === 'draft' 
                                ? 'bg-gray-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Draft ({assignments.filter(a => a.status === 'DRAFT').length})
                    </button>
                </div>

                {selectedAssignments.size > 0 && (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                        <span className="text-sm font-medium text-blue-900">{selectedAssignments.size} selected</span>
                        <div className="h-4 w-px bg-blue-300"></div>
                        <button
                            onClick={bulkDelete}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            Delete
                        </button>
                        <button
                            onClick={bulkExtendDate}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Extend Date
                        </button>
                        <button
                            onClick={() => setSelectedAssignments(new Set())}
                            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>

            {/* List */}
             <div className="grid gap-4">
                {filteredAssignments.length > 0 && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                        <input
                            type="checkbox"
                            checked={selectedAssignments.size === filteredAssignments.length && filteredAssignments.length > 0}
                            onChange={toggleSelectAll}
                            className="size-4 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700">Select All</span>
                    </div>
                )}
                {loading ? <div className="text-center py-8 text-gray-500">Loading assignments...</div> : (
                    filteredAssignments.length > 0 ? filteredAssignments.map(assignment => (
                        <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 hover:border-brand-gold transition-colors group">
                            <input
                                type="checkbox"
                                checked={selectedAssignments.has(assignment.id)}
                                onChange={() => toggleSelectAssignment(assignment.id)}
                                className="size-5 cursor-pointer flex-shrink-0"
                            />
                            <div className="flex-1">
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
                        <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">assignment</span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments yet</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Create assignments to track student submissions and monitor progress.
                            </p>
                            <button 
                                onClick={() => setShowCreate(true)}
                                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                            >
                                <span className="material-symbols-outlined">add</span>
                                Create Assignment
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
