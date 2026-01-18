'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function StudentLifeV2Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-4">Beyond the Classroom</h1>
            <p className="text-xl text-gray-600">Discover your passions through our co-curricular programs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Sports', 'Arts', 'Music', 'Drama', 'Debate', 'Robotics', 'Community Service', 'Duke of Edinburgh'].map((activity, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all">
                <h3 className="font-bold text-brand-navy text-lg">{activity}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
