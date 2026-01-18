'use client';

import Image from 'next/image';
import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const BOARDING_HOUSES = [
  {
    name: 'Churchill House',
    capacity: '80 Students',
    age: 'Years 7-11',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
    housemaster: 'Mr. David Thompson',
  },
  {
    name: 'Windsor House',
    capacity: '75 Students',
    age: 'Years 12-13',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
    housemaster: 'Mrs. Sarah Parker',
  },
  {
    name: 'Victoria House',
    capacity: '70 Students',
    age: 'Years 7-11',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    housemaster: 'Dr. Michael Chen',
  },
];

export default function BoardingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero */}
        <section
          className="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(11,31,59,0.7), rgba(11,31,59,0.85)), url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600")',
          }}
        >
          <div className="max-w-[960px] px-4 text-center relative z-10">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6">
              A Home Away From Home
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Our boarding program provides a safe, nurturing environment where students develop independence, lifelong friendships, and a strong sense of community.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
                Boarding Life
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Excellence in Pastoral Care
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  With over 300 boarders from across the country and around the world, Regisbridge Academy offers a truly international boarding experience.
                </p>
                <p>
                  Our three purpose-built boarding houses provide comfortable, modern accommodation with dedicated house staff who ensure every student feels supported and valued.
                </p>
                <p>
                  From structured study periods to exciting weekend activities, our boarding program is designed to create a balanced, enriching experience.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800"
                alt="Boarding house common room"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Boarding Houses */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-16">
              <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
                Our Houses
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                Three Distinguished Boarding Houses
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BOARDING_HOUSES.map((house, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={house.image}
                      alt={house.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{house.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-navy text-[18px]">groups</span>
                        <span>{house.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-navy text-[18px]">school</span>
                        <span>{house.age}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-navy text-[18px]">person</span>
                        <span>Housemaster: {house.housemaster}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities & Activities */}
        <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: 'bed',
                title: 'Comfortable Accommodation',
                description: 'Modern rooms with ensuite facilities, study desks, and ample storage space.',
              },
              {
                icon: 'restaurant',
                title: 'Nutritious Dining',
                description: 'Full board with varied, healthy meals prepared by our expert catering team.',
              },
              {
                icon: 'sports_soccer',
                title: 'Weekend Activities',
                description: 'Sports, trips, and social events to ensure weekends are engaging and fun.',
              },
              {
                icon: 'health_and_safety',
                title: '24/7 Pastoral Support',
                description: 'Dedicated staff on hand round-the-clock to support student wellbeing.',
              },
            ].map((facility, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-brand-navy text-[24px]">{facility.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{facility.title}</h4>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-navy py-16 text-center">
          <div className="max-w-[960px] mx-auto px-4">
            <h2 className="text-white text-3xl font-bold mb-4">Experience Boarding at Regisbridge</h2>
            <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
              Visit us to tour our boarding houses and meet our dedicated staff.
            </p>
            <Link
              href="/contact"
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-8 py-3 rounded-lg font-bold transition-colors inline-flex items-center justify-center"
            >
              Schedule a Visit
            </Link>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
