'use client';

import Image from 'next/image';
import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const ACADEMIC_PROGRAMS = [
  {
    level: 'Early Childhood (Ages 3-5)',
    title: 'Foundation Years',
    description: 'Play-based learning that nurtures curiosity, creativity, and social-emotional development in a warm, caring environment.',
    subjects: ['Numeracy & Literacy', 'Creative Arts', 'Physical Development', 'Social Skills'],
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
  },
  {
    level: 'Primary School (Years 1-6)',
    title: 'Core Development',
    description: 'Building essential competencies in literacy, numeracy, and critical thinking through inquiry-based learning.',
    subjects: ['English', 'Mathematics', 'Science', 'Humanities', 'Arts', 'PE'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  },
  {
    level: 'Secondary School (Years 7-11)',
    title: 'IGCSE Program',
    description: 'Rigorous Cambridge IGCSE curriculum preparing students for advanced studies and global opportunities.',
    subjects: ['Core Sciences', 'Languages', 'Mathematics', 'Humanities', 'Technology', 'Arts'],
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
  },
  {
    level: 'Sixth Form (Years 12-13)',
    title: 'A-Level Excellence',
    description: 'Specialized study in chosen subjects, preparing students for top-tier universities worldwide.',
    subjects: ['Advanced Sciences', 'Mathematics', 'Economics', 'Languages', 'Arts & Humanities'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  },
];

const ACHIEVEMENTS = [
  { stat: '98%', label: 'A*-B Grades at A-Level' },
  { stat: '100%', label: 'University Placement Rate' },
  { stat: '15+', label: 'AP & Honors Courses' },
  { stat: '1:10', label: 'Student-Teacher Ratio' },
];

export default function AcademicExcellencePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section
          className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(11,31,59,0.7), rgba(11,31,59,0.85)), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600")',
          }}
        >
          <div className="max-w-[960px] px-4 text-center relative z-10">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">
              Academic Excellence
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6">
              World-Class Education for Future Leaders
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Our comprehensive curriculum combines academic rigor with holistic development, preparing students for success in top universities and beyond.
            </p>
          </div>
        </section>

        {/* Achievements Strip */}
        <section className="bg-gray-50 py-12 border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {ACHIEVEMENTS.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <span className="text-4xl lg:text-5xl font-black text-brand-navy">{item.stat}</span>
                  <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Programs */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
              Our Programs
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Comprehensive Curriculum
            </h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From early childhood through A-Level, our programs are designed to challenge, inspire, and prepare students for their future.
            </p>
          </div>

          <div className="space-y-6">
            {ACADEMIC_PROGRAMS.map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-navy/10 text-brand-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {program.level}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {program.subjects.map((subject, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/academics/${program.level.toLowerCase().split(' ')[0]}`}
                      className="self-start text-brand-navy font-bold text-sm uppercase tracking-wide flex items-center group-hover:translate-x-1 transition-transform"
                    >
                      Learn More
                      <span className="material-symbols-outlined text-base ml-1">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-navy py-16 text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h2 className="text-white text-3xl font-bold mb-4">Discover Your Path to Excellence</h2>
            <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
              Schedule a campus visit to see our academic programs in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-bold transition-all inline-flex items-center justify-center"
              >
                Book a Tour
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
