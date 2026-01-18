'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function CampusMapV2Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-4xl font-black text-center text-gray-900 mb-12">Campus Map</h1>
          
          <div className="bg-gray-200 rounded-2xl h-[500px] flex items-center justify-center mb-8">
            <div className="text-center">
              <span className="material-symbols-outlined text-8xl text-gray-400">map</span>
              <p className="text-xl text-gray-500 mt-4">Interactive Map Display</p>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['Reception', 'Library', 'Labs', 'Sports', 'Theatre', 'Dining'].map((loc, i) => (
              <button key={i} className="bg-brand-navy text-white py-3 rounded-lg font-bold hover:bg-brand-gold hover:text-brand-navy transition-all">
                {loc}
              </button>
            ))}
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
