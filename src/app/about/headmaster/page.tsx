'use client';

import Image from 'next/image';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function HeadmasterPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-brand-navy text-white py-16">
          <div className="max-w-[960px] mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Headmaster's Welcome</h1>
            <p className="text-gray-200 text-lg">A Message from Dr. James Sterling</p>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-4 sm:px-10 py-16">
          {/* Headmaster Profile */}
          <div className="flex flex-col md:flex-row gap-12 mb-16">
            <div className="md:w-1/3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://i.pravatar.cc/400?img=12"
                  alt="Dr. James Sterling, Headmaster"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Regisbridge Academy
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  It is my great privilege to serve as Headmaster of Regisbridge Academy, an institution that has been at the forefront of educational excellence for nearly five decades.
                </p>
                <p>
                  At Regisbridge, we believe that education extends far beyond the classroom. Our mission is to develop well-rounded individuals who are academically accomplished, morally grounded, and socially responsible.
                </p>
                <p>
                  Our dedicated faculty, state-of-the-art facilities, and rich tradition of excellence create an environment where every student can discover their passions, develop their talents, and reach their full potential.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-bold text-gray-900">Dr. James Sterling</p>
                <p className="text-gray-600">Headmaster</p>
                <p className="text-sm text-gray-500">BA (Oxon), MA, DPhil</p>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision for Excellence</h3>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                As we look to the future, Regisbridge Academy remains committed to our core values of integrity, discipline, compassion, and excellence. These pillars guide everything we do, from our rigorous academic program to our extensive co-curricular offerings.
              </p>

              <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Academic Excellence</h4>
              <p>
                Our academic program is designed to challenge students intellectually while providing the support they need to succeed. With a 98% A*-B pass rate at A-Level and a 100% university placement rate, our students are well-prepared for the next chapter of their academic journey.
              </p>

              <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Holistic Development</h4>
              <p>
                We recognize that academic achievement is just one aspect of a complete education. Our extensive program of sports, arts, and community service ensures that students develop the character, resilience, and leadership skills that will serve them throughout their lives.
              </p>

              <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">A Thriving Community</h4>
              <p>
                Regisbridge is more than a school—it is a community. Our boarding program welcomes over 300 students from across the country and around the world, creating a diverse and inclusive environment where lasting friendships are formed.
              </p>

              <h4 className="text-xl font-bold text-gray-900 mt-8 mb-4">Looking Ahead</h4>
              <p>
                As we continue to build on our proud heritage, I invite you to visit our campus, meet our extraordinary students and staff, and experience firsthand the Regisbridge difference.
              </p>

              <p className="pt-8">
                Warmest regards,
              </p>
              <div className="mt-4">
                <Image
                  src="https://via.placeholder.com/200x60/0B1F3B/C9A227?text=Signature"
                  alt="Headmaster Signature"
                  width={200}
                  height={60}
                  className="mb-2"
                />
                <p className="font-bold text-gray-900">Dr. James Sterling</p>
                <p className="text-gray-600">Headmaster</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience Regisbridge Academy
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We invite prospective families to schedule a campus tour and discover what makes Regisbridge special.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navy-dark text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
