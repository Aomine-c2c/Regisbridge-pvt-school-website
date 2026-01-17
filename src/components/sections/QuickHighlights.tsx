'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Home, BookOpen, Award } from 'lucide-react';

export default function QuickHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const highlights = [
    {
      icon: Home,
      title: 'Day & Boarding School',
      description: 'Flexible options for every family'
    },
    {
      icon: BookOpen,
      title: 'Grades 1-7 + Forms 1-3',
      description: 'Primary & Lower Secondary Education'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Personalized learning & small classes'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-20 md:py-24 bg-[#FFFDF7] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1C1A75] leading-tight">A place where children thrive</h2>
            <div className="w-16 h-1 mx-auto mt-4 mb-6 rounded-full bg-gradient-to-r from-[#1C1A75] to-[#D4AF37]" />
            <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Small classes, caring staff, and a community that helps every learner grow in confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1A75]/10 ring-1 ring-[#1C1A75]/10 group-hover:bg-gradient-to-br group-hover:from-[#1C1A75] group-hover:to-[#2C2A95] group-hover:ring-[#D4AF37] transition-all duration-300">
                    <item.icon className="text-[#1C1A75] group-hover:text-[#D4AF37] transition-colors" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1C1A75] group-hover:text-[#1C1A75] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
