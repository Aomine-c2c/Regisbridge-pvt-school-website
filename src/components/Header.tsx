import React, { useState } from 'react';
import { Menu, X, Search, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Grouped navigation items
  const mainMenuItems = [
    { label: t('nav.home'), id: 'home' },
    { label: t('nav.about'), id: 'about' },
  ];

  const academicItems = [
    { label: t('nav.academics'), id: 'academics' },
    { label: t('nav.boarding'), id: 'boarding' },
    { label: t('nav.sports'), id: 'sports' },
  ];

  const admissionsItems = [
    { label: t('nav.admissions'), id: 'admissions' },
    { label: t('nav.apply'), id: 'application' },
  ];

  const resourcesItems = [
    { label: t('nav.calendar'), id: 'calendar' },
    { label: t('nav.news'), id: 'news' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  const allMenuItems = [
    ...mainMenuItems,
    ...academicItems,
    ...admissionsItems,
    { label: t('nav.portal'), id: 'portal' },
    ...resourcesItems,
  ];

  return (
    <header className="bg-[#1C1A75] text-white sticky top-0 z-50 shadow-lg" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-md">
              <img src="/media/static/logo.png" alt="Regisbridge logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-xl lg:text-2xl animate-fade-in leading-tight">Regisbridge Private School</h1>
              <p className="text-sm text-[#D4AF37] animate-fade-in mt-0.5" style={{ animationDelay: '0.2s' }}>Supervincimus</p>
            </div>
            <div className="md:hidden">
              <h1 className="font-bold text-lg animate-fade-in leading-tight">Regisbridge</h1>
              <p className="text-xs text-[#D4AF37] animate-fade-in mt-0.5" style={{ animationDelay: '0.2s' }}>School</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-white/10 rounded-lg">
                  <User size={16} />
                  <span className="font-medium">{user?.firstName}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-white border-white hover:bg-white hover:text-[#1C1A75] transition-all"
                >
                  <LogOut size={16} className="mr-1.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                size="sm"
                className="hidden md:flex text-white border-white hover:bg-white hover:text-[#1C1A75] transition-all"
              >
                <LogIn size={16} className="mr-1.5" />
                Login
              </Button>
            )}

            <nav className="hidden lg:flex items-center gap-5" role="navigation" aria-label="Main navigation">
              {/* Home & About */}
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 focus-visible font-medium"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}

              {/* Academic Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#D4AF37] transition-all duration-300 focus-visible font-medium outline-none">
                  Academic
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1C1A75] text-white border-white/20">
                  {academicItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="hover:bg-white/10 hover:text-[#D4AF37] cursor-pointer focus:bg-white/10 focus:text-[#D4AF37]"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Admissions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#D4AF37] transition-all duration-300 focus-visible font-medium outline-none">
                  Admissions
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1C1A75] text-white border-white/20">
                  {admissionsItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="hover:bg-white/10 hover:text-[#D4AF37] cursor-pointer focus:bg-white/10 focus:text-[#D4AF37]"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Portal Link */}
              <Link
                to="/portal"
                className="hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 focus-visible font-medium"
                aria-label="Navigate to Portal page"
              >
                Portal
              </Link>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#D4AF37] transition-all duration-300 focus-visible font-medium outline-none">
                  Resources
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1C1A75] text-white border-white/20">
                  {resourcesItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="hover:bg-white/10 hover:text-[#D4AF37] cursor-pointer focus:bg-white/10 focus:text-[#D4AF37]"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Facebook */}
              <a
                href="https://facebook.com/649025021870070"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-2.5 rounded-full hover:bg-[#D4AF37] hover:text-[#1C1A75] transition-colors"
                aria-label="Regisbridge on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.08 22 12.07z"/>
                </svg>
              </a>
            </nav>

            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 space-y-2 animate-slide-up border-t border-white/20 pt-4">
            {/* Main items */}
            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-3 px-4 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Academic items with header */}
            <div className="pt-2">
              <div className="text-xs text-[#D4AF37] px-4 py-2 font-semibold uppercase tracking-wider">Academic</div>
              {academicItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-6 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Admissions items with header */}
            <div className="pt-2">
              <div className="text-xs text-[#D4AF37] px-4 py-2 font-semibold uppercase tracking-wider">Admissions</div>
              {admissionsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-6 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Portal */}
            <Link
              to="/portal"
              className="block w-full text-left py-3 px-4 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Portal
            </Link>

            {/* Resources items with header */}
            <div className="pt-2">
              <div className="text-xs text-[#D4AF37] px-4 py-2 font-semibold uppercase tracking-wider">Resources</div>
              {resourcesItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-6 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <div className="pt-3 space-y-2 border-t border-white/20 mt-3">
                <div className="flex items-center gap-2 text-sm px-4 py-2">
                  <User size={16} />
                  <span className="font-medium">{user?.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left py-3 px-4 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300 font-medium flex items-center gap-2 border-t border-white/20 mt-3 pt-5"
              >
                <LogIn size={16} />
                Login
              </button>
            )}
            
            <a
              href="https://facebook.com/649025021870070"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 px-4 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300 font-medium border-t border-white/20 mt-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.08 22 12.07z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </nav>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-6 animate-slide-up border-t border-white/20 pt-4">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, academics, admissions..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={() => {
                  // Implement search functionality
                  if (searchQuery.trim()) {
                    // Scroll to relevant sections based on search
                    const sections = ['about', 'academics', 'boarding', 'admissions', 'news', 'contact'];
                    const query = searchQuery.toLowerCase();

                    if (query.includes('about') || query.includes('mission') || query.includes('vision')) {
                      scrollToSection('about');
                    } else if (query.includes('academic') || query.includes('subject') || query.includes('learn')) {
                      scrollToSection('academics');
                    } else if (query.includes('board') || query.includes('live') || query.includes('residence')) {
                      scrollToSection('boarding');
                    } else if (query.includes('admission') || query.includes('apply') || query.includes('join')) {
                      scrollToSection('admissions');
                    } else if (query.includes('news') || query.includes('event') || query.includes('update')) {
                      scrollToSection('news');
                    } else if (query.includes('contact') || query.includes('phone') || query.includes('email')) {
                      scrollToSection('contact');
                    }
                  }
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#D4AF37] text-[#1C1A75] rounded-r-lg hover:bg-white transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

