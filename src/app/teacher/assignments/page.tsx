'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Plus } from 'lucide-react'

interface Class {
    id: string
    name: string
    code: string
    _count: {
        students: number
    }
}

export default function AssignmentsPage() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [classes, setClasses] = useState<Class[]>([])
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        subjectId: '',
        title: '',
        description: '',
        dueDate: '',
        dueTime: '23:59',
        maxScore: '100',
    })
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('/api/teacher/classes', {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            if (response.ok) {
                const data = await response.json()
                setClasses(data.classes)
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage({ type: '', text: '' })

        try {
            const token = localStorage.getItem('accessToken')

            // Combine date and time
            const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`)

            const response = await fetch('/api/teacher/assignments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    dueDate: dueDateTime.toISOString(),
                    maxScore: parseInt(formData.maxScore),
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: `Assignment created! It will be visible to ${data.assignment.subject._count.students} students.`
                })
                setFormData({
                    subjectId: '',
                    title: '',
                    description: '',
                    dueDate: '',
                    dueTime: '23:59',
                    maxScore: '100',
                })
                setShowForm(false)
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to create assignment' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred' })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.push('/teacher')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Assignments</h1>
                            <p className="text-sm text-muted-foreground">Create and manage assignments</p>
                        </div>
                    </div>
                    <Button onClick={() => { logout(); router.push('/login') }} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {message.text && (
                    <div className={`p-3 rounded-md mb-4 ${message.type === 'success'
                            ? 'bg-green-50 text-green-800 dark:bg-green-900/20'
                            : 'bg-red-50 text-red-800 dark:bg-red-900/20'
                        }`}>
                        {message.text}
                    </div>
                )}

                {!showForm ? (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Create New Assignment</CardTitle>
                                    <CardDescription>Add assignments for your classes</CardDescription>
                                </div>
                                <Button onClick={() => setShowForm(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Assignment
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <p>Click "New Assignment" to create an assignment for your students</p>
                                <p className="text-sm mt-2">Assignments will be visible to all students in the selected class</p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Create Assignment</CardTitle>
                                <Button variant="outline" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="class">Class/Subject *</Label>
                                    <select
                                        id="class"
                                        value={formData.subjectId}
                                        onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                        required
                                    >
                                        <option value="">Select a class...</option>
                                        {classes.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name} ({c.code}) - {c._count.students} students
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Assignment Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Chapter 5 Homework"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Assignment instructions and details..."
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
                                        rows={4}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dueDate">Due Date *</Label>
                                        <Input
                                            id="dueDate"
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dueTime">Due Time *</Label>
                                        <Input
                                            id="dueTime"
                                            type="time"
                                            value={formData.dueTime}
                                            onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="maxScore">Maximum Score *</Label>
                                    <Input
                                        id="maxScore"
                                        type="number"
                                        min="1"
                                        value={formData.maxScore}
                                        onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" className="flex-1" disabled={submitting}>
                                        {submitting ? 'Creating...' : 'Create Assignment'}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
