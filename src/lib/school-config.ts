/**
 * Regisbridge School Configuration
 * Central source of truth for all school information
 * Data extracted from official documents in docs/ folder
 */

export const schoolConfig = {
  // Basic Information
  name: {
    full: 'Regisbridge Private School',
    short: 'Regisbridge',
    legal: 'Regisbridge Group of Schools',
  },
  
  // Leadership (March 2021 - from Monthly Report)
  leadership: {
    head: {
      name: 'T. Mutambasere',
      title: 'Head Teacher',
      ecNumber: '0225902 V',
      qualifications: 'B.Ed Administration',
      startDate: '2021-03-15',
      experience: '20+ years as teacher and head',
    },
    deputy: {
      name: 'P.K. Mhlanga',
      title: 'Deputy Head',
      ecNumber: '0884950 B',
      qualifications: 'Diploma in Ed General',
    },
    tic: {
      name: 'T. Munyani',
      title: 'Teacher In Charge',
      ecNumber: 'M155134',
      qualifications: 'B.Ed ECD',
    },
    ictCoordinator: {
      name: 'W. Mafunga',
      title: 'ICT Coordinator',
      ecNumber: '0998176Y',
      qualifications: 'Diploma in Ed General',
    },
  },
  
  // Motto and Identity
  motto: {
    latin: 'Supervincimus',
    english: 'We Conquer Together',
  },
  
  // Mission and Vision (Updated from monthly report insights)
  mission: 'To provide holistic quality education that develops academically excellent, morally upright, and socially responsible citizens who can compete globally while maintaining African values.',
  
  vision: 'To be a center of educational excellence in Zimbabwe, producing well-rounded individuals equipped with 21st century skills, strong moral values, and a passion for lifelong learning.',
  
  // Core Values
  values: [
    'Excellence in all endeavors',
    'Integrity and honesty',
    'Respect for all',
    'Teamwork and collaboration',
    'Innovation and creativity',
    'Responsibility and accountability',
  ],
  
  // Contact Information (TO BE UPDATED from official documents)
  contact: {
    email: {
      main: 'info@regisbridge.ac.zw',
      admissions: 'admissions@regisbridge.ac.zw',
      accounts: 'accounts@regisbridge.ac.zw',
      support: 'support@regisbridge.ac.zw',
    },
    phone: {
      main: '+263 4 745 678', // TO BE UPDATED
      mobile: '+263 77 234 5678', // TO BE UPDATED
      whatsapp: '+263 77 234 5678', // TO BE UPDATED
    },
    address: {
      street: 'Plot 123, Borrowdale Road', // TO BE UPDATED
      suburb: 'Borrowdale',
      city: 'Harare',
      country: 'Zimbabwe',
      postalCode: 'P.O. Box 1234, Borrowdale', // TO BE UPDATED
      full: 'Plot 123, Borrowdale Road, Borrowdale, Harare, Zimbabwe', // TO BE UPDATED
    },
  },
  
  // Website and Social Media
  urls: {
    website: 'https://regisbridge.ac.zw',
    portal: 'https://portal.regisbridge.ac.zw',
    facebook: '', // TO BE UPDATED
    twitter: '', // TO BE UPDATED
    instagram: '', // TO BE UPDATED
    linkedin: '', // TO BE UPDATED
  },
  
  // Academic Information
  academic: {
    levels: ['Primary', 'Secondary', 'Advanced Level'],
    grades: {
      primary: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'],
      secondary: ['Form 1', 'Form 2', 'Form 3', 'Form 4'],
      advancedLevel: ['Lower 6', 'Upper 6'],
    },
    curriculum: 'Zimbabwe School Examinations Council (ZIMSEC)',
    currentYear: '2025',
    termsPerYear: 3,
  },
  
  // Fee Structure (TO BE POPULATED from Excel files)
  fees: {
    currency: 'USD',
    lastUpdated: '2025-01-01',
    structures: [
      // Will be populated from REGISBRIDGE FEES UPDATE FINAL.xlsx
      // Format: { grade, term, year, tuition, boarding, other, total }
    ],
  },
  
  // Facilities
  facilities: [
    'Modern Classrooms',
    'Science Laboratories',
    'Computer Lab',
    'Library',
    'Sports Fields',
    'Boarding Facilities',
    'Dining Hall',
    'Medical Room',
  ],
  
  // School Type
  type: {
    day: true,
    boarding: true,
    coeducational: true,
  },
  
  // Operating Hours
  hours: {
    weekday: {
      start: '07:30',
      end: '16:00',
    },
    office: {
      start: '08:00',
      end: '17:00',
    },
  },
}

// Fee Structure Type (will be populated with real data)
export interface FeeStructure {
  id: string
  grade: string
  level: 'Primary' | 'Secondary' | 'Advanced Level'
  term: string
  academicYear: string
  fees: {
    tuition: number
    boarding?: number
    development?: number
    exam?: number
    transport?: number
    other?: number
  }
  totalAmount: number
  currency: string
  effectiveDate: string
}

// Financial Records Type (from Excel expenditure files)
export interface FinancialRecord {
  id: string
  date: string
  category: string
  description: string
  amount: number
  type: 'income' | 'expenditure'
  month: string
  year: number
  school: 'Regisbridge' | 'Royal Angels' // Two schools in the group
}

export default schoolConfig
