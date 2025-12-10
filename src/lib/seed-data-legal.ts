/**
 * LEGAL DOCUMENTS & TEMPLATES
 * Source: Indemnity forms and correspondence from aaa.md
 * Metadata only - actual forms are templates requiring parent/guardian completion
 */

export interface LegalDocument {
  type: string;
  purpose: string;
  parties: string[];
  requiredFor: string[];
  keyProvisions: string[];
  witnessesRequired: number;
}

export const deedOfIndemnity: LegalDocument = {
  type: 'Deed of Indemnity',
  purpose:
    'Indemnifies the school against claims arising from child participation in school activities, sports, trips, and medical emergencies',
  parties: [
    'Regisbridge Private School (represented by School Head)',
    'Parent/Guardian (Indemnitor)',
  ],
  requiredFor: [
    'All enrolled students',
    'Participation in sporting activities',
    'Sporting competitions',
    'Cultural and educational excursions',
    'School activities (on and off campus)',
    'Transport to/from school and events',
  ],
  keyProvisions: [
    'Child enrolled at instance of indemnitor',
    'Indemnitor agrees to child participating in school activities',
    'School provides or arranges transport (school vehicles, hired transport, parent vehicles, staff private vehicles)',
    'School Head/deputy/senior staff act in loco parentis',
    'Authorization for medical treatment and hospitalization in emergencies',
    'Indemnitor indemnifies school, Board of Directors, officers, contractors, employees, agents, headmaster, staff, and parent drivers',
    'Coverage includes damage, loss, injury of any description',
    'Includes consequential loss from medical treatment',
  ],
  witnessesRequired: 4, // 2 for indemnitor, 2 for school
};

export const legalDocumentTemplates = [
  {
    name: 'Deed of Indemnity',
    category: 'Liability & Risk Management',
    status: 'Active template',
    signatories: ['Parent/Guardian', 'School Head'],
    witnesses: 4,
    purpose: 'Risk transfer and liability protection',
  },
  {
    name: 'Profit Sharing Agreement (Management)',
    category: 'Employment & Contracts',
    status: 'Management contract template',
    signatories: ['Regisbridge College', 'Manager'],
    effectiveDate: '10/2021',
    purpose: 'Manager remuneration and duties',
    keyTerms: {
      profitShare: '25% of profits to manager',
      probationPeriod: '3 months',
      noticePeriod: '60 days written notice',
      terminalBenefits: 'As per Labour Act Chapter 28.01',
      monthlyAllowance: 'Paid in arrears, deducted from profit share',
      confidentiality: 'Full confidentiality of school information required',
    },
  },
];

// School official correspondence
export interface OfficialCorrespondence {
  date: string;
  from: string;
  to: string;
  subject: string;
  purpose: string;
  status?: string;
}

export const officialCorrespondence: OfficialCorrespondence[] = [
  {
    date: '2021-05-07',
    from: 'Turf Clinic (Marira Memory)',
    to: 'Mr Mutimbire, Regisbridge Private School',
    subject: 'Inspection Report for Boarding Facilities',
    purpose:
      'Report findings of health inspection for COVID-19, sanitation and hygiene compliance at boarding facilities',
    status: 'Follow-up inspection scheduled 2 weeks from date',
  },
  {
    date: '2021', // Exact date not specified
    from: 'Regisbridge Private College (MELPRODCOMMS)',
    to: 'Chief Executive Officer, Mhondoro Ngezi Rural District Council',
    subject: 'Application for Change of Use',
    purpose:
      'Request to change Royal Angels Preparatory School premises from preparatory school to private college enrolling Forms 1-6, starting June 28, 2021',
    status: 'Application submitted',
  },
];

