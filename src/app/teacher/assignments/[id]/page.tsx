'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';

interface Submission {
    id: string;
    studentId: string;
    student: {
        user: { firstName: string; lastName: string };
        rollNumber: string;
    };
    submittedAt: string;
    content: string;
    fileUrl?: string;
    score?: number;
    feedback?: string;
    status: string;
}

interface AssignmentDetail {
    id: string;
    title: string;
    description: string;
    totalPoints: number;
    dueDate: string;
    submissions: Submission[];
}

export default function AssignmentGradingPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [assignment, setAssignment] = useState<AssignmentDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // Grading State
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [score, setScore] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (params.id) fetchAssignment();
    }, [params.id]);

    const fetchAssignment = async () => {
        try {
            const res = await fetch(`/api/assignments/${params.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
            if (json.success) {
                setAssignment(json.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenGrading = (submission: Submission) => {
        setSelectedSubmission(submission);
        setScore(submission.score?.toString() || '');
        setFeedback(submission.feedback || '');
    };

    const handleSaveGrade = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubmission || !assignment) return;

        try {
            const res = await fetch(`/api/assignments/${assignment.id}/grade`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({
                    studentId: selectedSubmission.studentId,
                    score: Number(score),
                    feedback
                })
            });
            const json = await res.json();
            if (json.success) {
                toast({ title: 'Success', description: 'Grade saved successfully' });
                setSelectedSubmission(null);
                fetchAssignment(); // Refresh list
            } else {
                toast({ title: 'Error', description: json.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to save grade', variant: 'destructive' });
        }
    };

    if (loading) return <div className="p-8 text-center">Loading assignment details...</div>;
    if (!assignment) return <div className="p-8 text-center text-red-500">Assignment not found</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div>
                     <h1 className="text-2xl font-bold text-gray-900">{assignment.title}</h1>
                     <p className="text-sm text-gray-500">Total Points: {assignment.totalPoints} • Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                {/* Submissions List */}
                <div className="w-1/3 bg-white border border-gray-200 rounded-lg overflow-y-auto">
                    <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                        Submissions ({assignment.submissions.length})
                    </div>
                    <div>
                        {assignment.submissions.length > 0 ? assignment.submissions.map(sub => (
                             <div 
                                key={sub.id} 
                                onClick={() => handleOpenGrading(sub)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${selectedSubmission?.id === sub.id ? 'bg-blue-50 border-l-4 border-l-brand-navy' : ''}`}
                            >
                                <div className="font-medium text-gray-900">{sub.student.user.firstName} {sub.student.user.lastName}</div>
                                <div className="flex justify-between items-center text-xs mt-1">
                                    <span className="text-gray-500">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                    {sub.score !== null && sub.score !== undefined ? (
                                        <span className="text-green-600 font-bold">{sub.score}/{assignment.totalPoints}</span>
                                    ) : (
                                        <span className="text-yellow-600 italic">Ungraded</span>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-gray-500 italic">No submissions yet.</div>
                        )}
                    </div>
                </div>

                {/* Grading Area */}
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 flex flex-col">
                    {selectedSubmission ? (
                        <>
                            <div className="mb-6 flex-1 overflow-y-auto">
                                <h2 className="text-lg font-bold mb-4 border-b pb-2">Student Submission</h2>
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 font-mono text-sm whitespace-pre-wrap">
                                    {selectedSubmission.content || (
                                        <span className="text-gray-400 italic">No text content submitted. File URL: {selectedSubmission.fileUrl}</span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-bold text-gray-900 mb-4">Grade & Feedback</h3>
                                <form onSubmit={handleSaveGrade} className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-32">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    required
                                                    max={assignment.totalPoints}
                                                    value={score}
                                                    onChange={e => setScore(e.target.value)}
                                                    className="w-full p-2 border rounded-md" 
                                                />
                                                <span className="text-gray-500">/ {assignment.totalPoints}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                         <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                                         <textarea 
                                            value={feedback}
                                            onChange={e => setFeedback(e.target.value)}
                                            className="w-full p-2 border rounded-md h-24"
                                            placeholder="Great work, but check..."
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="px-6 py-2 bg-brand-navy text-white rounded-md hover:bg-opacity-90">
                                            Save Grade
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 flex-col">
                            <span className="material-symbols-outlined text-4xl mb-2">assignment_turned_in</span>
                            <p>Select a student to grade their submission.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
