'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Users, BookOpen } from 'lucide-react'

interface Class {
    id: string
    name: string
    code: string
    description: string
    students: {
        id: string
        firstName: string
        lastName: string
        grade: string
        studentId: string
    }[]
    _count: {
        students: number
        assignments: number
    }
}

export default function ClassesPage() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [classes, setClasses] = useState<Class[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('/api/teacher/classes', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setClasses(data.classes)
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.push('/teacher')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">My Classes</h1>
                            <p className="text-sm text-muted-foreground">View and manage your classes</p>
                        </div>
                    </div>
                    <Button onClick={() => { logout(); router.push('/login') }} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : classes.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No classes assigned yet</p>
                            <p className="text-sm mt-2">Classes will appear here once you are assigned to teach them</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {classes.map((classItem) => (
                            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{classItem.name}</CardTitle>
                                            <CardDescription>{classItem.code}</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={() => router.push(`/teacher/grades?subjectId=${classItem.id}`)}>
                                                Enter Grades
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => router.push(`/teacher/attendance?subjectId=${classItem.id}`)}>
                                                Attendance
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">{classItem.description}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm text-muted-foreground">Students</span>
                                            </div>
                                            <p className="text-2xl font-bold">{classItem._count.students}</p>
                                        </div>
                                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <BookOpen className="h-4 w-4 text-green-600" />
                                                <span className="text-sm text-muted-foreground">Assignments</span>
                                            </div>
                                            <p className="text-2xl font-bold">{classItem._count.assignments}</p>
                                        </div>
                                    </div>

                                    {/* Student List Preview */}
                                    {classItem.students.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium mb-2">Students ({classItem.students.length}):</p>
                                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                                {classItem.students.slice(0, 5).map((student) => (
                                                    <div key={student.id} className="text-sm p-2 bg-muted/50 rounded flex justify-between">
                                                        <span>{student.firstName} {student.lastName}</span>
                                                        <span className="text-muted-foreground">{student.studentId}</span>
                                                    </div>
                                                ))}
                                                {classItem.students.length > 5 && (
                                                    <p className="text-sm text-muted-foreground text-center">
                                                        +{classItem.students.length - 5} more students
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
