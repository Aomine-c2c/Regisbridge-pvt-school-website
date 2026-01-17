'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';
import { BadgeNew } from '@/components/ui/badge-new';

/**
 * Student Life & Co-curricular Page
 * Showcasing sports, arts, clubs, and extracurricular activities
 */

export default function StudentLifePage() {
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
            <Link href="/student-life" className="text-design-primary font-bold text-sm">Campus Life</Link>
          </nav>
          <Link href="/admissions" className="flex items-center justify-center rounded-lg h-9 px-4 bg-design-primary hover:bg-design-primary-dark text-white text-sm font-bold transition-colors">
            Apply Now
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div 
        className="relative w-full flex flex-col items-center justify-center min-h-[400px] bg-cover bg-center text-white"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/media/student-activities.jpg")' }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Beyond the Classroom</h1>
          <p className="text-xl text-gray-200">
            Discover a vibrant community where every student finds their passion through sports, arts, leadership, and service.
          </p>
        </div>
      </div>

      {/* Sports Programs */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-design-primary"></span>
            <span className="text-design-primary font-bold text-sm tracking-widest uppercase">Athletics</span>
          </div>
          <h2 className="text-3xl font-bold text-text-dark dark:text-white">Sports Programs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'sports_soccer', title: 'Team Sports', sports: ['Football', 'Rugby', 'Basketball', 'Volleyball', 'Cricket'] },
            { icon: 'pool', title: 'Individual Sports', sports: ['Swimming', 'Athletics', 'Tennis', 'Badminton', 'Table Tennis'] },
            { icon: 'emoji_events', title: 'Competitive Teams', sports: ['Inter-school leagues', 'National competitions', 'Regional tournaments', 'Sports day events'] }
          ].map((category, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-design-primary/10 flex items-center justify-center mb-4">
                <MaterialIcon icon={category.icon} className="text-design-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-dark dark:text-white mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.sports.map((sport, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MaterialIcon icon="check_circle" className="text-design-primary" size="xs" />
                    <span className="text-sm">{sport}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Arts & Culture */}
      <section className="py-16 px-6 lg:px-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-design-primary"></span>
              <span className="text-design-primary font-bold text-sm tracking-widest uppercase">Creative Arts</span>
            </div>
            <h2 className="text-3xl font-bold text-text-dark dark:text-white">Arts & Culture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'theater_comedy', title: 'Drama & Theatre', desc: 'Annual productions, improv workshops' },
              { icon: 'music_note', title: 'Music', desc: 'Orchestra, choir, band, private lessons' },
              { icon: 'palette', title: 'Visual Arts', desc: 'Painting, sculpture, digital design' },
              { icon: 'menu_book', title: 'Creative Writing', desc: 'Poetry, journalism, literary magazine' }
            ].map((art, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <MaterialIcon icon={art.icon} className="text-design-primary mx-auto mb-4" size="4xl" />
                <h3 className="font-bold text-text-dark dark:text-white mb-2">{art.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{art.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-4">Clubs & Societies</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Over 30 student-led clubs covering academics, hobbies, community service, and special interests.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            'Debate Club', 'Robotics Team', 'Environmental Club', 'Model UN',
            'Chess Club', 'Coding Club', 'Community Service', 'Photography',
            'Science Olympiad', 'Business Club', 'Book Club', 'Yearbook Committee'
          ].map((club, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-design-primary transition-colors text-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{club}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Opportunities */}
      <section className="py-16 px-6 lg:px-20 bg-gradient-to-br from-design-primary to-blue-700 text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Leadership Opportunities</h2>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                We believe in developing future leaders. Students can take on responsibility through various leadership roles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { role: 'Head Boy/Girl', icon: 'star' },
                  { role: 'House Captains', icon: 'shield' },
                  { role: 'Prefects', icon: 'badge' },
                  { role: 'Club Presidents', icon: 'groups' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <MaterialIcon icon={item.icon} className="text-white" />
                    <span className="font-medium">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold mb-4">Student Council</h3>
              <p className="text-white/80 mb-6">
                Democratically elected representatives who voice student concerns and organize school-wide events and initiatives.
              </p>
              <ul className="space-y-3">
                {[
                  'Monthly meetings with administration',
                  'Event planning and organization',
                  'Charity fundraising initiatives',
                  'Student welfare advocacy'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <MaterialIcon icon="check_circle" className="text-white" size="xs" />
                    <span className="text-sm text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Events Calendar Highlight */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-8 text-center">Annual Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { month: 'September', event: 'Inter-House Sports Day', icon: 'sports' },
            { month: 'November', event: 'Arts Festival & Exhibition', icon: 'celebration' },
            { month: 'December', event: 'Winter Concert', icon: 'music_note' },
            { month: 'February', event: 'Science Fair', icon: 'science' },
            { month: 'April', event: 'Drama Production', icon: 'theater_comedy' },
            { month: 'June', event: 'Graduation & Awards', icon: 'school' }
          ].map((event, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <MaterialIcon icon={event.icon} className="text-design-primary" size="2xl" />
                <div>
                  <BadgeNew variant="primary" size="sm" className="mb-2">{event.month}</BadgeNew>
                  <h3 className="font-bold text-text-dark dark:text-white">{event.event}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 dark:bg-slate-800 text-white py-16 text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Find Your Passion</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join a community where every student is encouraged to explore, excel, and make lasting memories.
          </p>
          <Link href="/admissions" className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-design-primary hover:bg-design-primary-dark text-white font-bold transition-all shadow-lg">
            Start Your Application
          </Link>
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
