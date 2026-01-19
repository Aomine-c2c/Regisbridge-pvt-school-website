'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Assignment {
    id: string
    title: string
    description: string
    dueDate: string
    maxScore: number
    subject: {
        name: string
        code: string
    }
    submissions: {
        id: string
        submittedAt: string
        grade?: number
        feedback?: string
        status: string
    }[]
}

export default function AssignmentsPage() {
    const { user: _user, logout } = useAuth()
    const router = useRouter()
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all')

    useEffect(() => {
        fetchAssignments()
    }, [])

    const fetchAssignments = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('/api/student/assignments', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setAssignments(data.assignments)
            }
        } catch (error) {
            // Error fetching assignments
        } finally {
            setLoading(false)
        }
    }

    const getAssignmentStatus = (assignment: Assignment) => {
        if (assignment.submissions.length === 0) {
            const dueDate = new Date(assignment.dueDate)
            const now = new Date()
            return dueDate < now ? 'overdue' : 'pending'
        }

        const submission = assignment.submissions[0]
        if (submission.grade !== null && submission.grade !== undefined) {
            return 'graded'
        }
        return 'submitted'
    }

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30', icon: Clock },
            overdue: { text: 'Overdue', color: 'bg-red-100 text-red-800 dark:bg-red-900/30', icon: XCircle },
            submitted: { text: 'Submitted', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30', icon: CheckCircle },
            graded: { text: 'Graded', color: 'bg-green-100 text-green-800 dark:bg-green-900/30', icon: CheckCircle },
        }
        const badge = badges[status as keyof typeof badges] || badges.pending
        const Icon = badge.icon
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color} flex items-center gap-1`}>
                <Icon className="h-3 w-3" />
                {badge.text}
            </span>
        )
    }

    const filteredAssignments = assignments.filter(assignment => {
        if (filter === 'all') return true
        return getAssignmentStatus(assignment) === filter
    })

    const stats = {
        total: assignments.length,
        pending: assignments.filter(a => getAssignmentStatus(a) === 'pending').length,
        submitted: assignments.filter(a => getAssignmentStatus(a) === 'submitted').length,
        graded: assignments.filter(a => getAssignmentStatus(a) === 'graded').length,
        overdue: assignments.filter(a => getAssignmentStatus(a) === 'overdue').length,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.push('/student')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">My Assignments</h1>
                            <p className="text-sm text-muted-foreground">Track and submit your assignments</p>
                        </div>
                    </div>
                    <Button onClick={() => { logout(); router.push('/login') }} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <Card className={`cursor-pointer transition-all ${filter === 'all' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFilter('all')}>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total</p>
                        </CardContent>
                    </Card>
                    <Card className={`cursor-pointer transition-all ${filter === 'pending' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFilter('pending')}>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </CardContent>
                    </Card>
                    <Card className={`cursor-pointer transition-all ${filter === 'submitted' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFilter('submitted')}>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                            <p className="text-sm text-muted-foreground">Submitted</p>
                        </CardContent>
                    </Card>
                    <Card className={`cursor-pointer transition-all ${filter === 'graded' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFilter('graded')}>
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{stats.graded}</p>
                            <p className="text-sm text-muted-foreground">Graded</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50 dark:bg-red-900/20">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                            <p className="text-sm text-muted-foreground">Overdue</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Assignments List */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : filteredAssignments.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            <p>No assignments found</p>
                            <p className="text-sm mt-2">
                                {filter === 'all'
                                    ? 'Assignments will appear here once your teachers create them'
                                    : `No ${filter} assignments`}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredAssignments.map((assignment) => {
                            const status = getAssignmentStatus(assignment)
                            const submission = assignment.submissions[0]
                            const dueDate = new Date(assignment.dueDate)
                            const isOverdue = status === 'overdue'

                            return (
                                <Card key={assignment.id} className={isOverdue ? 'border-red-300' : ''}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                                                    {getStatusBadge(status)}
                                                </div>
                                                <CardDescription>
                                                    {assignment.subject.name} • Due: {dueDate.toLocaleDateString()} at {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Max Score</p>
                                                <p className="text-xl font-bold">{assignment.maxScore}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm mb-4">{assignment.description}</p>

                                        {submission ? (
                                            <div className="p-4 bg-muted rounded-lg">
                                                <p className="text-sm font-medium mb-2">Your Submission</p>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Submitted: {new Date(submission.submittedAt).toLocaleString()}
                                                </p>
                                                {submission.grade !== null && submission.grade !== undefined ? (
                                                    <div>
                                                        <p className="text-lg font-bold text-green-600">
                                                            Grade: {submission.grade}/{assignment.maxScore} ({((submission.grade / assignment.maxScore) * 100).toFixed(1)}%)
                                                        </p>
                                                        {submission.feedback && (
                                                            <div className="mt-2 p-2 bg-background rounded">
                                                                <p className="text-sm font-medium">Teacher Feedback:</p>
                                                                <p className="text-sm">{submission.feedback}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-blue-600">Awaiting grade...</p>
                                                )}
                                            </div>
                                        ) : (
                                            <Button className="w-full" disabled>
                                                Submit Assignment (Coming Soon)
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}
