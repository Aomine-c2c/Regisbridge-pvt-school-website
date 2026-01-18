'use client';

import { useState } from 'react';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

export default function ContactAlternativePage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow">
        {/* Simplified Hero */}
        <section className="bg-gradient-to-r from-brand-navy to-brand-navy-dark py-16 text-white text-center">
          <div className="max-w-[800px] mx-auto px-4">
            <h1 className="text-5xl font-black mb-4">We'd Love to Hear From You</h1>
            <p className="text-xl text-gray-200">Have a question? Get in touch with our team.</p>
          </div>
        </section>

        {/* Contact Grid */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-navy py-3 rounded-lg font-bold">
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
                <p className="text-gray-600">123 Academic Avenue<br />Cambridge, CB2 1AB, UK</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600">+44 (0) 1234 567890</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                <p className="text-gray-600">info@regisbridge.edu</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
