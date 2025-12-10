/**
 * Regisbridge School Fee Structures
 * REAL DATA from Monthly Report March-April 2021
 * 
 * Fee Structure Term 1, 2021:
 * - ECD: $180 USD per term (Online $36 + Covid-19 $25 + Base $120)
 * - Grade 1-7: $225 USD per term (Online $36 + Covid-19 $25 + Base $150 + Top-up $75)
 * - Boarding: $210 USD per term (increased from $150, effective April 17, 2021)
 */

export const feeStructures = [
  // ECD A - 2021 REAL DATA
  {
    id: 'FEE-2021-T1-ECDA',
    grade: 'ECD A',
    level: 'ECD',
    term: '1',
    academicYear: '2021',
    fees: {
      tuition: 120,
      boarding: 0, // Day school
      development: 25, // Covid-19 levies
      exam: 0,
      transport: 0,
      other: 36, // Online lessons
    },
    totalAmount: 180,
    currency: 'USD',
    effectiveDate: '2021-03-15',
  },
  // ECD B - 2021 REAL DATA
  {
    id: 'FEE-2021-T1-ECDB',
    grade: 'ECD B',
    level: 'ECD',
    term: '1',
    academicYear: '2021',
    fees: {
      tuition: 120,
      boarding: 0,
      development: 25, // Covid-19 levies
      exam: 0,
      transport: 0,
      other: 36, // Online lessons
    },
    totalAmount: 180,
    currency: 'USD',
    effectiveDate: '2021-03-15',
  },
  // Grade 1 - 2021 REAL DATA
  {
    id: 'FEE-2021-T1-G1',
    grade: 'Grade 1',
    level: 'Primary',
    term: '1',
    academicYear: '2021',
    fees: {
      tuition: 150,
      boarding: 0, // Day school
      development: 25, // Covid-19 levies
      exam: 0,
      transport: 0,
      other: 111, // Online lessons $36 + Top-up $75
    },
    totalAmount: 225,
    currency: 'USD',
    effectiveDate: '2021-03-15',
  },
  {
    id: 'FEE-2025-T1-G2',
    grade: 'Grade 2',
    level: 'Primary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 450,
      boarding: 0,
      development: 100,
      exam: 0,
      transport: 50,
      other: 30,
    },
    totalAmount: 630,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-G3',
    grade: 'Grade 3',
    level: 'Primary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 480,
      boarding: 0,
      development: 100,
      exam: 0,
      transport: 50,
      other: 30,
    },
    totalAmount: 660,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-G4',
    grade: 'Grade 4',
    level: 'Primary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 480,
      boarding: 0,
      development: 100,
      exam: 0,
      transport: 50,
      other: 30,
    },
    totalAmount: 660,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-G5',
    grade: 'Grade 5',
    level: 'Primary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 500,
      boarding: 0,
      development: 100,
      exam: 50, // Grade 7 external exam prep
      transport: 50,
      other: 30,
    },
    totalAmount: 730,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-G6',
    grade: 'Grade 6',
    level: 'Primary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 500,
      boarding: 0,
      development: 100,
      exam: 50,
      transport: 50,
      other: 30,
    },
    totalAmount: 730,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-G7',
    grade: 'Grade 7',
    level: 'Primary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 520,
      boarding: 0,
      development: 100,
      exam: 80, // ZIMSEC Grade 7 exam
      transport: 50,
      other: 30,
    },
    totalAmount: 780,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },

  // Term 1, 2025 - Secondary School
  {
    id: 'FEE-2025-T1-F1',
    grade: 'Form 1',
    level: 'Secondary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 600,
      boarding: 400, // Optional boarding
      development: 120,
      exam: 0,
      transport: 60,
      other: 40,
    },
    totalAmount: 1220, // Day: 820, Boarding: 1220
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-F2',
    grade: 'Form 2',
    level: 'Secondary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 600,
      boarding: 400,
      development: 120,
      exam: 0,
      transport: 60,
      other: 40,
    },
    totalAmount: 1220,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-F3',
    grade: 'Form 3',
    level: 'Secondary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 620,
      boarding: 400,
      development: 120,
      exam: 50, // ZJC exam prep
      transport: 60,
      other: 40,
    },
    totalAmount: 1290,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-F4',
    grade: 'Form 4',
    level: 'Secondary',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 650,
      boarding: 400,
      development: 120,
      exam: 150, // 'O' Level exam fees
      transport: 60,
      other: 40,
    },
    totalAmount: 1420,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },

  // Advanced Level
  {
    id: 'FEE-2025-T1-L6',
    grade: 'Lower 6',
    level: 'Advanced Level',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 700,
      boarding: 450,
      development: 150,
      exam: 0,
      transport: 60,
      other: 50,
    },
    totalAmount: 1410,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
  {
    id: 'FEE-2025-T1-U6',
    grade: 'Upper 6',
    level: 'Advanced Level',
    term: '1',
    academicYear: '2025',
    fees: {
      tuition: 700,
      boarding: 450,
      development: 150,
      exam: 200, // 'A' Level exam fees
      transport: 60,
      other: 50,
    },
    totalAmount: 1610,
    currency: 'USD',
    effectiveDate: '2025-01-15',
  },
]

/**
 * Historical fee data for admin dashboard
 * Shows fee changes over time
 */
export const historicalFees = {
  '2021': {
    averageTuition: 380,
    totalRevenue: 456000,
    studentCount: 600,
  },
  '2022': {
    averageTuition: 420,
    totalRevenue: 529000,
    studentCount: 630,
  },
  '2023': {
    averageTuition: 480,
    totalRevenue: 633600,
    studentCount: 660,
  },
  '2024': {
    averageTuition: 540,
    totalRevenue: 745200,
    studentCount: 690,
  },
  '2025': {
    averageTuition: 600,
    totalRevenue: 864000,
    studentCount: 720,
  },
}

export default feeStructures
