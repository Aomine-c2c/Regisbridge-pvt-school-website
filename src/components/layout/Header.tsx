'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X, Search, LogIn, LogOut, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
// import { ThemeToggle } from '@/components/ui/ThemeToggle'
// import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useAuth } from '@/contexts/AuthContext'
import { scrollToSection } from '@/utils/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()
  const isAuthenticated = !!user

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  // use guarded scroll helper from utils/navigation
  const goToSection = (id: string) => {
    scrollToSection(id)
    setIsMenuOpen(false)
  }

  const mainMenuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
  ]

  const isAdmin = user?.role === 'admin'

  const academicItems = [
    { label: 'Academics', id: 'academics' },
    // Dashboard is admin-only — only include for admin/superadmin users
    ...(isAdmin ? [{ label: 'Dashboard', id: 'data-visualization' }] : []),
    { label: 'Boarding', id: 'boarding' },
    { label: 'Sports', id: 'sports' },
  ]

  const admissionsItems = [
    { label: 'Admissions', id: 'admissions' },
    { label: 'Apply', id: 'application' },
  ]

  const resourcesItems = [
    { label: 'Calendar', id: 'calendar' },
    { label: 'News', id: 'news' },
    { label: 'Contact', id: 'contact' },
  ]

  const allMenuItems = [
    ...mainMenuItems,
    ...academicItems,
    ...admissionsItems,
    { label: 'Portal', id: 'portal' },
    ...resourcesItems,
  ]

  return (
    <header
      className="bg-[#1C1A75] text-white sticky top-0 z-50 shadow-lg"
      role="banner"
      aria-label="Main site header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-md"
              aria-hidden="true"
            >
              <Image
                src="/logo.png"
                alt="Regisbridge logo"
                width={56}
                height={56}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-xl lg:text-2xl animate-fade-in leading-tight" tabIndex={0}>
                Regisbridge Private School
              </h1>
              <p
                className="text-sm text-[#D4AF37] animate-fade-in mt-0.5"
                style={{ animationDelay: '0.2s' }}
                tabIndex={0}
              >
                Supervincimus
              </p>
            </div>
            <div className="md:hidden">
              <h1 className="font-bold text-lg animate-fade-in leading-tight" tabIndex={0}>
                Regisbridge
              </h1>
              <p
                className="text-xs text-[#D4AF37] animate-fade-in mt-0.5"
                style={{ animationDelay: '0.2s' }}
                tabIndex={0}
              >
                School
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-5 flex-1" role="navigation" aria-label="Main navigation">
            {/* Home & About */}
            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
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
                    onClick={() => goToSection(item.id)}
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
                    onClick={() => goToSection(item.id)}
                    className="hover:bg-white/10 hover:text-[#D4AF37] cursor-pointer focus:bg-white/10 focus:text-[#D4AF37]"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Portal Link */}
            <Link
              href="/portal"
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
                    onClick={() => goToSection(item.id)}
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

          {/* Auth Buttons */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-white/10 rounded-lg">
                <User size={16} />
                <span className="font-medium">{user.firstName}</span>
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
              onClick={() => router.push('/login')}
              variant="outline"
              size="sm"
              className="hidden md:flex text-white border-white hover:bg-white hover:text-[#1C1A75] transition-all"
            >
              <LogIn size={16} className="mr-1.5" />
              Login
            </Button>
          )}

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
              onClick={() => goToSection(item.id)}
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
                onClick={() => goToSection(item.id)}
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
                onClick={() => goToSection(item.id)}
                className="block w-full text-left py-3 px-6 hover:bg-white/10 hover:text-[#D4AF37] rounded-lg transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Portal */}
          <Link
            href="/portal"
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
                onClick={() => goToSection(item.id)}
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
                router.push('/login')
                setIsMenuOpen(false)
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
                  const query = searchQuery.toLowerCase()

                  if (query.includes('about') || query.includes('mission') || query.includes('vision')) {
                    scrollToSection('about')
                  } else if (query.includes('academic') || query.includes('subject') || query.includes('learn')) {
                    scrollToSection('academics')
                  } else if (query.includes('board') || query.includes('live') || query.includes('residence')) {
                    scrollToSection('boarding')
                  } else if (query.includes('admission') || query.includes('apply') || query.includes('join')) {
                    scrollToSection('admissions')
                  } else if (query.includes('news') || query.includes('event') || query.includes('update')) {
                    scrollToSection('news')
                  } else if (query.includes('contact') || query.includes('phone') || query.includes('email')) {
                    scrollToSection('contact')
                  }
                }
                setIsSearchOpen(false)
                setSearchQuery('')
              }}
              className="px-4 py-2 bg-[#D4AF37] text-[#1C1A75] rounded-r-lg hover:bg-white transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

