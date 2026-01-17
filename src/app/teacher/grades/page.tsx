'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'

export default function GradeEntryPage() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const subjectId = searchParams.get('subjectId')

    const [classes, setClasses] = useState<any[]>([])
    const [selectedClass, setSelectedClass] = useState(subjectId || '')
    const [students, setStudents] = useState<any[]>([])
    const [formData, setFormData] = useState({
        studentId: '',
        score: '',
        maxScore: '100',
        assessmentType: 'Test',
        weight: '1.0',
    })
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchClasses()
    }, [])

    useEffect(() => {
        if (selectedClass) {
            const classData = classes.find(c => c.id === selectedClass)
            if (classData) {
                setStudents(classData.students || [])
            }
        }
    }, [selectedClass, classes])

    const fetchClasses = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('/api/teacher/classes', {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            if (response.ok) {
                const data = await response.json()
                setClasses(data.classes)
                if (subjectId && data.classes.length > 0) {
                    setSelectedClass(subjectId)
                }
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
            const response = await fetch('/api/teacher/grades/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    subjectId: selectedClass,
                    score: parseFloat(formData.score),
                    maxScore: parseFloat(formData.maxScore),
                    weight: parseFloat(formData.weight),
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setMessage({ type: 'success', text: 'Grade added successfully!' })
                setFormData({
                    studentId: '',
                    score: '',
                    maxScore: '100',
                    assessmentType: 'Test',
                    weight: '1.0',
                })
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to add grade' })
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
                        <Button variant="ghost" onClick={() => router.push('/teacher/classes')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Grade Entry</h1>
                            <p className="text-sm text-muted-foreground">Enter grades for your students</p>
                        </div>
                    </div>
                    <Button onClick={() => { logout(); router.push('/login') }} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Grade</CardTitle>
                        <CardDescription>Enter assessment scores for students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {message.text && (
                            <div className={`p-3 rounded-md mb-4 ${message.type === 'success'
                                    ? 'bg-green-50 text-green-800 dark:bg-green-900/20'
                                    : 'bg-red-50 text-red-800 dark:bg-red-900/20'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="class">Class/Subject</Label>
                                <select
                                    id="class"
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                    required
                                >
                                    <option value="">Select a class...</option>
                                    {classes.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} ({c.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedClass && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="student">Student</Label>
                                        <select
                                            id="student"
                                            value={formData.studentId}
                                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                            required
                                        >
                                            <option value="">Select a student...</option>
                                            {students.map((student) => (
                                                <option key={student.id} value={student.id}>
                                                    {student.firstName} {student.lastName} ({student.studentId})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="score">Score</Label>
                                            <Input
                                                id="score"
                                                type="number"
                                                step="0.01"
                                                value={formData.score}
                                                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="maxScore">Max Score</Label>
                                            <Input
                                                id="maxScore"
                                                type="number"
                                                value={formData.maxScore}
                                                onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Assessment Type</Label>
                                            <select
                                                id="type"
                                                value={formData.assessmentType}
                                                onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                            >
                                                <option>Test</option>
                                                <option>Quiz</option>
                                                <option>Homework</option>
                                                <option>Project</option>
                                                <option>Exam</option>
                                                <option>Midterm</option>
                                                <option>Final</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="weight">Weight</Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                step="0.1"
                                                value={formData.weight}
                                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full" disabled={submitting}>
                                        {submitting ? 'Adding Grade...' : 'Add Grade'}
                                    </Button>
                                </>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
