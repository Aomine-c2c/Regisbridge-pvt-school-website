'use client'

import React, { useState, useEffect } from 'react'

interface Student {
    id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: string;
    className: string;
    status: string;
    parentInfo: {
        name: string;
        email: string;
        phone: string;
        relationship: string;
    };
    // Include other fields as needed
}

export default function StudentRecordsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalStudents, setTotalStudents] = useState(0)

    // Filters
    const [selectedGrade, setSelectedGrade] = useState('All Grades')
    const [selectedStatus, setSelectedStatus] = useState('All Status')

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: '10',
                    search: searchTerm,
                })
                
                if (selectedGrade !== 'All Grades') params.append('grade', selectedGrade)
                if (selectedStatus !== 'All Status') params.append('status', selectedStatus)

                const res = await fetch(`/api/admin/students?${params.toString()}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure we send the token
                    }
                })
                
                if (!res.ok) {
                    if (res.status === 401) throw new Error("Unauthorized")
                    throw new Error("Failed to fetch")
                }

                const json = await res.json()
                if (json.success) {
                    setStudents(json.data.data)
                    setTotalPages(json.data.totalPages)
                    setTotalStudents(json.data.total)
                } else {
                    setError(json.message)
                }
            } catch (err) {
                console.error(err)
                setError('Failed to load students')
            } finally {
                setLoading(false)
            }
        }

        // Debounce search slightly
        const timeoutId = setTimeout(() => {
            fetchStudents()
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [searchTerm, page, selectedGrade, selectedStatus])

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Records</h1>
                    <p className="text-sm text-gray-500">Manage enrollment and academic records</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">upload</span>
                        Import CSV
                    </button>
                    <button className="px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-medium hover:bg-navy-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Add Student
                    </button>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full">
                {/* Stats Cards - Keeping Hardcoded for now as API doesn't return these stats yet */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{totalStudents}</h3>
                        <p className="text-sm text-gray-500">Total Enrollment</p>
                    </div>
                    {/* ... other stats cards ... */}
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative w-full sm:w-96">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">search</span>
                            <input 
                                type="text" 
                                placeholder="Search by name, ID, or email..." 
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <select 
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                            >
                                <option>All Grades</option>
                                <option>Form 1</option>
                                <option>Form 2</option>
                                <option>Form 3</option>
                                <option>Form 4</option>
                                <option>Lower 6</option>
                                <option>Upper 6</option>
                            </select>
                            <select 
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                            >
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Suspended</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto min-h-[400px]">
                        {loading ? (
                             <div className="flex justify-center items-center h-64 text-gray-400">Loading...</div>
                        ) : error ? (
                             <div className="flex justify-center items-center h-64 text-red-500">{error}</div>
                        ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Grade/Form</th>
                                    <th className="px-6 py-4">House</th>
                                    <th className="px-6 py-4">Guardian</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs uppercase">
                                                    {student.firstName[0]}{student.lastName[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                                                    <div className="text-xs text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{student.grade}</td>
                                        <td className="px-6 py-4 text-gray-700">{'Eagle'}</td> {/* Placeholder for House */}
                                        <td className="px-6 py-4 text-gray-700">{student.parentInfo?.name || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                student.status === 'ACTIVE' || student.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                                                student.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                student.status === 'SUSPENDED' ? 'bg-red-50 text-red-700 border-red-100' :
                                                'bg-gray-50 text-gray-700 border-gray-100'
                                            }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-brand-navy transition-colors p-1 rounded-full hover:bg-gray-100">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
                                            No students found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        )}
                    </div>
                    
                    {/* Pagination - Simple Implementation */}
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-center gap-2">
                        <button 
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1">Page {page} of {totalPages}</span>
                        <button 
                             disabled={page === totalPages}
                             onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                             className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
