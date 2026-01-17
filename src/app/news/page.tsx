'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';
import { BadgeNew } from '@/components/ui/badge-new';

export default function NewsPage() {
  const newsItems = [
    { title: 'Rugby First XV Wins National Championship', date: 'Oct 24, 2023', category: 'Sports', badge: 'primary' },
    { title: 'Robotics Team Qualifies for Worlds', date: 'Oct 18, 2023', category: 'Academics', badge: 'purple' },
    { title: 'Annual Winter Concert Dates Announced', date: 'Oct 10, 2023', category: 'Arts', badge: 'amber' },
    { title: 'New STEM Lab Opening Next Term', date: 'Sep 28, 2023', category: 'Facilities', badge: 'success' },
    { title: 'Drama Club Presents Shakespeare', date: 'Sep 15, 2023', category: 'Arts', badge: 'amber' },
    { title: 'Swimming Team Takes Regional Gold', date: 'Sep 5, 2023', category: 'Sports', badge: 'primary' }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-10 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" size="4xl" className="text-design-primary" />
            <h2 className="text-lg font-bold">Regisbridge Academy</h2>
          </div>
          <Link href="/admissions" className="flex items-center justify-center rounded-lg h-9 px-4 bg-design-primary hover:bg-design-primary-dark text-white text-sm font-bold transition-colors">
            Apply Now
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-text-dark dark:text-white mb-4">Latest News & Events</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Stay updated with what's happening at Regisbridge Academy</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeNew variant={item.badge as any} size="sm">{item.category}</BadgeNew>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-text-dark dark:text-white mb-3">{item.title}</h3>
                <Link href="#" className="text-design-primary font-medium text-sm flex items-center gap-1">
                  Read more <MaterialIcon icon="arrow_forward" size="xs" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-sm text-gray-500">
          © 2024 Regisbridge Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
