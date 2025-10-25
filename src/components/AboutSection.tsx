import React, { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [counters, setCounters] = useState({ students: 0, teachers: 0, years: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

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
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { students: 450, teachers: 35, years: 10};
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        students: Math.floor(targets.students * progress),
        teachers: Math.floor(targets.teachers * progress),
        years: Math.floor(targets.years * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, increment);
  };

  return (
    <section id="about" ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-[#1C1A75] text-center mb-4">
            About Regisbridge Private School
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="animate-fade-in">
              <img
                src="./media/static/founder.jpg"
                alt="Headmaster"
                className="rounded-lg shadow-lg w-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="animate-slide-in">
              <h3 className="text-2xl font-bold text-[#1C1A75] mb-4">
                Headmaster's Welcome
              </h3>
              <p className="text-gray-700 mb-4">
                Welcome to Regisbridge Private School, where we believe in nurturing not just academic excellence, but the whole child. Our motto "Supervincimus" - We Conquer Together - embodies our commitment to collaborative learning and mutual support.
              </p>
              <p className="text-gray-700">
                Since our establishment, we have been dedicated to providing quality education that prepares our students for success in an ever-changing world.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1C1A75] text-white p-8 rounded-lg hover:scale-105 transition-all duration-300 animate-bounce-in">
              <h3 className="text-xl font-bold mb-3 text-[#D4AF37]">Our Mission</h3>
              <p>To provide exceptional education that empowers students to achieve their full potential academically, morally, and socially.</p>
            </div>
            <div className="bg-[#1C1A75] text-white p-8 rounded-lg hover:scale-105 transition-all duration-300 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold mb-3 text-[#D4AF37]">Our Vision</h3>
              <p>To be Zimbabwe's leading educational institution, recognized for academic excellence and character development.</p>
            </div>
            <div className="bg-[#1C1A75] text-white p-8 rounded-lg hover:scale-105 transition-all duration-300 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold mb-3 text-[#D4AF37]">Core Values</h3>
              <p>Excellence, Integrity, Respect, Discipline, and Community - the pillars of our educational philosophy.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-[#1C1A75] mb-8">Our Impact in Numbers</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{counters.students}+</div>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{counters.teachers}+</div>
                <p className="text-gray-600">Qualified Teachers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{counters.years}+</div>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
