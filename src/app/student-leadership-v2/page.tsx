'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function LeadershipV2Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-16">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="bg-brand-navy/5 rounded-2xl p-12 text-center mb-12 border border-brand-navy/20">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Student Leadership</h1>
            <p className="text-xl text-gray-600">Empowering the next generation of leaders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {['Head Boy & Girl', 'House Captains', 'Prefects', 'Subject Ambassadors'].map((role, i) => (
              <div key={i} className="bg-white rounded-xl border-2 border-brand-navy/20 p-8 hover:border-brand-gold transition-all">
                <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-navy font-black text-xl mb-4">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{role}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
