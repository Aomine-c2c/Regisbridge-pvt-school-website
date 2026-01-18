'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function SupportPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-20 text-white text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Support & Giving</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Your support helps us provide exceptional educational opportunities for our students.
            </p>
          </div>
        </section>

        {/* Ways to Give */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ways to Support Regisbridge</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'volunteer_activism',
                title: 'Annual Fund',
                desc: 'Support our general operating budget and student programs',
              },
              {
                icon: 'school',
                title: 'Scholarship Fund',
                desc: 'Help deserving students access our world-class education',
              },
              {
                icon: 'apartment',
                title: 'Capital Projects',
                desc: 'Contribute to new facilities and campus improvements',
              },
            ].map((way, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-brand-navy/10 flex items-center justify-center mb-6 mx-auto">
                  <span className="material-symbols-outlined text-brand-navy text-[32px]">{way.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{way.title}</h3>
                <p className="text-gray-600 text-center mb-6">{way.desc}</p>
                <button className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white py-3 rounded-lg font-bold transition-colors">
                  Donate Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">Impact of Your Giving</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '$2M+', label: 'Scholarships Awarded' },
                { stat: '150+', label: 'Students Supported' },
                { stat: '500+', label: 'Donors Annually' },
                { stat: '100%', label: 'Tax Deductible' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-4xl font-black text-brand-navy mb-2">{item.stat}</div>
                  <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 max-w-[900px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Make a Difference Today</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Every gift, regardless of size, makes a meaningful impact on our students' lives.
          </p>
          <Link
            href="/contact"
            className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-10 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center"
          >
            Contact Development Office
          </Link>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
