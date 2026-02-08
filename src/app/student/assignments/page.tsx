'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';
  grade?: string;
  submittedAt?: string;
  subject?: {
    name: string;
  };
}

export default function StudentAssignmentsPage() {
    const { toast } = useToast();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [submissionContent, setSubmissionContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');

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

        setSubmitting(true);
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
                toast({ 
                    title: '✅ Submission Successful!', 
                    description: `Your work for "${selectedAssignment.title}" has been submitted.`,
                    duration: 5000
                });
                setSelectedAssignment(null);
                setSubmissionContent('');
                fetchAssignments(); // Refresh to show updated status
            } else {
                toast({ title: 'Error', description: json.message, variant: 'destructive' });
            }
        } catch (_error) {
            toast({ title: 'Error', description: 'Failed to submit. Please try again.', variant: 'destructive' });
        } finally {
            setSubmitting(false);
        }
    };

    // Get status badge styling
    const getStatusBadge = (assignment: Assignment) => {
        const status = assignment.status || 'NOT_STARTED';
        const styles = {
            'NOT_STARTED': { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'radio_button_unchecked', label: 'Not Started' },
            'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'pending', label: 'In Progress' },
            'SUBMITTED': { bg: 'bg-green-100', text: 'text-green-700', icon: 'check_circle', label: 'Submitted' },
            'GRADED': { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'grading', label: `Graded: ${assignment.grade}` }
        };
        return styles[status];
    };

    // Filter assignments
    const filteredAssignments = assignments.filter(a => {
        if (filter === 'pending') return !a.status || a.status === 'NOT_STARTED' || a.status === 'IN_PROGRESS';
        if (filter === 'submitted') return a.status === 'SUBMITTED' || a.status === 'GRADED';
        return true;
    });

    // Get urgency color
    const getUrgencyClass = (dueDate: string) => {
        const now = new Date();
        const due = new Date(dueDate);
        const hoursUntil = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
        
        if (hoursUntil < 0) return 'border-l-red-500';
        if (hoursUntil < 24) return 'border-l-orange-500';
        if (hoursUntil < 72) return 'border-l-yellow-500';
        return 'border-l-gray-300';
    };

    return (
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
            {/* Header with Filters */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4">My Assignments</h1>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            filter === 'all' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All ({assignments.length})
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            filter === 'pending' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Pending ({assignments.filter(a => !a.status || a.status === 'NOT_STARTED' || a.status === 'IN_PROGRESS').length})
                    </button>
                    <button
                        onClick={() => setFilter('submitted')}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            filter === 'submitted' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Submitted ({assignments.filter(a => a.status === 'SUBMITTED' || a.status === 'GRADED').length})
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-12 h-12 border-4 border-brand-navy border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading assignments...</p>
                </div>
            ) : (
                filteredAssignments.length > 0 ? (
                    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredAssignments.map(assignment => {
                            const statusBadge = getStatusBadge(assignment);
                            const urgencyClass = getUrgencyClass(assignment.dueDate);
                            
                            return (
                                <div 
                                    key={assignment.id} 
                                    className={`bg-white p-6 rounded-xl shadow-sm border-l-4 border-r border-t border-b border-gray-200 hover:shadow-lg transition-all flex flex-col group ${urgencyClass}`}
                                >
                                    {/* Header with Subject and Status */}
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-bold text-brand-navy bg-brand-navy/10 px-3 py-1.5 rounded-lg">
                                            {assignment.subject?.name || 'General'}
                                        </span>
                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${statusBadge.bg} ${statusBadge.text}`}>
                                            <span className="material-symbols-outlined text-sm">{statusBadge.icon}</span>
                                            {statusBadge.label}
                                        </span>
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-brand-navy transition-colors line-clamp-2">
                                        {assignment.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                                        {assignment.description || 'No description provided.'}
                                    </p>
                                    
                                    {/* Footer with Due Date and Action */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            <span>Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedAssignment(assignment)}
                                            className="inline-flex items-center gap-1 px-4 py-2 bg-brand-navy text-white font-medium text-sm rounded-lg hover:bg-brand-navy-light transition-colors"
                                        >
                                            {assignment.status === 'SUBMITTED' || assignment.status === 'GRADED' ? 'View Details' : 'Submit Work'}
                                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                        <span className="material-symbols-outlined text-7xl text-gray-300 mb-4 block">assignment</span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {filter === 'pending' ? 'No pending assignments' : filter ==='submitted' ? 'No submitted assignments' : 'No assignments yet'}
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {filter === 'all' 
                                ? 'Assignments from your teachers will appear here.' 
                                : filter === 'pending'
                                ? 'All assignments complete. Well done.'
                                : 'Your submitted work will appear here.'}
                        </p>
                    </div>
                )
            )}

            {/* Enhanced Submission Modal */}
            {selectedAssignment && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-brand-navy to-blue-900 text-white rounded-t-2xl">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="inline-block px-3 py-1 text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg">
                                            {selectedAssignment.subject?.name || 'General'}
                                        </span>
                                        {(() => {
                                            const badge = getStatusBadge(selectedAssignment);
                                            return (
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg ${badge.bg} ${badge.text}`}>
                                                    <span className="material-symbols-outlined text-sm">{badge.icon}</span>
                                                    {badge.label}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-black">{selectedAssignment.title}</h2>
                                    <p className="text-xs sm:text-sm text-blue-100 mt-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">schedule</span>
                                        Due: {new Date(selectedAssignment.dueDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => { setSelectedAssignment(null); setSubmissionContent(''); }}
                                    className="text-white/70 hover:text-white transition-colors ml-2 sm:ml-4"
                                >
                                    <span className="material-symbols-outlined text-2xl">close</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="p-4 sm:p-6">
                            {/* Description */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-brand-navy">description</span>
                                    Assignment Description
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedAssignment.description || 'No description provided.'}
                                </p>
                            </div>
                            
                            {/* Submission Form */}
                            {(!selectedAssignment.status || selectedAssignment.status === 'NOT_STARTED' || selectedAssignment.status === 'IN_PROGRESS') ? (
                                <form onSubmit={handleSubmit}>
                                    <label className="block mb-3 font-bold text-gray-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-brand-navy">edit_note</span>
                                        Your Submission
                                    </label>
                                    <textarea 
                                        className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent transition-all"
                                        placeholder="Type your answer or upload your work here...&#10;&#10;Tip: Be detailed and thorough in your response."
                                        value={submissionContent}
                                        onChange={(e) => setSubmissionContent(e.target.value)}
                                        required
                                        disabled={submitting}
                                    />
                                    <div className="flex gap-3 mt-6">
                                        <button 
                                            type="button"
                                            onClick={() => { setSelectedAssignment(null); setSubmissionContent(''); }}
                                            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            className="flex-1 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-brand-navy-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined">send</span>
                                                    <span>Submit Assignment</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-3xl text-green-600">check_circle</span>
                                        <div>
                                            <h3 className="font-bold text-green-900 mb-1">Assignment Submitted!</h3>
                                            <p className="text-sm text-green-700">
                                                You submitted this assignment on {selectedAssignment.submittedAt ? new Date(selectedAssignment.submittedAt).toLocaleDateString() : 'N/A'}.
                                                {selectedAssignment.status === 'GRADED' && selectedAssignment.grade && (
                                                    <span className="block mt-2 font-bold text-base">Grade: {selectedAssignment.grade}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
