'use client';

import { useState, useMemo, useCallback } from 'react';
import { Calculator, Beaker, Globe, Laptop, Book, Palette, Music, Users, X } from 'lucide-react';
import { 
  gradeSeven2020Results, 
  newGradeSevenSyllabus, 
  foreignLanguagePrograms,
  classBranding,
  sportsHouses,
  blockBranding
} from '@/lib/seed-data-academics';


export default function AcademicsSection() {
  const [activeTab, setActiveTab] = useState('primary');
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);

  // Memoize subjects array to prevent recreation on each render
  const subjects = useMemo(() => [
    {
      icon: Calculator,
      name: 'Mathematics',
      description: 'Advanced mathematical concepts including algebra, geometry, and calculus. Our experienced teachers make complex topics accessible and engaging.',
      teacher: 'Mrs. Johnson',
      hours: '6 hours/week'
    },
    {
      icon: Beaker,
      name: 'Science',
      description: 'Comprehensive science education covering physics, chemistry, and biology with hands-on laboratory experiments and research projects.',
      teacher: 'Mr. Thompson',
      hours: '5 hours/week'
    },
    {
      icon: Globe,
      name: 'English',
      description: 'Literature analysis, creative writing, and communication skills development. Focus on both classic and contemporary works.',
      teacher: 'Ms. Davis',
      hours: '4 hours/week'
    },
    {
      icon: Laptop,
      name: 'ICT',
      description: 'Modern computing skills including programming, digital literacy, and technology integration across all subjects.',
      teacher: 'Mr. Wilson',
      hours: '3 hours/week'
    },
    {
      icon: Book,
      name: 'Languages',
      description: 'Multilingual education including French, Shona, and additional language options to prepare students for a global world.',
      teacher: 'Mrs. Patel',
      hours: '3 hours/week'
    },
    {
      icon: Palette,
      name: 'Arts',
      description: 'Visual arts, design, and creative expression. Students explore various mediums and develop artistic skills.',
      teacher: 'Ms. Rodriguez',
      hours: '2 hours/week'
    },
    {
      icon: Music,
      name: 'Music',
      description: 'Theory, performance, and appreciation of music. Choir, instrumental groups, and individual instruction available.',
      teacher: 'Mr. Brown',
      hours: '2 hours/week'
    },
    {
      icon: Users,
      name: 'Social Studies',
      description: 'History, geography, and civics education that fosters understanding of society and global citizenship.',
      teacher: 'Mrs. Nkosi',
      hours: '3 hours/week'
    }
  ], []);

  const closeModal = useCallback(() => {
    setSelectedSubject(null);
  }, []);

  const handleSubjectClick = useCallback((subject: typeof subjects[0]) => {
    setSelectedSubject(subject);
  }, []);

  return (
    <section id="academics" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-gradient-royal text-center mb-4 text-shadow-soft">
          Learning at Regisbridge
        </h2>
        <div className="divider-animated w-24 h-1 mx-auto mb-12"></div>

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setActiveTab('primary')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 micro-bounce ${
                activeTab === 'primary'
                  ? 'btn-gradient shadow-glow-gold'
                  : 'glass-card text-[#1C1A75] dark:text-white hover:shadow-medium'
              }`}
            >
              Primary (Grades 1-7)
            </button>
            <button
              onClick={() => setActiveTab('secondary')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 micro-bounce ${
                activeTab === 'secondary'
                  ? 'btn-gradient shadow-glow-gold'
                  : 'glass-card text-[#1C1A75] dark:text-white hover:shadow-medium'
              }`}
            >
              Secondary (Forms 1-3)
            </button>
          </div>

          <div className="glass-card p-8 rounded-lg shadow-strong mb-8 border border-white/20 dark:border-gray-700">
            {activeTab === 'primary' ? (
              <div>
                <h3 className="text-2xl font-bold text-gradient-royal mb-4">Primary Education (Grades 1-7)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our primary program provides a strong foundation in core subjects while nurturing creativity and critical thinking. With small class sizes and personalized attention, each child receives the support they need to excel.
                </p>
                
                {/* Real Academic Results */}
                <div className="gradient-royal text-white p-6 rounded-lg mb-4 shadow-medium card-elevated">
                  <h4 className="text-xl font-bold mb-3 text-gradient-gold">2020 Grade 7 Excellence</h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center micro-float">
                      <div className="text-3xl font-bold">{gradeSeven2020Results.overallPassRate}</div>
                      <div className="text-sm opacity-90">Overall Pass Rate</div>
                    </div>
                    <div className="text-center micro-float" style={{ animationDelay: '0.1s' }}>
                      <div className="text-3xl font-bold">{gradeSeven2020Results.totalLearners}</div>
                      <div className="text-sm opacity-90">Learners</div>
                    </div>
                    <div className="text-center micro-float" style={{ animationDelay: '0.2s' }}>
                      <div className="text-3xl font-bold">100%</div>
                      <div className="text-sm opacity-90">English & Shona</div>
                    </div>
                  </div>
                  <div className="text-sm opacity-90">
                    Subject Results: English {gradeSeven2020Results.subjectResults[0].passRate}, 
                    Shona {gradeSeven2020Results.subjectResults[2].passRate}, 
                    General Paper {gradeSeven2020Results.subjectResults[3].passRate}, 
                    Mathematics {gradeSeven2020Results.subjectResults[1].passRate}
                  </div>
                </div>
                
                {/* New Syllabus Info */}
                <div className="glass-card border-l-4 border-[#1C1A75] p-4 mb-4 shadow-soft">
                  <h4 className="font-bold text-gradient-royal mb-2">New Grade 7 Syllabus ({newGradeSevenSyllabus.implementationYear})</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    {newGradeSevenSyllabus.subjects.map((subject, idx) => (
                      <div key={idx}>• {subject}</div>
                    ))}
                  </div>
                </div>
                
                {/* Foreign Languages */}
                <div className="gradient-gold bg-opacity-10 border border-[#D4AF37] p-4 rounded-lg mb-4 shadow-soft card-elevated">
                  <h4 className="font-bold text-[#1C1A75] dark:text-white mb-2">Foreign Language Programs</h4>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="mb-1"><strong>French:</strong> Active program for all levels (ECD-Grade 7) + adult classes</p>
                    <p><strong>Sign Language:</strong> Coming soon with volunteer instructors</p>
                  </div>
                </div>
                
                {/* Class Branding - Birds */}
                <div className="glass-card border-2 border-[#1C1A75] p-4 rounded-lg mb-4 shadow-medium card-interactive">
                  <h4 className="font-bold text-gradient-royal mb-3 text-center">Our Classes - Named After Birds</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    {classBranding.map((classInfo, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-[#D4AF37] font-bold">🦅</span>
                        <div>
                          <span className="font-semibold text-[#1C1A75] dark:text-white">{classInfo.grade}:</span>{' '}
                          <span className="text-gray-700 dark:text-gray-300">{classInfo.birdName}</span>
                          <div className="text-xs text-gray-600 dark:text-gray-400 italic">"{classInfo.symbolism}"</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Block Branding - Inventors */}
                <div className="gradient-dawn bg-opacity-10 border border-purple-200 dark:border-purple-800 p-4 rounded-lg mb-4 shadow-soft card-elevated">
                  <h4 className="font-bold text-[#1C1A75] dark:text-white mb-3 text-center">School Blocks - Named After Great Inventors</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    {blockBranding.map((block, idx) => (
                      <div key={idx} className="glass-card p-3 rounded shadow-sm micro-float" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <div className="font-bold text-[#1C1A75] dark:text-white">{block.newName}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{block.blockName}</div>
                        <div className="text-xs text-gradient-gold mt-1">{block.significance}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sports Houses */}
                <div className="gradient-ocean bg-opacity-10 border-2 border-[#D4AF37] p-4 rounded-lg shadow-medium card-elevated">
                  <h4 className="font-bold text-gradient-royal mb-2 text-center">Sports Houses</h4>
                  <div className="flex justify-center space-x-6">
                    {sportsHouses.map((house, idx) => (
                      <div key={idx} className="text-center micro-wiggle">
                        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl mb-2 shadow-glow-gold">
                          {house[0]}
                        </div>
                        <div className="font-semibold text-[#1C1A75] dark:text-white">{house}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-3">
                    Sports Days: Tuesdays & Thursdays | Disciplines: Athletics, Ball games, Chess, Quiz & More
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gradient-royal mb-4">Lower Secondary Education (Forms 1-3)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our recently expanded secondary program builds on primary foundations, preparing students for advanced studies with rigorous academics and modern teaching methods.
                </p>
                <div className="glass-card border-l-4 border-[#D4AF37] p-4 shadow-soft">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Note:</strong> Royal Angels conversion to private college (Form 1-6) application submitted June 2021. Secondary expansion in progress.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={subject.name}
                className={`glass-card p-6 rounded-lg shadow-medium text-center card-elevated transition-all duration-300 cursor-pointer group animate-scale-in animation-delay-[${index * 100}ms] border border-white/20 dark:border-gray-700`}
                onClick={() => handleSubjectClick(subject)}
              >
                <subject.icon className="mx-auto mb-3 text-[#1C1A75] dark:text-white group-hover:text-[#D4AF37] micro-wiggle transition-all duration-300" size={40} />
                <p className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#1C1A75] dark:group-hover:text-white transition-colors duration-300">{subject.name}</p>
                <div className="divider-animated w-0 group-hover:w-full h-1 mx-auto mt-2"></div>
                <button className="mt-2 text-sm text-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* Subject Modal */}
          {selectedSubject && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
              <div className="glass-card rounded-lg max-w-md w-full animate-scale-in shadow-strong border border-white/30">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <selectedSubject.icon className="text-gradient-gold mr-3" size={32} />
                      <h3 className="text-xl font-bold text-gradient-royal">{selectedSubject.name}</h3>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors micro-bounce"
                      aria-label="Close subject details"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedSubject.description}</p>
                  <div className="gradient-primary text-white p-4 rounded-lg shadow-medium">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[#D4AF37]">Teacher:</span>
                      <span>{selectedSubject.teacher}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#D4AF37]">Weekly Hours:</span>
                      <span>{selectedSubject.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
