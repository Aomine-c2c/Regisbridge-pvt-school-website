'use client';

import Image from 'next/image';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const BOARD_MEMBERS = [
  {
    name: 'Sarah Jenkins',
    title: 'Chair of the Board',
    bio: '20+ years experience in education leadership and governance.',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    name: 'Michael Chen',
    title: 'Board Governor',
    bio: 'Senior partner at leading law firm, specialist in education law.',
    image: 'https://i.pravatar.cc/300?img=33',
  },
  {
    name: 'Elena Rodriguez',
    title: 'Board Governor',
    bio: 'Former headteacher with extensive international school experience.',
    image: 'https://i.pravatar.cc/300?img=45',
  },
  {
    name: 'David Thompson',
    title: 'Board Governor',
    bio: 'CFO of FTSE 100 company, finance and audit specialist.',
    image: 'https://i.pravatar.cc/300?img=52',
  },
];

export default function BoardPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-20 text-white text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Board of Governors</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Our governing body provides strategic oversight and ensures the school achieves its mission of educational excellence.
            </p>
          </div>
        </section>

        {/* Board Members */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="space-y-12">
            {BOARD_MEMBERS.map((member, i) => (
              <div
                key={i}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="md:w-1/3">
                  <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-brand-gold">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <span className="inline-block px-3 py-1 bg-brand-gold/20 text-brand-gold-dark text-xs font-bold rounded-full mb-3 uppercase">
                    {member.title}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{member.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Governance Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[960px] mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Board Responsibilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Strategic Direction', desc: 'Setting long-term vision and goals' },
                { title: 'Financial Oversight', desc: 'Ensuring fiscal responsibility' },
                { title: 'Quality Assurance', desc: 'Maintaining academic standards' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
