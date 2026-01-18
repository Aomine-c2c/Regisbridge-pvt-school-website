'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function AboutV2Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        <section className="bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy text-white py-24">
          <div className="max-w-[960px] mx-auto px-4 text-center">
            <h1 className="text-6xl font-black mb-6">About Regisbridge</h1>
            <p className="text-2xl text-gray-200">50 years of educational excellence</p>
          </div>
        </section>

        <section className="py-20 max-w-[1000px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: 'Our Mission', icon: 'lightbulb' },
              { title: 'Our Vision', icon: 'visibility' },
              { title: 'Our Values', icon: 'favorite' },
            ].map((item, i) => (
              <div key={i} className="bg-brand-navy/5 rounded-xl p-8 text-center border-2 border-brand-navy/10">
                <span className="material-symbols-outlined text-brand-gold text-[56px] mb-4 block">{item.icon}</span>
                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
