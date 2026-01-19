'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import SkipToContent from '@/components/SkipToContent';
import StatCard from '@/components/home/StatCard';
import PathwayCard from '@/components/home/PathwayCard';
import NewsCarousel from '@/components/home/NewsCarousel';
import TestimonialCard from '@/components/home/TestimonialCard';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import FAQSection from '@/components/home/FAQSection';
import VirtualTour from '@/components/home/VirtualTour';
import FeeCalculator from '@/components/home/FeeCalculator';
import EventsCalendar from '@/components/home/EventsCalendar';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { trackCTAClick } from '@/lib/analytics';
import Link from 'next/link';
import Image from 'next/image';

const STATS = [
  { icon: 'school', value: '100%', label: 'Pass Rate' },
  { icon: 'groups', value: '1:10', label: 'Teacher Ratio' },
  { icon: 'history_edu', value: '98%', label: 'Uni Acceptance' },
  { icon: 'verified', value: '50+', label: 'Years of Excellence' },
];

const PATHWAYS = [
  {
    id: 'ecd',
    badge: 'Ages 3-5',
    title: 'Early Childhood Development',
    description: 'Nurturing young minds through play-based learning. Our ECD program focuses on social-emotional growth, creativity, and foundational skills in a safe, engaging environment.',
    image: '/34.jpg',
    imageAlt: 'Young children engaged in hands-on learning activities',
    link: '/academics#ecd',
    linkText: 'Explore ECD',
  },
  {
    id: 'primary',
    badge: 'Ages 6-12',
    title: 'Primary School',
    description: 'Building core competencies in literacy, numeracy, and critical thinking. Our primary curriculum encourages students to ask questions, solve problems, and develop a lifelong love for learning.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    imageAlt: 'Primary school students working together in a bright classroom',
    link: '/academics#primary',
    linkText: 'Explore Primary',
  },
  {
    id: 'secondary',
    badge: 'Ages 13-18',
    title: 'High School & A-Level',
    description: 'Preparing young adults for top-tier universities and leadership roles. Our rigorous academic program is complemented by sports, arts, and service, shaping well-rounded global citizens.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    imageAlt: 'High school students collaborating in a modern learning environment',
    link: '/academics#secondary',
    linkText: 'Explore High School',
  },
];

