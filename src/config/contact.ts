/**
 * Contact information configuration
 * Single source of truth for all contact details
 */

export const CONTACT_INFO = {
  // Primary contact
  phone: '+263 123 456 7890',
  email: 'info@regisbridge.page',
  admissionsEmail: 'admissions@regisbridge.page',
  
  // Physical address
  address: {
    street: '123 Education Road',
    city: 'Harare',
    country: 'Zimbabwe',
    postalCode: '12345',
  },
  
  // Formatted address string
  get fullAddress() {
    return `${this.address.street}, ${this.address.city}, ${this.address.country}`;
  },
  
  // Office hours
  hours: {
    weekdays: '8:00 AM - 5:00 PM',
    saturday: '9:00 AM - 1:00 PM',
    sunday: 'Closed',
  },
  
  // Social media
  social: {
    facebook: 'https://www.facebook.com/Regisbridge',
    instagram: 'https://www.instagram.com/regisbridge/',
    linkedin: 'https://www.linkedin.com/in/tichaona-mutimbire-2abb29107/',
    twitter: 'https://twitter.com/regisbridgeacad',
  },
  
  // Google Maps
  maps: {
    embedUrl: '',  // Add your Google Maps embed URL
    directionsUrl: '',  // Add Google Maps directions URL
  },
} as const;

// Department-specific contacts
export const DEPARTMENT_CONTACTS = {
  admissions: {
    title: 'Admissions Office',
    email: 'admissions@regisbridge.page',
    phone: '+263 123 456 7891',
  },
  academics: {
    title: 'Academic Office',
    email: 'academics@regisbridge.page',
    phone: '+263 123 456 7892',
  },
  boarding: {
    title: 'Boarding Office',
    email: 'boarding@regisbridge.page',
    phone: '+263 123 456 7893',
  },
  finance: {
    title: 'Finance Office',
    email: 'finance@regisbridge.page',
    phone: '+263 123 456 7894',
  },
} as const;
