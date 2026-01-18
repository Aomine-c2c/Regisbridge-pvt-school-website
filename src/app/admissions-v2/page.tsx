'use client';

import Image from 'next/image';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function AdmissionsVariant2Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        <section className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-navy/80 z-10" />
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600" alt="Campus" fill className="object-cover" />
          </div>
          <div className="relative z-20 text-center text-white px-4">
            <h1 className="text-6xl font-black mb-6">Join Our Community</h1>
            <button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-10 py-4 rounded-lg font-bold text-lg">
              Start Application
            </button>
          </div>
        </section>

        <section className="py-20 max-w-[1000px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Visit Campus', 'Apply Online', 'Schedule Interview'].map((step, i) => (
              <div key={i} className="text-center p-8 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-brand-navy text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{step}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
