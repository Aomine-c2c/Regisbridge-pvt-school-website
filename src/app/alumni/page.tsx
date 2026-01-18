'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function AlumniPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-20 text-white text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Alumni Network</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8">
              Join a global community of over 5,000 Regisbridge graduates making their mark across the world.
            </p>
            <Link
              href="#register"
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
            >
              Register as Alumni
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '5,000+', label: 'Alumni Worldwide' },
                { stat: '85+', label: 'Countries' },
                { stat: '200+', label: 'Events Annually' },
                { stat: '$2M+', label: 'Scholarships Funded' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="text-4xl font-black text-brand-navy mb-2">{item.stat}</div>
                  <div className="text-sm text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Member Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected and access exclusive opportunities as part of our alumni community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'groups',
                title: 'Networking Events',
                description: 'Attend reunions, professional mixers, and regional gatherings worldwide.',
              },
              {
                icon: 'work',
                title: 'Career Support',
                description: 'Access our job board, mentorship programs, and professional development resources.',
              },
              {
                icon: 'school',
                title: 'Lifelong Learning',
                description: 'Exclusive access to lectures, webinars, and continuing education opportunities.',
              },
              {
                icon: 'volunteer_activism',
                title: 'Give Back',
                description: 'Support current students through mentoring, scholarships, and guest speaking.',
              },
              {
                icon: 'local_library',
                title: 'Library Access',
                description: 'Continue to use our extensive library and digital resources.',
              },
              {
                icon: 'celebration',
                title: 'Exclusive Discounts',
                description: 'Special rates on campus facilities, bookstore, and alumni merchandise.',
              },
            ].map((benefit, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-brand-navy text-[28px]">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section id="register" className="py-20 bg-gray-50">
          <div className="max-w-[700px] mx-auto px-4">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Register as Alumni</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Graduation Year *</label>
                    <input
                      type="number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">House</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent">
                      <option>Select House</option>
                      <option>Churchill</option>
                      <option>Windsor</option>
                      <option>Victoria</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white py-3 rounded-lg font-bold transition-colors"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
