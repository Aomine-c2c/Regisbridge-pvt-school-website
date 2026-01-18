'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function CampusMapPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Interactive Campus Map</h1>
            <p className="text-gray-600 mt-1">Explore our 50-acre campus and locate key facilities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map View */}
            <div className="lg:col-span-3">
              <div className="bg-gray-200 rounded-xl h-[600px] flex items-center justify-center border border-gray-300">
                <div className="text-center text-gray-500">
                  <span className="material-symbols-outlined text-8xl mb-4">map</span>
                  <p className="text-xl font-medium">Interactive Campus Map</p>
                  <p className="text-sm">Full Interactive Map Would Display Here</p>
                </div>
              </div>
            </div>

            {/* Locations List */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Locations</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Main Reception', icon: 'business' },
                    { name: 'Science Center', icon: 'science' },
                    { name: 'Sports Complex', icon: 'sports_soccer' },
                    { name: 'Library', icon: 'local_library' },
                    { name: 'Dining Hall', icon: 'restaurant' },
                    { name: 'Theatre', icon: 'theater_comedy' },
                    { name: 'Boarding Houses', icon: 'home' },
                    { name: 'Chapel', icon: 'church' },
                  ].map((location, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-brand-navy hover:bg-brand-navy/5 transition-all text-left"
                    >
                      <span className="material-symbols-outlined text-brand-navy">{location.icon}</span>
                      <span className="font-medium text-gray-700">{location.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">Need Directions?</h3>
                <p className="text-sm text-gray-200 mb-4">Book a campus tour with our admissions team.</p>
                <button className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-navy py-2 rounded-lg font-bold transition-colors">
                  Book Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
