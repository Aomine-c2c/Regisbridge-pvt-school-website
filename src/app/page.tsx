'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import QuickHighlights from "@/components/QuickHighlights"
import AboutSection from "@/components/AboutSection"
import AcademicsSection from "@/components/AcademicsSection"
import BoardingSection from "@/components/BoardingSection"
import SportsHub from "@/components/SportsHub"
import AdmissionsSection from "@/components/AdmissionsSection"
import EventCalendar from "@/components/EventCalendar"
import NewsSection from "@/components/NewsSection"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import { AppProvider } from "@/contexts/AppContext"
import { useAuth } from '@/contexts/AuthContext'

// Lazy load heavy components to reduce initial bundle size
const DataVisualization = dynamic(() => import('@/components/DataVisualization'), {
  loading: () => (
    <div className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

// Memoize admin CTA to prevent unnecessary re-renders
const AdminCTA = memo(function AdminCTA() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold">School Insights</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            A simplified summary of performance is available publicly. Detailed analytics and dashboards are restricted to authorized staff. Please
            <a href="/login" className="ml-1 text-[#1C1A75] font-medium">sign in</a> if you have administrator access.
          </p>
        </div>
      </div>
    </section>
  )
});

export default function Home() {
  const { user, isLoading } = useAuth()
  const isAdmin = !!user && (user.role === 'admin' || user.role === 'superadmin')

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main id="main-content">
          <Hero />
          <QuickHighlights />
          <AboutSection />
          <AcademicsSection />

          {/* Data visualization is admin-only. Non-admin visitors see a brief CTA to sign in. */}
          {isAdmin ? (
            <DataVisualization />
          ) : (
            !isLoading && <AdminCTA />
          )}

          <BoardingSection />
          <SportsHub />
          <AdmissionsSection />
          <FAQSection />
          <EventCalendar />
          <NewsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
