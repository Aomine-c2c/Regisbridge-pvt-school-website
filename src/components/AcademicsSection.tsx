import React, { useState } from 'react';
import { Calculator, Beaker, Globe, Laptop, Book, Palette, Music, Users, X } from 'lucide-react';


export default function AcademicsSection() {
  const [activeTab, setActiveTab] = useState('primary');
  const [selectedSubject, setSelectedSubject] = useState<typeof subjects[0] | null>(null);

  const subjects = [
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
  ];

  return (
    <section id="academics" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-[#1C1A75] text-center mb-4">
          Learning at Regisbridge
        </h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setActiveTab('primary')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'primary'
                  ? 'bg-[#1C1A75] text-white'
                  : 'bg-white text-[#1C1A75] hover:bg-gray-100'
              }`}
            >
              Primary (Grades 1-7)
            </button>
            <button
              onClick={() => setActiveTab('secondary')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'secondary'
                  ? 'bg-[#1C1A75] text-white'
                  : 'bg-white text-[#1C1A75] hover:bg-gray-100'
              }`}
            >
              Secondary (Forms 1-3)
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            {activeTab === 'primary' ? (
              <div>
                <h3 className="text-2xl font-bold text-[#1C1A75] mb-4">Primary Education</h3>
                <p className="text-gray-700 mb-4">
                  Our primary program (Grades 1-7) provides a strong foundation in core subjects while nurturing creativity and critical thinking. With small class sizes and personalized attention, each child receives the support they need to excel.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-[#1C1A75] mb-4">Lower Secondary Education</h3>
                <p className="text-gray-700 mb-4">
                  Our recently expanded secondary program (Forms 1-3) builds on primary foundations, preparing students for advanced studies with rigorous academics and modern teaching methods.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedSubject(subject)}
              >
                <subject.icon className="mx-auto mb-3 text-[#1C1A75] group-hover:text-[#D4AF37] group-hover:scale-125 transition-all duration-300" size={40} />
                <p className="font-semibold text-gray-800 group-hover:text-[#1C1A75] transition-colors duration-300">{subject.name}</p>
                <div className="w-0 group-hover:w-full h-1 bg-[#D4AF37] mx-auto mt-2 transition-all duration-300"></div>
                <button className="mt-2 text-sm text-[#1C1A75] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* Subject Modal */}
          {selectedSubject && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-white rounded-lg max-w-md w-full animate-scale-in">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <selectedSubject.icon className="text-[#D4AF37] mr-3" size={32} />
                      <h3 className="text-xl font-bold text-[#1C1A75]">{selectedSubject.name}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Close subject details"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedSubject.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[#1C1A75]">Teacher:</span>
                      <span className="text-gray-700">{selectedSubject.teacher}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#1C1A75]">Weekly Hours:</span>
                      <span className="text-gray-700">{selectedSubject.hours}</span>
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
