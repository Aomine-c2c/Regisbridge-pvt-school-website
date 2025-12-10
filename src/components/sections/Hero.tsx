'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import LazyImage from '@/components/ui/LazyImage';
import { gradeSeven2020Results, staffingSummaryNewsletter } from '@/lib/data/seed-data-academics';
import { schoolHistory } from '@/lib/data/seed-data-governance';

export default function Hero() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState('');
  const fullText = "Empowering Minds, Shaping Futures";
  
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.parallax-bg') as HTMLElement;
        if (parallaxElement) {
          parallaxElement.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        }
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  // Memoize particles array to prevent recalculation on each render
  const particles = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      left: (i * 7.3) % 100,
      top: (i * 13.7) % 100,
      delay: (i * 0.06) % 3,
      duration: 2 + ((i * 0.11) % 3),
    })), []
  );

  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="particles-container absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 parallax-bg">
        <LazyImage
          src="/hr.jpg"
          alt="Regisbridge Private School campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-royal opacity-80"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-6 animate-fade-in bg-white shadow-glow-gold ring-4 ring-[#D4AF37]/30">
          <img
            src="/logo.png"
            alt="Regisbridge logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-gradient-royal text-shadow-strong">
          {displayText}<span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl md:text-2xl mb-2 text-[#D4AF37] font-semibold animate-fade-in text-shadow-soft" style={{ animationDelay: '0.4s' }}>
          Supervincimus - We Conquer Together
        </p>
        <p className="text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          A distinguished private day and boarding school in Zimbabwe
        </p>
        
        {/* Achievement Banner */}
        <div className="glass-card shadow-medium p-6 mb-8 animate-fade-in border border-white/30" style={{ animationDelay: '0.7s' }}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="micro-float">
              <div className="text-3xl font-bold text-gradient-gold">{gradeSeven2020Results.overallPassRate}</div>
              <div className="text-sm text-shadow-soft">Grade 7 Pass Rate</div>
            </div>
            <div className="micro-float" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-gradient-gold">{schoolHistory.currentEnrollment}</div>
              <div className="text-sm text-shadow-soft">Students Enrolled</div>
            </div>
            <div className="micro-float" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-gradient-gold">{staffingSummaryNewsletter.total}+</div>
              <div className="text-sm text-shadow-soft">Qualified Teachers</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => scrollToSection('about')}
            className="btn-gold px-8 py-3 rounded-lg font-semibold text-[#1C1A75] micro-bounce"
          >
            Learn More
          </button>
          <button
            onClick={() => router.push('/register')}
            className="btn-gradient px-8 py-3 rounded-lg font-semibold text-white micro-bounce"
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}

