import React, { useState, useEffect } from 'react';
import { User, BookOpen, Calendar, MessageSquare, LogOut, Eye, EyeOff, Download, Search, TrendingUp, Award, Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function StudentPortal() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleTabChange = async (tabId: string) => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    setActiveTab(tabId);
    setIsLoading(false);
  };

  const grades = [
    { subject: 'Mathematics', grade: 'A', percentage: 92, teacher: 'Mrs. Johnson' },
    { subject: 'English', grade: 'A-', percentage: 88, teacher: 'Ms. Davis' },
    { subject: 'Science', grade: 'B+', percentage: 85, teacher: 'Mr. Thompson' },
    { subject: 'Social Studies', grade: 'A', percentage: 91, teacher: 'Mrs. Nkosi' },
    { subject: 'ICT', grade: 'A-', percentage: 87, teacher: 'Mr. Wilson' },
  ];

  const assignments = [
    { title: 'Mathematics Assignment 3', subject: 'Mathematics', dueDate: '2025-01-20', status: 'submitted' },
    { title: 'Science Lab Report', subject: 'Science', dueDate: '2025-01-22', status: 'pending' },
    { title: 'English Essay', subject: 'English', dueDate: '2025-01-25', status: 'draft' },
  ];

  const announcements = [
    { title: 'Term 2 Examination Schedule', date: '2025-01-15', priority: 'high' },
    { title: 'Sports Day Registration Open', date: '2025-01-12', priority: 'medium' },
    { title: 'Library Book Return Reminder', date: '2025-01-10', priority: 'low' },
  ];

  return (
    <section id="portal" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#1C1A75]">
                  Welcome back, {user?.firstName} {user?.lastName}!
                </h2>
                <p className="text-gray-600">
                  {user?.grade && `${user.grade} • `}
                  {user?.studentId || user?.email}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="flex border-b">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'grades', label: 'Grades', icon: BookOpen },
                { id: 'assignments', label: 'Assignments', icon: Calendar },
                { id: 'finance', label: 'Finance', icon: CreditCard },
                { id: 'announcements', label: 'Announcements', icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#D4AF37] text-[#1C1A75]'
                      : 'border-transparent text-gray-600 hover:text-[#1C1A75]'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#1C1A75] border-t-transparent"></div>
                  <span className="ml-3 text-gray-600">Loading...</span>
                </div>
              )}

              {activeTab === 'overview' && !isLoading && (
                <div>
                  <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Academic Overview</h3>

                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-[#1C1A75] to-[#D4AF37] text-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80 text-sm">Average Grade</p>
                          <p className="text-2xl font-bold">A-</p>
                        </div>
                        <Award size={32} />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Assignments Due</p>
                          <p className="text-2xl font-bold text-[#1C1A75]">2</p>
                        </div>
                        <Calendar size={32} className="text-[#D4AF37]" />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Completed</p>
                          <p className="text-2xl font-bold text-green-600">8/10</p>
                        </div>
                        <BookOpen size={32} className="text-green-600" />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Attendance</p>
                          <p className="text-2xl font-bold text-blue-600">95%</p>
                        </div>
                        <Clock size={32} className="text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#1C1A75] mb-4">Recent Grades</h4>
                      <div className="space-y-3">
                        {grades.slice(0, 3).map((grade, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-[#1C1A75]">{grade.subject}</span>
                            <span className={`px-2 py-1 rounded text-sm font-bold ${
                              grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {grade.grade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1C1A75] mb-4">Upcoming Assignments</h4>
                      <div className="space-y-3">
                        {assignments.slice(0, 3).map((assignment, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-[#1C1A75]">{assignment.title}</h5>
                            <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'grades' && !isLoading && (
                <div>
                  <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Current Grades</h3>
                  <div className="grid gap-4">
                    {grades.map((grade, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-[#1C1A75]">{grade.subject}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                            grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {grade.grade}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{grade.percentage}%</span>
                          <span>Teacher: {grade.teacher}</span>
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#D4AF37] h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${grade.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'assignments' && !isLoading && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#1C1A75]">Assignments</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search assignments..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                        />
                      </div>
                      <button className="flex items-center space-x-2 bg-[#1C1A75] text-white px-4 py-2 rounded-lg hover:bg-[#D4AF37] transition-colors">
                        <Download size={16} />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {assignments
                      .filter(assignment =>
                        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((assignment, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-[#1C1A75]">{assignment.title}</h4>
                              <p className="text-sm text-gray-600">{assignment.subject}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              assignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                              assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {assignment.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                            {assignment.status === 'draft' && (
                              <button className="text-[#1C1A75] hover:text-[#D4AF37] text-sm font-medium">
                                Continue Working
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === 'finance' && !isLoading && (
                <div>
                  <h3 className="text-xl font-bold text-[#1C1A75] mb-6">Financial Overview</h3>

                  {/* Financial Summary Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Total Paid</p>
                          <p className="text-2xl font-bold">$13,500</p>
                        </div>
                        <CheckCircle size={32} />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-100 text-sm">Outstanding</p>
                          <p className="text-2xl font-bold">$1,200</p>
                        </div>
                        <AlertCircle size={32} />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Next Due</p>
                          <p className="text-lg font-bold">Jan 31, 2025</p>
                        </div>
                        <Calendar size={32} />
                      </div>
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="bg-white border rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-[#1C1A75] mb-4">Fee Structure</h4>
                    <div className="space-y-4">
                      {[
                        { name: 'Tuition', amount: 8500, paid: 8500, due: '2025-01-31' },
                        { name: 'Boarding', amount: 4200, paid: 3500, due: '2025-01-31' },
                        { name: 'Activities', amount: 800, paid: 800, due: '2025-01-31' },
                        { name: 'Transport', amount: 600, paid: 400, due: '2025-01-31' },
                      ].map((fee, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium text-[#1C1A75]">{fee.name}</h5>
                            <p className="text-sm text-gray-600">Due: {new Date(fee.due).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#1C1A75]">${fee.paid.toLocaleString()} / ${fee.amount.toLocaleString()}</p>
                            <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-[#D4AF37] h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-[#1C1A75] mb-4">Payment Methods</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: 'Credit/Debit Card', icon: '💳', available: true },
                        { name: 'Bank Transfer', icon: '🏦', available: true },
                        { name: 'Mobile Money', icon: '📱', available: true },
                        { name: 'Cash Payment', icon: '💵', available: false },
                      ].map((method, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            method.available
                              ? 'border-gray-200 hover:border-[#D4AF37] hover:shadow-md'
                              : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <h5 className="font-medium text-[#1C1A75]">{method.name}</h5>
                              <p className="text-sm text-gray-600">
                                {method.available ? 'Available' : 'Coming Soon'}
                              </p>
                            </div>
                          </div>
                          {method.available && (
                            <button className="mt-3 w-full bg-[#1C1A75] text-white py-2 px-4 rounded-lg hover:bg-[#D4AF37] transition-colors text-sm">
                              Pay Now
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'announcements' && !isLoading && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#1C1A75]">School Announcements</h3>
                    <div className="flex items-center space-x-2">
                      <select
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1C1A75]"
                        aria-label="Filter announcements by priority"
                      >
                        <option>All Priority</option>
                        <option>High Priority</option>
                        <option>Medium Priority</option>
                        <option>Low Priority</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                      <div key={index} className={`border-l-4 p-4 rounded hover:shadow-md transition-shadow ${
                        announcement.priority === 'high' ? 'border-l-red-500 bg-red-50' :
                        announcement.priority === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
                        'border-l-blue-500 bg-blue-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1C1A75]">{announcement.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Posted: {new Date(announcement.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                            announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {announcement.priority} priority
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}