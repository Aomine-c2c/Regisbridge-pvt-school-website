'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { gradeSeven2020Results, staffingSummaryNewsletter } from '@/lib/data/seed-data-academics';
import { schoolHistory } from '@/lib/data/seed-data-governance';

export default function Hero() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize particles array to prevent recalculation on each render
  const particles = useMemo(() =>
    [...Array(18)].map((_, i) => ({
      left: (i * 7.3) % 100,
      top: (i * 13.7) % 100,
      delay: (i * 0.06) % 3,
      duration: 2 + ((i * 0.11) % 3),
    })), []
  );

  return (
    <section id="home" className="relative overflow-hidden bg-[#1C1A75]">
      <div className="relative min-h-[85vh] md:min-h-[90vh] lg:min-h-screen">
      {/* Animated Background Particles */}
      <div className="particles-container absolute inset-0 pointer-events-none z-[1]">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-[#D4AF37] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Main Background Image with Better Visibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hr.jpg"
          alt="Happy students at Regisbridge Private School"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={95}
        />
        {/* Gradient Overlays - Lighter to show kids better */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A75]/85 via-[#1C1A75]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a3d]/60 via-transparent to-[#1C1A75]/70" />
        {/* Golden Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.12),transparent_60%)]" />
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFFDF7] to-transparent opacity-40" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text */}
            <div className="text-white space-y-8 lg:pr-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/20 to-[#C8A74A]/10 px-6 py-3 backdrop-blur-xl shadow-2xl hover:border-[#D4AF37]/70 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse shadow-lg shadow-[#D4AF37]/50" />
                  <span className="text-sm font-bold tracking-wider uppercase text-white">Regisbridge Private School</span>
                </div>
                <div className="h-6 w-px bg-white/30" />
                <span className="text-sm font-semibold text-[#F0D58A]">Zimbabwe</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-white to-[#F0D58A] bg-clip-text text-transparent drop-shadow-2xl">
                    Empowering
                  </span>
                  <span className="block bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent drop-shadow-2xl">
                    Minds,
                  </span>
                  <span className="block bg-gradient-to-r from-[#F0D58A] via-[#D4AF37] to-white bg-clip-text text-transparent drop-shadow-2xl">
                    Shaping Futures
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-xl leading-relaxed font-light drop-shadow-lg">
                A warm, values-led school where learners are <span className="text-[#F0D58A] font-semibold">known, supported,</span> and <span className="text-[#F0D58A] font-semibold">challenged</span> — in the classroom, on the field, and in community.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('admissions')}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F0D58A] to-[#D4AF37] bg-size-200 bg-pos-0 hover:bg-pos-100 px-10 py-5 text-lg font-bold text-[#1C1A75] shadow-2xl shadow-[#D4AF37]/50 hover:shadow-[#D4AF37]/80 hover:scale-105 active:scale-95 transition-all duration-500 flex items-center justify-center gap-3"
                >
                  <span>Apply Now</span>
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="group rounded-xl border-2 border-white/70 bg-white/15 backdrop-blur-xl px-10 py-5 text-lg font-bold text-white hover:bg-white hover:text-[#1C1A75] shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Explore School</span>
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Content - Logo + Accent */}
            <div className="hidden lg:flex items-center justify-center lg:justify-end">
              <div className="relative">
                {/* Glowing Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-[#C8A74A]/20 rounded-full blur-3xl scale-150 animate-pulse" />
                {/* Logo Container */}
                <div className="relative w-40 h-40 xl:w-48 xl:h-48 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/30 backdrop-blur-2xl shadow-2xl flex items-center justify-center overflow-hidden hover:scale-110 hover:rotate-3 transition-all duration-500 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src="/logo.png"
                    alt="Regisbridge School Crest"
                    width={128}
                    height={128}
                    className="object-cover relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards - More Prominent */}
          <div className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            <div className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl px-8 py-7 hover:bg-white/25 hover:scale-105 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <div className="text-5xl font-black text-white drop-shadow-xl">{gradeSeven2020Results.overallPassRate}</div>
                </div>
                <div className="text-sm text-white/95 font-bold uppercase tracking-wider mb-4">Grade 7 Pass Rate</div>
                <div className="w-full bg-white/25 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F0D58A] to-[#D4AF37] animate-shimmer shadow-lg" style={{ width: '100%', backgroundSize: '200% 100%' }} />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl px-8 py-7 hover:bg-white/25 hover:scale-105 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11C17.66 11 18.99 9.66 18.99 8S17.66 5 16 5 13 6.34 13 8 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8S9.66 5 8 5 5 6.34 5 8 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05 16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" />
                  </svg>
                  <div className="text-5xl font-black text-white drop-shadow-xl">{schoolHistory.currentEnrollment}</div>
                </div>
                <div className="text-sm text-white/95 font-bold uppercase tracking-wider mb-4">Students Enrolled</div>
                <div className="w-full bg-white/25 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F0D58A] to-[#D4AF37] animate-shimmer shadow-lg" style={{ width: '100%', backgroundSize: '200% 100%' }} />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl px-8 py-7 hover:bg-white/25 hover:scale-105 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" />
                  </svg>
                  <div className="text-5xl font-black text-white drop-shadow-xl">{staffingSummaryNewsletter.total}+</div>
                </div>
                <div className="text-sm text-white/95 font-bold uppercase tracking-wider mb-4">Qualified Teachers</div>
                <div className="w-full bg-white/25 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F0D58A] to-[#D4AF37] animate-shimmer shadow-lg" style={{ width: '100%', backgroundSize: '200% 100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

