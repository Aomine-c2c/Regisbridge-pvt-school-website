'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';

export default function ParentPortalV2Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumHeader />

      <div className="p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-r from-brand-navy to-brand-gold text-white rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-black">Parent Portal V2</h1>
            <p className="text-gray-100 mt-2">Simplified parent dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Academic Progress', value: '88%', icon: 'school' },
              { label: 'Attendance', value: '96%', icon: 'check_circle' },
              { label: 'Fees Status', value: 'Paid', icon: 'payment' },
              { label: 'Messages', value: '3 New', icon: 'mail' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all">
                <span className="material-symbols-outlined text-brand-navy text-[48px] mb-3 block">{item.icon}</span>
                <div className="text-2xl font-black text-gray-900 mb-1">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
