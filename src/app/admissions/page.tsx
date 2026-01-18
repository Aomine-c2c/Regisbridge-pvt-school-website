'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import Link from 'next/link';
import { useState } from 'react';

export default function EnhancedAdmissionsPage() {
  const [selectedLevel, setSelectedLevel] = useState('all');

  return (
    <div className="relative flex w-full flex-col bg-background-light dark:bg-background-dark min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <div className="@container w-full bg-white dark:bg-background-dark">
        <div
          className="flex min-h-[450px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 md:p-16 relative"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600")',
          }}
        >
          <div className="relative z-10 flex flex-col gap-4 text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-4 text-slate-200 text-sm font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Admissions</span>
            </div>
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
              Join Regisbridge Academy
            </h1>
            <p className="text-slate-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Begin your journey to academic excellence. Applications for 2026-2027 are now open.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-brand-navy text-white font-bold hover:bg-brand-navy-dark transition-colors shadow-lg"
              >
                Start Application
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white/20 transition-all"
              >
                Schedule Tour
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Admissions Process */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#111318] dark:text-white mb-4">Admissions Process</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our streamlined admission process ensures we find the right fit for every student
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Inquiry', description: 'Submit an initial inquiry form or schedule a campus visit' },
            { step: '02', title: 'Application', description: 'Complete the online application with required documents' },
            { step: '03', title: 'Assessment', description: 'Student assessment and parent interview' },
            { step: '04', title: 'Enrollment', description: 'Receive decision and complete enrollment' },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <div className="text-5xl font-black text-brand-navy/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-[#111318] dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-brand-navy/30" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Entry Points */}
      <section className="py-16 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-[#111318] dark:text-white mb-12 text-center">
            Entry Points & Requirements
          </h2>

          <div className="space-y-6">
            {[
              {
                level: 'Early Childhood (Ages 3-5)',
                requirements: ['Birth certificate', 'Medical records', 'Previous school reports (if applicable)'],
                deadline: 'Rolling admissions',
              },
              {
                level: 'Primary School (Year 1-6)',
                requirements: ['Academic transcripts', 'Teacher recommendations', 'Entrance assessment'],
                deadline: 'January 31, 2026',
              },
              {
                level: 'Secondary School (Year 7-11)',
                requirements: ['Academic transcripts', '2 teacher recommendations', 'Entrance exam', 'Student essay'],
                deadline: 'February 15, 2026',
              },
              {
                level: 'Sixth Form (Year 12-13)',
                requirements: ['IGCSE results', 'Academic references', 'Personal statement', 'Interview'],
                deadline: 'March 1, 2026',
              },
            ].map((entry, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-[#111318] dark:text-white">{entry.level}</h3>
                  <span className="px-4 py-2 bg-brand-navy/10 text-brand-navy rounded-lg text-sm font-bold">
                    Deadline: {entry.deadline}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Required Documents:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {entry.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                        <span className="material-symbols-outlined text-brand-navy text-sm">check_circle</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees & Financial Aid */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#111318] dark:text-white mb-6">Tuition Fees</h2>
            <div className="space-y-4">
              {[
                { level: 'Early Childhood', fee: '$8,500' },
                { level: 'Primary School', fee: '$12,000' },
                { level: 'Secondary School', fee: '$15,000' },
                { level: 'Sixth Form', fee: '$16,500' },
                { level: 'Boarding (Additional)', fee: '$18,000' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{item.level}</span>
                  <span className="text-xl font-bold text-brand-navy">{item.fee}/year</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              * Fees include uniforms, textbooks, and most extracurricular activities
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#111318] dark:text-white mb-6">Financial Aid</h2>
            <div className="bg-brand-navy/5 p-6 rounded-xl border border-brand-navy/10 mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We believe that financial circumstances should not be a barrier to an excellent education. Regisbridge offers need-based scholarships and flexible payment plans.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-brand-navy text-sm mt-0.5">check_circle</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Merit-based scholarships up to 50%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-brand-navy text-sm mt-0.5">check_circle</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Need-based financial aid available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-brand-navy text-sm mt-0.5">check_circle</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sibling discounts offered</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg h-12 px-6 bg-brand-navy text-white font-bold hover:bg-brand-navy-dark transition-colors"
            >
              Contact Financial Aid Office
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl font-bold text-[#111318] dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'When should I apply?',
                a: 'We recommend applying 6-12 months before your desired start date. Priority deadlines vary by entry level.',
              },
              {
                q: 'Can international students apply?',
                a: 'Yes! We welcome international students and provide visa support documentation for accepted students.',
              },
              {
                q: 'What is the student-teacher ratio?',
                a: 'Our average student-teacher ratio is 1:10, ensuring personalized attention for every student.',
              },
              {
                q: 'Do you offer campus tours?',
                a: 'Yes, we offer guided campus tours throughout the year. Contact our admissions office to schedule a visit.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <span className="material-symbols-outlined text-brand-gold">expand_more</span>
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-16 px-6 text-center">
        <h2 className="text-white text-3xl font-bold mb-4">Ready to Apply?</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
          Take the first step towards an exceptional education at Regisbridge Academy.
        </p>
        <Link
          href="/admissions/apply"
          className="inline-flex items-center justify-center bg-white text-brand-navy px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Start Your Application
        </Link>
      </section>

      <PremiumFooter />
    </div>
  );
}
