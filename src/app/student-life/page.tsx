'use client';

import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const STUDENT_LIFE_AREAS = [
  {
    title: 'Sports & Athletics',
    description: 'Compete at the highest level in rugby, cricket, swimming, athletics, and more.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    activities: ['15+ Sports Teams', 'Inter-school Competitions', 'Professional Coaching', 'State-of-art Facilities'],
  },
  {
    title: 'Performing Arts',
    description: 'Express yourself through drama, music, and dance in our world-class facilities.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800',
    activities: ['Drama Productions', 'Orchestra & Choirs', 'Music Lessons', 'Annual Concerts'],
  },
  {
    title: 'Clubs & Societies',
    description: 'Over 50 clubs covering academic, creative, and recreational interests.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    activities: ['Debate Society', 'Robotics Club', 'Model UN', 'Environmental Club'],
  },
  {
    title: 'Community Service',
    description: 'Make a difference through our extensive community outreach programs.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    activities: ['Weekly Volunteering', 'Charity Fundraising', 'Mentoring Programs', 'Environmental Projects'],
  },
];

export default function StudentLifePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section
          className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(11,31,59,0.6), rgba(11,31,59,0.8)), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600")',
          }}
        >
          <div className="max-w-[960px] px-4 text-center relative z-10">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6">
              Student Life & Co-Curricular
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Beyond the classroom, Regisbridge offers a vibrant community where students discover passions, develop talents, and create lasting memories.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 max-w-[1000px] mx-auto px-4 sm:px-10 text-center">
          <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
            Holistic Development
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            More Than Just Academics
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            We believe education extends far beyond the classroom. Our extensive co-curricular program ensures every student finds their passion and develops well-rounded skills for life.
          </p>
        </section>

        {/* Life Areas */}
        <section className="pb-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="space-y-16">
            {STUDENT_LIFE_AREAS.map((area, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{area.title}</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{area.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {area.activities.map((activity, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-gold text-[20px]">check_circle</span>
                        <span className="text-gray-700 font-medium text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-[960px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Your Passion
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join a community where every student finds their place and pursues excellence in all they do.
            </p>
            <Link
              href="/admissions"
              className="bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
            >
              Apply Now
            </Link>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
