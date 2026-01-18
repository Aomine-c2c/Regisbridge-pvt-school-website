'use client';

import { useState } from 'react';

const FEE_STRUCTURE = {
  ecd: {
    name: 'Early Childhood (Ages 3-5)',
    baseTuition: 2500,
    boarding: 0, // Day school only
    extras: [
      { category: 'Registration Fee', amount: 150, description: 'One-time fee' },
      { category: 'Books & Materials', amount: 200, description: 'Per term' },
      { category: 'Uniform', amount: 180, description: 'One-time' },
    ],
  },
  primary: {
    name: 'Primary School (Ages 6-12)',
    baseTuition: 3200,
    boarding: 1800,
    extras: [
      { category: 'Registration Fee', amount: 200, description: 'One-time fee' },
      { category: 'Books & Materials', amount: 280, description: 'Per term' },
      { category: 'Uniform', amount: 220, description: 'One-time' },
      { category: 'Extracurricular', amount: 150, description: 'Optional' },
    ],
  },
  secondary: {
    name: 'High School & A-Level (Ages 13-18)',
    baseTuition: 4500,
    boarding: 2200,
    extras: [
      { category: 'Registration Fee', amount: 250, description: 'One-time fee' },
      { category: 'Books & Materials', amount: 400, description: 'Per term' },
      { category: 'Uniform', amount: 280, description: 'One-time' },
      { category: 'Lab Fees', amount: 180, description: 'Science students' },
      { category: 'Exam Fees', amount: 350, description: 'A-Level only' },
      { category: 'Extracurricular', amount: 200, description: 'Optional' },
    ],
  },
};

export default function FeeCalculator() {
  const [level, setLevel] = useState<'ecd' | 'primary' | 'secondary'>('primary');
  const [isBoarding, setIsBoarding] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [terms, setTerms] = useState(3);

  const currentLevel = FEE_STRUCTURE[level];
  
  const toggleExtra = (category: string) => {
    const newExtras = new Set(selectedExtras);
    if (newExtras.has(category)) {
      newExtras.delete(category);
    } else {
      newExtras.add(category);
    }
    setSelectedExtras(newExtras);
  };

  // Calculate total
  const tuitionTotal = currentLevel.baseTuition * terms;
  const boardingTotal = isBoarding ? currentLevel.boarding * terms : 0;
  const extrasTotal = currentLevel.extras
    .filter(extra => selectedExtras.has(extra.category))
    .reduce((sum, extra) => {
      // For per-term fees, multiply by terms
      if (extra.description === 'Per term') {
        return sum + (extra.amount * terms);
      }
      return sum + extra.amount;
    }, 0);
  
  const grandTotal = tuitionTotal + boardingTotal + extrasTotal;

  return (
    <section id="fees" aria-label="Fee Calculator" className="py-16 px-6 lg:px-20 max-w-[1000px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tuition Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Estimate your annual tuition fees
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {/* Level Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Education Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['ecd', 'primary', 'secondary'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setLevel(lvl);
                    if (lvl === 'ecd') setIsBoarding(false); // ECD is day only
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    level === lvl
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{FEE_STRUCTURE[lvl].name.split('(')[0]}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {FEE_STRUCTURE[lvl].name.match(/\(([^)]+)\)/)?.[1]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Boarding Option */}
          {level !== 'ecd' && (
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBoarding}
                  onChange={(e) => setIsBoarding(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Boarding Student
                  <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
                    +${currentLevel.boarding.toLocaleString()} per term
                  </span>
                </span>
              </label>
            </div>
          )}

          {/* Number of Terms */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Number of Terms: {terms}
            </label>
            <input
              type="range"
              min="1"
              max="3"
              value={terms}
              onChange={(e) => setTerms(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 Term</span>
              <span>2 Terms</span>
              <span>3 Terms (Full Year)</span>
            </div>
          </div>

          {/* Additional Fees */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Additional Fees (Optional)
            </label>
            <div className="space-y-2">
              {currentLevel.extras.map((extra) => (
                <label key={extra.category} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedExtras.has(extra.category)}
                    onChange={() => toggleExtra(extra.category)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {extra.category}
                      </span>
                      <span className="text-sm font-semibold text-brand-primary">
                        ${extra.amount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{extra.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Tuition ({terms} {terms === 1 ? 'term' : 'terms'})
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${tuitionTotal.toLocaleString()}
              </span>
            </div>
            {isBoarding && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Boarding ({terms} {terms === 1 ? 'term' : 'terms'})
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${boardingTotal.toLocaleString()}
                </span>
              </div>
            )}
            {extrasTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Additional Fees</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${extrasTotal.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Estimated Total
              </span>
              <span className="text-2xl font-bold text-brand-primary">
                ${grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
            * This is an estimate. Actual fees may vary. Scholarships and payment plans are available.
            Please contact our admissions office for detailed information.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/admissions"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
            >
              Apply Now
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </a>
            <a
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-brand-primary font-bold rounded-lg border-2 border-brand-primary hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
            >
              Contact Admissions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
