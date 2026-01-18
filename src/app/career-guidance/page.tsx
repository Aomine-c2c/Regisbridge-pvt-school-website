'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const CAREER_SERVICES = [
  {
    icon: 'school',
    title: 'University Guidance',
    description: 'Expert advice on university applications, UCAS, and international admissions.',
  },
  {
    icon: 'work',
    title: 'Career Counseling',
    description: 'One-on-one sessions to explore career paths and match them to your strengths.',
  },
  {
    icon: 'description',
    title: 'Application Support',
    description: 'Personal statement reviews, interview preparation, and portfolio development.',
  },
  {
    icon: 'handshake',
    title: 'Industry Connections',
    description: 'Access to alumni mentors and professional networking opportunities.',
  },
];

export default function CareerGuidancePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-20 text-white text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Career & Higher Education Guidance</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Dedicated support to help students navigate their pathway to university and beyond.
            </p>
          </div>
        </section>

        {/* University Success Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '100%', label: 'University Placement' },
                { stat: '45+', label: 'Universities Worldwide' },
                { stat: '85%', label: 'Russell Group Offers' },
                { stat: '15+', label: 'Oxbridge Places Annually' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="text-4xl font-black text-brand-navy mb-2">{item.stat}</div>
                  <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support from Year 9 through to university acceptance and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAREER_SERVICES.map((service, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-brand-navy text-[28px]">{service.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* University Destinations */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent University Destinations</h2>
              <p className="text-gray-600">Where our graduates of 2025 are heading</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'University of Oxford',
                'University of Cambridge',
                'Imperial College London',
                'UCL',
                'LSE',
                'University of Edinburgh',
                'King\'s College London',
                'University of Manchester',
                'University of Bristol',
                'University of Warwick',
                'Durham University',
                'University of St Andrews',
              ].map((uni, i) => (
                <div key={i} className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <p className="text-sm font-medium text-gray-700">{uni}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 max-w-[960px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book a session with our dedicated Careers team to discuss your future pathways.
          </p>
          <Link
            href="/contact"
            className="bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
          >
            Schedule an Appointment
          </Link>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
