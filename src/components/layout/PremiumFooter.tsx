import Link from 'next/link';

export default function PremiumFooter() {
  return (
    <footer className="bg-brand-navy pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About & Quick Links */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-brand-gold text-3xl">school</span>
              <span className="font-bold text-lg text-white">Regisbridge</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering students to achieve academic excellence and personal growth since 1974.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/Regisbridge"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded bg-gray-700 flex items-center justify-center text-white hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/regisbridge/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded bg-gray-700 flex items-center justify-center text-white hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/tichaona-mutimbire-2abb29107/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded bg-gray-700 flex items-center justify-center text-white hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: About & Admissions */}
          <div>
            <h4 className="font-bold text-white mb-6">Discover</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  About Our Institution
                </Link>
              </li>
              <li>
                <Link
                  href="/about/headmaster"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Headmaster's Welcome
                </Link>
              </li>
              <li>
                <Link
                  href="/about/board"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Board of Governors
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions/apply"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Apply Online
                </Link>
              </li>
              <li>
                <Link
                  href="/campus-tour"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Campus Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Life & Academics */}
          <div>
            <h4 className="font-bold text-white mb-6">Student Life</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/academics"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  href="/student-life"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Campus Life
                </Link>
              </li>
              <li>
                <Link
                  href="/boarding"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Boarding
                </Link>
              </li>
              <li>
                <Link
                  href="/student-leadership"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Student Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/wellness"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Student Wellness
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/student/library"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Digital Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Resources */}
          <div>
            <h4 className="font-bold text-white mb-6">Community</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  News & Events
                </Link>
              </li>
              <li>
                <Link
                  href="/alumni"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Alumni Network
                </Link>
              </li>
              <li>
                <Link
                  href="/career-guidance"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Support & Giving
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  School Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Press Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/campus-map"
                  className="text-gray-300 text-sm hover:text-brand-gold transition-colors"
                >
                  Campus Map
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Regisbridge Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-400 text-sm hover:text-brand-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/uniform"
              className="text-gray-400 text-sm hover:text-brand-gold transition-colors"
            >
              Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

