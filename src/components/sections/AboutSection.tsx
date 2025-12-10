'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { schoolPositioning, schoolHistory } from '@/lib/data/seed-data-governance';
import { staffingSummaryNewsletter } from '@/lib/data/seed-data-academics';

export default function AboutSection() {
  const [counters, setCounters] = useState({ students: 0, teachers: 0, years: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Memoize target values
  const targetValues = useMemo(() => ({
    students: schoolHistory.currentEnrollment,
    teachers: staffingSummaryNewsletter.total,
    years: new Date().getFullYear() - 2012,
  }), []);

  const animateCounters = useCallback(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        students: Math.floor(targetValues.students * progress),
        teachers: Math.floor(targetValues.teachers * progress),
        years: Math.floor(targetValues.years * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targetValues);
      }
    }, interval);
  }, [targetValues]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, animateCounters]);

  return (
    <section id="about" ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-gradient-royal text-center mb-4 text-shadow-soft">
            About Regisbridge Private School
          </h2>
          <div className="divider-animated w-24 h-1 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="animate-fade-in">
              <img
                src="/founder.jpg"
                alt="Mr. Tichaona Mutimbire - School Director & Chairman"
                className="rounded-lg shadow-strong w-full hover:scale-105 hover:shadow-glow-gold transition-all duration-300"
              />
            </div>
            <div className="animate-slide-in">
              <h3 className="text-2xl font-bold text-[#1C1A75] dark:text-white mb-4">
                Message from the Director
              </h3>
              <h4 className="text-lg font-semibold text-gradient-gold mb-3">
                Mr. Tichaona Mutimbire - Executive Chairman & Director
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Welcome to Regisbridge Private School, where we believe in nurturing not just academic excellence, but the whole child. Our motto "{schoolPositioning.motto}" embodies our commitment to collaborative learning and mutual support.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {schoolPositioning.philosophy}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Founded in {schoolHistory.founded} as {schoolHistory.originalName}, we expanded in {schoolHistory.expansion.year} to become a comprehensive school serving ECD through Grade 7, with plans for future secondary education.
              </p>
            </div>
          </div>

          <div className="mt-16 mb-12">
            <h3 className="text-3xl font-bold text-[#1C1A75] dark:text-white text-center mb-8">Our Leadership</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-card shadow-medium p-6 rounded-lg border-2 border-[#D4AF37] hover:shadow-glow-gold transition-all duration-300 micro-float">
                <h4 className="text-xl font-bold text-[#1C1A75] dark:text-white mb-2">Mr. T. Mutambasere</h4>
                <p className="text-gradient-gold font-semibold mb-3">School Head</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Qualifications:</strong> B.Ed in Administration, O & A Level
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Experience:</strong> 20+ years as teacher and school head
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Joined Regisbridge: March 15, 2021
                </p>
              </div>
              <div className="glass-card shadow-medium p-6 rounded-lg border-2 border-[#D4AF37] hover:shadow-glow-gold transition-all duration-300 micro-float animation-delay-150ms">
                <h4 className="text-xl font-bold text-[#1C1A75] dark:text-white mb-2">Mr. T. Mutimbire</h4>
                <p className="text-gradient-gold font-semibold mb-3">Executive Chairman & Director</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>Qualifications:</strong> B.Eng Telecommunications, MBA (in progress)
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Leading the school's strategic vision, policy development, and business growth
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="gradient-primary text-white p-8 rounded-lg card-elevated shadow-medium animate-bounce-in">
              <h3 className="text-xl font-bold mb-3 text-gradient-gold">Our Mission</h3>
              <p>{schoolPositioning.mission}</p>
            </div>
            <div className="gradient-primary text-white p-8 rounded-lg card-elevated shadow-medium animate-bounce-in-delay-200">
              <h3 className="text-xl font-bold mb-3 text-gradient-gold">Our Vision</h3>
              <p>{schoolPositioning.vision}</p>
            </div>
            <div className="gradient-primary text-white p-8 rounded-lg card-elevated shadow-medium animate-bounce-in-delay-400">
              <h3 className="text-xl font-bold mb-3 text-gradient-gold">Core Values</h3>
              <p>{schoolPositioning.coreValues.join(' • ')}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gradient-royal mb-8 text-shadow-soft">Our Impact in Numbers</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center card-interactive glass-card p-8 rounded-lg shadow-soft">
                <div className="text-4xl font-bold text-gradient-gold mb-2">{counters.students}+</div>
                <p className="text-gray-600 dark:text-gray-400">Students Enrolled</p>
              </div>
              <div className="text-center card-interactive glass-card p-8 rounded-lg shadow-soft">
                <div className="text-4xl font-bold text-gradient-gold mb-2">{counters.teachers}+</div>
                <p className="text-gray-600 dark:text-gray-400">Qualified Teachers</p>
              </div>
              <div className="text-center card-interactive glass-card p-8 rounded-lg shadow-soft">
                <div className="text-4xl font-bold text-gradient-gold mb-2">{counters.years}+</div>
                <p className="text-gray-600 dark:text-gray-400">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
