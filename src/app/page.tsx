'use client';

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
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import { AppProvider } from "@/contexts/AppContext"

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main id="main-content">
          <Hero />
          <QuickHighlights />
          <AboutSection />
          <AcademicsSection />
          <BoardingSection />
          <SportsHub />
          <AdmissionsSection />
          <EventCalendar />
          <NewsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
