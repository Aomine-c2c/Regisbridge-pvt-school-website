'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

type NewsCategory = 'all' | 'academics' | 'sports' | 'arts' | 'boarding';

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'A-Level Results: Class of 2026 Achieves Record Highs',
    excerpt: 'Our students have once again demonstrated academic excellence with a 98% pass rate across all subjects, setting a new benchmark for the region.',
    category: 'academics' as const,
    date: 'Jan 12, 2026',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    slug: 'a-level-results-2026',
  },
  {
    id: '2',
    title: '1st XV Rugby Team Secures Regional Championship',
    excerpt: 'In a thrilling final match against St. Johns, our 1st XV team showed incredible resilience to bring home the trophy.',
    category: 'sports' as const,
    date: 'Jan 10, 2026',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    slug: 'rugby-championship',
  },
  {
    id: '3',
    title: 'Annual Spring Art Exhibition Opening Night',
    excerpt: 'Join us for an evening of creativity as we showcase the exceptional work of our A-Level and GCSE art students.',
    category: 'arts' as const,
    date: 'Jan 05, 2026',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    slug: 'spring-art-exhibition',
  },
  {
    id: '4',
    title: 'Boarding House Renovation Complete',
    excerpt: 'Our Windsor House has been fully renovated with modern amenities while preserving its historic charm.',
    category: 'boarding' as const,
    date: 'Dec 28, 2025',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    slug: 'boarding-renovation',
  },
  {
    id: '5',
    title: 'Debate Team Wins National Finals',
    excerpt: 'Congratulations to our debate team for their outstanding performance at the National Schools Debate Championship.',
    category: 'academics' as const,
    date: 'Dec 20, 2025',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
    slug: 'debate-championship',
  },
  {
    id: '6',
    title: 'Winter Concert Features Student Compositions',
    excerpt: 'Our annual winter concert will premiere five original compositions by A-Level music students.',
    category: 'arts' as const,
    date: 'Dec 15, 2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    slug: 'winter-concert',
  },
];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Annual Rugby Derby vs. St. John\'s',
    date: '15',
    month: 'FEB',
    time: '14:00 - 17:00',
    location: 'Main Oval',
    category: 'Sports',
    color: 'blue',
  },
  {
    id: '2',
    title: 'Winter Choral Concert',
    date: '22',
    month: 'FEB',
    time: '18:30 - 20:30',
    location: 'School Chapel',
    category: 'Arts',
    color: 'purple',
  },
  {
    id: '3',
    title: 'End of Term Boarders Dinner',
    date: '05',
    month: 'MAR',
    time: '19:00 - 21:00',
    location: 'Dining Hall',
    category: 'Boarding',
    color: 'green',
  },
  {
    id: '4',
    title: 'Spring Break Begins',
    date: '10',
    month: 'MAR',
    time: 'All Day',
    location: 'Campus Wide',
    category: 'General',
    color: 'red',
  },
];

export default function NewsEventsHub() {
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');

  const filteredNews = selectedCategory === 'all'
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <PremiumHeader />

      <main className="flex-grow flex flex-col items-center w-full">
        {/* Hero Section */}
        <section
          className="w-full relative bg-cover bg-center bg-no-repeat min-h-[400px] flex items-center justify-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(11, 31, 59, 0.6), rgba(11, 31, 59, 0.8)), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600")',
          }}
        >
          <div className="max-w-[960px] px-4 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
              News & Events Hub
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
              Stay connected with the vibrant life of our school community, from academic achievements to upcoming fixtures.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="w-full max-w-[1280px] px-4 md:px-10 py-10">
          {/* Tabs & Filters */}
          <div className="flex flex-col gap-8 mb-10">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-0 gap-4">
              <div className="flex gap-8 w-full md:w-auto overflow-x-auto">
                <button
                  onClick={() => setActiveTab('news')}
                  className={`group flex flex-col items-center justify-center border-b-[3px] pb-3 px-2 cursor-pointer transition-all ${
                    activeTab === 'news'
                      ? 'border-brand-navy'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`text-base font-bold tracking-[0.015em] flex items-center gap-2 ${
                      activeTab === 'news' ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">newspaper</span> Latest News
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`group flex flex-col items-center justify-center border-b-[3px] pb-3 px-2 cursor-pointer transition-all ${
                    activeTab === 'events'
                      ? 'border-brand-navy'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`text-base font-bold tracking-[0.015em] flex items-center gap-2 ${
                      activeTab === 'events' ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span> Upcoming Events
                  </span>
                </button>
              </div>
            </div>

            {/* Filter Chips - Only show for news tab */}
            {activeTab === 'news' && (
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'all' as const, label: 'All' },
                  { value: 'academics' as const, label: 'Academics' },
                  { value: 'sports' as const, label: 'Sports' },
                  { value: 'arts' as const, label: 'The Arts' },
                  { value: 'boarding' as const, label: 'Boarding Life' },
                ].map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedCategory(filter.value)}
                    className={`flex h-9 items-center justify-center gap-x-2 rounded-full px-5 transition-all hover:shadow-md ${
                      selectedCategory === filter.value
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'bg-white border border-gray-200 hover:border-brand-navy hover:text-brand-navy'
                    }`}
                  >
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* News Grid */}
          {activeTab === 'news' && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Featured Updates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredNews.map(article => (
                  <article
                    key={article.id}
                    className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute top-4 left-4 bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded shadow-sm z-10 capitalize">
                        {article.category}
                      </div>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        {article.date}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-brand-navy transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <Link
                          href={`/news/${article.slug}`}
                          className="inline-flex items-center text-brand-navy font-bold text-sm hover:underline"
                        >
                          Read Full Story <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Events List */}
          {activeTab === 'events' && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-2xl font-bold text-gray-900">Upcoming Calendar</h3>
                <Link href="/calendar" className="text-brand-navy font-bold text-sm hover:underline hidden md:inline-block">
                  View Full Calendar
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {UPCOMING_EVENTS.map(event => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5"
                  >
                    {/* Date Box */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-brand-navy font-black text-2xl leading-none">{event.date}</span>
                      <span className="text-gray-500 font-bold text-sm uppercase mt-1">{event.month}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-block w-2 h-2 rounded-full bg-${event.color}-500`}></span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{event.category}</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{event.title}</h4>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">schedule</span> {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">location_on</span> {event.location}
                        </div>
                      </div>
                    </div>
                    <button className="hidden sm:flex self-center flex-shrink-0 items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-navy transition-colors">
                      <span className="material-symbols-outlined">event</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Load More */}
          <div className="flex justify-center pb-10">
            <button className="flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              Load More {activeTab === 'news' ? 'Updates' : 'Events'}
            </button>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="w-full bg-brand-navy text-white py-16 px-4">
          <div className="max-w-[960px] mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">Subscribe to the Headmaster's Weekly</h2>
              <p className="text-gray-200 text-lg">
                Don't miss a beat. Get the latest news, fixtures, and achievements delivered directly to your inbox every Friday.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <form className="flex gap-2">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  placeholder="Enter your email address"
                  type="email"
                />
                <button
                  className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                  type="button"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
