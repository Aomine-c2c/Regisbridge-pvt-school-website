'use client';

import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/material-icon';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-10 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="school" size="4xl" className="text-design-primary" />
            <h2 className="text-lg font-bold">Regisbridge Academy</h2>
          </div>
          <Link href="/admissions" className="flex items-center justify-center rounded-lg h-9 px-4 bg-design-primary hover:bg-design-primary-dark text-white text-sm font-bold transition-colors">
            Apply Now
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-text-dark dark:text-white mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MaterialIcon icon="location_on" className="text-design-primary" />
                <div>
                  <h3 className="font-bold mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">123 Education Lane<br/>Academic City, AC 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MaterialIcon icon="phone" className="text-design-primary" />
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MaterialIcon icon="mail" className="text-design-primary" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">admissions@regisbridge.edu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-design-primary" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-design-primary" />
              <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-design-primary"></textarea>
              <button className="w-full bg-design-primary hover:bg-design-primary-dark text-white py-3 rounded-lg font-bold transition-colors">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-sm text-gray-500">
          © 2024 Regisbridge Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
