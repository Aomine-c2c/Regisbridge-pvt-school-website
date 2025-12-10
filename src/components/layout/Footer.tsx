'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load newsletter component
const NewsletterSignup = dynamic(() => 
  import('../features/NewsletterSignup').then(mod => ({ default: mod.NewsletterSignup })),
  { ssr: false }
);

export default function Footer() {
  const scrollToSection = useMemo(() => (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const quickLinks = useMemo(() => [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Academics', id: 'academics' },
    { label: 'Boarding', id: 'boarding' },
  ], []);

  const infoLinks = useMemo(() => [
    { label: 'Admissions', id: 'admissions' },
    { label: 'News & Events', id: 'news' },
    { label: 'Contact', id: 'contact' },
    { label: 'Careers', id: null },
  ], []);

  const socialLinks = useMemo(() => [
    { 
      href: 'https://www.facebook.com/regisbridge',
      icon: Facebook,
      label: 'Visit our Facebook page'
    },
    {
      href: 'https://www.instagram.com/regisbridge',
      icon: Instagram,
      label: 'Follow us on Instagram'
    },
    {
      href: 'https://www.linkedin.com/company/regisbridge',
      icon: Linkedin,
      label: 'Connect with us on LinkedIn'
    }
  ], []);

  return (
    <footer className="gradient-royal py-12 shadow-strong border-t-4 border-[#D4AF37]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white animate-float shadow-glow-gold">
                <Image src="/logo.png" alt="Regisbridge logo" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-white">Regisbridge</h3>
                <p className="text-xs text-gradient-gold">Supervincimus</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Empowering minds and shaping futures through excellence in education.
            </p>
          </div>

          <div className="animate-slide-up">
            <h4 className="font-bold mb-4 text-gradient-gold text-shadow-soft">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)} 
                    className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300 micro-bounce"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up">
            <h4 className="font-bold mb-4 text-gradient-gold text-shadow-soft">Information</h4>
            <ul className="space-y-2 text-sm">
              {infoLinks.map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => link.id && scrollToSection(link.id)} 
                    className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300 micro-bounce"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up">
            <h4 className="font-bold mb-4 text-gradient-gold text-shadow-soft">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map(link => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D4AF37] micro-wiggle transition-all duration-300"
                    aria-label={link.label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>

            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        <div className="divider-animated w-full h-px mx-auto mb-8"></div>
        <div className="text-center text-sm text-gray-300">
          <p>© 2025 Regisbridge Private School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
