'use client';

import Link from 'next/link';

export default function ApplicationSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1152d4]/5 to-background-light dark:from-[#1152d4]/10 dark:to-background-dark flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-black text-[#111318] dark:text-white mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Thank you for applying to Regisbridge Academy. Your application has been received.
          </p>

          {/* Application Reference */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Application Reference Number</p>
            <p className="text-2xl font-bold text-[#1152d4] font-mono">#REG-2026-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Please save this reference number for your records
            </p>
          </div>

          {/* Next Steps */}
          <div className="text-left bg-[#1152d4]/5 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-[#111318] dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1152d4]">playlist_add_check</span>
              What Happens Next?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1152d4] text-sm mt-0.5">mail</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Confirmation Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive a confirmation email within 24 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1152d4] text-sm mt-0.5">description</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Application Review</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our admissions team will review your application (2-3 weeks)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1152d4] text-sm mt-0.5">event</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Assessment & Interview</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We'll schedule your assessment and parent interview</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1152d4] text-sm mt-0.5">verified</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Decision Notification</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You'll receive our decision within 4-6 weeks</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center rounded-lg h-12 px-6 bg-[#1152d4] text-white font-bold hover:bg-blue-700 transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center rounded-lg h-12 px-6 border-2 border-[#1152d4] text-[#1152d4] font-bold hover:bg-[#1152d4]/5 transition-colors"
            >
              Contact Admissions
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Questions? Email us at{' '}
            <a href="mailto:admissions@regisbridge.edu" className="text-[#1152d4] font-semibold hover:underline">
              admissions@regisbridge.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
