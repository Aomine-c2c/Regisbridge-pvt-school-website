'use client';

import { useState, useEffect } from 'react';

interface StudentGrade {
  id: string;
  name: string;
  avatar?: string;
  overallGPA: number;
  attendance: number;
  riskLevel: 'Critical' | 'Monitor' | 'On Track';
  grades: Record<string, string>; // subject -> grade letter
}

export default function TeacherAnalyticsHeatmap() {
  // const { toast } = useToast();
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState('10-A');
  const [termFilter, setTermFilter] = useState('Spring 2024');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/teacher/analytics', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        if (json.success) {
          setStudents(json.data || getMockData());
        } else {
          setStudents(getMockData());
        }
      } catch (error) {
        console.error(error);
        setStudents(getMockData());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [classFilter, termFilter]);

  const getMockData = (): StudentGrade[] => [
    { id: '1', name: 'Alex Johnson', overallGPA: 1.8, attendance: 65, riskLevel: 'Critical', grades: { Physics: 'D-', Chemistry: 'F', Biology: 'C-', Math: 'F', English: 'B', History: 'C' } },
    { id: '2', name: 'Bethany Wu', overallGPA: 2.4, attendance: 82, riskLevel: 'Monitor', grades: { Physics: 'C', Chemistry: 'C+', Biology: 'B-', Math: 'D', English: 'B+', History: 'A-' } },
    { id: '3', name: 'Charlie Davis', overallGPA: 3.8, attendance: 98, riskLevel: 'On Track', grades: { Physics: 'A', Chemistry: 'A-', Biology: 'A', Math: 'A', English: 'A-', History: 'B+' } },
    { id: '4', name: 'Diana Prince', overallGPA: 2.9, attendance: 92, riskLevel: 'Monitor', grades: { Physics: 'B', Chemistry: 'B+', Biology: 'B', Math: 'D-', English: 'C', History: 'B' } },
    { id: '5', name: 'Ethan Hunt', overallGPA: 1.5, attendance: 55, riskLevel: 'Critical', grades: { Physics: 'F', Chemistry: 'F', Biology: 'D-', Math: 'F', English: 'C-', History: 'D' } },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700 ring-green-600/20';
    if (grade.startsWith('B')) return 'bg-green-100 text-green-700 ring-green-600/20';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
    if (grade.startsWith('D')) return 'bg-red-100 text-red-700 ring-red-600/20';
    return 'bg-red-100 text-red-700 ring-red-600/20';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'Critical') return 'text-red-600';
    if (risk === 'Monitor') return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading analytics...</div>;

  const subjects = ['Physics', 'Chemistry', 'Biology', 'Math', 'English', 'History'];

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-blue-600 text-[28px]">monitoring</span>
            <h2 className="text-lg font-bold text-gray-900">Student Analytics Heatmap</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Page Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Performance Overview</h1>
            <p className="text-gray-500 mt-1">Grade 10 - Term 2 - Science Department</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              New Intervention
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-500">filter_list</span>
              <span className="text-sm font-semibold text-gray-700">Filters:</span>
            </div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <option>Class: 10-A</option>
              <option>Class: 10-B</option>
              <option>Class: 10-C</option>
            </select>
            <select
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <option>Term: Spring 2024</option>
              <option>Term: Fall 2023</option>
            </select>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-100 border border-red-500"></span>
                <span className="text-xs text-gray-600">Critical Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-yellow-100 border border-yellow-500"></span>
                <span className="text-xs text-gray-600">Monitor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-green-100 border border-green-500"></span>
                <span className="text-xs text-gray-600">On Track</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky left-0 z-20 bg-gray-50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 min-w-[200px] border-b border-r border-gray-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                    Student Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[100px] border-b border-gray-200">
                    Overall GPA
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[100px] border-b border-gray-200">
                    Attendance
                  </th>
                  {subjects.map((subject) => (
                    <th key={subject} className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {subject}
                    </th>
                  ))}
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 border-b border-gray-200">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {students.map((student) => (
                  <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="sticky left-0 z-10 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 bg-white group-hover:bg-gray-50 border-r border-gray-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                          {student.name.substring(0, 2)}
                        </div>
                        <div className="flex flex-col">
                          <span>{student.name}</span>
                          <span className={`text-xs font-medium ${getRiskColor(student.riskLevel)}`}>{student.riskLevel}</span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-bold">{student.overallGPA}</td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm font-semibold ${student.attendance < 70 ? 'text-red-600' : student.attendance < 85 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {student.attendance}%
                    </td>
                    {subjects.map((subject) => (
                      <td key={subject} className="whitespace-nowrap px-3 py-4 text-sm text-center">
                        <div className={`inline-flex items-center justify-center rounded px-2 py-1 text-xs font-bold ring-1 ring-inset ${getGradeColor(student.grades[subject] || 'N/A')}`}>
                          {student.grades[subject] || 'N/A'}
                        </div>
                      </td>
                    ))}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {student.riskLevel === 'Critical' ? (
                        <button className="text-blue-600 hover:text-blue-900 bg-white border border-gray-200 shadow-sm rounded-md px-3 py-1.5 transition-all text-xs font-semibold hover:shadow-md">
                          Create Intervention
                        </button>
                      ) : (
                        <button className="text-gray-500 hover:text-gray-900">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">142</span> results
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 'warning', color: 'red', title: 'Flagged for Math', subtitle: '12 Students' },
            { icon: 'running_with_errors', color: 'yellow', title: 'Low Attendance', subtitle: '8 Students' },
            { icon: 'event_note', color: 'blue', title: 'Pending Interventions', subtitle: '5 Drafts' },
          ].map((stat, idx) => (
            <div key={idx} className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm`}>
              <div className="flex-shrink-0">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                <p className="truncate text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          ))}
          <div className="relative flex items-center space-x-3 rounded-lg border border-dashed border-gray-300 bg-transparent px-6 py-5 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm font-medium text-blue-600">View Full Report History</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
