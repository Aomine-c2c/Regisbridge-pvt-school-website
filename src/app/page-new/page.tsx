'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MaterialIcon } from '@/components/ui/material-icon';
import { StatCard } from '@/components/ui/stat-card';
import { BadgeNew } from '@/components/ui/badge-new';

/**
 * New Homepage Design
 * Based on premium_school_homepage_1 template
 * 
 * Sections:
 * 1. Hero with background image
 * 2. Stats (4 key metrics)
 * 3. Academic Pathways (3 program cards)
 * 4. Boarding Life feature (dark section)
 * 5. Latest News (3 news items)
 * 6. Testimonials (3 testimonials)
 * 7. CTA Strip
 */

export default function NewHomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Navigation - Using simplified version, will integrate with existing Header later */}
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 lg:px-20 py-4 max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="size-10 text-design-primary">
              <MaterialIcon icon="school" size="4xl" />
            </div>
            <h2 className="text-text-dark dark:text-white text-xl font-bold leading-tight tracking-tight">
              Regisbridge Academy
            </h2>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-8">
              <Link href="/admissions" className="text-text-dark dark:text-gray-200 text-sm font-medium hover:text-design-primary transition-colors">
                Admissions
              </Link>
              <Link href="/academics" className="text-text-dark dark:text-gray-200 text-sm font-medium hover:text-design-primary transition-colors">
                Academics
              </Link>
              <Link href="/boarding" className="text-text-dark dark:text-gray-200 text-sm font-medium hover:text-design-primary transition-colors">
                Boarding
              </Link>
              <Link href="/student-life" className="text-text-dark dark:text-gray-200 text-sm font-medium hover:text-design-primary transition-colors">
                Campus Life
              </Link>
            </nav>
            <div className="flex gap-3">
              <Link href="/portal" className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-dark dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Portal Login
              </Link>
              <Link href="/admissions" className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-design-primary text-white text-sm font-bold shadow-md hover:bg-design-primary-dark transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <MaterialIcon icon="menu" className="cursor-pointer text-text-dark dark:text-white" />
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO SECTION */}
        <div className="relative w-full">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/media/campus-hero.jpg")',
              }}
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] px-6 py-20 text-center max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-6 max-w-3xl">
              <span className="text-white/90 font-medium tracking-widest text-sm uppercase">
                Est. 1974
              </span>
              <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                Excellence in Education. Character for Life.
              </h1>
              <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                Nurturing future leaders from Early Childhood through A-Level in a world-class boarding environment. Experience the Regisbridge difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <Link href="/admissions" className="flex items-center justify-center rounded-lg h-12 px-8 bg-design-primary text-white text-base font-bold shadow-lg hover:bg-design-primary-dark hover:-translate-y-0.5 transition-all">
                  Apply Now
                </Link>
                <Link href="/contact" className="flex items-center justify-center rounded-lg h-12 px-8 bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold hover:bg-white/20 transition-all">
                  Book a Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS SECTION */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                icon="school"
                value="100%"
                label="Pass Rate"
              />
              <StatCard
                icon="groups"
                value="1:10"
                label="Teacher Ratio"
              />
              <StatCard
                icon="history_edu"
                value="98%"
                label="Uni Acceptance"
              />
              <StatCard
                icon="verified"
                value="50+"
                label="Years of Excellence"
              />
            </div>
          </div>
        </div>

        {/* 3. ACADEMIC PATHWAYS SECTION */}
        <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-text-dark dark:text-white leading-tight">
                Academic Pathways
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                Comprehensive curriculum tailored for every stage of development.
              </p>
            </div>
            <Link href="/academics" className="text-design-primary font-bold flex items-center hover:underline">
              View Full Curriculum 
              <MaterialIcon icon="arrow_forward" className="text-sm ml-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {/* Pathway Card 1 - ECD */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/media/ecd-program.jpg")' }}
                  />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeNew variant="primary">Ages 3-5</BadgeNew>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-3">
                    Early Childhood Development
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Our ECD program nurtures curiosity and creativity through play-based learning. We focus on social-emotional growth, laying a strong foundation for future academic success in a warm, caring environment.
                  </p>
                  <button className="self-start text-design-primary font-bold text-sm uppercase tracking-wide flex items-center group-hover:translate-x-1 transition-transform">
                    Explore ECD 
                    <MaterialIcon icon="chevron_right" className="text-base ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pathway Card 2 - Primary */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/media/primary-school.jpg")' }}
                  />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeNew variant="primary">Ages 6-12</BadgeNew>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-3">
                    Primary School
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Building core competencies in literacy, numeracy, and critical thinking. Our primary curriculum encourages students to ask questions, solve problems, and develop a lifelong love for learning.
                  </p>
                  <button className="self-start text-design-primary font-bold text-sm uppercase tracking-wide flex items-center group-hover:translate-x-1 transition-transform">
                    Explore Primary 
                    <MaterialIcon icon="chevron_right" className="text-base ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pathway Card 3 - High School */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/media/high-school.jpg")' }}
                  />
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeNew variant="primary">Ages 13-18</BadgeNew>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-3">
                    High School & A-Level
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Preparing young adults for top-tier universities and leadership roles. Our rigorous academic program is complemented by sports, arts, and service, shaping well-rounded global citizens.
                  </p>
                  <button className="self-start text-design-primary font-bold text-sm uppercase tracking-wide flex items-center group-hover:translate-x-1 transition-transform">
                    Explore High School 
                    <MaterialIcon icon="chevron_right" className="text-base ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BOARDING LIFE SECTION */}
        <section className="bg-background-dark text-white py-20 relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-design-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto px-6 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-design-primary font-bold tracking-widest uppercase mb-4 block">
                  Boarding Life
                </span>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  A Home Away From Home
                </h2>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Our boarding facilities offer a safe, supportive, and enriching environment where students learn independence and camaraderie. With modern dormitories, dedicated house parents, and a weekend activity schedule, boarders forge friendships that last a lifetime.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <MaterialIcon icon="check_circle" className="text-design-primary" />
                    <span className="text-gray-200">Modern, secure accommodation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MaterialIcon icon="check_circle" className="text-design-primary" />
                    <span className="text-gray-200">24/7 mentorship and pastoral care</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MaterialIcon icon="check_circle" className="text-design-primary" />
                    <span className="text-gray-200">Structured academic study hours</span>
                  </li>
                </ul>
                <Link href="/boarding" className="flex items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white text-text-dark text-sm font-bold hover:bg-gray-200 transition-colors w-fit">
                  Discover Boarding
                </Link>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10">
                  <div 
                    className="aspect-[4/3] bg-cover bg-center"
                    style={{ backgroundImage: 'url("/media/boarding-life.jpg")' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LATEST NEWS SECTION */}
        <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto w-full bg-white dark:bg-gray-900 my-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-dark dark:text-white">
              Latest News
            </h2>
            <Link href="/news" className="text-design-primary text-sm font-bold hover:underline">
              View All News
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <div className="rounded-xl overflow-hidden aspect-video relative">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: 'url("/media/news-sports.jpg")' }}
                />
                <div className="absolute bottom-2 left-2">
                  <BadgeNew variant="primary" size="sm">Sports</BadgeNew>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                October 24, 2023
              </p>
              <h3 className="text-lg font-bold text-text-dark dark:text-white leading-snug group-hover:text-design-primary transition-colors">
                Rugby First XV Wins National Championship
              </h3>
            </div>

            {/* News Item 2 */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <div className="rounded-xl overflow-hidden aspect-video relative">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: 'url("/media/news-robotics.jpg")' }}
                />
                <div className="absolute bottom-2 left-2">
                  <BadgeNew variant="purple" size="sm">Academics</BadgeNew>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                October 18, 2023
              </p>
              <h3 className="text-lg font-bold text-text-dark dark:text-white leading-snug group-hover:text-design-primary transition-colors">
                Robotics Team Qualifies for Worlds
              </h3>
            </div>

            {/* News Item 3 */}
            <div className="flex flex-col gap-3 group cursor-pointer">
              <div className="rounded-xl overflow-hidden aspect-video relative">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: 'url("/media/news-concert.jpg")' }}
                />
                <div className="absolute bottom-2 left-2">
                  <BadgeNew variant="amber" size="sm">Arts</BadgeNew>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                October 10, 2023
              </p>
              <h3 className="text-lg font-bold text-text-dark dark:text-white leading-snug group-hover:text-design-primary transition-colors">
                Annual Winter Concert Dates Announced
              </h3>
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS SECTION */}
        <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto w-full">
          <h2 className="text-center text-3xl font-bold text-text-dark dark:text-white mb-12">
            From Our Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
              <MaterialIcon 
                icon="format_quote" 
                className="absolute top-6 right-6 text-gray-200 dark:text-gray-700 text-6xl select-none" 
              />
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                "The academic rigor combined with the supportive environment has truly transformed our son. He is confident, articulate, and ready for university."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url("/media/parent-avatar.jpg")' }}
                  />
                </div>
                <div>
                  <p className="font-bold text-text-dark dark:text-white text-sm">
                    Sarah Jenkins
                  </p>
                  <p className="text-gray-400 text-xs">Parent, Class of '24</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
              <MaterialIcon 
                icon="format_quote" 
                className="absolute top-6 right-6 text-gray-200 dark:text-gray-700 text-6xl select-none" 
              />
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                "Boarding at Regisbridge was the best decision of my life. The friendships I made here are like family to me now."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url("/media/alumni-avatar.jpg")' }}
                  />
                </div>
                <div>
                  <p className="font-bold text-text-dark dark:text-white text-sm">
                    Michael Chang
                  </p>
                  <p className="text-gray-400 text-xs">Alumni, Class of '18</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
              <MaterialIcon 
                icon="format_quote" 
                className="absolute top-6 right-6 text-gray-200 dark:text-gray-700 text-6xl select-none" 
              />
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10">
                "We focus on the whole child. It's not just about grades, but about character, integrity, and contribution to society."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url("/media/headmaster-avatar.jpg")' }}
                  />
                </div>
                <div>
                  <p className="font-bold text-text-dark dark:text-white text-sm">
                    Dr. Eleanor Rigby
                  </p>
                  <p className="text-gray-400 text-xs">Head of School</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA STRIP */}
        <section className="bg-design-primary py-16 px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            Applications for the next academic year are now open. Secure your child's place at Regisbridge Academy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admissions" className="bg-white text-design-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Apply Now
            </Link>
            <Link href="/contact" className="bg-design-primary border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-design-primary-dark transition-colors">
              Contact Admissions
            </Link>
          </div>
        </section>
      </main>

      {/* Footer - Simplified for now, will integrate with existing Footer component */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon icon="school" className="text-design-primary text-3xl" />
                <span className="font-bold text-lg text-text-dark dark:text-white">
                  Regisbridge
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Empowering students to achieve academic excellence and personal growth since 1974.
              </p>
              <div className="flex gap-4">
                <div className="size-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-design-primary hover:text-white transition-colors cursor-pointer">
                  <span className="text-xs font-bold">FB</span>
                </div>
                <div className="size-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-design-primary hover:text-white transition-colors cursor-pointer">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="size-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-design-primary hover:text-white transition-colors cursor-pointer">
                  <span className="text-xs font-bold">LN</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-text-dark dark:text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">About Us</Link></li>
                <li><Link href="/admissions" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">Admissions</Link></li>
                <li><Link href="/academics" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">Curriculum</Link></li>
                <li><Link href="/careers" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-text-dark dark:text-white mb-6">Community</h4>
              <ul className="space-y-3">
                <li><Link href="/news" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">News & Events</Link></li>
                <li><Link href="/alumni" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">Alumni Network</Link></li>
                <li><Link href="/parent" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">Parent Portal</Link></li>
                <li><Link href="/teacher" className="text-gray-500 dark:text-gray-400 text-sm hover:text-design-primary transition-colors">Staff Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-text-dark dark:text-white mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MaterialIcon icon="location_on" className="text-design-primary text-sm mt-0.5" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    123 Academic Avenue, Scholars District, Cityville
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <MaterialIcon icon="call" className="text-design-primary text-sm" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    +1 (555) 123-4567
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <MaterialIcon icon="mail" className="text-design-primary text-sm" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    admissions@regisbridge.edu
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Regisbridge Academy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 text-xs hover:text-gray-600 dark:hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 text-xs hover:text-gray-600 dark:hover:text-gray-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
