import React from 'react';
import { Home, BookOpen, Award } from 'lucide-react';

export default function QuickHighlights() {
  const highlights = [
    {
      icon: Home,
      title: 'Day & Boarding School',
      description: 'Flexible options for every family'
    },
    {
      icon: BookOpen,
      title: 'Grades 1-7 + Forms 1-3',
      description: 'Primary & Lower Secondary Education'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Personalized learning & small classes'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#1C1A75] rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-[#D4AF37]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1C1A75] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
