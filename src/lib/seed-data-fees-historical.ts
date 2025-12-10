/**
 * HISTORICAL FEE STRUCTURES
 * Source: Fee proposals from 2020 e-learning period and 2021 AGM
 * Extracted from: docs/aaa.md
 */

export interface FeeStructure {
  year: number;
  term: number | 'annual';
  description: string;
  levels: {
    [key: string]: {
      termlyFees: number;
      breakdown?: {
        transport?: number;
        stationeryTextbooks?: number;
        food?: number;
        onlineLessons?: number;
        covid19Levies?: number;
        schoolFees?: number;
        schoolFeesTopUp?: number;
      };
      monthlyFees?: number;
      monthlyBreakdown?: string;
      currency: string;
    };
  };
}

// 2020 E-Learning Fees (COVID-19 period)
export const fees2020TermTwo: FeeStructure = {
  year: 2020,
  term: 2,
  description:
    'Proposed Term 2 fees for full-day e-learning during COVID-19 lockdown (effective May 4, 2020). Transport, food, and stationery temporarily removed.',
  levels: {
    ecd: {
      termlyFees: 140, // Original agreed termly fees
      breakdown: {
        transport: 15,
        stationeryTextbooks: 10,
        food: 15,
      },
      monthlyFees: 100,
      monthlyBreakdown: '$34 + $33 + $33 (3 months)',
      currency: 'USD',
    },
    primary: {
      termlyFees: 180, // Original agreed termly fees
      breakdown: {
        transport: 15,
        stationeryTextbooks: 10,
        food: 15,
      },
      monthlyFees: 140,
      monthlyBreakdown: '$48 + $46 + $46 (3 months)',
      currency: 'USD',
    },
    boarding: {
      termlyFees: 330, // Original agreed termly fees
      monthlyFees: 140,
      monthlyBreakdown: '$48 + $46 + $46 (3 months)',
      currency: 'USD',
    },
  },
};

// Royal Angels 2020 E-Learning Fees
export const royalAngelsFees2020TermTwo: FeeStructure = {
  year: 2020,
  term: 2,
  description: 'Royal Angels Preparatory School proposed Term 2 fees for e-learning',
  levels: {
    ecd: {
      termlyFees: 105,
      breakdown: {
        transport: 15,
        stationeryTextbooks: 10,
        food: 15,
      },
      monthlyFees: 65,
      monthlyBreakdown: '$23 + $22 + $22 (3 months)',
      currency: 'USD',
    },
    primary: {
      termlyFees: 135,
      breakdown: {
        transport: 15,
        stationeryTextbooks: 10,
        food: 15,
      },
      monthlyFees: 95,
      monthlyBreakdown: '$33 + $32 + $32 (3 months)',
      currency: 'USD',
    },
  },
};

// 2021 Term 1 Fees (with COVID arrears)
export const fees2021TermOne: FeeStructure = {
  year: 2021,
  term: 1,
  description:
    'Term 1 2021 fees including arrears from lockdown period. Schools opened March 15, 2021.',
  levels: {
    'grade1to7': {
      termlyFees: 286,
      breakdown: {
        onlineLessons: 36,
        covid19Levies: 25,
        schoolFees: 150,
        schoolFeesTopUp: 75,
      },
      currency: 'USD',
    },
    ecd: {
      termlyFees: 241,
      breakdown: {
        onlineLessons: 36,
        covid19Levies: 25,
        schoolFees: 120,
        schoolFeesTopUp: 60,
      },
      currency: 'USD',
    },
    boarding: {
      termlyFees: 210, // After April 17, 2021 increase
      breakdown: {
        schoolFees: 150, // Old fee
        schoolFeesTopUp: 60, // Top-up agreed at parent meeting March 21, 2021
      },
      currency: 'USD',
    },
  },
};

// 2021 Fees Adopted at AGM (February/March 2021)
export const feesAdoptedAtAGM2021: FeeStructure = {
  year: 2021,
  term: 'annual',
  description:
    'Fees structure adopted at Annual General Meeting on March 17, 2021 for regular operation (post-COVID). Online fees and COVID-19 levies removed.',
  levels: {
    ecd: {
      termlyFees: 180,
      currency: 'USD',
    },
    'grade1to7': {
      termlyFees: 225,
      currency: 'USD',
    },
    boarding: {
      termlyFees: 210, // Increased from $150 effective April 17, 2021
      currency: 'USD',
    },
  },
};

