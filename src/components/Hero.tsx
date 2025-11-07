import React, { useEffect, useState } from 'react';
import LazyImage from '@/components/ui/LazyImage';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Empowering Minds, Shaping Futures";
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElement = document.querySelector('.parallax-bg') as HTMLElement;
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  }, []);

  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="particles-container absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
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
        <div className="absolute inset-0 bg-[#1C1A75] bg-opacity-70"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-6 animate-fade-in bg-white">
          <img
            src="/logo.png"
            alt="Regisbridge logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
          {displayText}<span className="animate-pulse">|</span>
        </h1>
        <p className="text-xl md:text-2xl mb-2 text-[#D4AF37] font-semibold animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Supervincimus - We Conquer Together
        </p>
        <p className="text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          A distinguished private day and boarding school in Zimbabwe
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => scrollToSection('about')}
            className="bg-[#D4AF37] text-[#1C1A75] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
          >
            Learn More
          </button>
          <button
            onClick={() => scrollToSection('admissions')}
            className="bg-white text-[#1C1A75] px-8 py-3 rounded-lg font-semibold hover:bg-[#C0C0C0] transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}

