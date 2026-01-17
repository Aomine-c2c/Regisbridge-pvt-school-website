'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';
import { useState } from 'react';

/**
 * Admissions & Enrollment Page
 * Based on admissions_&_enrollment_1 template
 * 
 * Key sections:
 * - Hero with CTA buttons
 * - Application process steps
 * - Fee structure (collapsible tables)
 * - Resources downloads
 * - FAQ section
 * - Final CTA
 */

export default function AdmissionsPage() {
  const [dayScholarOpen, setDayScholarOpen] = useState(true);
  const [boardingOpen, setBoardingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-10 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" size="4xl" className="text-design-primary" />
            <h2 className="text-lg font-bold hidden sm:block">Regisbridge Academy</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/page-new" className="text-sm font-medium hover:text-design-primary transition-colors">Home</Link>
            <Link href="/academics" className="text-sm font-medium hover:text-design-primary transition-colors">Academics</Link>
            <Link href="/admissions" className="text-design-primary font-bold text-sm">Admissions</Link>
            <Link href="/student-life" className="text-sm font-medium hover:text-design-primary transition-colors">Campus Life</Link>
          </nav>
          <Link href="/parent" className="flex items-center justify-center rounded-lg h-9 px-4 bg-design-primary hover:bg-design-primary-dark text-white text-sm font-bold transition-colors">
            Parent Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 py-5">
        <div 
          className="relative flex min-h-[480px] flex-col gap-6 rounded-xl bg-cover bg-center items-center justify-center p-4 shadow-xl"
          style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url("/media/campus-sunset.jpg")' }}
        >
          <div className="flex flex-col gap-3 text-center z-10 max-w-3xl">
            <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Admissions 2024-2025</span>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-sm">
              Begin Your Journey to Excellence
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-2">
              We are now accepting applications for Early Childhood through A-Level. Join a community dedicated to academic rigor and character development.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 z-10 mt-4">
            <Link href="#apply" className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-design-primary hover:bg-design-primary-dark text-white text-base font-bold transition-all shadow-lg">
              Start Application
            </Link>
            <button className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-base font-bold transition-all">
              Download Prospectus
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col max-w-[960px] w-full mx-auto px-4 md:px-10 pb-20">
        {/* Application Process */}
        <div className="mt-8">
          <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight pb-6 pt-5">Application Process</h2>
          
          <div className="grid grid-cols-[40px_1fr] gap-x-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-design-primary/10 text-design-primary">
                <MaterialIcon icon="mail" size="md" />
              </div>
              <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-full min-h-[40px] grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-8 pt-1">
              <p className="text-slate-900 dark:text-white text-lg font-bold">Submit Inquiry</p>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
                Fill out our <Link href="#" className="text-design-primary underline">inquiry form</Link> to receive our digital prospectus and schedule a call with our admissions team.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-4"></div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                <MaterialIcon icon="tour" size="md" className="text-slate-700 dark:text-slate-300" />
              </div>
              <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-full min-h-[40px] grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-8 pt-1">
              <p className="text-slate-900 dark:text-white text-lg font-bold">Campus Tour</p>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
                Visit our campus to experience the environment firsthand. Tours are available weekdays at 10:00 AM.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-4"></div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                <MaterialIcon icon="edit_note" size="md" className="text-slate-700 dark:text-slate-300" />
              </div>
              <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-full min-h-[40px] grow"></div>
            </div>
            <div className="flex flex-1 flex-col pb-8 pt-1">
              <p className="text-slate-900 dark:text-white text-lg font-bold">Online Assessment</p>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
                Applicants for Grade 1 and above must complete an age-appropriate entrance assessment covering Math and English.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-4"></div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800">
                <MaterialIcon icon="groups" size="md" className="text-slate-700 dark:text-slate-300" />
              </div>
            </div>
            <div className="flex flex-1 flex-col pb-4 pt-1">
              <p className="text-slate-900 dark:text-white text-lg font-bold">Final Interview</p>
              <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
                A meeting with the Head of School to discuss your child's aspirations and how we can support their journey.
              </p>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="mt-12">
          <div className="flex items-center justify-between pb-6 pt-5">
            <h2 className="text-slate-900 dark:text-white text-[28px] font-bold">Fee Structure</h2>
            <span className="px-3 py-1 rounded-full bg-design-primary/10 text-design-primary text-xs font-bold">2024-2025</span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Day Scholar Fees */}
            <details open={dayScholarOpen} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="school" className="text-design-primary" />
                  <h3 className="text-lg font-bold">Day Scholar Fees</h3>
                </div>
                <MaterialIcon icon="expand_more" className="transform group-open:rotate-180 transition-transform text-slate-500" />
              </summary>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Grade Level</th>
                      <th className="px-6 py-4 font-semibold">Termly Tuition</th>
                      <th className="px-6 py-4 font-semibold">Annual Tuition</th>
                      <th className="px-6 py-4 font-semibold">Development Levy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {[
                      ['Early Childhood (ECD)', '$2,400', '$7,200', '$500'],
                      ['Primary (Grades 1-7)', '$3,800', '$11,400', '$750'],
                      ['Secondary (Forms 1-4)', '$4,500', '$13,500', '$1,000'],
                      ['Sixth Form (A-Level)', '$5,100', '$15,300', '$1,000']
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row[0]}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row[1]}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row[2]}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            {/* Boarding Fees */}
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="bedroom_parent" className="text-design-primary" />
                  <h3 className="text-lg font-bold">Boarding Fees (Full Board)</h3>
                </div>
                <MaterialIcon icon="expand_more" className="transform group-open:rotate-180 transition-transform text-slate-500" />
              </summary>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Grade Level</th>
                      <th className="px-6 py-4 font-semibold">Boarding Fee (Termly)</th>
                      <th className="px-6 py-4 font-semibold">Tuition + Boarding</th>
                      <th className="px-6 py-4 font-semibold">Laundry & Medical</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {[
                      ['Primary (Grades 3-7)', '$3,200', '$7,000', 'Included'],
                      ['Secondary & A-Level', '$4,000', '$8,500 - $9,100', 'Included']
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row[0]}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row[1]}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row[2]}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>

        {/* Resources */}
        <div className="mt-12">
          <h2 className="text-slate-900 dark:text-white text-[28px] font-bold pb-6 pt-5">Admissions Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: 'picture_as_pdf', color: 'red', title: '2024 Prospectus', desc: 'Detailed guide to curriculum and life at Regisbridge.' },
              { icon: 'calendar_month', color: 'blue', title: 'Academic Calendar', desc: 'Term dates, holidays, and key events for the year.' },
              { icon: 'menu_book', color: 'emerald', title: 'Boarding Handbook', desc: 'Rules, packing lists, and weekend activity info.' }
            ].map((resource, i) => (
              <div key={i} className="flex flex-col gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow group cursor-pointer">
                <div className={`size-10 rounded-lg bg-${resource.color}-100 dark:bg-${resource.color}-900/30 flex items-center justify-center text-${resource.color}-600 dark:text-${resource.color}-400`}>
                  <MaterialIcon icon={resource.icon} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{resource.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{resource.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-design-primary font-medium text-sm group-hover:underline">
                  <span>Download PDF</span>
                  <MaterialIcon icon="download" size="xs" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-slate-900 dark:text-white text-[28px] font-bold pb-6 pt-5">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: 'What is the student-to-teacher ratio?', a: 'Our average class size is 18 students, ensuring personalized attention. In A-Level classes, the ratio is typically 8:1 for specialized subjects.' },
              { q: 'Do you offer scholarships or financial aid?', a: 'Yes, we offer merit-based scholarships for academic, sports, and arts excellence. Applications for scholarships must be submitted by January 31st for the following academic year.' },
              { q: 'Can international students apply?', a: 'Absolutely. Regisbridge Academy welcomes students from over 30 countries. We assist with student visa applications and offer comprehensive ELL support for non-native English speakers.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-900 dark:text-white">
                  <span>{faq.q}</span>
                  <MaterialIcon icon="expand_more" className="text-slate-400 transition-transform group-open:rotate-180" size="sm" />
                </summary>
                <div className="px-4 pb-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 mb-10 p-8 md:p-12 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-design-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-design-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="relative z-10 flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to take the next step?</h2>
            <p className="text-slate-300 max-w-md">Secure your child's place at one of the country's leading educational institutions. Spaces are limited.</p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <Link href="#apply" className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-design-primary hover:bg-design-primary-dark text-white text-base font-bold transition-all shadow-lg">
              Apply Online
            </Link>
            <Link href="/contact" className="flex min-w-[160px] items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-white/20 hover:bg-white/10 text-white text-base font-bold transition-all">
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto text-center text-sm text-slate-500">
          © 2024 Regisbridge Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
