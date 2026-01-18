'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import DropdownMenu from '@/components/ui/DropdownMenu';

export default function PremiumHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = {
    about: [
      { label: 'About Our Institution', href: '/about' },
      { label: 'Headmaster\'s Welcome', href: '/about/headmaster' },
      { label: 'Board of Governors', href: '/about/board' },
      { label: 'Contact Us', href: '/contact' },
    ],
    admissions: [
      { label: 'Admissions Overview', href: '/admissions' },
      { label: 'Apply Online', href: '/admissions/apply' },
      { label: 'Campus Tour', href: '/campus-tour' },
      { label: 'Campus Map', href: '/campus-map' },
    ],
    academics: [
      { label: 'Academic Excellence', href: '/academics' },
      { label: 'Digital Library', href: '/student/library' },
      { label: 'Academic Calendar', href: '/calendar' },
      { label: 'Career Guidance', href: '/career-guidance' },
    ],
    studentLife: [
      { label: 'Student Life Overview', href: '/student-life' },
      { label: 'Boarding & Pastoral Care', href: '/boarding' },
      { label: 'Student Leadership', href: '/student-leadership' },
      { label: 'Student Wellness', href: '/wellness' },
      { label: 'House Championship', href: '/student/house' },
    ],
    community: [
      { label: 'News & Events', href: '/news' },
      { label: 'Alumni Network', href: '/alumni' },
      { label: 'Support & Giving', href: '/support' },
      { label: 'School Shop', href: '/shop' },
      { label: 'Press Kit', href: '/press' },
    ],
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 lg:px-20 py-4 max-w-[1400px] mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative size-12">
            <Image
              src="/logo.png"
              alt="Regisbridge Private School Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[#111318] text-lg font-bold leading-tight font-heading">
              Regisbridge
            </h2>
            <span className="text-xs text-gray-600 font-medium">
              Private School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-6">
            <DropdownMenu
              label="About"
              items={menuItems.about}
              isActive={isActive('/about')}
            />
            <DropdownMenu
              label="Admissions"
              items={menuItems.admissions}
              isActive={isActive('/admissions')}
            />
            <DropdownMenu
              label="Academics"
              items={menuItems.academics}
              isActive={isActive('/academics')}
            />
            <DropdownMenu
              label="Student Life"
              items={menuItems.studentLife}
              isActive={isActive('/student-life') || isActive('/boarding') || isActive('/wellness')}
            />
            <DropdownMenu
              label="Community"
              items={menuItems.community}
              isActive={isActive('/news') || isActive('/alumni') || isActive('/support')}
            />
          </nav>

          <div className="flex gap-3">
            <Link
              href="/portal"
              className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white border-2 border-brand-navy text-brand-navy text-sm font-bold hover:bg-brand-navy hover:text-white transition-colors"
            >
              <span className="truncate">Portal Login</span>
            </Link>
            <Link
              href="/admissions"
              className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-brand-gold text-brand-navy text-sm font-bold shadow-md hover:bg-brand-gold-dark transition-colors"
            >
              <span className="truncate">Apply Now</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined cursor-pointer text-brand-navy">
            menu
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4">
            {Object.entries(menuItems).map(([key, items]) => (
              <div key={key} className="border-b border-gray-100 last:border-0">
                <div className="py-3 text-sm font-bold text-brand-navy uppercase tracking-wider">
                  {key === 'studentLife' ? 'Student Life' : key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className="flex flex-col pb-3">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2 text-sm text-gray-700 hover:text-brand-gold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200">
              <Link
                href="/student"
                className="flex items-center justify-center rounded-lg h-10 px-5 bg-white border-2 border-brand-navy text-brand-navy text-sm font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Portal
              </Link>
              <Link
                href="/parent"
                className="flex items-center justify-center rounded-lg h-10 px-5 bg-white border-2 border-brand-navy text-brand-navy text-sm font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Parent Portal
              </Link>
              <Link
                href="/admissions/apply"
                className="flex items-center justify-center rounded-lg h-10 px-5 bg-brand-gold text-brand-navy text-sm font-bold shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

