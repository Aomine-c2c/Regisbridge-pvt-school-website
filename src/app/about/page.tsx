'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';

/**
 * About Page - Our Institution
 * Based on about_our_institution_1 template
 * 
 * Sections:
 * 1. Hero - Legacy of Excellence
 * 2. Stats Strip (Founded, Pass Rate, Boarders, Campus Size)
 * 3. Mission, Vision & Values
 * 4. Heritage Timeline
 * 5. Leadership Team
 * 6. CTA Section 
 */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Simplified Header - will integrate with existing later */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-10 py-4 max-w-[1280px] mx-auto w-full">
          <div className="flex items-center gap-4 text-text-dark dark:text-white">
            <MaterialIcon icon="school" size="4xl" className="text-design-primary" />
            <h2 className="text-lg font-bold">Regisbridge Academy</h2>
          </div>
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-9">
              <Link href="/page-new" className="text-sm font-medium hover:text-design-primary transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium text-design-primary font-bold">About Us</Link>
              <Link href="#" className="text-sm font-medium hover:text-design-primary transition-colors">Admissions</Link>
              <Link href="#" className="text-sm font-medium hover:text-design-primary transition-colors">Academics</Link>
              <Link href="#" className="text-sm font-medium hover:text-design-primary transition-colors">Boarding</Link>
              <Link href="#" className="text-sm font-medium hover:text-design-primary transition-colors">Contact</Link>
            </nav>
            <Link href="/admissions" className="h-10 px-6 bg-design-primary hover:bg-design-primary-dark text-white rounded-lg font-bold transition-colors flex items-center">
              Apply Now
            </Link>
          </div>
          <div className="lg:hidden">
            <MaterialIcon icon="menu" className="cursor-pointer" />
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO SECTION */}
        <section className="w-full bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-12 lg:py-20">
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              {/* Content */}
              <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
                <div className="flex flex-col gap-4">
                  <span className="text-[#D4AF37] font-bold tracking-wider uppercase text-sm">Est. 1974</span>
                  <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-text-dark dark:text-white">
                    A Legacy of <span className="text-design-primary relative inline-block">Excellence
                      <span className="absolute bottom-1 left-0 w-full h-2 bg-[#D4AF37]/20 -z-10"></span>
                    </span>
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Welcome to Regisbridge Academy. For nearly 50 years, we have nurtured future leaders through a unique blend of academic rigor, character development, and world-class boarding facilities.
                  </p>
                </div>
                <div className="flex gap-4 justify-center lg:justify-start pt-4">
                  <button className="h-12 px-8 bg-design-primary hover:bg-design-primary-dark text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl">
                    Headmaster's Welcome
                  </button>
                  <button className="h-12 px-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-text-dark dark:text-white rounded-lg font-bold transition-all flex items-center gap-2 group">
                    <span>Virtual Tour</span>
                    <MaterialIcon icon="arrow_forward" className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" size="sm" />
                  </button>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <div className="absolute inset-0 bg-design-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/media/campus-building.jpg")' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATS STRIP */}
        <section className="bg-design-primary py-12 text-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black text-[#D4AF37]">1974</span>
                <span className="text-sm font-medium uppercase tracking-wider opacity-80">Founded</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black text-[#D4AF37]">100%</span>
                <span className="text-sm font-medium uppercase tracking-wider opacity-80">Pass Rate</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black text-[#D4AF37]">300+</span>
                <span className="text-sm font-medium uppercase tracking-wider opacity-80">Boarders</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl lg:text-5xl font-black text-[#D4AF37]">50+</span>
                <span className="text-sm font-medium uppercase tracking-wider opacity-80">Acres of Campus</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MISSION, VISION & VALUES */}
        <section className="py-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-16">
              <h2 className="text-[#D4AF37] font-bold uppercase tracking-wider text-sm mb-3">Our Guiding Principles</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-white">Mission, Vision & Values</h3>
              <div className="w-20 h-1 bg-design-primary mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mission Card */}
              <div className="p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-design-primary to-[#D4AF37]"></div>
                <div className="mb-6 w-14 h-14 rounded-full bg-design-primary/10 flex items-center justify-center text-design-primary group-hover:bg-design-primary group-hover:text-white transition-colors">
                  <MaterialIcon icon="lightbulb" size="lg" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-text-dark dark:text-white">Our Mission</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  To empower young minds with critical thinking skills and moral integrity necessary to thrive in a global society, fostering a lifelong love for learning.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-design-primary to-[#D4AF37]"></div>
                <div className="mb-6 w-14 h-14 rounded-full bg-design-primary/10 flex items-center justify-center text-design-primary group-hover:bg-design-primary group-hover:text-white transition-colors">
                  <MaterialIcon icon="public" size="lg" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-text-dark dark:text-white">Our Vision</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  To be the premier institution in the region, recognized globally for academic excellence, holistic development, and producing compassionate leaders.
                </p>
              </div>

              {/* Values Card */}
              <div className="p-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-design-primary to-[#D4AF37]"></div>
                <div className="mb-6 w-14 h-14 rounded-full bg-design-primary/10 flex items-center justify-center text-design-primary group-hover:bg-design-primary group-hover:text-white transition-colors">
                  <MaterialIcon icon="diamond" size="lg" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-text-dark dark:text-white">Our Values</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We are guided by Integrity, Discipline, Compassion, and Excellence. These pillars support every aspect of student life and our community interactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HERITAGE TIMELINE */}
        <section className="py-20 bg-slate-50 dark:bg-[#0d121c] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 dark:from-slate-900/50 to-transparent pointer-events-none"></div>
          
          <div className="max-w-[960px] mx-auto px-4 sm:px-10 relative z-10">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left Column - Header & Image */}
              <div className="md:w-1/3">
                <h2 className="text-[#D4AF37] font-bold uppercase tracking-wider text-sm mb-3">Our Heritage</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-white mb-6">A History of Distinction</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  From our humble beginnings to becoming a leading educational institution, our journey has been defined by a commitment to growth and excellence.
                </p>
                <div 
                  className="hidden md:block w-full h-64 rounded-lg bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: 'url("/media/heritage-photo.jpg")' }}
                />
              </div>

              {/* Right Column - Timeline */}
              <div className="md:w-2/3 pl-0 md:pl-8">
                <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-12">
                  {/* 1975 */}
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white dark:border-background-dark shadow-sm"></div>
                    <span className="text-design-primary font-bold text-lg block mb-1">1974</span>
                    <h4 className="text-xl font-bold text-text-dark dark:text-white mb-2">Foundation Established</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Regisbridge Academy opened its doors with just 50 students and 5 teachers, driven by a vision to provide quality education in the region.
                    </p>
                  </div>

                  {/* 1990 */}
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-background-dark border-2 border-design-primary"></div>
                    <span className="text-design-primary font-bold text-lg block mb-1">1990</span>
                    <h4 className="text-xl font-bold text-text-dark dark:text-white mb-2">Boarding Facilities Opened</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      To accommodate students from across the country, we inaugurated our first boarding house, fostering a diverse and inclusive community.
                    </p>
                  </div>

                  {/* 2010 */}
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-background-dark border-2 border-design-primary"></div>
                    <span className="text-design-primary font-bold text-lg block mb-1">2010</span>
                    <h4 className="text-xl font-bold text-text-dark dark:text-white mb-2">A-Level Program Launch</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Expanding our academic offerings, we introduced the Advanced Level curriculum, paving the way for our graduates to enter top global universities.
                    </p>
                  </div>

                  {/* 2023 */}
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-background-dark border-2 border-design-primary"></div>
                    <span className="text-design-primary font-bold text-lg block mb-1">2023</span>
                    <h4 className="text-xl font-bold text-text-dark dark:text-white mb-2">Innovation Hub & Future Wings</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Embracing the future, we launched a state-of-the-art STEM center and Innovation Hub, ensuring our students are ready for the digital age.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LEADERSHIP SECTION */}
        <section className="py-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-16">
              <h2 className="text-[#D4AF37] font-bold uppercase tracking-wider text-sm mb-3">Our Leadership</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-white">Guided by Excellence</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                Our institution is led by a team of dedicated professionals committed to the holistic development of every student.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Headmaster */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-slate-100 dark:border-slate-800 group-hover:border-[#D4AF37] transition-colors shadow-lg">
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                </div>
                <h4 className="text-xl font-bold text-text-dark dark:text-white">Dr. James Sterling</h4>
                <span className="text-design-primary font-medium mb-2">Headmaster</span>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
                  Leading with 20+ years of experience in international education.
                </p>
              </div>

              {/* Board Members */}
              {['Sarah Jenkins - Chair of the Board', 'Michael Chen - Board Governor', 'Elena Rodriguez - Board Governor'].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-slate-100 dark:border-slate-800 group-hover:border-design-primary/50 transition-colors">
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <h4 className="text-lg font-bold text-text-dark dark:text-white">{member.split(' - ')[0]}</h4>
                  <span className="text-slate-500 dark:text-slate-400 font-medium mb-1 text-sm">{member.split(' - ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA SECTION */}
        <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Join the Regisbridge Family</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Experience an education that goes beyond the classroom. Applications for the next academic year are now open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admissions" className="h-14 px-10 bg-design-primary hover:bg-design-primary-dark text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-design-primary/50 flex items-center justify-center">
                Apply for Admission
              </Link>
              <button className="h-14 px-10 bg-transparent border-2 border-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-white rounded-lg font-bold text-lg transition-all">
                Download Prospectus
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Simplified */}
      <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MaterialIcon icon="school" className="text-design-primary" size="lg" />
                <span className="font-bold text-lg">Regisbridge Academy</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Nurturing excellence since 1974. A place where tradition meets innovation.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="/about" className="hover:text-design-primary">About Us</Link></li>
                <li><Link href="/admissions" className="hover:text-design-primary">Admissions</Link></li>
                <li><Link href="/academics" className="hover:text-design-primary">Academics</Link></li>
                <li><Link href="/campus-life" className="hover:text-design-primary">Campus Life</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="location_on" className="text-[#D4AF37]" size="xs" />
                  123 Education Lane, Academic City
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon icon="phone" className="text-[#D4AF37]" size="xs" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon icon="email" className="text-[#D4AF37]" size="xs" />
                  admissions@regisbridge.edu
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Subscribe to get the latest news and updates.</p>
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-design-primary" 
                  placeholder="Your email" 
                  type="email"
                />
                <button className="bg-design-primary text-white rounded-lg px-3 py-2 text-sm hover:bg-design-primary-dark">Go</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2024 Regisbridge Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-200">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-200">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
