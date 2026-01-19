'use client';

import Link from 'next/link';
import { useState } from 'react';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const FORM_STEPS = ['Student Information', 'Parent/Guardian Details', 'Academic History', 'Submit'];

export default function ApplicationFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Student info
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    // Parent info
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    // Academic
    currentSchool: '',
    gradeApplying: '',
    startDate: '',
  });

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to actual API endpoint
    // await fetch('/api/admissions/apply', { method: 'POST', body: JSON.stringify(formData) });
    alert('Application submitted successfully! We will review your application soon.');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[900px] mx-auto px-4 sm:px-10">
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              {FORM_STEPS.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        index <= currentStep
                          ? 'bg-brand-navy text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs mt-2 font-medium text-gray-600 hidden sm:block">
                      {step}
                    </span>
                  </div>
                  {index < FORM_STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        index < currentStep ? 'bg-brand-navy' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-black text-gray-900 mb-6">
              Online Enrollment Application
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 0: Student Information */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-brand-navy mb-4">Student Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Parent/Guardian Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-brand-navy mb-4">Parent/Guardian Details</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic History */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-brand-navy mb-4">Academic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Current School
                      </label>
                      <input
                        type="text"
                        value={formData.currentSchool}
                        onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Grade Applying For *
                      </label>
                      <select
                        required
                        value={formData.gradeApplying}
                        onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      >
                        <option value="">Select Grade</option>
                        <option value="early-childhood">Early Childhood</option>
                        <option value="year-1">Year 1</option>
                        <option value="year-2">Year 2</option>
                        <option value="year-7">Year 7</option>
                        <option value="year-12">Year 12 (A-Level)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Intended Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-brand-navy mb-4">Review Your Application</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Student Information</h3>
                      <p className="text-gray-600">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-gray-600">{formData.dateOfBirth}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Parent Contact</h3>
                      <p className="text-gray-600">{formData.parentName}</p>
                      <p className="text-gray-600">{formData.parentEmail}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Application Details</h3>
                      <p className="text-gray-600">Grade: {formData.gradeApplying}</p>
                      <p className="text-gray-600">Start Date: {formData.startDate}</p>
                    </div>
                  </div>
                  <div className="bg-brand-navy/5 p-4 rounded-lg border border-brand-navy/20">
                    <p className="text-sm text-gray-700">
                      By submitting this application, you consent to the processing of your personal data in accordance with our Privacy Policy.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {currentStep < FORM_STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold rounded-lg transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold rounded-lg transition-colors shadow-md"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Need help? <Link href="/contact" className="text-brand-navy hover:underline">Contact our admissions team</Link>
            </p>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
