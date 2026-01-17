'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';
import { BadgeNew } from '@/components/ui/badge-new';

/**
 * Boarding & Pastoral Care Page
 * Simplified version showcasing boarding facilities and support
 */

export default function BoardingPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-10 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" size="4xl" className="text-design-primary" />
            <h2 className="text-lg font-bold">Regisbridge Academy</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/page-new" className="text-sm font-medium hover:text-design-primary transition-colors">Home</Link>
            <Link href="/academics" className="text-sm font-medium hover:text-design-primary transition-colors">Academics</Link>
            <Link href="/admissions" className="text-sm font-medium hover:text-design-primary transition-colors">Admissions</Link>
            <Link href="/boarding" className="text-design-primary font-bold text-sm">Boarding</Link>
          </nav>
          <Link href="/admissions" className="flex items-center justify-center rounded-lg h-9 px-4 bg-design-primary hover:bg-design-primary-dark text-white text-sm font-bold transition-colors">
            Apply Now
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative w-full bg-background-dark text-white py-20 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-design-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <BadgeNew variant="primary" className="mb-4">Boarding Life</BadgeNew>
              <h1 className="text-4xl lg:text-5xl font-black mb-6">A Home Away From Home</h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our boarding facilities offer a safe, supportive, and enriching environment where students learn independence and camaraderie. With modern dormitories, dedicated house parents, and a weekend activity schedule, boarders forge friendships that last a lifetime.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-design-primary" />
                  <span>Modern, secure accommodation</span>
                </li>
                <li className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-design-primary" />
                  <span>24/7 mentorship and pastoral care</span>
                </li>
                <li className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-design-primary" />
                  <span>Structured academic study hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-design-primary" />
                  <span>Weekend excursions and activities</span>
                </li>
              </ul>
              <Link href="/admissions" className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-white text-text-dark font-bold hover:bg-gray-200 transition-colors">
                Explore Boarding Options
              </Link>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10">
                <div className="aspect-[4/3] bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boarding Houses */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-4">Our Boarding Houses</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Students are placed in one of four boarding houses, each with its own identity, traditions, and house parent team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Phoenix House', color: 'red', icon: 'local_fire_department', students: '65 Boarders' },
            { name: 'Eagle House', color: 'blue', icon: 'flight', students: '68 Boarders' },
            { name: 'Lion House', color: 'amber', icon: 'pets', students: '62 Boarders' },
            { name: 'Dragon House', color: 'emerald', icon: 'spa', students: '70 Boarders' }
          ].map((house, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-full bg-${house.color}-100 dark:bg-${house.color}-900/30 flex items-center justify-center mb-4`}>
                <MaterialIcon icon={house.icon} className={`text-${house.color}-600 dark:text-${house.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-text-dark dark:text-white mb-2">{house.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{house.students}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 px-6 lg:px-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-8 text-center">Typical Boarding Day</h2>
          
          <div className="grid grid-cols-[100px_1fr] gap-4 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            {[
              ['6:30 AM', 'Wake-up bell'],
              ['7:00 AM', 'Breakfast in dining hall'],
              ['8:00 AM', 'Morning classes begin'],
              ['12:30 PM', 'Lunch break'],
              ['1:30 PM', 'Afternoon classes'],
              ['4:00 PM', 'Co-curricular activities & sports'],
              ['6:00 PM', 'Dinner'],
              ['7:00 PM', 'Supervised study time'],
              ['9:00 PM', 'Free time / relaxation'],
              ['10:00 PM', 'Lights out (varies by age group)']
            ].map((item, i) => (
              <div key={i} className="contents">
                <div className="text-design-primary font-bold text-sm">{item[0]}</div>
                <div className="text-gray-700 dark:text-gray-300 border-l-2 border-gray-200 dark:border-gray-700 pl-4">{item[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastoral Care */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-6">Pastoral Care & Wellbeing</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Every boarder is assigned a house parent and tutor who monitor their academic progress, emotional wellbeing, and social development. Our dedicated pastoral care team includes counselors, nurses, and chaplains.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MaterialIcon icon="favorite" className="text-red-500 mt-1" />
                <div>
                  <h4 className="font-bold text-text-dark dark:text-white mb-1">Health & Medical</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On-campus clinic with registered nurse available 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MaterialIcon icon="psychology" className="text-blue-500 mt-1" />
                <div>
                  <h4 className="font-bold text-text-dark dark:text-white mb-1">Counseling Services</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Professional counselors for academic and personal support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MaterialIcon icon="phone" className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-bold text-text-dark dark:text-white mb-1">Parent Communication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weekly updates via parent portal and regular calls</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-text-dark dark:text-white mb-6">Weekend Activities</h3>
            <ul className="space-y-3">
              {[
                'City excursions and cultural trips',
                'Sports tournaments and outdoor adventures',
                'Movie nights and game tournaments',
                'Shopping trips and recreational activities',
                'Community service projects',
                'Special event celebrations'
              ].map((activity, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <MaterialIcon icon="check_circle" className="text-design-primary" size="xs" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-design-primary py-16 text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Experience Boarding Life</h2>
          <p className="text-white/90 mb-8 text-lg">
            Schedule a visit to tour our boarding facilities and meet our house parents.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admissions" className="bg-white text-design-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Apply for Boarding
            </Link>
            <Link href="/contact" className="bg-design-primary border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-design-primary-dark transition-colors">
              Book a Tour
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-sm text-gray-500">
          © 2024 Regisbridge Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
