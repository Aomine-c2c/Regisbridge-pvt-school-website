'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Check, X, Clock, AlertCircle } from 'lucide-react'

interface Student {
    id: string
    firstName: string
    lastName: string
    studentId: string
    grade: string
}

interface Class {
    id: string
    name: string
    code: string
    students: Student[]
}

export default function AttendancePage() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const subjectId = searchParams.get('subjectId')

    const [classes, setClasses] = useState<Class[]>([])
    const [selectedClass, setSelectedClass] = useState(subjectId || '')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [attendance, setAttendance] = useState<Record<string, string>>({})
    const [submitting, setSubmitting] = useState<Record<string, boolean>>({})
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
                if (subjectId) {
                    setSelectedClass(subjectId)
                }
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error)
        }
    }

    const selectedClassData = classes.find(c => c.id === selectedClass)

    const markAttendance = async (studentId: string, status: string) => {
        setSubmitting({ ...submitting, [studentId]: true })
        setMessage({ type: '', text: '' })

        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('/api/teacher/attendance/mark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    studentId,
                    subjectId: selectedClass,
                    status,
                    date: selectedDate,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setAttendance({ ...attendance, [studentId]: status })
                setMessage({ type: 'success', text: `Attendance marked for ${data.attendance.student.firstName} ${data.attendance.student.lastName}` })
                setTimeout(() => setMessage({ type: '', text: '' }), 3000)
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to mark attendance' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred' })
        } finally {
            setSubmitting({ ...submitting, [studentId]: false })
        }
    }

    const getStatusButton = (studentId: string, status: string, icon: any, label: string, color: string) => {
        const Icon = icon
        const isActive = attendance[studentId] === status

        return (
            <Button
                size="sm"
                variant={isActive ? "default" : "outline"}
                className={isActive ? color : ''}
                onClick={() => markAttendance(studentId, status)}
                disabled={submitting[studentId]}
            >
                <Icon className="h-4 w-4 mr-1" />
                {label}
            </Button>
        )
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
                            <h1 className="text-2xl font-bold">Mark Attendance</h1>
                            <p className="text-sm text-muted-foreground">Record student attendance</p>
                        </div>
                    </div>
                    <Button onClick={() => { logout(); router.push('/login') }} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {message.text && (
                    <div className={`p-3 rounded-md mb-4 ${message.type === 'success'
                            ? 'bg-green-50 text-green-800 dark:bg-green-900/20'
                            : 'bg-red-50 text-red-800 dark:bg-red-900/20'
                        }`}>
                        {message.text}
                    </div>
                )}

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Select Class and Date</CardTitle>
                        <CardDescription>Choose a class and date to mark attendance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Class/Subject</label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                >
                                    <option value="">Select a class...</option>
                                    {classes.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} ({c.code})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {selectedClass && selectedClassData && (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>{selectedClassData.name}</CardTitle>
                                    <CardDescription>
                                        {selectedClassData.students.length} students • {new Date(selectedDate).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-green-600" />
                                        <span>Present</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <X className="h-4 w-4 text-red-600" />
                                        <span>Absent</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                        <span>Late</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4 text-blue-600" />
                                        <span>Excused</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {selectedClassData.students.map((student) => (
                                    <div key={student.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {student.firstName} {student.lastName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {student.studentId} • Grade {student.grade}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {getStatusButton(student.id, 'present', Check, 'Present', 'bg-green-600 hover:bg-green-700')}
                                            {getStatusButton(student.id, 'absent', X, 'Absent', 'bg-red-600 hover:bg-red-700')}
                                            {getStatusButton(student.id, 'late', Clock, 'Late', 'bg-yellow-600 hover:bg-yellow-700')}
                                            {getStatusButton(student.id, 'excused', AlertCircle, 'Excused', 'bg-blue-600 hover:bg-blue-700')}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedClassData.students.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>No students in this class</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {!selectedClass && (
                    <Card>
                        <CardContent className="text-center py-12 text-muted-foreground">
                            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>Select a class to start marking attendance</p>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    )
}
