'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

interface GradeRecord {
  studentId: string;
  rollNumber: string;
  name: string;
  profileImage?: string;
  assessment: number;
  midterm: number;
  final: number;
  total: number;
  letterGrade: string;
  status: 'APPROVED' | 'SUBMITTED' | 'DRAFT';
  comments: string;
}

interface ClassStats {
  average: number;
  highest: number;
  lowest: number;
  passRate: number;
}

export default function TeacherGradebook() {
  const { toast } = useToast();


  const [selectedClass, ] = useState('Form 3 Science');
  const [selectedTerm, ] = useState('TERM 2');
  const [academicYear, ] = useState('2023-2024');
  const [subject, ] = useState('Physics & Chemistry Focus');

  const [students, setStudents] = useState<GradeRecord[]>([]);
  const [stats, ] = useState<ClassStats>({ average: 76, highest: 98, lowest: 42, passRate: 85 });
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState('2 minutes ago');

  useEffect(() => {
    // Fetch grades from API
    const fetchGrades = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/teacher/grades?class=form3&subject=science&term=2', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        if (json.success) {
          // Map API data to grade records
          setStudents(json.data || getMockData());
        } else {
          setStudents(getMockData());
        }
      } catch (error) {
        console.error('Failed to fetch grades', error);
        setStudents(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [selectedClass, selectedTerm]);

  const getMockData = (): GradeRecord[] => [
    { studentId: '1', rollNumber: 'ST-2023-089', name: 'Alice Johnson', assessment: 18, midterm: 28, final: 45, total: 91, letterGrade: 'A', status: 'APPROVED', comments: '' },
    { studentId: '2', rollNumber: 'ST-2023-092', name: 'Michael Chen', assessment: 15, midterm: 22, final: 38, total: 75, letterGrade: 'B', status: 'SUBMITTED', comments: 'Good effort this term.' },
    { studentId: '3', rollNumber: 'ST-2023-104', name: 'Sarah Smith', assessment: 12, midterm: 18, final: 12, total: 42, letterGrade: 'F', status: 'DRAFT', comments: '' },
    { studentId: '4', rollNumber: 'ST-2023-112', name: 'David Okechukwu', assessment: 19, midterm: 26, final: 41, total: 86, letterGrade: 'A', status: 'DRAFT', comments: '' },
    { studentId: '5', rollNumber: 'ST-2023-120', name: 'Emily Zhang', assessment: 17, midterm: 25, final: 39, total: 81, letterGrade: 'A', status: 'APPROVED', comments: '' },
  ];

  const handleGradeChange = (studentId: string, field: 'assessment' | 'midterm' | 'final', value: number) => {
    setStudents(prev => prev.map(s => {
      if (s.studentId === studentId) {
        const updated = { ...s, [field]: value };
        updated.total = updated.assessment + updated.midterm + updated.final;
        updated.letterGrade = calculateLetterGrade(updated.total);
        return updated;
      }
      return s;
    }));
  };

  const handleCommentChange = (studentId: string, value: string) => {
    setStudents(prev => prev.map(s => s.studentId === studentId ? { ...s, comments: value } : s));
  };

  const calculateLetterGrade = (total: number): string => {
    if (total >= 90) return 'A';
    if (total >= 80) return 'B';
    if (total >= 70) return 'B';
    if (total >= 60) return 'C';
    if (total >= 50) return 'D';
    return 'F';
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'bg-green-100 text-green-700';
    if (grade === 'B') return 'bg-blue-100 text-blue-700';
    if (grade === 'C') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'APPROVED') return { bg: 'bg-green-100 text-green-700', icon: 'check_circle', label: 'Approved' };
    if (status === 'SUBMITTED') return { bg: 'bg-blue-100 text-blue-700', icon: 'send', label: 'Submitted' };
    return { bg: 'bg-amber-100 text-amber-700', icon: 'edit_note', label: 'Draft' };
  };

  const saveDraft = async () => {
    toast({ title: 'Saving...', description: 'Saving grades as draft' });
    // API call to save
    setLastSaved('Just now');
  };

  const submitForApproval = async () => {
    toast({ title: 'Submitting...', description: 'Submitting grades for approval' });
    // API call to submit
  };

  const exportCSV = () => {
    toast({ title: 'Exporting...', description: 'Downloading CSV file' });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-gray-900">
            <div className="size-8 flex items-center justify-center bg-blue-50 rounded-lg text-blue-600">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">Regisbridge Academy</h2>
          </div>
          <label className="flex flex-col min-w-40 !h-10 max-w-64 hidden md:flex">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-600">
              <div className="text-gray-500 flex border-none bg-gray-50 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none text-gray-900 focus:outline-0 focus:ring-0 border-none bg-gray-50 focus:border-none h-full placeholder:text-gray-500 px-4 pl-2 text-base font-normal leading-normal"
                placeholder="Search student or class"
              />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden lg:flex items-center gap-9">
            <Link className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="/teacher">Dashboard</Link>
            <Link className="text-blue-600 text-sm font-bold leading-normal" href="/teacher/grades">Academics</Link>
            <Link className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="/teacher/classes">Students</Link>
            <Link className="text-gray-900 text-sm font-medium leading-normal hover:text-blue-600 transition-colors" href="/teacher/reports">Reports</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-900">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="bg-blue-100 rounded-full size-10 border-2 border-white shadow-sm cursor-pointer flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">TR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="flex flex-col max-w-[1280px] flex-1 w-full">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 p-4">
            <Link className="text-gray-500 text-sm font-medium leading-normal hover:underline" href="/teacher/academics">Academics</Link>
            <span className="text-gray-500 text-sm font-medium leading-normal">/</span>
            <Link className="text-gray-500 text-sm font-medium leading-normal hover:underline" href="/teacher/classes">My Classes</Link>
            <span className="text-gray-500 text-sm font-medium leading-normal">/</span>
            <span className="text-gray-900 text-sm font-medium leading-normal">Form 3 Science - Results Entry</span>
          </div>

          {/* Page Title & Main Actions */}
          <div className="flex flex-wrap justify-between items-end gap-4 p-4">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-gray-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">Gradebook: {selectedClass}</h1>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{selectedTerm}</span>
                <p className="text-gray-500 text-base font-normal leading-normal">{academicYear} Academic Year • {subject}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={exportCSV} className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white border border-gray-200 text-gray-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined text-[20px]">file_download</span>
                <span className="truncate hidden sm:inline">Export CSV</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white border border-gray-200 text-gray-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span className="truncate hidden sm:inline">View Logs</span>
              </button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Class Average</p>
                <span className="material-symbols-outlined text-gray-400">analytics</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 text-3xl font-bold leading-tight">{stats.average}%</p>
                <span className="flex items-center text-green-600 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                  2.5%
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Highest Score</p>
                <span className="material-symbols-outlined text-gray-400">military_tech</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 text-3xl font-bold leading-tight">{stats.highest}%</p>
                <span className="text-gray-400 text-sm font-medium">No change</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Lowest Score</p>
                <span className="material-symbols-outlined text-gray-400">warning</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 text-3xl font-bold leading-tight">{stats.lowest}%</p>
                <span className="flex items-center text-green-600 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                  5%
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pass Rate</p>
                <span className="material-symbols-outlined text-gray-400">check_circle</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 text-3xl font-bold leading-tight">{stats.passRate}%</p>
                <span className="flex items-center text-green-600 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                  1.2%
                </span>
              </div>
            </div>
          </div>

          {/* Filters & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-transparent">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-4 transition-colors">
                <span className="text-gray-900 text-sm font-medium">All Students</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-4 transition-colors">
                <span className="text-gray-900 text-sm font-medium">At Risk</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-4 transition-colors">
                <span className="text-gray-900 text-sm font-medium">High Achievers</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-4 transition-colors">
                <span className="text-gray-900 text-sm font-medium">Sort By Name</span>
                <span className="material-symbols-outlined text-[18px]">sort</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5"><span className="block size-2.5 rounded-full bg-green-500"></span>Approved</div>
              <div className="flex items-center gap-1.5"><span className="block size-2.5 rounded-full bg-blue-500"></span>Submitted</div>
              <div className="flex items-center gap-1.5"><span className="block size-2.5 rounded-full bg-amber-400"></span>Draft</div>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="p-4">
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[200px]">Student Details</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[100px] text-center">
                        Assess.<br /><span className="text-[10px] opacity-70">(20%)</span>
                      </th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[100px] text-center">
                        Mid-Term<br /><span className="text-[10px] opacity-70">(30%)</span>
                      </th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[100px] text-center">
                        Final<br /><span className="text-[10px] opacity-70">(50%)</span>
                      </th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[80px] text-center">Total</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[80px] text-center">Grade</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[140px]">Status</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[200px]">Comments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr><td colSpan={8} className="text-center py-8">Loading...</td></tr>
                    ) : students.map((student) => (
                      <tr key={student.studentId} className="group hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">{student.name.substring(0, 2)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">ID: #{student.rollNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <input
                            className="w-full text-center text-sm font-medium rounded border border-gray-300 bg-white py-1.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            type="number"
                            max="20"
                            value={student.assessment}
                            onChange={(e) => handleGradeChange(student.studentId, 'assessment', parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            className="w-full text-center text-sm font-medium rounded border border-gray-300 bg-white py-1.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            type="number"
                            max="30"
                            value={student.midterm}
                            onChange={(e) => handleGradeChange(student.studentId, 'midterm', parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            className="w-full text-center text-sm font-medium rounded border border-gray-300 bg-white py-1.5 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            type="number"
                            max="50"
                            value={student.final}
                            onChange={(e) => handleGradeChange(student.studentId, 'final', parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-sm font-bold text-gray-900">{student.total}</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-flex items-center justify-center size-8 rounded-full font-bold text-sm ${getGradeColor(student.letterGrade)}`}>
                            {student.letterGrade}
                          </span>
                        </td>
                        <td className="p-4">
                          {(() => {
                            const badge = getStatusBadge(student.status);
                            return (
                              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badge.bg}`}>
                                <span className="material-symbols-outlined text-[14px]">{badge.icon}</span>
                                {badge.label}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="p-4">
                          <input
                            className="w-full text-sm rounded border-none bg-transparent placeholder:text-gray-400 focus:ring-0"
                            placeholder="Add comment..."
                            type="text"
                            value={student.comments}
                            onChange={(e) => handleCommentChange(student.studentId, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-bold text-gray-900">1-{students.length}</span> of <span className="font-bold text-gray-900">{students.length}</span> students
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 disabled:opacity-50 transition-colors" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="size-8 rounded-lg bg-blue-600 text-white text-sm font-bold">1</button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors" disabled>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="sticky bottom-0 z-40 mt-auto w-full border-t border-gray-200 bg-white/90 backdrop-blur-sm p-4 px-8 shadow-lg">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>Last auto-saved {lastSaved}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={saveDraft} className="flex min-w-[120px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  Save Draft
                </button>
                <button onClick={submitForApproval} className="flex min-w-[160px] items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors">
                  Submit for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
