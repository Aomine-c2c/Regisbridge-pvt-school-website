'use client';

import Image from 'next/image';
import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import { Timeline } from '@/components';
import { HERITAGE_STATS, statsToArray } from '@/lib/data/stats';

const TIMELINE_EVENTS = [
  {
    year: '1974',
    title: 'Foundation Established',
    description: 'Regisbridge Academy opened its doors with just 50 students and 5 teachers, driven by a vision to provide quality education in the region.',
    icon: 'school',
  },
  {
    year: '1990',
    title: 'Boarding Facilities Opened',
    description: 'To accommodate students from across the country, we inaugurated our first boarding house, fostering a diverse and inclusive community.',
    icon: 'home',
  },
  {
    year: '2010',
    title: 'A-Level Program Launch',
    description: 'Expanding our academic offerings, we introduced the Advanced Level curriculum, paving the way for our graduates to enter top global universities.',
    icon: 'workspace_premium',
  },
  {
    year: '2024',
    title: 'Innovation Hub & STEM Center',
    description: 'Embracing the future, we launched a state-of-the-art STEM center and Innovation Hub, ensuring our students are ready for the digital age.',
    icon: 'science',
  },
];

const LEADERSHIP = [
  {
    name: 'Dr. James Sterling',
    title: 'Headmaster',
    image: 'https://i.pravatar.cc/300?img=12',
    description: 'Leading with 20+ years of experience in international education.',
  },
  {
    name: 'Sarah Jenkins',
    title: 'Chair of the Board',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    name: 'Michael Chen',
    title: 'Board Governor',
    image: 'https://i.pravatar.cc/300?img=33',
  },
  {
    name: 'Elena Rodriguez',
    title: 'Board Governor',
    image: 'https://i.pravatar.cc/300?img=45',
  },
];

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <PremiumHeader />

      <main>
        {/* Hero Section */}
        <section className="w-full bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-12 lg:py-20">
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
                <div className="flex flex-col gap-4">
                  <span className="text-brand-gold font-bold tracking-wider uppercase text-sm">
                    Est. 1974
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-gray-900">
                    A Legacy of{' '}
                    <span className="text-brand-navy relative inline-block">
                      Excellence
                      <span className="absolute bottom-1 left-0 w-full h-2 bg-brand-gold/20 -z-10"></span>
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Welcome to Regisbridge Academy. For nearly 50 years, we have nurtured future leaders through a unique blend of academic rigor, character development, and world-class boarding facilities.
                  </p>
                </div>
                <div className="flex gap-4 justify-center lg:justify-start pt-4">
                  <Link
                    href="/about/headmaster"
                    className="h-12 px-8 bg-brand-navy hover:bg-brand-navy-dark text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                  >
                    Headmaster's Welcome
                  </Link>
                  <Link
                    href="/campus-tour"
                    className="h-12 px-8 bg-white border border-gray-200 hover:border-brand-gold text-gray-900 rounded-lg font-bold transition-all inline-flex items-center justify-center gap-2 group"
                  >
                    <span>Virtual Tour</span>
                    <span className="material-symbols-outlined text-brand-gold group-hover:translate-x-1 transition-transform text-[20px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200"
                    alt="Regisbridge Academy campus aerial view"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip - Heritage Focused */}
        <section className="bg-brand-navy py-12 text-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
              {statsToArray(HERITAGE_STATS).map((stat, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-4xl lg:text-5xl font-black text-brand-gold">{stat.value}</span>
                  <span className="text-sm font-medium uppercase tracking-wider opacity-80">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
                Our Guiding Principles
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Mission, Vision & Values</h3>
              <div className="w-20 h-1 bg-brand-navy mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="p-8 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy to-brand-gold"></div>
                <div className="mb-6 w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[28px]">lightbulb</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Our Mission</h4>
                <p className="text-gray-600 leading-relaxed">
                  To empower young minds with critical thinking skills and moral integrity necessary to thrive in a global society, fostering a lifelong love for learning.
                </p>
              </div>

              {/* Vision */}
              <div className="p-8 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy to-brand-gold"></div>
                <div className="mb-6 w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[28px]">public</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Our Vision</h4>
                <p className="text-gray-600 leading-relaxed">
                  To be the premier institution in the region, recognized globally for academic excellence, holistic development, and producing compassionate leaders.
                </p>
              </div>

              {/* Values */}
              <div className="p-8 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy to-brand-gold"></div>
                <div className="mb-6 w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[28px]">diamond</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">Our Values</h4>
                <p className="text-gray-600 leading-relaxed">
                  We are guided by Integrity, Discipline, Compassion, and Excellence. These pillars support every aspect of student life and our community interactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
                Our Heritage
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">A History of Distinction</h3>
            </div>
            <Timeline events={TIMELINE_EVENTS} />
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
                Our Leadership
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Guided by Excellence</h3>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Our institution is led by a team of dedicated professionals committed to the holistic development of every student.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {LEADERSHIP.map((leader, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className={`${index === 0 ? 'w-48 h-48' : 'w-40 h-40'} rounded-full overflow-hidden mb-6 border-4 border-gray-100 ${index === 0 ? 'group-hover:border-brand-gold' : 'group-hover:border-brand-navy/50'} transition-colors shadow-lg`}>
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={index === 0 ? 192 : 160}
                      height={index === 0 ? 192 : 160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className={`${index === 0 ? 'text-xl' : 'text-lg'} font-bold text-gray-900`}>
                    {leader.name}
                  </h4>
                  <span className={`${index === 0 ? 'text-brand-navy' : 'text-gray-500'} font-medium mb-2 text-sm`}>
                    {leader.title}
                  </span>
                  {leader.description && (
                    <p className="text-sm text-gray-500 px-4">{leader.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
          {/* Dot pattern background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#C9A227 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          ></div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Join the Regisbridge Family</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Experience an education that goes beyond the classroom. Applications for the next academic year are now open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="h-14 px-10 bg-brand-navy hover:bg-brand-navy-dark text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-brand-navy/50 inline-flex items-center justify-center"
              >
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="h-14 px-10 bg-transparent border-2 border-white hover:border-brand-gold hover:text-brand-gold text-white rounded-lg font-bold text-lg transition-all inline-flex items-center justify-center"
              >
                Download Prospectus
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
