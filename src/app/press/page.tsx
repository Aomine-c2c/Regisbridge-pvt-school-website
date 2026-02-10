'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import { useSettings } from '@/contexts';

export default function PressKitPage() {
  const { settings } = useSettings();
  const schoolName = settings?.schoolName || 'Regisbridge Academy';
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[900px] mx-auto px-4 sm:px-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Media Resources</h1>
          <p className="text-gray-600 mb-12">Official information and downloadable assets for media use.</p>

          {/* School Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About {schoolName}</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Founded:</strong> {settings?.establishmentYear || '2015'}
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
                <strong>Location:</strong> {settings?.locationSummary || 'Located in the heart of our vibrant community'}
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
              For media inquiries, interview requests, or school information, contact our Communications Office.
            </p>
            <div className="space-y-2 text-gray-200">
              <p><strong>Email:</strong> {settings?.schoolEmail || 'press@regisbridge.ac.zw'}</p>
              <p><strong>Phone:</strong> {settings?.schoolPhone || '+263 4 123456'}</p>
              <p><strong>Hours:</strong> Monday-Friday, 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
