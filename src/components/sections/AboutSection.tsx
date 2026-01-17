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
    <section id="about" ref={sectionRef} className="py-20 md:py-24 bg-[#FFFDF7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1C1A75] text-center mb-4 leading-tight">
            About Regisbridge Private School
          </h2>
          <div className="w-16 h-1 mx-auto mb-12 rounded-full bg-gradient-to-r from-[#1C1A75] to-[#D4AF37]" />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src="/founder.jpg"
                alt="Mr. Tichaona Mutimbire - School Director & Chairman"
                className="rounded-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1C1A75] mb-4">
                Message from the Director
              </h3>
              <h4 className="text-sm font-semibold tracking-wide uppercase text-[#1C1A75]/70 mb-3">
                Mr. Tichaona Mutimbire - Executive Chairman & Director
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Welcome to Regisbridge Private School, where we believe in nurturing not just academic excellence, but the whole child. Our motto "{schoolPositioning.motto}" embodies our commitment to collaborative learning and mutual support.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {schoolPositioning.philosophy}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Founded in {schoolHistory.founded} as {schoolHistory.originalName}, we expanded in {schoolHistory.expansion.year} to become a comprehensive school serving ECD through Grade 7, with plans for future secondary education.
              </p>
            </div>
          </div>

          <div className="mt-16 mb-12">
            <h3 className="text-3xl font-serif font-bold text-[#1C1A75] text-center mb-8">Our Leadership</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h4 className="text-xl font-bold text-[#1C1A75] mb-2">Mr. T. Mutambasere</h4>
                <p className="text-sm font-semibold text-[#1C1A75]/70 mb-3">School Head</p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Qualifications:</strong> B.Ed in Administration, O & A Level
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Experience:</strong> 20+ years as teacher and school head
                </p>
                <p className="text-gray-700 text-sm">
                  Joined Regisbridge: March 15, 2021
                </p>
              </div>
              <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h4 className="text-xl font-bold text-[#1C1A75] mb-2">Mr. T. Mutimbire</h4>
                <p className="text-sm font-semibold text-[#1C1A75]/70 mb-3">Executive Chairman & Director</p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Qualifications:</strong> B.Eng Telecommunications, MBA (in progress)
                </p>
                <p className="text-gray-700 text-sm">
                  Leading the school's strategic vision, policy development, and business growth
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-[#1C1A75]">Our Mission</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{schoolPositioning.mission}</p>
            </div>
            <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-[#1C1A75]">Our Vision</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{schoolPositioning.vision}</p>
            </div>
            <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-[#1C1A75]">Core Values</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{schoolPositioning.coreValues.map((value) => value.name).join(' • ')}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-3xl font-serif font-bold text-[#1C1A75] mb-3">Our impact in numbers</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              A growing community of learners and educators working together.
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-[#1C1A75]">{counters.students}+</div>
                <p className="mt-2 text-sm text-gray-600 font-medium">Students Enrolled</p>
              </div>
              <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-[#1C1A75]">{counters.teachers}+</div>
                <p className="mt-2 text-sm text-gray-600 font-medium">Qualified Teachers</p>
              </div>
              <div className="rounded-2xl border border-[#1C1A75]/10 bg-white p-7 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-[#1C1A75]">{counters.years}+</div>
                <p className="mt-2 text-sm text-gray-600 font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
