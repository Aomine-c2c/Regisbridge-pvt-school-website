'use client';

import Link from 'next/link';
import Image from 'next/image';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const COUNCIL_MEMBERS = [
  { name: 'James Mitchell', role: 'Head Boy', house: 'Churchill', image: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Sarah Chen', role: 'Head Girl', house: 'Windsor', image: 'https://i.pravatar.cc/300?img=47' },
  { name: 'David Kumar', role: 'Sports Captain', house: 'Victoria', image: 'https://i.pravatar.cc/300?img=33' },
  { name: 'Emma Rodriguez', role: 'Arts Captain', house: 'Churchill', image: 'https://i.pravatar.cc/300?img=45' },
];

export default function StudentLeadershipPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-20 text-white text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Student Leadership & Council</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Empowering students to lead, serve, and make a positive impact on our school community.
            </p>
          </div>
        </section>

        {/* Council Overview */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Council 2025-2026</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elected by their peers to represent student voices and organize school-wide initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COUNCIL_MEMBERS.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-brand-gold transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-brand-navy font-medium">{member.role}</p>
                <p className="text-sm text-gray-600">{member.house} House</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Opportunities */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Leadership Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'House Captains', desc: 'Lead your house in competitions and foster house spirit' },
                { title: 'Subject Ambassadors', desc: 'Promote academic excellence and mentor younger students' },
                { title: 'Prefects', desc: 'Support school operations and serve as role models' },
                { title: 'Event Organizers', desc: 'Plan and execute school events and activities' },
                { title: 'Peer Mentors', desc: 'Guide and support new students in their transition' },
                { title: 'Club Presidents', desc: 'Lead clubs and societies in your area of interest' },
              ].map((opp, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{opp.title}</h3>
                  <p className="text-gray-600">{opp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 max-w-[900px] mx-auto px-4">
          <div className="bg-brand-navy/5 rounded-xl p-8 border border-brand-navy/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Apply for Leadership Positions</h2>
            <div className="space-y-4">
              {[
                { step: '1', text: 'Review available positions and requirements' },
                { step: '2', text: 'Submit your application and personal statement' },
                { step: '3', text: 'Attend interview with current council members' },
                { step: '4', text: 'Participate in student elections (if applicable)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
