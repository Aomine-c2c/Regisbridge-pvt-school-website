'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqs = useMemo<FAQ[]>(() => [
    {
      question: "What grades does Regisbridge offer?",
      answer: "Regisbridge Private School offers education from Grade 1 through Form 4 (O-Level), providing a comprehensive primary and secondary education pathway.",
      category: "General"
    },
    {
      question: "What are the school fees?",
      answer: "Day scholar fees are $225 per term, while boarding fees are $180 per term. We also offer flexible payment plans to accommodate different family situations.",
      category: "Fees"
    },
    {
      question: "Do you offer boarding facilities?",
      answer: "Yes! We have separate boarding facilities for boys and girls with a current capacity of 17 students. Our boarding facilities are regularly inspected and meet all health and safety standards.",
      category: "Boarding"
    },
    {
      question: "What is the admission process?",
      answer: "Our admission process involves: 1) Initial inquiry and school tour, 2) Submitting the application form, 3) Student assessment, 4) Interview with parents, and 5) Final enrollment. Contact us to start the process!",
      category: "Admissions"
    },
    {
      question: "What is your student-teacher ratio?",
      answer: "With 286 students and 15 dedicated teachers, we maintain a ratio of approximately 19:1, ensuring personalized attention for each student.",
      category: "Academics"
    },
    {
      question: "Is transport provided?",
      answer: "Yes, we offer school transport at $16 per month with multiple pickup schedules. We operate Monday through Friday with morning pickups and afternoon drop-offs.",
      category: "Transport"
    },
    {
      question: "What are your academic results?",
      answer: "We're proud of our strong academic performance. In 2020, our Grade 7 students achieved an 83.5% pass rate, demonstrating our commitment to academic excellence.",
      category: "Academics"
    },
    {
      question: "What extra-curricular activities do you offer?",
      answer: "We offer a variety of activities including sports (athletics, football, netball), academic clubs, and leadership programs through our three sports houses: Blue, Red, and Yellow.",
      category: "Activities"
    },
    {
      question: "What is the school's mission?",
      answer: "Our mission is to provide quality education that empowers students to become responsible, innovative, and successful individuals who contribute positively to society.",
      category: "General"
    },
    {
      question: "How can I pay school fees?",
      answer: "We accept payments through CABS (Account: 1006253773) and Stanbic Bank (Account: 9140003697054). You can also arrange payment plans by contacting our bursar.",
      category: "Fees"
    },
    {
      question: "What safety measures are in place?",
      answer: "Student safety is our priority. We have secure premises, trained staff, regular health inspections, COVID-19 protocols, and 24/7 supervision for boarding students.",
      category: "Safety"
    },
    {
      question: "Can I schedule a school tour?",
      answer: "Absolutely! We welcome prospective parents to tour our facilities. Contact us at +263 77 909 7410 or regisbridgepvtsch@gmail.com to schedule a visit.",
      category: "Admissions"
    }
  ], []);

  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
    return cats;
  }, [faqs]);

  const filteredFAQs = useMemo(() => {
    return activeCategory === 'All' 
      ? faqs 
      : faqs.filter(faq => faq.category === activeCategory);
  }, [faqs, activeCategory]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="text-[#D4AF37] mr-3" size={40} />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1C1A75]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Regisbridge Private School
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#1C1A75] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#D4AF37] hover:text-[#1C1A75]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                openIndex === index ? 'ring-2 ring-[#D4AF37]' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-start">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#D4AF37] text-white rounded-full mr-3 mt-1">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#1C1A75]">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="text-[#1C1A75] transition-transform duration-300" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 transition-transform duration-300" size={24} />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-2 border-l-4 border-[#D4AF37]">
                    <p className="text-gray-700 leading-relaxed pl-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-[#1C1A75] text-white font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#1C1A75] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
