'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import { StatBarList } from '@/components';

const ACADEMIC_PERFORMANCE = [
  { label: 'Mathematics', value: 92, total: 100, color: 'green' as const },
  { label: 'English Literature', value: 88, total: 100, color: 'green' as const },
  { label: 'Physics', value: 85, total: 100, color: 'green' as const },
  { label: 'Chemistry', value: 90, total: 100, color: 'green' as const },
  { label: 'History', value: 87, total: 100, color: 'green' as const },
];

export default function PerformanceReportPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-10">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Academic Performance Report</h1>
              <p className="text-gray-600 mt-2">Term 2, 2025-2026 Academic Year</p>
            </div>

            {/* Student Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-medium">Student Name</p>
                  <p className="text-gray-900 font-bold">Emma Wilson</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Year Group</p>
                  <p className="text-gray-900 font-bold">Year 11</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">House</p>
                  <p className="text-gray-900 font-bold">Churchill</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Form Tutor</p>
                  <p className="text-gray-900 font-bold">Dr. Anderson</p>
                </div>
              </div>
            </div>

            {/* Overall Performance */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Performance</h2>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-brand-navy/5 rounded-lg">
                  <div className="text-3xl font-black text-brand-navy">88.4%</div>
                  <div className="text-sm text-gray-600 mt-1">Overall Average</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-black text-green-600">96%</div>
                  <div className="text-sm text-gray-600 mt-1">Attendance</div>
                </div>
                <div className="text-center p-4 bg-brand-gold/10 rounded-lg">
                  <div className="text-3xl font-black text-brand-gold-dark">5th</div>
                  <div className="text-sm text-gray-600 mt-1">Year Rank</div>
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Subject Performance</h2>
              <StatBarList stats={ACADEMIC_PERFORMANCE} />
            </div>

            {/* Teacher Comments */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Form Tutor Comment</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  Emma continues to demonstrate exceptional academic ability across all subjects. Her dedication to her studies is commendable, and she consistently produces work of the highest quality. Emma is a model student who actively participates in class discussions and supports her peers. I am confident she will achieve excellent results in her upcoming examinations.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Dr. James Anderson - Form Tutor</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-brand-navy hover:bg-brand-navy-dark text-white py-3 rounded-lg font-bold transition-colors">
                Download PDF
              </button>
              <button className="flex-1 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5 py-3 rounded-lg font-bold transition-colors">
                Print Report
              </button>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
