'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface Grade {
    id: string
    score: number
    assessmentType: string
    maxScore: number
    weight: number
    subject: {
        name: string
        code: string
    }
    createdAt: string
}

export default function GradesPage() {
    const { user: _user, logout } = useAuth()
    const router = useRouter()
    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchGrades()
    }, [])

    const fetchGrades = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch('/api/student/grades', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setGrades(data.grades)
            }
        } catch (error) {
            // Error fetching grades
        } finally {
            setLoading(false)
        }
    }

    const calculatePercentage = (score: number, maxScore: number) => {
        return ((score / maxScore) * 100).toFixed(1)
    }

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return 'text-green-600'
        if (percentage >= 80) return 'text-blue-600'
        if (percentage >= 70) return 'text-yellow-600'
        if (percentage >= 60) return 'text-orange-600'
        return 'text-red-600'
    }

    const getGradeLetter = (percentage: number) => {
        if (percentage >= 90) return 'A'
        if (percentage >= 80) return 'B'
        if (percentage >= 70) return 'C'
        if (percentage >= 60) return 'D'
        return 'F'
    }

    // Group grades by subject
    const gradesBySubject = grades.reduce((acc, grade) => {
        const subjectName = grade.subject.name
        if (!acc[subjectName]) {
            acc[subjectName] = []
        }
        acc[subjectName].push(grade)
        return acc
    }, {} as Record<string, Grade[]>)

    // Calculate subject averages
    const subjectAverages = Object.entries(gradesBySubject).map(([subject, subjectGrades]) => {
        const totalWeightedScore = subjectGrades.reduce((sum, g) => {
            const percentage = (g.score / g.maxScore) * 100
            return sum + (percentage * g.weight)
        }, 0)
        const totalWeight = subjectGrades.reduce((sum, g) => sum + g.weight, 0)
        const average = totalWeight > 0 ? totalWeightedScore / totalWeight : 0

        return { subject, average, grades: subjectGrades }
    })

    const overallAverage = subjectAverages.length > 0
        ? subjectAverages.reduce((sum, s) => sum + s.average, 0) / subjectAverages.length
        : 0

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
                            <h1 className="text-2xl font-bold">My Grades</h1>
                            <p className="text-sm text-muted-foreground">Academic performance overview</p>
                        </div>
                    </div>
                    <Button onClick={() => { logout(); router.push('/login') }} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overall Summary */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Overall Performance</CardTitle>
                        <CardDescription>Your cumulative grade across all subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-8">
                            <div>
                                <div className={`text-6xl font-bold ${getGradeColor(overallAverage)}`}>
                                    {getGradeLetter(overallAverage)}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {overallAverage.toFixed(1)}% Average
                                </p>
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">
                                        {subjectAverages.filter(s => s.average >= 70).length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Passing</p>
                                </div>
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {subjectAverages.length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Subjects</p>
                                </div>
                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <p className="text-2xl font-bold text-purple-600">
                                        {grades.length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Total Grades</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Subject Breakdown */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : subjectAverages.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-8 text-muted-foreground">
                            <p>No grades available yet</p>
                            <p className="text-sm mt-2">Grades will appear here once your teachers enter them</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {subjectAverages.map(({ subject, average, grades: subjectGrades }) => (
                            <Card key={subject}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>{subject}</CardTitle>
                                            <CardDescription>{subjectGrades.length} assessments</CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-3xl font-bold ${getGradeColor(average)}`}>
                                                {getGradeLetter(average)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{average.toFixed(1)}%</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {subjectGrades.map((grade) => {
                                            const percentage = parseFloat(calculatePercentage(grade.score, grade.maxScore))
                                            return (
                                                <div key={grade.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                                    <div className="flex-1">
                                                        <p className="font-medium">{grade.assessmentType}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {new Date(grade.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold">
                                                            {grade.score}/{grade.maxScore}
                                                        </p>
                                                        <p className={`text-sm ${getGradeColor(percentage)}`}>
                                                            {percentage}% • {getGradeLetter(percentage)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
