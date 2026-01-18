'use client';

import Image from 'next/image';
import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const FACILITIES = [
  {
    name: 'Science & Innovation Center',
    description: 'State-of-the-art laboratories for Physics, Chemistry, Biology, and Engineering.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    features: ['20+ Specialized Labs', 'STEM Workshop', 'Research Equipment', '3D Printing Studio'],
  },
  {
    name: 'Sports Complex',
    description: 'World-class facilities including Olympic-size pool, athletics track, and indoor courts.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    features: ['Olympic Pool', 'Indoor Courts', '400m Track', 'Fitness Center'],
  },
  {
    name: 'Performing Arts Theatre',
    description: 'A 500-seat auditorium with professional lighting and sound systems.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
    features: ['500 Seats', 'Professional Stage', 'Rehearsal Rooms', 'Recording Studio'],
  },
  {
    name: 'Library & Learning Commons',
    description: 'Extensive collection with quiet study areas, group spaces, and digital resources.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
    features: ['50,000+ Books', 'Digital Resources', 'Study Spaces', 'Research Support'],
  },
];

export default function CampusTourPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section
          className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(11,31,59,0.6), rgba(11,31,59,0.8)), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600")',
          }}
        >
          <div className="max-w-[960px] px-4 text-center relative z-10">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6">
              Explore Our Campus
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Tour our 50-acre campus featuring state-of-the-art academic facilities, sports complexes, and comfortable boarding houses.
            </p>
            <Link
              href="/contact"
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center shadow-lg"
            >
              Schedule an In-Person Tour
            </Link>
          </div>
        </section>

        {/* Virtual Tour CTA */}
        <section className="bg-gray-50 py-12 border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't visit in person?</h2>
            <p className="text-gray-600 mb-6">Take our interactive 360° virtual tour from anywhere in the world</p>
            <button className="bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center gap-2">
              <span className="material-symbols-outlined">360</span>
              Start Virtual Tour
            </button>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
              World-Class Facilities
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything Students Need to Excel
            </h3>
          </div>

          <div className="space-y-12">
            {FACILITIES.map((facility, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="md:w-1/2 relative h-96 rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{facility.name}</h3>
                  <p className="text-gray-600 text-lg mb-6">{facility.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {facility.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-gold text-[20px]">check_circle</span>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Stats */}
        <section className="bg-brand-navy py-16 text-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '50+', label: 'Acres of Campus' },
                { stat: '25+', label: 'Sports Facilities' },
                { stat: '100+', label: 'Classrooms' },
                { stat: '3', label: 'Boarding Houses' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="text-4xl lg:text-5xl font-black text-brand-gold mb-2">{item.stat}</div>
                  <div className="text-sm font-medium uppercase tracking-wider opacity-90">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting to Campus</h2>
              <p className="text-gray-600">Located in the heart of Cambridge, easily accessible by road and rail</p>
            </div>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="material-symbols-outlined text-6xl mb-4">map</span>
                <p className="text-lg font-medium">Interactive Campus Map</p>
                <p className="text-sm">Google Maps Integration</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