// Key management contracts and responsibilities (from Profit Sharing Agreement)
export const managementResponsibilities = {
  strategicPlanning: [
    'Developing strategic plan in consultation with Directorate',
    'Preparation of staffing and resource plan',
    'Ensure proper registration and legal compliance',
    'Engage staff in carrying organizational vision',
    'Review school performance against objectives',
    'Financial planning and sustainability',
    'Resource allocation and monitoring',
    'Identification of new income sources',
    'Compliance with approved financial policies',
  ],
  staffing: [
    'Staff recruitment within school remit',
    'Creating supportive working environment',
    'Foster career development',
    'Ensure timely staff review and development',
    'Complete probation reviews for new staff',
    'Allocate duties to staff',
    'Manage staff per college policies',
    'Approve outside earnings activities',
    'Handle grievance procedures',
    'Manage disciplinary procedures for staff and students',
  ],
  teachingLearningResearch: [
    'Overall responsibility for teaching and research programme management',
    'Ensure high quality teaching delivery',
    'Maintain academic standards',
    'Promote student-centered learning culture',
    'Deal with professional accreditation matters',
    'Foster academic policy development',
    'Develop vibrant research culture of international standard',
    'Foster interdisciplinarity',
    'Promote excellence in teaching, learning, research, administration',
    'Ensure regular programme review and evaluation',
    'Promote collaboration within school and with institutions',
  ],
  general: [
    'Represent school internally and externally',
    'Serve on college committees',
    'Manage information flow to staff and students',
    'Ensure effective governance operations',
    'Manage physical facilities and equipment (subject to policy)',
    'Allocate rooms and space',
    'Ensure legal compliance (health & safety, data protection, FOI)',
    'Implement Board and Council decisions',
    'Supply information per Board/Council directions',
    'Prepare annual report with Executive Committee',
    'Delegate to Acting-Head for absences >3 days',
    'Other duties as assigned by Board of Directors',
  ],
};

// Risk management policies (from indemnity and contracts)
export const riskManagementPolicies = {
  medicalEmergencies: {
    authorization: 'School Head, deputy, senior staff act in loco parentis',
    scope: 'Can authorize medical treatment including hospitalization',
    trigger: 'When urgently required in child\'s interest',
    coverage: 'Accidents or illness during school attendance or supervision',
  },
  transportLiability: {
    vehicleTypes: [
      'School\'s own passenger vehicles',
      'Hired transport',
      'Parent vehicles',
      'Staff private vehicles',
    ],
    coverage: 'Travel to/from school and school activity venues',
    indemnifiedParties: [
      'School',
      'Board of Directors',
      'Officers',
      'Contractors',
      'Employees',
      'Agents',
      'Headmaster',
      'Staff',
      'Parent drivers',
    ],
  },
  activityCoverage: {
    schoolActivities: [
      'Sporting activities',
      'Sporting competitions',
      'Cultural excursions',
      'Educational excursions',
    ],
    locations: ['At school', 'Outside school', 'In Zimbabwe', 'Outside Zimbabwe'],
    liabilityCoverage: [
      'All claims, costs, charges, expenses',
      'Damage, loss, or injury of any description',
      'Consequential loss',
    ],
  },
  confidentiality: {
    prohibitions: [
      'Disclose company information to third parties',
      'Communicate customer lists, price points, marketing plans',
      'Duplicate confidential information',
      'Use confidential information except for school benefit',
      'Assist third parties in using confidential information',
    ],
    exceptions: 'Only for sole benefit of the school',
  },
};

// Document retention and legal references
export const legalReferences = {
  jurisdiction: 'Republic of Zimbabwe',
  applicableLaw: 'Laws of the Republic of Zimbabwe',
  court: 'Magistrate sitting at Kadoma',
  labourAct: 'Chapter 28.01 as amended',
  localAuthority: 'Mhondoro Ngezi Rural District Council',
  healthAuthority: 'Ministry of Health and Child Care',
  educationAuthority: 'MOPSE Mhondoro Ngezi District',
};

// Contract modification policies
export const contractPolicies = {
  modificationRequirement: 'Must be in writing and agreed by both parties',
  entireAgreement: 'Supersedes all previous oral or written agreements',
  terminationNotice: '60 days written notice by either party',
  probationPeriod: '3 months',
  expenseApproval: 'Requires prior written approval from school',
};
