'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';

export default function AdminV2Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumHeader />

      <main className="p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-r from-brand-navy to-brand-navy-dark text-white rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-black mb-2">Admin Dashboard V2</h1>
            <p className="text-gray-200">Alternative management interface</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {['Students', 'Staff', 'Courses', 'Reports'].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-3xl font-black text-brand-navy mb-2">{(i + 1) * 100}+</div>
                <div className="text-gray-600 font-medium">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
