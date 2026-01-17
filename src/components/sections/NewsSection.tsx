'use client';

import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';

export default function NewsSection() {
  const [filter, setFilter] = useState('all');
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  const newsItems = [
    {
      id: 1,
      category: 'upcoming',
      title: 'Term 2 Opening',
      date: 'May 5, 2025',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699630197_fd71b433.webp',
      description: 'Welcome back students for an exciting new term'
    },
    {
      id: 2,
      category: 'results',
      title: 'Outstanding Grade 7 Results',
      date: 'March 15, 2025',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699631941_2be9a99e.webp',
      description: '98% pass rate in national examinations'
    },
    {
      id: 3,
      category: 'achievements',
      title: 'Science Fair Winners',
      date: 'April 10, 2025',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699653860_1ab8d832.webp',
      description: 'Our students excel at regional competition'
    },
    {
      id: 4,
      category: 'achievements',
      title: 'Sports Day Success',
      date: 'March 28, 2025',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699641121_fcd22c61.webp',
      description: 'Annual athletics event celebrates student talent'
    },
    {
      id: 5,
      category: 'upcoming',
      title: 'Parent-Teacher Meetings',
      date: 'May 20, 2025',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699633716_09919d12.webp',
      description: 'Schedule your appointment today'
    },
    {
      id: 6,
      category: 'achievements',
      title: 'Cultural Festival',
      date: 'April 2, 2025',
      image: 'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699659001_3f39f11b.webp',
      description: 'Students showcase diverse talents and traditions'
    }
  ];

  const filteredNews = filter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  return (
    <section id="news" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1C1A75] text-center mb-4 leading-tight">
          News & Events
        </h2>
        <div className="w-16 h-1 mx-auto mb-12 rounded-full bg-gradient-to-r from-[#1C1A75] to-[#D4AF37]"></div>

        <div className="flex justify-center flex-wrap gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'all' ? 'bg-[#1C1A75] text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'upcoming' ? 'bg-[#1C1A75] text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('results')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'results' ? 'bg-[#1C1A75] text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Results
          </button>
          <button
            onClick={() => setFilter('achievements')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filter === 'achievements' ? 'bg-[#1C1A75] text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Achievements
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <img src={item.image} alt={item.title} className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110" />
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  {item.date}
                </div>
                <h3 className="text-2xl font-bold text-[#1C1A75] mb-3 hover:text-[#D4AF37] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                <button
                  className="mt-4 text-[#1C1A75] font-semibold hover:text-[#D4AF37] transition-colors"
                  aria-label={`Read more about ${item.title}`}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="relative">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="Close news modal"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-2" />
                  {selectedNews.date}
                </div>
                <h2 className="text-2xl font-bold text-[#1C1A75] mb-4">{selectedNews.title}</h2>
                <p className="text-gray-700 mb-4">{selectedNews.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    For more detailed information about this event, please contact our admissions office or visit our campus.
                    We regularly update our news and events section with the latest school activities and achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
