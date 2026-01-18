'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[900px] mx-auto px-4 sm:px-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg mb-8">
              Last updated: January 2026
            </p>

            <div className="bg-brand-navy/5 rounded-xl p-6 mb-8 border border-brand-navy/20">
              <p className="text-gray-700">
                Regisbridge Academy is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect personal information that you provide to us, including:
            </p>
            <ul className="space-y-2 mb-8 text-gray-700">
              <li>Name, address, and contact details</li>
              <li>Student academic records and performance data</li>
              <li>Health and medical information</li>
              <li>Financial information for fee payments</li>
              <li>Photographs and video recordings</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="space-y-2 mb-8 text-gray-700">
              <li>To provide educational services</li>
              <li>To monitor student progress and wellbeing</li>
              <li>To communicate with parents and guardians</li>
              <li>To process fee payments</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-8">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-6">
              Under GDPR, you have the right to:
            </p>
            <ul className="space-y-2 mb-8 text-gray-700">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-700 mb-4">
                For questions about this privacy policy or to exercise your data rights, please contact our Data Protection Officer.
              </p>
              <p className="text-brand-navy font-bold">dpo@regisbridge.edu</p>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