// Comprehensive fee history timeline
export const feeHistory = [
  {
    period: '2020 - Term 2 (E-Learning)',
    ecd: 100, // Monthly
    primary: 140, // Monthly
    boarding: 140, // Monthly
    notes: 'COVID-19 lockdown e-learning fees, paid monthly',
  },
  {
    period: '2021 - Term 1 (Transition)',
    ecd: 241, // Termly with arrears
    primary: 286, // Termly with arrears
    boarding: 210, // Termly (increased April 17)
    notes: 'Includes online lessons arrears and COVID-19 levies',
  },
  {
    period: '2021 - Term 2 onwards (AGM Approved)',
    ecd: 180, // Termly
    primary: 225, // Termly
    boarding: 210, // Termly
    notes: 'Regular fees adopted at AGM, online/COVID fees removed',
  },
];

// Boarding fee evolution
export const boardingFeeEvolution = [
  {
    date: '2021-03-15',
    amount: 150,
    currency: 'USD',
    description: 'Opening fee at start of Term 1',
  },
  {
    date: '2021-03-21',
    amount: 150,
    currency: 'USD',
    description: 'Parent meeting held - fee increase discussed',
  },
  {
    date: '2021-04-17',
    amount: 210,
    currency: 'USD',
    description: 'Increased by $60 after parent agreement, effective immediately',
  },
];

// E-learning resources and requirements (2020)
export const eLearningResources2020 = {
  fullTimeSchedule: true,
  startDate: '2020-05-04',
  teacherReporting: 'Every day',
  teachingStrategy: 'Adherence to second term schemes of work',
  submissionDays: ['Monday', 'Wednesday'],
  submissionActivities: ['Submit learner books for marking', 'Collect handouts'],
  parentRequirements: [
    'Purchase stationery for e-learning',
    'Prepare based on requirements list',
  ],
  equipment: [
    'Photocopying machine must be operational',
    'Teacher accommodation available (boarding house for remote teachers)',
  ],
  timetable: {
    monday: {
      slot1: 'Maths (8:00-9:30)',
      slot2: 'Chishona (10:30-11:00)',
      slot3: 'Science & Tech (12:00-1:30)',
      slot4: 'English (2:00-3:30)',
    },
    tuesday: {
      slot1: 'English (8:00-9:30)',
      slot2: 'Maths (10:30-11:00)',
      slot3: 'Chishona (12:00-1:30)',
      slot4: 'Heritage Studies (2:00-3:30)',
    },
    wednesday: {
      slot1: 'Maths (8:00-9:30)',
      slot2: 'English (10:30-11:00)',
      slot3: 'Agriculture (12:00-1:30)',
      slot4: 'Chishona (2:00-3:30)',
    },
    thursday: {
      slot1: 'Chishona (8:00-9:30)',
      slot2: 'Maths (10:30-11:00)',
      slot3: 'PE & Mass Display (12:00-1:30)',
      slot4: 'English (2:00-3:30)',
    },
    friday: {
      slot1: 'Maths (8:00-9:30)',
      slot2: 'English (10:30-11:00)',
      slot3: 'FAREME (12:00-1:30)',
      slot4: 'Chishona (2:00-3:30)',
    },
    saturday: {
      slot1: 'French (8:00-9:30)',
      slot2: 'VPA (10:30-11:00)',
    },
  },
};

// Payment challenges documented in reports
export const paymentChallenges2021 = {
  collectionRate: 'Substantial number paid, but good number incomplete',
  challenges: [
    'Parents must buy winter uniforms simultaneously',
    'COVID-19 pandemic economic impact',
    'Parents reluctant due to fear of school closures (3rd wave)',
    'Many parents paid main fees but struggling with $75 top-up',
  ],
  paymentPlans: 'Few learners allowed onto payment plans',
  targetDate: 'End of term - very few expected to owe',
};

// Fee component breakdown for transparency
export const feeComponents = {
  transportPerTerm: 15,
  stationeryTextbooksPerTerm: 10,
  foodPerTerm: 15,
  onlineLessonsPerTerm: 36,
  covid19LeviesPerTerm: 25,
  baseFees: {
    ecd2020: 100, // $140 minus transport, food, stationery
    primary2020: 140, // $180 minus transport, food, stationery
    ecd2021: 180,
    primary2021: 225,
    boarding2021Initial: 150,
    boarding2021Final: 210,
  },
};

// Academic calendar 2021 (for fee planning context)
export const academicCalendar2021 = {
  term1: {
    open: '2021-03-22',
    close: '2021-06-04',
    durationWeeks: 11,
  },
  term2: {
    open: '2021-06-28',
    close: '2021-09-10',
    durationWeeks: 11,
  },
  term3: {
    open: '2021-10-04',
    close: '2021-12-17',
    durationWeeks: 11,
  },
};
