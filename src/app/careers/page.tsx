'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import Link from 'next/link';

export default function CareersPage() {
  const positions = [
    {
      title: 'Senior Mathematics Teacher',
      department: 'Teaching',
      type: 'Full-time',
      description: 'Lead our mathematics department with expertise in A-Level and IGCSE curriculum.',
    },
    {
      title: 'Head of Boarding',
      department: 'Pastoral Care',
      type: 'Full-time',
      description: 'Oversee our world-class boarding facilities and student welfare programs.',
    },
    {
      title: 'Science Laboratory Technician',
      department: 'Support Staff',
      type: 'Full-time',
      description: 'Support our cutting-edge science programs with technical expertise.',
    },
    {
      title: 'English Literature Teacher',
      department: 'Teaching',
      type: 'Full-time',
      description: 'Inspire students with a passion for literature and creative writing.',
    },
  ];

  const benefits = [
    {
      icon: 'savings',
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages with performance incentives',
    },
    {
      icon: 'health_and_safety',
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs',
    },
    {
      icon: 'school',
      title: 'Professional Development',
      description: 'Continuous learning opportunities and career advancement',
    },
    {
      icon: 'home',
      title: 'Housing Assistance',
      description: 'On-campus housing options and relocation support',
    },
  ];

  return (
    <div className="relative flex w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <PremiumHeader />

      {/* Hero Section */}
      <div className="@container w-full bg-white dark:bg-background-dark">
        <div
          className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 md:p-16 relative"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600")',
          }}
        >
          <div className="relative z-10 flex flex-col gap-4 text-center max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap justify-center gap-2 mb-4 text-slate-200 text-sm font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Careers</span>
            </div>
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
              Join Our Team
            </h1>
            <p className="text-slate-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Shape the future of education. Inspire the next generation of leaders at Regisbridge Academy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Why Join Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why Work at Regisbridge?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join a community of passionate educators dedicated to academic excellence and student success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1152d4]/10 mb-4">
                  <span className="material-symbols-outlined text-[#1152d4] text-2xl">
                    {benefit.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Current Openings
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore opportunities to make a meaningful impact in education.
            </p>
          </div>

          <div className="space-y-4">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-[#1152d4] transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#1152d4] transition-colors">
                        {position.title}
                      </h3>
                      <span className="px-3 py-1 bg-[#1152d4]/10 text-[#1152d4] text-xs font-semibold rounded-full">
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      {position.department}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {position.description}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center px-6 py-3 bg-[#1152d4] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#1152d4] to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Position?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            We're always looking for talented individuals to join our team. Send us your CV and we'll keep you in mind for future opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1152d4] font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-lg"
          >
            Get In Touch
          </Link>
        </section>
      </div>

      <PremiumFooter />
    </div>
  );
}
