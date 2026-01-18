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
                href="#"
                className="size-8 rounded bg-gray-700 flex items-center justify-center text-white hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
              <a
                href="#"
                className="size-8 rounded bg-gray-700 flex items-center justify-center text-white hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="#"
                className="size-8 rounded bg-gray-700 flex items-center justify-center text-white hover:bg-brand-gold transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">LN</span>
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

