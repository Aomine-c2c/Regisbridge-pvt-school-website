'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';


export default function StudentAssignmentsPage() {
    const { toast } = useToast();
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
    const [submissionContent, setSubmissionContent] = useState('');

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await fetch('/api/assignments', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
            if (json.success) {
                // Ideally we merge with submission status.
                // For MVP, we display all.
                setAssignments(json.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAssignment) return;

        try {
            const res = await fetch(`/api/assignments/${selectedAssignment.id}/submit`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ content: submissionContent })
            });
            const json = await res.json();
            if (json.success) {
                toast({ title: 'Success', description: 'Work submitted successfully' });
                setSelectedAssignment(null);
                setSubmissionContent('');
                // Refresh?
            } else {
                toast({ title: 'Error', description: json.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to submit', variant: 'destructive' });
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Assignments</h1>

            {loading ? <div className="text-center py-8 text-gray-500">Loading...</div> : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {assignments.map(assignment => (
                        <div key={assignment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-brand-gold transition-all flex flex-col">
                             <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-brand-navy bg-brand-navy/10 px-2 py-1 rounded">
                                    {assignment.subject?.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{assignment.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                                {assignment.description || 'No description provided.'}
                            </p>
                            <button 
                                onClick={() => setSelectedAssignment(assignment)}
                                className="w-full py-2 bg-gray-50 text-brand-navy font-medium rounded-md hover:bg-gray-100 border border-gray-200"
                            >
                                View & Submit
                            </button>
                        </div>
                    ))}
                    {assignments.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg text-gray-500">
                            No assignments due.
                        </div>
                    )}
                </div>
            )}

            {/* Submission Modal */}
            {selectedAssignment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">{selectedAssignment.title}</h2>
                            <button onClick={() => setSelectedAssignment(null)} className="text-gray-500 hover:text-gray-700">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="mb-6 bg-gray-50 p-4 rounded-md text-sm text-gray-700 max-h-40 overflow-y-auto">
                            {selectedAssignment.description}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer / Link</label>
                            <textarea 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-md h-32 mb-4 focus:ring-2 focus:ring-brand-navy focus:border-transparent outline-none"
                                placeholder="Type your answer here or paste a Google Doc link..."
                                value={submissionContent}
                                onChange={e => setSubmissionContent(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setSelectedAssignment(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-brand-navy text-white rounded-md hover:bg-opacity-90">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
