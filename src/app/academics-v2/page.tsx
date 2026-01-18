'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function AcademicsV2Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        <section className="bg-brand-navy text-white py-24 text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Excellence in Education</span>
            <h1 className="text-5xl md:text-6xl font-black mb-6">Academic Programs</h1>
            <p className="text-xl text-gray-200">Comprehensive curriculum from Early Years to A-Level</p>
          </div>
        </section>

        <section className="py-20 max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { level: 'Early Years', ages: '3-5', icon: 'child_care' },
              { level: 'Primary', ages: '6-11', icon: 'school' },
              { level: 'Secondary', ages: '12-16', icon: 'menu_book' },
              { level: 'Sixth Form', ages: '17-18', icon: 'workspace_premium' },
            ].map((program, i) => (
              <div key={i} className="bg-white rounded-xl border-2 border-gray-200 p-8 text-center hover:border-brand-gold transition-all">
                <span className="material-symbols-outlined text-brand-navy text-[48px] mb-4 block">{program.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.level}</h3>
                <p className="text-gray-600">Ages {program.ages}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
