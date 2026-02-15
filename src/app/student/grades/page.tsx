'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'



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
    const { user: _user } = useAuth()
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
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">My Grades</h1>
                <p className="text-gray-500 mt-1">Track your academic performance and progress</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-12 h-12 border-4 border-brand-navy border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading grades...</p>
                </div>
            ) : subjectAverages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                    <span className="material-symbols-outlined text-7xl text-gray-300 mb-4 block">school</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No grades yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Grades will be posted here as teachers enter assessments.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Overall Performance Card */}
                    <div className="bg-gradient-to-r from-brand-navy to-blue-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                <span className="material-symbols-outlined text-2xl sm:text-3xl text-brand-gold">emoji_events</span>
                                <h2 className="text-xl sm:text-2xl font-black">Overall Performance</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {/* GPA Circle */}
                                <div className="flex items-center justify-center py-4">
                                    <div className="relative">
                                        {/* Circular progress */}
                                        <svg className="transform -rotate-90" width="180" height="180">
                                            <circle
                                                cx="90"
                                                cy="90"
                                                r="75"
                                                stroke="rgba(255,255,255,0.2)"
                                                strokeWidth="10"
                                                fill="none"
                                            />
                                            <circle
                                                cx="90"
                                                cy="90"
                                                r="75"
                                                stroke="#F4C430"
                                                strokeWidth="10"
                                                fill="none"
                                                strokeDasharray={`${(overallAverage / 100) * 471.24} 471.24`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="text-5xl sm:text-6xl font-black text-brand-gold">
                                                {getGradeLetter(overallAverage)}
                                            </div>
                                            <p className="text-base sm:text-lg font-semibold mt-1">
                                                {overallAverage.toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-green-300">check_circle</span>
                                            <p className="text-sm text-blue-100">Passing Subjects</p>
                                        </div>
                                        <p className="text-3xl font-black">
                                            {subjectAverages.filter(s => s.average >= 70).length}/{subjectAverages.length}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-purple-300">assignment_turned_in</span>
                                            <p className="text-sm text-blue-100">Total Grades</p>
                                        </div>
                                        <p className="text-3xl font-black">{grades.length}</p>
                                    </div>
                                    
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 col-span-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-blue-300">insights</span>
                                            <p className="text-sm text-blue-100">Performance Insight</p>
                                        </div>
                                        <p className="text-sm font-medium">
                                            {overallAverage >= 90 ? '🌟 Outstanding! Keep up the excellent work!' :
                                             overallAverage >= 80 ? '💪 Great job! You\'re doing really well!' :
                                             overallAverage >= 70 ? '📈 Good progress! Keep pushing forward!' :
                                             '💡 Let\'s work on improving together!'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subject Breakdown */}
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">Subject Performance</h2>
                        <div className="grid gap-5">
                            {subjectAverages.map(({ subject, average, grades: subjectGrades }) => {
                                const percentage = average;
                                const progressColor = 
                                    percentage >= 90 ? 'bg-green-500' :
                                    percentage >= 80 ? 'bg-blue-500' :
                                    percentage >= 70 ? 'bg-yellow-500' :
                                    percentage >= 60 ? 'bg-orange-500' : 'bg-red-500';
                                
                                return (
                                    <div key={subject} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all">
                                        {/* Subject Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-brand-navy/10 rounded-xl">
                                                    <span className="material-symbols-outlined text-2xl text-brand-navy">school</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{subject}</h3>
                                                    <p className="text-sm text-gray-500">{subjectGrades.length} assessments</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-4xl font-black ${getGradeColor(average)}`}>
                                                    {getGradeLetter(average)}
                                                </div>
                                                <p className="text-sm text-gray-500 font-semibold">{average.toFixed(1)}%</p>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${progressColor} transition-all duration-1000 ease-out rounded-full`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        {/* Individual Grades */}
                                        <div className="space-y-2">
                                            {subjectGrades.map((grade, idx) => {
                                                const gradePercentage = parseFloat(calculatePercentage(grade.score, grade.maxScore));
                                                return (
                                                    <div key={grade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <span className="inline-flex items-center justify-center size-8 bg-brand-navy/10 text-brand-navy font-bold text-sm rounded-lg">
                                                                {idx + 1}
                                                            </span>
                                                            <div>
                                                                <p className="font-semibold text-gray-900">{grade.assessmentType}</p>
                                                                <p className="text-xs text-gray-500">
                                                                    {new Date(grade.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-gray-900">
                                                                {grade.score}<span className="text-gray-400">/{grade.maxScore}</span>
                                                            </p>
                                                            <p className={`text-sm font-semibold ${getGradeColor(gradePercentage)}`}>
                                                                {gradePercentage}% • {getGradeLetter(gradePercentage)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
