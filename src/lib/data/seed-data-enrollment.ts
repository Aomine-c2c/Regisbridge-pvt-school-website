/**
 * Enrollment Data from Monthly Reports
 * Real enrollment figures from March-April 2021
 */

export interface EnrollmentRecord {
  grade: string;
  openingMale: number;
  openingFemale: number;
  openingTotal: number;
  currentMale: number;
  currentFemale: number;
  currentTotal: number;
  growth: number;
  growthPercentage: number;
}

// Enrollment data from March 15 - April 21, 2021
export const enrollmentMarch2021: EnrollmentRecord[] = [
  {
    grade: 'ECD A',
    openingMale: 10,
    openingFemale: 14,
    openingTotal: 24,
    currentMale: 5,
    currentFemale: 11,
    currentTotal: 16,
    growth: -8,
    growthPercentage: -33.3,
  },
  {
    grade: 'ECD B1',
    openingMale: 11,
    openingFemale: 16,
    openingTotal: 27,
    currentMale: 22,
    currentFemale: 24,
    currentTotal: 46,
    growth: 19,
    growthPercentage: 70.4,
  },
  {
    grade: 'ECD B2',
    openingMale: 13,
    openingFemale: 16,
    openingTotal: 29,
    currentMale: 14,
    currentFemale: 16,
    currentTotal: 30,
    growth: 1,
    growthPercentage: 3.4,
  },
  {
    grade: 'Grade 1A',
    openingMale: 10,
    openingFemale: 10,
    openingTotal: 20,
    currentMale: 10,
    currentFemale: 10,
    currentTotal: 20,
    growth: 0,
    growthPercentage: 0,
  },
  {
    grade: 'Grade 1B',
    openingMale: 10,
    openingFemale: 8,
    openingTotal: 18,
    currentMale: 11,
    currentFemale: 9,
    currentTotal: 20,
    growth: 2,
    growthPercentage: 11.1,
  },
  {
    grade: 'Grade 2A',
    openingMale: 10,
    openingFemale: 7,
    openingTotal: 17,
    currentMale: 11,
    currentFemale: 8,
    currentTotal: 19,
    growth: 2,
    growthPercentage: 11.8,
  },
  {
    grade: 'Grade 2B',
    openingMale: 9,
    openingFemale: 7,
    openingTotal: 16,
    currentMale: 10,
    currentFemale: 7,
    currentTotal: 17,
    growth: 1,
    growthPercentage: 6.3,
  },
  {
    grade: 'Grade 3',
    openingMale: 17,
    openingFemale: 14,
    openingTotal: 31,
    currentMale: 19,
    currentFemale: 14,
    currentTotal: 33,
    growth: 2,
    growthPercentage: 6.5,
  },
  {
    grade: 'Grade 4',
    openingMale: 14,
    openingFemale: 15,
    openingTotal: 29,
    currentMale: 10,
    currentFemale: 9,
    currentTotal: 19,
    growth: -10,
    growthPercentage: -34.5,
  },
  {
    grade: 'Grade 5',
    openingMale: 10,
    openingFemale: 8,
    openingTotal: 18,
    currentMale: 8,
    currentFemale: 8,
    currentTotal: 16,
    growth: -2,
    growthPercentage: -11.1,
  },
  {
    grade: 'Grade 6',
    openingMale: 10,
    openingFemale: 8,
    openingTotal: 18,
    currentMale: 11,
    currentFemale: 10,
    currentTotal: 21,
    growth: 3,
    growthPercentage: 16.7,
  },
  {
    grade: 'Grade 7',
    openingMale: 6,
    openingFemale: 4,
    openingTotal: 10,
    currentMale: 6,
    currentFemale: 4,
    currentTotal: 10,
    growth: 0,
    growthPercentage: 0,
  },
];

// Summary Statistics
export const enrollmentSummary = {
  opening: {
    male: 130,
    female: 128,
    total: 258,
  },
  current: {
    male: 127,
    female: 149,
    total: 286,
  },
  growth: {
    absolute: 28,
    percentage: 10.9,
  },
  fastestGrowing: ['ECD B1', 'Grade 6', 'Grade 2A'],
  concernAreas: ['ECD A', 'Grade 4'],
};

// Academic Calendar 2021
export const academicCalendar2021 = {
  term1: {
    open: '2021-03-22',
    close: '2021-06-04',
    weeks: 11,
  },
  term2: {
    open: '2021-06-28',
    close: '2021-09-10',
    weeks: 11,
  },
  term3: {
    open: '2021-10-04',
    close: '2021-12-17',
    weeks: 11,
  },
};

// Special Events (Term 1, 2021)
export const term1Events2021 = [
  {
    date: '2021-03-15',
    event: 'Schools Reopening (Post Covid-19)',
    description: 'Schools opened in March due to Covid-19 pandemic',
  },
  {
    date: '2021-03-17',
    event: 'Annual General Meeting',
    description: 'AGM held, budgets adopted, new head introduced',
  },
  {
    date: '2021-03-21',
    event: 'Boarding Parents Meeting',
    description: 'Financial report, boarding fee increase to $210 USD',
  },
  {
    date: '2021-04-21',
    event: 'DSI Meeting in Kadoma',
    description: 'Head, SDC chair, and Grade 7 teacher attended',
  },
  {
    date: '2021-05-12',
    event: 'Civvies Day',
    description: 'Students wear civilian clothes',
  },
  {
    date: '2021-05-17',
    event: 'Termly Tests Begin',
    description: 'Tests run through May 29',
  },
  {
    date: '2021-05-31',
    event: 'Parent Consultation',
    description: 'Consultation period through June 3',
  },
  {
    date: '2021-06-04',
    event: 'Term 1 Closing',
    description: 'End of Term 1',
  },
];

export default enrollmentMarch2021;
