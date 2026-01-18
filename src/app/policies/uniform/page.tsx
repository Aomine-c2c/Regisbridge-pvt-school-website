'use client';

import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function UniformPolicyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[900px] mx-auto px-4 sm:px-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Uniform Policy</h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-brand-navy/5 rounded-xl p-6 mb-8 border border-brand-navy/20">
              <p className="text-gray-700 leading-relaxed">
                All students are expected to wear the correct school uniform at all times during the school day and when representing the school at external events.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Day Uniform</h2>
            <ul className="space-y-2 mb-8">
              <li>Navy blue blazer with school crest</li>
              <li>White shirt or blouse</li>
              <li>House tie (Churchill, Windsor, or Victoria)</li>
              <li>Grey tailored trousers or skirt</li>
              <li>Black leather shoes (no trainers)</li>
              <li>Navy blue pullover or cardigan (optional)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">PE Kit</h2>
            <ul className="space-y-2 mb-8">
              <li>School PE polo shirt (house colors)</li>
              <li>Navy blue shorts or sports skirt</li>
              <li>Navy blue tracksuit</li>
              <li>White sports socks</li>
              <li>Trainers suitable for indoor and outdoor sports</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Boarding Students</h2>
            <ul className="space-y-2 mb-8">
              <li>Smart casual wear for evenings and weekends</li>
              <li>Appropriate attire for formal dinners</li>
              <li>No offensive slogans or images on clothing</li>
            </ul>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Where to Purchase</h3>
              <p className="text-gray-700 mb-4">
                Official school uniform can be purchased from our online school shop or at the on-campus uniform store.
              </p>
              <a
                href="/shop"
                className="inline-block bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Visit School Shop
              </a>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
