'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function WellnessPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-20 text-white text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Student Wellness & Support Hub</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Comprehensive support for mental, physical, and emotional wellbeing.
            </p>
          </div>
        </section>

        {/* Support Services */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Support Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'psychology', title: 'Counseling Services', desc: 'Confidential support from qualified counselors' },
              { icon: 'medical_services', title: 'Health Center', desc: '24/7 medical care and support' },
              { icon: 'self_improvement', title: 'Mindfulness Programs', desc: 'Meditation and stress management workshops' },
              { icon: 'fitness_center', title: 'Physical Wellness', desc: 'Gym access and fitness programs' },
              { icon: 'school', title: 'Academic Support', desc: 'Tutoring and study skills coaching' },
              { icon: 'diversity_3', title: 'Peer Support Network', desc: 'Student-led support groups' },
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-brand-navy text-[28px]">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[900px] mx-auto px-4">
            <div className="bg-white rounded-xl p-8 border border-brand-navy/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
              <div className="space-y-4">
                {[
                  { service: 'School Nurse', number: 'Ext. 101', hours: '24/7' },
                  { service: 'Counseling Services', number: 'Ext. 202', hours: 'Mon-Fri, 8AM-6PM' },
                  { service: 'Boarding House Staff', number: 'Ext. 303', hours: '24/7' },
                  { service: 'Security', number: 'Ext. 999', hours: '24/7' },
                ].map((contact, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="font-bold text-gray-900">{contact.service}</p>
                      <p className="text-sm text-gray-600">{contact.hours}</p>
                    </div>
                    <p className="text-brand-navy font-bold">{contact.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
