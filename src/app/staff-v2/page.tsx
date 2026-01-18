'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';

export default function StaffPortalV2Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumHeader />

      <div className="p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-brand-navy text-white rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-black">Staff Portal V2</h1>
            <p className="text-gray-200 mt-2">Alternative staff interface</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Today\'s Classes', 'Pending Grades', 'Messages'].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border-l-4 border-brand-gold">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item}</h3>
                <p className="text-3xl font-black text-brand-navy">{(i + 1) * 5}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
