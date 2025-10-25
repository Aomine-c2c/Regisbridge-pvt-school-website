import React from 'react';
import Header from './Header';
import Hero from './Hero';
import QuickHighlights from './QuickHighlights';
import AboutSection from './AboutSection';
import AcademicsSection from './AcademicsSection';
import BoardingSection from './BoardingSection';
import SportsHub from './SportsHub';
import AdmissionsSection from './AdmissionsSection';
import OnlineApplication from './OnlineApplication';
import EventCalendar from './EventCalendar';
import NewsSection from './NewsSection';
import StudentPortal from './StudentPortal';
import FinancialPortal from './FinancialPortal';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function AppLayout() {
  return (
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
  );
}
