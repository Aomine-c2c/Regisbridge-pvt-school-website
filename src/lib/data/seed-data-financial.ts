/**
 * Financial Data from Monthly Reports
 * Real financial information from March-April 2021
 */

export interface FinancialRecord {
  id: string;
  month: string;
  year: number;
  category: string;
  subcategory: string;
  amount: number;
  currency: 'USD' | 'ZWL';
  description: string;
  status: 'completed' | 'pending' | 'planned';
}

// Revenue from School Fees (March-April 2021)
export const revenueRecords: FinancialRecord[] = [
  {
    id: 'rev-001',
    month: 'March',
    year: 2021,
    category: 'Revenue',
    subcategory: 'School Fees - ECD',
    amount: 180,
    currency: 'USD',
    description: 'ECD fees per learner per term',
    status: 'completed',
  },
  {
    id: 'rev-002',
    month: 'March',
    year: 2021,
    category: 'Revenue',
    subcategory: 'School Fees - Grade 1-7',
    amount: 225,
    currency: 'USD',
    description: 'Primary fees per learner per term',
    status: 'completed',
  },
  {
    id: 'rev-003',
    month: 'March',
    year: 2021,
    category: 'Revenue',
    subcategory: 'Boarding Fees',
    amount: 210,
    currency: 'USD',
    description: 'Boarding per learner per term (increased from $150)',
    status: 'completed',
  },
];

// Fee Breakdown Detail
export const feeBreakdown2021 = {
  ecd: {
    onlineLessons: 36,
    covid19Levies: 25,
    baseFees: 120,
    topUp: 60,
    total: 180, // Adjusted for term
  },
  primary: {
    onlineLessons: 36,
    covid19Levies: 25,
    baseFees: 150,
    topUp: 75,
    total: 225, // Adjusted for term
  },
  boarding: {
    oldFee: 150,
    topUp: 60,
    newFee: 210,
    effectiveDate: '2021-04-17',
  },
};

// Expenditure Records (March-April 2021)
export const expenditureRecords: FinancialRecord[] = [
  {
    id: 'exp-001',
    month: 'March',
    year: 2021,
    category: 'Expenditure',
    subcategory: 'Textbooks and Stationery',
    amount: 0, // Amount not specified in report
    currency: 'USD',
    description: 'Purchase of textbooks and stationery',
    status: 'completed',
  },
  {
    id: 'exp-002',
    month: 'March',
    year: 2021,
    category: 'Expenditure',
    subcategory: 'Staff Salaries',
    amount: 0, // Amount not specified, but increased 30-40%
    currency: 'USD',
    description: 'Teacher salaries (14 staff), increased 30-40% effective May',
    status: 'completed',
  },
  {
    id: 'exp-003',
    month: 'March',
    year: 2021,
    category: 'Expenditure',
    subcategory: 'Construction',
    amount: 0, // Amount not specified
    currency: 'USD',
    description: 'Classroom block (1x3 rooms) and staff house - roofing stage',
    status: 'pending',
  },
  {
    id: 'exp-004',
    month: 'March',
    year: 2021,
    category: 'Expenditure',
    subcategory: 'Teacher Welfare',
    amount: 0, // Amount not specified
    currency: 'USD',
    description: 'Tea at 10:00 with bread, lunch at 13:00',
    status: 'completed',
  },
  {
    id: 'exp-005',
    month: 'March',
    year: 2021,
    category: 'Expenditure',
    subcategory: 'Covid-19 Equipment',
    amount: 0, // Amount not specified
    currency: 'USD',
    description: 'Masks (5 per student), sanitizers, thermometers, fumigation',
    status: 'completed',
  },
];

// Planned Expenditures (Way Forward section)
export const plannedExpenditures: FinancialRecord[] = [
  {
    id: 'plan-001',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Educational Materials',
    amount: 0,
    currency: 'USD',
    description: 'More textbooks from ECD to Grade 7',
    status: 'planned',
  },
  {
    id: 'plan-002',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'ECD Equipment',
    amount: 0,
    currency: 'USD',
    description: 'More toys, TV, laptops for ECD department',
    status: 'planned',
  },
  {
    id: 'plan-003',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Maintenance',
    amount: 0,
    currency: 'USD',
    description: 'Repair toilet/shower systems in boarding house',
    status: 'planned',
  },
  {
    id: 'plan-004',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Building Maintenance',
    amount: 0,
    currency: 'USD',
    description: 'Repainting of entire school building',
    status: 'planned',
  },
  {
    id: 'plan-005',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Construction Completion',
    amount: 0,
    currency: 'USD',
    description: 'Complete staff house and classroom block',
    status: 'planned',
  },
  {
    id: 'plan-006',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Furniture',
    amount: 0,
    currency: 'USD',
    description: 'Repair broken furniture, new chairs for infant classes',
    status: 'planned',
  },
  {
    id: 'plan-007',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Equipment',
    amount: 0,
    currency: 'USD',
    description: 'Garden tools, work suits for grounds men',
    status: 'planned',
  },
  {
    id: 'plan-008',
    month: 'Future',
    year: 2021,
    category: 'Planned Expenditure',
    subcategory: 'Security',
    amount: 0,
    currency: 'USD',
    description: 'Repair two main gates to keep domestic animals out',
    status: 'planned',
  },
];

// Income Generating Projects (Planned)
export const incomeGeneratingProjects = [
  {
    id: 'igp-001',
    name: 'Bee Keeping',
    status: 'planned',
    description: 'To ease finance challenges',
    expectedRevenue: 0,
  },
  {
    id: 'igp-002',
    name: 'Chicken Rearing',
    status: 'planned',
    description: 'To ease finance challenges',
    expectedRevenue: 0,
  },
];

// Fee Collection Challenges (March-April 2021)
export const feeCollectionStatus = {
  challenges: [
    'Parents struggling due to Covid-19 pandemic',
    'Need to buy winter uniforms simultaneously',
    'Fear of school closure due to 3rd wave',
    'Unique term combining summer and winter',
    'Some boarding students not updated on payments',
  ],
  paymentPlans: 'Few learners allowed onto payment plans',
  target: 'Very few learners owing by end of term',
  nextTermFees: {
    ecd: 180,
    primary: 225,
    note: 'Online fees and Covid-19 levies will fall off',
  },
};

// Financial Summary
export const financialSummary = {
  period: 'March 15 - April 21, 2021',
  mainRevenue: 'School fees collection',
  flowStatus: 'Not so good - many parents paid base fee but struggling with top-ups',
  salaryIncrease: '30-40% effective May 2021',
  staffCount: 14,
  boardingStaff: 6,
  constructionProjects: 2, // Classroom block and staff house
  constructionStage: 'Roofing',
};

export default {
  revenueRecords,
  expenditureRecords,
  plannedExpenditures,
  feeBreakdown2021,
  incomeGeneratingProjects,
  feeCollectionStatus,
  financialSummary,
};
