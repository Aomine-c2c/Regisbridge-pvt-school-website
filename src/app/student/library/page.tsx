'use client';

import { useState } from 'react';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function DigitalLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section className="bg-brand-navy py-16 text-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <h1 className="text-4xl md:text-5xl font-black mb-6">Digital Library & Resources</h1>
            <p className="text-gray-200 text-lg max-w-2xl mb-8">
              Access over 50,000 digital resources from anywhere, anytime.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search books, journals, articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-lg border-none text-gray-900 focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
                <button className="px-8 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold rounded-lg transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: 'menu_book', label: 'E-Books', count: '25,000+' },
              { icon: 'article', label: 'Journals', count: '5,000+' },
              { icon: 'video_library', label: 'Video Lectures', count: '2,000+' },
              { icon: 'biotech', label: 'Research Papers', count: '10,000+' },
              { icon: 'newspaper', label: 'Databases', count: '50+' },
              { icon: 'language', label: 'Language Resources', count: '30+ Languages' },
              { icon: 'history_edu', label: 'Past Papers', count: '15 Years' },
              { icon: 'collections_bookmark', label: 'Study Guides', count: '1,000+' },
            ].map((resource, i) => (
              <button
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-brand-navy transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-full bg-brand-navy/10 flex items-center justify-center mb-4 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-brand-navy group-hover:text-white text-[24px]">
                    {resource.icon}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{resource.label}</h3>
                <p className="text-sm text-gray-600">{resource.count}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'A-Level Revision Materials', desc: 'Comprehensive study guides for all subjects' },
                { title: 'STEM Research Database', desc: 'Latest scientific journals and papers' },
                { title: 'Literature Classics', desc: 'Complete works of major authors' },
              ].map((collection, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{collection.title}</h3>
                  <p className="text-gray-600 mb-4">{collection.desc}</p>
                  <button className="text-brand-navy font-bold text-sm hover:underline">
                    Browse Collection →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Library Hours */}
        <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Library Hours</h2>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '7:30 AM - 8:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">{schedule.day}</span>
                    <span className="text-gray-900 font-bold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
              <div className="bg-brand-navy/5 rounded-xl p-6 border border-brand-navy/20">
                <p className="text-gray-700 mb-4">
                  Our librarians are here to assist with research, citations, and finding resources.
                </p>
                <button className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-3 rounded-lg font-bold transition-colors w-full md:w-auto">
                  Ask a Librarian
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
