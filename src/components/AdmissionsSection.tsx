import React from 'react';
import { Search, Calendar, FileText, ClipboardCheck, CheckCircle } from 'lucide-react';

export default function AdmissionsSection() {
  const steps = [
    { icon: Search, title: '1. Inquiry', description: 'Contact us to learn more' },
    { icon: Calendar, title: '2. School Tour', description: 'Visit our campus' },
    { icon: FileText, title: '3. Application', description: 'Submit your application' },
    { icon: ClipboardCheck, title: '4. Assessment', description: 'Student evaluation' },
    { icon: CheckCircle, title: '5. Enrollment', description: 'Welcome to Regisbridge!' }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="admissions" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-[#1C1A75] text-center mb-4">
          Join Regisbridge
        </h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative">
                  <div className="w-16 h-16 bg-[#1C1A75] rounded-full flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                    <step.icon className="text-[#D4AF37]" size={28} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-[#D4AF37] animate-pulse"></div>
                  )}
                </div>
                <h3 className="font-bold text-[#1C1A75] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-[#D4AF37] h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: '100%',
                      animationDelay: `${index * 0.5}s`,
                      animation: 'progressFill 2s ease-out forwards'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-[#1C1A75] mb-4">Admissions Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Application Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Completed application form</li>
                  <li>Birth certificate copy</li>
                  <li>Previous school reports</li>
                  <li>Passport-size photos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What We Offer:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Small class sizes (max 20 students)</li>
                  <li>Experienced, qualified teachers</li>
                  <li>Modern facilities & resources</li>
                  <li>Comprehensive support services</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="bg-[#1C1A75] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-[#1C1A75] transition-colors text-lg"
            >
              Schedule a School Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
