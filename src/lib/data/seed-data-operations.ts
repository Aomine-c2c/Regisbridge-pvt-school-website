/**
 * TRANSPORT, BANKING & OPERATIONAL SERVICES DATA
 * Source: Transport schedules, AGM notes, operational documents
 * Extracted from: docs/aaa.md (lines 1900-2014)
 */

export interface TransportSchedule {
  level: 'Primary' | 'ECD';
  pickupArea: string;
  pickupTime: string;
  supervisor?: string;
}

export interface BankingDetails {
  bankName: string;
  accountNumber: string;
  accountType?: string;
  acceptedPaymentMethods: string[];
}

export interface AGMDetails {
  date: string;
  year: number;
  notes: string[];
  feesApproved?: {
    grade1to7: number;
    ecd: number;
    nextReview: string;
  };
}

// Transport schedule with pickup times
export const transportSchedule: TransportSchedule[] = [
  {
    level: 'Primary',
    pickupArea: 'Bedrooms',
    pickupTime: '06:15 - 07:00 AM',
    supervisor: 'SDC Chairperson accompanies drivers',
  },
  {
    level: 'Primary',
    pickupArea: 'Co-house',
    pickupTime: '06:30 - 07:30 AM',
  },
  {
    level: 'ECD',
    pickupArea: 'Bedrooms',
    pickupTime: '07:15 - 08:15 AM',
  },
  {
    level: 'ECD',
    pickupArea: 'Co-house',
    pickupTime: '07:15 - 08:30 AM',
  },
];

export const transportFees = {
  monthly: 16, // USD
  currency: 'USD',
  note: 'Transport fees required by the 3rd of every month',
  oversight: 'SDC Chairperson accompanies drivers for safety',
};

// Banking details for fee payments
export const bankingDetails: BankingDetails[] = [
  {
    bankName: 'ZB Bank',
    accountNumber: '4550-106026-080',
    acceptedPaymentMethods: ['Cash USD', 'RTGS', 'Internal transfers'],
  },
  {
    bankName: 'Banc ABC',
    accountNumber: '13963985402108',
    acceptedPaymentMethods: ['Cash USD', 'RTGS', 'Internal transfers'],
  },
];

export const paymentPolicies = {
  methods: ['Cash USD', 'RTGS', 'Internal bank transfers'],
  deadline: 'On or before opening of school',
  bankAccounts: bankingDetails,
  parentalAppeal:
    'Parents urged to use bank accounts to ease director from having to keep large sums of cash',
};

// AGM (Annual General Meeting) details
export const agm2021: AGMDetails = {
  date: '2021-04-17',
  year: 2021,
  notes: [
    'AGM was due in January 2021 but postponed due to COVID-19',
    'AGM only held in April 2021',
    'Parents ratified fees for Grade 1-7 and ECD',
    'Next review scheduled for January 2022',
  ],
  feesApproved: {
    grade1to7: 225, // USD
    ecd: 180, // USD
    nextReview: '2022-01',
  },
};

// Tuckshop operations (from civvies day)
export const tuckshopOperations = {
  operatingDays: ['Special events', 'Civvies days', 'End of term'],
  note: 'Tuckshop operates on civvies days and special occasions',
  parentalInvolvement: 'Parents can contribute snacks/treats',
};

// Asset register (from registration documents)
export interface AssetItem {
  item: string;
  quantity: number;
  condition?: string;
  notes?: string;
}

export const assetRegister: AssetItem[] = [
  {
    item: 'Student desks',
    quantity: 55,
    condition: 'Good',
  },
  {
    item: 'Student chairs',
    quantity: 55,
    condition: 'Good',
  },
  {
    item: 'Infrared thermometer',
    quantity: 1,
    notes: 'COVID-19 screening equipment',
  },
  {
    item: 'Sanitization gun',
    quantity: 1,
    notes: 'COVID-19 safety equipment',
  },
  {
    item: 'Handwash buckets',
    quantity: 5,
    notes: 'COVID-19 hygiene stations',
  },
  {
    item: 'Office furniture',
    quantity: 1,
    notes: 'Set - desks, chairs, filing cabinets',
  },
];

// Administrative arrangements (from internal document)
export const administrativeArrangements = [
  'School uniforms - ordering, distribution, monitoring',
  'Textbook ordering and distribution',
  'Extracurricular activities coordination',
  'Student records management',
  'Curriculum implementation oversight',
  'Student counseling services',
  'Parent-teacher communication',
  'Timetable management',
  'Examination coordination',
  'Discipline management',
  'Health and safety monitoring',
  'Resource procurement',
  'Student welfare programs',
  'Special needs support',
  'Event planning and execution',
];

// Employment clearance process (from termination form)
export const employmentClearanceChecklist = [
  'Administration office',
  'Accounts department',
  'Bursar/Finance office',
  'Library',
  'Laboratory',
  'Sports department',
  'Hostel/Boarding',
  'Security',
  'ICT department',
  'Transport unit',
  'Store/Inventory',
  'Head of Department',
  'Principal/Headmaster',
];

export const payrollDeductions = {
  CILL: 'Calculated on termination',
  CILN: 'Calculated on termination',
  PAYEE: 'Tax deduction calculated on final pay',
  NSSA: 'Social security contribution calculated on final pay',
  note: 'All statutory deductions processed during employee exit',
};

// Sewer line project (infrastructure collaboration)
export const sewerLineProject = {
  date: '2021-05-11',
  partner: 'Turf Baptist Church',
  purpose: 'Joint sewer line infrastructure',
  location: 'Between Turf Baptist Church and Regisbridge School',
  costBreakdown: {
    cement: 114,
    gravel: 60,
    steel: 16,
    stones: 55,
    pipe: 132,
    bricks: 130,
    labour: 500,
    total: 1007,
  },
  currency: 'USD',
  note: 'Collaborative community infrastructure project',
};

// Royal Angels to Private College conversion plan
export const royalAngelsConversion = {
  applicationType: 'Change of Use Application',
  submittedTo: 'Mhondoro Ngezi Rural District Council',
  date: '2021-06-15',
  currentName: 'Royal Angels Preparatory School',
  proposedChange: 'Convert to private college (Form 1 through 6)',
  intendedStartDate: '2021-06-28',
  reason: 'Expand educational offerings to secondary level',
  status: 'Application submitted',
};

// School registration details (official applications)
export const registrationDetails = {
  provincialApplication: {
    submittedTo: 'Provincial Educational Director',
    location: 'Chinhoyi',
    standNumber: '3502',
    landSize: '4 hectares',
    infrastructure: '3 classroom blocks',
    staff: '7 qualified teachers',
  },
  districtApplication: {
    submittedTo: 'District Schools Inspector',
    location: 'Kadoma',
    date: '2021-06-16',
    standNumber: '1208',
    landSize: '1000 square meters',
    infrastructure: '6 classrooms',
    staff: '6 qualified teachers',
  },
};
