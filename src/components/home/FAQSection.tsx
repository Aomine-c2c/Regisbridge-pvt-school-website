'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'What age groups does Regisbridge Academy serve?',
    answer: 'We offer comprehensive education from Early Childhood Development (ages 3-5) through A-Level (ages 16-18), serving students from ages 3 to 18.',
  },
  {
    question: 'What is your teacher-to-student ratio?',
    answer: 'We maintain a 1:10 teacher-to-student ratio to ensure personalized attention and academic excellence for every student.',
  },
  {
    question: 'Do you offer boarding facilities?',
    answer: 'Yes, we provide modern, secure boarding facilities with 24/7 mentorship, pastoral care, and structured study hours. Our boarding community fosters independence and lifelong friendships.',
  },
  {
    question: 'What is your university acceptance rate?',
    answer: 'We have a 98% university acceptance rate, with our graduates attending top-tier universities worldwide.',
  },
  {
    question: 'How do I apply for admission?',
    answer: 'You can start your application online through our Admissions page or contact our admissions office directly. We accept applications year-round and offer campus tours.',
  },
  {
    question: 'What extracurricular activities are available?',
    answer: 'We offer extensive programs in sports, arts, music, drama, robotics, debate, and community service. Every student is encouraged to explore their interests beyond academics.',
  },
  {
    question: 'What curriculum do you follow?',
    answer: 'We follow an internationally-recognized curriculum aligned with Cambridge and local standards, preparing students for global opportunities.',
  },
  {
    question: 'Are scholarships available?',
    answer: 'Yes, we offer merit-based and need-based scholarships. Contact our admissions office to learn about scholarship opportunities and application requirements.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-16 px-6 lg:px-20 max-w-[900px] mx-auto">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Everything you need to know about Regisbridge Academy
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <span
                className={`material-symbols-outlined text-brand-primary flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 pt-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Still have questions?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
        >
          Contact Us
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