const NEWS_ITEMS = [
  {
    href: '/news/rugby-championship',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600',
    imageAlt: 'Rugby team celebrating championship victory',
    category: 'Sports',
    categoryColor: 'blue' as const,
    date: '2026-01-15',
    title: 'Rugby First XV Wins National Championship',
  },
  {
    href: '/news/robotics-worlds',
    image: 'https://images.unsplash.com/photo-1563191599-47f0930f32c1?w=600',
    imageAlt: 'Students working on advanced robotics project',
    category: 'Academics',
    categoryColor: 'purple' as const,
    date: '2026-01-10',
    title: 'Robotics Team Qualifies for Worlds',
  },
  {
    href: '/news/winter-concert',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    imageAlt: 'Students performing at the winter concert',
    category: 'Arts',
    categoryColor: 'amber' as const,
    date: '2026-01-05',
    title: 'Annual Winter Concert Dates Announced',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The academic rigor combined with the supportive environment has truly transformed our son. He is confident, articulate, and ready for university.',
    name: 'Sarah Jenkins',
    role: 'Parent, Class of \'24',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    quote: 'Boarding at Regisbridge was the best decision of my life. The friendships I made here are like family to me now.',
    name: 'Michael Chang',
    role: 'Alumni, Class of \'18',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    quote: 'We focus on the whole child. It\'s not just about grades, but about character, integrity, and contribution to society.',
    name: 'Dr. Eleanor Rigby',
    role: 'Head of School',
    avatar: 'https://i.pravatar.cc/150?img=49',
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <SkipToContent />
      {/* Navigation */}
      <PremiumHeader />

      <main id="main-content" role="main">
      {/* Hero Section */}
      <section aria-label="Hero" className="relative w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hr.jpg"
            alt="Regisbridge Academy campus aerial view"
            fill
            priority
            className="object-cover blur-[2px]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 dark:from-black/60 dark:to-black/80" />
        </div>
        
        {/* Decorative blur circles */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] px-6 py-20 text-center max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-6 max-w-3xl">
            <p className="text-white/90 font-medium tracking-widest text-sm uppercase">
              Est. <time dateTime="1974">1974</time>
            </p>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Regisbridge Academy: Excellence in Education. Character for Life.
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
              Nurturing future leaders from Early Childhood through A-Level in a world-class boarding
              environment. Experience the Regisbridge difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <Link
                href="/admissions"
                onClick={() => trackCTAClick('Apply Now', 'Hero')}
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-brand-gold text-brand-navy text-base font-bold shadow-lg hover:bg-brand-gold-dark hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 transition-all"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                onClick={() => trackCTAClick('Book a Tour', 'Hero')}
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all"
              >
                Book a Tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" aria-label="Key Statistics" className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Academic Pathways */}
      <section id="academic-pathways" aria-label="Academic Programs" className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <ScrollReveal animation="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Academic Pathways
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                Comprehensive curriculum tailored for every stage of development.
              </p>
            </div>
            <Link
              href="/academics"
              className="text-brand-primary font-bold flex items-center gap-1 hover:underline hover:text-brand-primary-dark transition-colors"
            >
              View Full Curriculum <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Pathway Cards */}
        <ul className="flex flex-col gap-6" role="list">
          {PATHWAYS.map((pathway, index) => (
            <li key={pathway.id}>
              <ScrollReveal animation="fadeInUp" delay={index * 150}>
                <PathwayCard {...pathway} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Boarding Feature Section */}
      <section id="boarding" aria-label="Boarding Life" className="bg-brand-navy text-white py-20 relative overflow-hidden">
        {/* Decorative blur effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <ScrollReveal animation="fadeInLeft">
                <span className="text-brand-gold font-bold tracking-widest uppercase mb-4 block">
                  Boarding Life
                </span>
                <h2 className="text-4xl font-bold mb-6 leading-tight">A Home Away From Home</h2>
              <p className="text-gray-100 mb-6 text-lg leading-relaxed">
                Our boarding facilities offer a safe, supportive, and enriching environment where
                students learn independence and camaraderie. With modern dormitories, dedicated house
                parents, and a weekend activity schedule, boarders forge friendships that last a
                lifetime.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">check_circle</span>
                  <span className="text-gray-100">Modern, secure accommodation</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">check_circle</span>
                  <span className="text-gray-100">24/7 mentorship and pastoral care</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-gold" aria-hidden="true">check_circle</span>
                  <span className="text-gray-100">Structured academic study hours</span>
                </li>
              </ul>
              <Link
                href="/boarding"
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-brand-gold text-brand-navy text-sm font-bold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-navy transition-colors"
              >
                Discover Boarding
              </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal animation="fadeInRight" delay={200}>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10 relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  alt="Students engaged in boarding life activities"
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

{/* Latest News */}
      <section id="news" aria-label="Latest News" className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto bg-white my-12 rounded-3xl shadow-sm border border-gray-100">
        <ScrollReveal animation="fadeInUp">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
            <Link href="/news" className="text-brand-primary text-sm font-bold hover:underline hover:text-brand-primary-dark transition-colors">
              View All News
            </Link>
          </div>
        </ScrollReveal>
        <NewsCarousel items={NEWS_ITEMS} />
      </section>

      {/* Virtual Tour */}
      <VirtualTour />

      {/* Events Calendar */}
      <EventsCalendar />

      {/* Fee Calculator */}
      <FeeCalculator />

      {/* Testimonials */}
      <section id="testimonials" aria-label="Community Testimonials" className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <ScrollReveal animation="fadeInUp">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
            From Our Community
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <ScrollReveal key={index} animation="fadeInUp" delay={index * 150}>
              <TestimonialCard {...testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter Signup */}
      <section className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
        <ScrollReveal animation="fadeInUp">
          <NewsletterSignup />
        </ScrollReveal>
      </section>

      {/* CTA Strip */}
      <section id="cta" aria-label="Call to Action" className="bg-brand-navy py-16 px-6 text-center">
        <h2 className="text-white text-3xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
          Applications for the next academic year are now open. Secure your child's place at
          Regisbridge Academy.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/admissions"
            onClick={() => trackCTAClick('Apply Now', 'Footer CTA')}
            className="bg-brand-gold text-brand-navy px-8 py-3 rounded-lg font-bold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-navy transition-colors"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            onClick={() => trackCTAClick('Contact Admissions', 'Footer CTA')}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary transition-colors"
          >
            Contact Admissions
          </Link>
        </div>
      </section>
      </main>

      {/* Footer */}
      <PremiumFooter />
    </div>
  );
}
