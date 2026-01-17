'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';
import { BadgeNew } from '@/components/ui/badge-new';

/**
 * Academics Page - Program Overview
 * Based on academic_excellence_&_programs_1 template
 * Simplified version focusing on program overview
 */

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-3 max-w-[1440px] mx-auto w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-text-dark dark:text-white">
            <MaterialIcon icon="school" size="4xl" className="text-design-primary" />
            <h2 className="text-lg font-bold">Regisbridge Academy</h2>
          </div>
          <nav className="hidden lg:flex items-center gap-9">
            <Link href="/page-new" className="text-sm font-medium hover:text-design-primary transition-colors">Home</Link>
            <Link href="/admissions" className="text-sm font-medium hover:text-design-primary transition-colors">Admissions</Link>
            <Link href="/academics" className="text-design-primary text-sm font-bold">Academics</Link>
            <Link href="/boarding" className="text-sm font-medium hover:text-design-primary transition-colors">Boarding</Link>
            <Link href="/student-life" className="text-sm font-medium hover:text-design-primary transition-colors">Campus Life</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-design-primary transition-colors">Contact</Link>
          </nav>
        </div>
        <Link href="/admissions" className="flex items-center justify-center rounded-lg h-10 px-6 bg-design-primary hover:bg-design-primary-dark text-white text-sm font-bold transition-colors">
          Apply Now
        </Link>
      </header>

      {/* Hero Section */}
      <div className="w-full bg-white dark:bg-background-dark">
        <div 
          className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center items-center justify-center p-8 md:p-16 relative"
          style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/media/library-study.jpg")' }}
        >
          <div className="relative z-10 flex flex-col gap-4 text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-4 text-slate-200 text-sm font-medium">
              <Link href="/page-new" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Academics</span>
            </div>
            <h1 className="text-white text-4xl font-black leading-tight md:text-6xl">
              Academic Excellence
            </h1>
            <p className="text-slate-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Nurturing intellectual curiosity and character from early years through to university preparation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-12 md:px-8">
        {/* Program Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Early Childhood */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <BadgeNew variant="primary" className="mb-4">Ages 3-5</BadgeNew>
            <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">Early Childhood Development</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Play-based learning that nurtures curiosity, creativity, and social-emotional growth in a warm, caring environment.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Phonics</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Numeracy</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Creative Arts</span>
            </div>
            <Link href="#" className="text-design-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <MaterialIcon icon="arrow_forward" size="xs" />
            </Link>
          </div>

          {/* Primary School */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <BadgeNew variant="primary" className="mb-4">Ages 6-12</BadgeNew>
            <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">Primary School</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Building core competencies in literacy, numeracy, and critical thinking while fostering a lifelong love for learning.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">English</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Mathematics</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Science</span>
            </div>
            <Link href="#" className="text-design-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <MaterialIcon icon="arrow_forward" size="xs" />
            </Link>
          </div>

          {/* Secondary School */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <BadgeNew variant="primary" className="mb-4">Ages 13-16</BadgeNew>
            <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">Secondary School (IGCSE)</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Cambridge IGCSE curriculum providing rigorous foundation in core subjects with wide range of electives.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Sciences</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Humanities</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Arts</span>
            </div>
            <Link href="#" className="text-design-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <MaterialIcon icon="arrow_forward" size="xs" />
            </Link>
          </div>

          {/* Sixth Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <BadgeNew variant="primary" className="mb-4">Ages 17-18</BadgeNew>
            <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">Sixth Form (A-Level)</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Advanced Level studies preparing students for top-tier universities with specialized subject focus.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">STEM</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Business</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-700 py-1 px-3 rounded-full text-slate-600 dark:text-slate-300">Arts</span>
            </div>
            <Link href="#" className="text-design-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Learn more <MaterialIcon icon="arrow_forward" size="xs" />
            </Link>
          </div>
        </div>

        {/* Secondary Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Philosophy */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-design-primary"></span>
                <span className="text-design-primary font-bold text-sm tracking-widest uppercase">Our Approach</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-6">
                Cultivating Critical Thinkers & Global Citizens
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                Our curriculum is designed to challenge students academically while fostering independence and resilience. We follow the Cambridge IGCSE and A-Level curriculum, providing a rigorous foundation in core subjects while allowing students to explore their passions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                  <MaterialIcon icon="school" className="text-design-primary" />
                  <span className="text-sm font-semibold dark:text-white">Cambridge Curriculum</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                  <MaterialIcon icon="groups" className="text-design-primary" />
                  <span className="text-sm font-semibold dark:text-white">1:10 Teacher Ratio</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                  <MaterialIcon icon="public" className="text-design-primary" />
                  <span className="text-sm font-semibold dark:text-white">Global Exchange Programs</span>
                </div>
              </div>
            </section>

            {/* Subject Offerings */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <MaterialIcon icon="library_books" className="text-design-primary" />
                Subject Offerings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-600 pb-2">Sciences & Math</h4>
                  <ul className="space-y-3">
                    {['Mathematics (Extended)', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].map((subject, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                        <MaterialIcon icon="check_circle" className="text-design-primary" size="xs" />
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-600 pb-2">Humanities & Arts</h4>
                  <ul className="space-y-3">
                    {['English Literature', 'History', 'Geography', 'Art & Design', 'Modern Foreign Languages'].map((subject, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                        <MaterialIcon icon="check_circle" className="text-design-primary" size="xs" />
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Accreditations */}
            <section>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Accredited by</h3>
              <div className="flex flex-wrap items-center gap-8">
                {['CAMBRIDGE', 'Pearson Edexcel', 'CollegeBoard'].map((org, i) => (
                  <div key={i} className="h-10 px-4 border-2 border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold text-slate-500 dark:text-slate-300 hover:border-design-primary hover:text-design-primary transition-colors">
                    {org}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Visual Card */}
            <div className="rounded-xl overflow-hidden shadow-md h-64 relative group">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-medium">State-of-the-art Science Laboratories</p>
              </div>
            </div>

            {/* Key Faculty */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Head of Secondary</h3>
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Dr. Sarah Jenkins</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">PhD in Education</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 italic">
                "We don't just teach subjects; we teach students how to think, question, and innovate."
              </p>
            </div>

            {/* Resources CTA */}
            <div className="bg-design-primary/5 p-6 rounded-xl border border-design-primary/10">
              <h3 className="text-lg font-bold text-design-primary mb-2">Useful Resources</h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="#" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-design-primary transition-colors group">
                    <MaterialIcon icon="description" className="text-slate-400 group-hover:text-design-primary" size="xs" />
                    <span className="text-sm font-medium">IGCSE Prospectus 2024</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-design-primary transition-colors group">
                    <MaterialIcon icon="calendar_month" className="text-slate-400 group-hover:text-design-primary" size="xs" />
                    <span className="text-sm font-medium">Academic Calendar</span>
                  </Link>
                </li>
              </ul>
              <button className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-design-primary hover:bg-design-primary-dark transition-colors text-white text-base font-bold shadow-lg">
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white dark:bg-slate-900 py-16 border-t border-slate-100 dark:border-slate-800 rounded-xl">
          <div className="max-w-[960px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Beyond the Classroom</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Academic excellence is just one pillar of the Regisbridge Academy experience. Discover our vibrant campus life, world-class boarding facilities, and extensive extracurricular programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/boarding" className="flex items-center justify-center rounded-lg h-12 px-8 border-2 border-slate-200 dark:border-slate-700 hover:border-design-primary hover:text-design-primary text-slate-700 dark:text-slate-300 font-bold transition-all">
                View Boarding
              </Link>
              <Link href="/student-life" className="flex items-center justify-center rounded-lg h-12 px-8 border-2 border-slate-200 dark:border-slate-700 hover:border-design-primary hover:text-design-primary text-slate-700 dark:text-slate-300 font-bold transition-all">
                Explore Arts & Sports
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background-dark text-white py-12 px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <MaterialIcon icon="school" className="text-white/80" />
            <span className="font-bold text-lg">Regisbridge Academy</span>
          </div>
          <div className="text-slate-400 text-sm">
            © 2024 Regisbridge Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
