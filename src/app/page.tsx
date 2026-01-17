'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Hero, 
  QuickHighlights 
} from '@/components/sections'
import { AppProvider } from "@/contexts/AppContext"
import { useAuth } from '@/contexts/AuthContext'
import BackToTop from '@/components/BackToTop'

const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false })
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false })

// Lazy load only what's needed on home
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

export default function Home() {
  const { user } = useAuth()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main id="main-content">
          {/* 1. HERO - First Impression */}
          <Hero />
          
          {/* 2. CHOOSE YOUR PATH - Interactive Journey Selector */}
          <section className="py-24 bg-gradient-to-b from-[#FFFDF7] via-white to-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1C1A75] mb-4">
                  Choose Your Journey
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore what matters most to you
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Path A: Academic Excellence */}
                <Link href="/academics" 
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1A75] to-[#2C2A95] p-10 cursor-pointer hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-[#1C1A75]/50"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/30 transition-colors">
                      <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Academic Excellence</h3>
                    <p className="text-white/80 mb-8 leading-relaxed">
                      Explore our curriculum, teaching methods, and academic achievements. Perfect for parents focused on educational outcomes.
                    </p>
                    <div className="flex items-center gap-2 text-[#D4AF37] font-semibold group-hover:gap-4 transition-all">
                      <span>Explore Academics</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Path B: Campus Life */}
                <div className="grid gap-4">
                  <Link href="/campus-life/sports" 
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#C8A74A] p-6 cursor-pointer hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-[#D4AF37]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 5.3L15.35 11H8.65L11 5.3M12 18.7L9.65 13H14.35L12 18.7Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[#1C1A75] mb-1">Sports & Activities</h4>
                        <p className="text-[#1C1A75]/70 text-sm">Excellence on the field →</p>
                      </div>
                    </div>
                  </Link>

                  <Link href="/campus-life/boarding" 
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2C2A95] to-[#1C1A75] p-6 cursor-pointer hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-[#1C1A75]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3L2 12H5V20H19V12H22L12 3M12 7.7L17 12.7V18H7V12.7L12 7.7Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-1">Boarding Life</h4>
                        <p className="text-white/70 text-sm">A home away from home →</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Quick Access Links */}
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Link href="/admissions"
                  className="px-6 py-3 rounded-lg bg-white border-2 border-[#1C1A75]/20 text-[#1C1A75] font-semibold hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                >
                  📝 Admissions
                </Link>
                <button
                  onClick={() => scrollToSection('news')}
                  className="px-6 py-3 rounded-lg bg-white border-2 border-[#1C1A75]/20 text-[#1C1A75] font-semibold hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                >
                  📰 Latest News
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 rounded-lg bg-white border-2 border-[#1C1A75]/20 text-[#1C1A75] font-semibold hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                >
                  💬 Contact Us
                </button>
              </div>
            </div>
          </section>

          {/* 3. QUICK HIGHLIGHTS - Key Stats */}
          <QuickHighlights />

          {/* 4. ABOUT - Who We Are */}
          <div className="bg-white">
            <AboutSection />
          </div>
          
          {/* Section Divider */}
          <div className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-center">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1C1A75]/20 to-transparent"></div>
                <div className="mx-4 h-3 w-3 rotate-45 bg-[#D4AF37]/30"></div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1C1A75]/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* ========== PATH A: ACADEMIC EXCELLENCE ========== */}
          <div id="academic-path" className="bg-white">
            
            {/* 5. ACADEMICS - Curriculum & Teaching */}
            <div className="bg-white">
              <AcademicsSection />
            </div>

            {/* 6. DATA - Performance Metrics */}
            <div className="bg-gradient-to-b from-white to-gray-50">
              {isAdmin ? (
                <DataVisualization />
              ) : (
                !loading && <AdminCTA />
              )}
            </div>

            {/* Academic Path Transition */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1A75] mb-3">Beyond the Classroom</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Holistic development through sports and boarding</p>
                <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#1C1A75] via-[#D4AF37] to-[#1C1A75]"></div>
              </div>
            </div>
          </div>

          {/* ========== PATH B: CAMPUS LIFE ========== */}
          <div id="campus-life-path">
            
            {/* 7. SPORTS - Athletics & Activities */}
            <div className="bg-white">
              <SportsHub />
            </div>

            {/* 8. BOARDING - Residential Life */}
            <div className="bg-gradient-to-b from-white to-gray-50">
              <BoardingSection />
            </div>

            {/* Campus Life Transition */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1A75] mb-3">What's Happening</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Stay connected with our community</p>
                <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#1C1A75] via-[#D4AF37] to-[#1C1A75]"></div>
              </div>
            </div>

            {/* 9. NEWS - Latest Updates */}
            <div className="bg-white">
              <NewsSection />
            </div>

            {/* 10. CALENDAR - Upcoming Events */}
            <div className="bg-gradient-to-b from-white to-gray-50">
              <EventCalendar />
            </div>
          </div>

          {/* ========== SHARED: JOIN US ========== */}
          <div className="py-20 bg-gradient-to-b from-gray-50 via-[#FFFDF7] to-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1A75] mb-3">Ready to Join Regisbridge?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Take the next step in your educational journey</p>
              <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#1C1A75] via-[#D4AF37] to-[#1C1A75]"></div>
            </div>
          </div>

          {/* 11. ADMISSIONS - Application Process */}
          <div className="bg-white">
            <AdmissionsSection />
          </div>
          
          {/* 12. FAQ - Common Questions */}
          <div className="bg-gray-50">
            <FAQSection />
          </div>

          {/* Final Section Divider */}
          <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1A75] mb-3">Get in Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We're here to answer your questions</p>
              <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#1C1A75] via-[#D4AF37] to-[#1C1A75]"></div>
            </div>
          </div>

          {/* 13. CONTACT - Reach Out */}
          <div className="bg-gradient-to-b from-white to-gray-50">
            <ContactSection />
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </AppProvider>
  )
}
