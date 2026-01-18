'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function PressKitPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[900px] mx-auto px-4 sm:px-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Press & Media Kit</h1>
          <p className="text-gray-600 mb-12">Resources for journalists, media, and communications professionals</p>

          {/* School Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Regisbridge Academy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Founded:</strong> 1974
              </p>
              <p>
                <strong>Type:</strong> Independent Co-educational Boarding & Day School
              </p>
              <p>
                <strong>Age Range:</strong> 3-18 years (Early Years through Sixth Form)
              </p>
              <p>
                <strong>Student Body:</strong> 450 students (300+ boarders)
              </p>
              <p>
                <strong>Location:</strong> Cambridge, United Kingdom
              </p>
            </div>
          </div>

          {/* Downloadable Assets */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloadable Assets</h2>
            <div className="space-y-4">
              {[
                { name: 'School Logo (High Resolution)', type: 'PNG, SVG' },
                { name: 'Brand Guidelines', type: 'PDF' },
                { name: 'Campus Photos', type: 'ZIP Archive' },
                { name: 'Fact Sheet 2025-2026', type: 'PDF' },
                { name: 'Recent Press Releases', type: 'PDF' },
              ].map((asset, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.type}</p>
                  </div>
                  <button className="px-6 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white rounded-lg font-medium transition-colors">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media Contact */}
          <div className="bg-brand-navy text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
            <p className="text-gray-200 mb-6">
              For press inquiries, interviews, or additional information, please contact our Communications Office.
            </p>
            <div className="space-y-2 text-gray-200">
              <p><strong>Email:</strong> press@regisbridge.edu</p>
              <p><strong>Phone:</strong> +44 (0) 1234 567890</p>
              <p><strong>Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
