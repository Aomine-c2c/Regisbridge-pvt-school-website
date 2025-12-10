'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gradeSeven2020Results } from '@/lib/seed-data-academics';
import { enrollmentMarch2021, enrollmentSummary } from '@/lib/seed-data-enrollment';
import { TrendingUp, Users, Award, BookOpen } from 'lucide-react';

export default function DataVisualization() {
  const [activeTab, setActiveTab] = useState<'academic' | 'enrollment' | 'overview'>('overview');

  // Memoize data transformations
  const academicData = useMemo(
    () =>
      gradeSeven2020Results.subjectResults.map(result => ({
        subject: result.subject,
        passRate: parseFloat(result.passRate.replace('%', '').replace('+', '')),
        candidates: result.candidates,
      })),
    []
  );

  const enrollmentTrendData = useMemo(
    () =>
      enrollmentMarch2021.map(record => ({
        grade: record.grade,
        opening: record.openingTotal,
        current: record.currentTotal,
        growth: record.growth,
      })),
    []
  );

  const genderData = useMemo(
    () => [
      { name: 'Male', value: enrollmentSummary.current.male, color: '#1C1A75' },
      { name: 'Female', value: enrollmentSummary.current.female, color: '#D4AF37' },
    ],
    []
  );

  const overviewStats = useMemo(
    () => [
      {
        icon: Users,
        label: 'Total Enrollment',
        value: enrollmentSummary.current.total,
        change: '+' + enrollmentSummary.growth.absolute,
        changePercent: enrollmentSummary.growth.percentage.toFixed(1) + '%',
        color: 'text-blue-600',
      },
      {
        icon: Award,
        label: 'Grade 7 Pass Rate',
        value: gradeSeven2020Results.overallPassRate,
        subtext: `${gradeSeven2020Results.totalLearners} learners`,
        color: 'text-green-600',
      },
      {
        icon: TrendingUp,
        label: 'Enrollment Growth',
        value: enrollmentSummary.growth.percentage.toFixed(1) + '%',
        subtext: 'March to April 2021',
        color: 'text-purple-600',
      },
      {
        icon: BookOpen,
        label: 'Grade Levels',
        value: '12',
        subtext: 'ECD to Grade 7',
        color: 'text-orange-600',
      },
    ],
    []
  );

  // Chart colors (kept for future use with pie charts)
  // const COLORS = ['#1C1A75', '#D4AF37', '#4A90E2', '#50C878', '#FF6B6B'];

  return (
    <section id="data-visualization" className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-royal text-center mb-4 text-shadow-soft">
          School Performance Dashboard
        </h2>
        <div className="divider-animated w-32 h-1 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto text-lg">
          Real-time insights into academic performance, enrollment trends, and institutional growth based on 2020-2021 data.
        </p>

        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            const delay = `${index * 0.1}s`;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-lg shadow-medium card-elevated micro-float"
                data-delay={delay}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`${stat.color} micro-wiggle`} size={32} />
                  {stat.change && (
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400 glass-card-dark px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </div>
                {stat.changePercent && (
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    Growth: {stat.changePercent}
                  </div>
                )}
                {stat.subtext && (
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.subtext}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'overview'
                ? 'btn-gradient shadow-glow-gold'
                : 'glass-card hover:shadow-medium micro-bounce text-gray-700 dark:text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'academic'
                ? 'btn-gradient shadow-glow-gold'
                : 'glass-card hover:shadow-medium micro-bounce text-gray-700 dark:text-gray-300'
            }`}
          >
            Academic Performance
          </button>
          <button
            onClick={() => setActiveTab('enrollment')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'enrollment'
                ? 'btn-gradient shadow-glow-gold'
                : 'glass-card hover:shadow-medium micro-bounce text-gray-700 dark:text-gray-300'
            }`}
          >
            Enrollment Trends
          </button>
        </div>

        {/* Chart Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              {/* Gender Distribution Pie Chart */}
              <div className="glass-card p-8 rounded-lg shadow-strong">
                <h3 className="text-2xl font-bold text-gradient-royal mb-6 text-center">
                  Student Gender Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) =>
                        `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    Total Students: <span className="font-bold text-[#1C1A75] dark:text-[#D4AF37]">{enrollmentSummary.current.total}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Data as of April 2021
                  </p>
                </div>
              </div>

              {/* Enrollment Growth Overview */}
              <div className="glass-card p-8 rounded-lg shadow-strong">
                <h3 className="text-2xl font-bold text-gradient-royal mb-6 text-center">
                  Overall Enrollment Growth
                </h3>
                <div className="space-y-6">
                  <div className="glass-card-dark p-4 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">Opening Enrollment</span>
                      <span className="text-2xl font-bold text-[#1C1A75] dark:text-white">{enrollmentSummary.opening.total}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Male: {enrollmentSummary.opening.male} | Female: {enrollmentSummary.opening.female}
                    </div>
                  </div>
                  <div className="glass-card-dark p-4 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">Current Enrollment</span>
                      <span className="text-2xl font-bold text-[#D4AF37]">{enrollmentSummary.current.total}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Male: {enrollmentSummary.current.male} | Female: {enrollmentSummary.current.female}
                    </div>
                  </div>
                  <div className="gradient-royal text-white p-4 rounded shadow-medium">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Net Growth</span>
                      <span className="text-2xl font-bold">{enrollmentSummary.growth.absolute > 0 ? '+' : ''}{enrollmentSummary.growth.absolute}</span>
                    </div>
                    <div className="text-sm opacity-90">
                      Percentage Change: {enrollmentSummary.growth.percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs opacity-75 mt-2">
                      Period: March 15 - April 21, 2021
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="glass-card p-8 rounded-lg shadow-strong animate-fade-in">
              <h3 className="text-2xl font-bold text-gradient-royal mb-6 text-center">
                Grade 7 Examination Results (2020)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={academicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="subject" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #D4AF37',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="passRate" fill="#1C1A75" name="Pass Rate (%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="glass-card-dark p-4 rounded border-l-4 border-[#1C1A75]">
                  <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Overall Performance</h4>
                  <p className="text-3xl font-bold text-[#1C1A75] dark:text-[#D4AF37] mb-2">
                    {gradeSeven2020Results.overallPassRate}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pass rate across all subjects
                  </p>
                </div>
                <div className="glass-card-dark p-4 rounded border-l-4 border-[#D4AF37]">
                  <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Key Insight</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {gradeSeven2020Results.notes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'enrollment' && (
            <div className="glass-card p-8 rounded-lg shadow-strong animate-fade-in">
              <h3 className="text-2xl font-bold text-gradient-royal mb-6 text-center">
                Enrollment Trends by Grade Level
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={enrollmentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="grade" stroke="#666" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #D4AF37',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="opening" stroke="#1C1A75" strokeWidth={2} name="Opening" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="current" stroke="#D4AF37" strokeWidth={2} name="Current" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-8">
                <div className="glass-card-dark p-4 rounded">
                  <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Growth Analysis</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Highest Growth</p>
                      <p className="font-bold text-green-600 dark:text-green-400">
                        ECD B1: +19 students (70.4%)
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Most Stable</p>
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        Grade 1A & Grade 7: No change
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Needs Attention</p>
                      <p className="font-bold text-red-600 dark:text-red-400">
                        Grade 4: -10 students (-34.5%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
