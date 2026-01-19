/**
 * Site-wide navigation configuration
 * Single source of truth for all navigation menus
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: readonly NavItem[];
}

// Main header navigation (dropdown menus)
export const MAIN_NAVIGATION = {
  about: [
    { label: 'About Our Institution', href: '/about' },
    { label: 'Headmaster\'s Welcome', href: '/about/headmaster' },
    { label: 'Board of Governors', href: '/about/board' },
    { label: 'Contact Us', href: '/contact' },
  ],
  admissions: [
    { label: 'Admissions Overview', href: '/admissions' },
    { label: 'Apply Online', href: '/admissions/apply' },
    { label: 'Campus Tour', href: '/campus-tour' },
    { label: 'Campus Map', href: '/campus-map' },
  ],
  academics: [
    { label: 'Academic Excellence', href: '/academics' },
    { label: 'Digital Library', href: '/student/library' },
    { label: 'Academic Calendar', href: '/calendar' },
    { label: 'Career Guidance', href: '/career-guidance' },
  ],
  studentLife: [
    { label: 'Student Life Overview', href: '/student-life' },
    { label: 'Boarding & Pastoral Care', href: '/boarding' },
    { label: 'Student Leadership', href: '/student-leadership' },
    { label: 'Student Wellness', href: '/wellness' },
    { label: 'House Championship', href: '/student/house' },
  ],
  community: [
    { label: 'News & Events', href: '/news' },
    { label: 'Alumni Network', href: '/alumni' },
    { label: 'Support & Giving', href: '/support' },
    { label: 'School Shop', href: '/shop' },
    { label: 'Press Kit', href: '/press' },
  ],
} as const;

// Footer navigation (organized by section)
export const FOOTER_NAVIGATION: Record<string, NavSection> = {
  discover: {
    title: 'Discover',
    items: [
      { label: 'About Our Institution', href: '/about' },
      { label: 'Headmaster\'s Welcome', href: '/about/headmaster' },
      { label: 'Board of Governors', href: '/about/board' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Apply Online', href: '/admissions/apply' },
      { label: 'Campus Tour', href: '/campus-tour' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  academics: {
    title: 'Academics',
    items: [
      { label: 'Academic Excellence', href: '/academics' },
      { label: 'Digital Library', href: '/student/library' },
      { label: 'Calendar', href: '/calendar' },
      { label: 'Career Guidance', href: '/career-guidance' },
    ],
  },
  community: {
    title: 'Community',
    items: [
      { label: 'Student Life', href: '/student-life' },
      { label: 'Boarding', href: '/boarding' },
      { label: 'Student Leadership', href: '/student-leadership' },
      { label: 'News & Events', href: '/news' },
      { label: 'Alumni', href: '/alumni' },
    ],
  },
  support: {
    title: 'Support',
    items: [
      { label: 'Support & Giving', href: '/support' },
      { label: 'School Shop', href: '/shop' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
} as const;

// Portal quick links
export const PORTAL_LINKS = [
  { label: 'Student Portal', href: '/student', icon: 'school' },
  { label: 'Parent Portal', href: '/parent', icon: 'supervisor_account' },
  { label: 'Staff Portal', href: '/staff', icon: 'badge' },
] as const;
