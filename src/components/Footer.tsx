import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setEmail('');
    setIsLoading(false);

    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#1C1A75] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white animate-float">
                <img src="/media/static/logo.png" alt="Regisbridge logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold">Regisbridge</h3>
                <p className="text-xs text-[#D4AF37]">Supervincimus</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Empowering minds and shaping futures through excellence in education.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold mb-4 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">About</button></li>
              <li><button onClick={() => scrollToSection('academics')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">Academics</button></li>
              <li><button onClick={() => scrollToSection('boarding')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">Boarding</button></li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h4 className="font-bold mb-4 text-[#D4AF37]">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('admissions')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">Admissions</button></li>
              <li><button onClick={() => scrollToSection('news')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">News & Events</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">Contact</button></li>
              <li><button className="hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300">Careers</button></li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <h4 className="font-bold mb-4 text-[#D4AF37]">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/regisbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] hover:scale-125 transition-all duration-300"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/regisbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] hover:scale-125 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/regisbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] hover:scale-125 transition-all duration-300"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="font-bold mb-4 text-[#D4AF37]">Newsletter</h4>
              {isSubscribed ? (
                <div className="flex items-center text-green-400 animate-fade-in">
                  <Check size={16} className="mr-2" />
                  <span className="text-sm">Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm bg-white/10 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#D4AF37] text-[#1C1A75] rounded-r-lg hover:bg-white hover:text-[#1C1A75] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#1C1A75] border-t-transparent"></div>
                    ) : (
                      <Mail size={16} />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
          <p>© 2025 Regisbridge Private School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
