/**
 * COMMUNITY PROGRAMS & INCOME-GENERATING PROJECTS
 * Source: Term 1 2021 Newsletter, Community engagement documents
 * Extracted from: docs/aaa.md (lines 1750-1950)
 */

export interface IncomeGeneratingProject {
  name: string;
  status: 'Active' | 'Planned' | 'Under Development';
  startYear?: number;
  description: string;
  expectedIncome?: string;
  currentProgress?: string;
}

export interface CommunityProgram {
  name: string;
  description: string;
  targetAudience: string;
  fees?: number;
  status: 'Active' | 'Planned';
  communityBenefit: string;
}

// Income-generating projects
export const incomeGeneratingProjects: IncomeGeneratingProject[] = [
  {
    name: 'Gardening and Farming',
    status: 'Active',
    startYear: 2020,
    description: 'School farming project for maize cultivation',
    currentProgress: 'Maize plants ready for harvesting (Term 1 2021)',
    expectedIncome: 'Regular income from maize harvest',
  },
  {
    name: 'Bee-keeping',
    status: 'Planned',
    description: 'Honey production project',
    expectedIncome: 'Income from honey and bee products',
  },
  {
    name: 'Chicken Rearing',
    status: 'Planned',
    description: 'Poultry farming for eggs and meat',
    expectedIncome: 'Income from eggs and chicken sales',
  },
];

// Community engagement programs
export const communityPrograms: CommunityProgram[] = [
  {
    name: 'French Language Classes (Adult)',
    description: 'French language instruction for community members',
    targetAudience: 'Adults in the community',
    fees: undefined, // Available at fee (not specified)
    status: 'Active',
    communityBenefit: 'Career advancement through foreign language skills',
  },
  {
    name: 'Computer Studies Classes',
    description: 'Community computer literacy training',
    targetAudience: 'Community members seeking ICT skills',
    fees: undefined, // Fee not specified
    status: 'Active',
    communityBenefit: 'Digital literacy and skills development',
  },
  {
    name: 'Hexco Professional Centre',
    description: 'Professional certification courses through Hexco',
    targetAudience: 'Adults seeking professional qualifications',
    status: 'Planned',
    communityBenefit: 'Professional development and certification opportunities',
  },
  {
    name: 'Sign Language Classes',
    description: 'Sign language instruction for hearing and deaf community members',
    targetAudience: 'General community, families with deaf members',
    status: 'Planned',
    communityBenefit: 'Inclusive communication skills, support for deaf community',
  },
];

// Community partnerships
export const communityPartnerships = [
  {
    partner: 'Turf Baptist Church',
    project: 'Sewer Line Infrastructure',
    year: 2021,
    collaborationType: 'Joint infrastructure development',
    benefit: 'Shared sewer line maintenance and upgrade',
  },
  {
    partner: 'Turf Baptist Church',
    project: 'Sign Language Volunteer Teachers',
    year: 2021,
    collaborationType: 'Educational resource sharing',
    benefit: 'Volunteer teachers for sign language instruction',
  },
  {
    partner: 'Turf Urban Zone Schools',
    project: 'Inter-school Sports and Academic Competitions',
    year: 2021,
    collaborationType: 'Educational consortium',
    schools: [
      'Regisbridge',
      'Munashe',
      'Maranatha',
      'Turf 2',
      'Otfields',
      'Good Shepherd',
    ],
    benefit: 'Shared competitions in athletics, ball games, music, chess, quiz',
  },
];

// Fundraising initiatives
export const fundraisingInitiatives = [
  {
    event: 'Civvies Day',
    frequency: 'Termly',
    description: 'Casual dress day with small entry fee',
    fees: {
      ecd: 1, // USD
      primary: 2, // USD
    },
    additionalActivities: ['Tuckshop sales', 'Special treats'],
    purpose: 'School development and equipment',
  },
  {
    event: 'Tuckshop Days',
    frequency: 'Special occasions',
    description: 'Snack and refreshment sales to learners',
    purpose: 'Small-scale fundraising',
  },
  {
    event: 'Equipment Donations Appeal',
    description: 'Request for community donations',
    targetItems: [
      'Desktop computers',
      'Laptops',
      'French learning materials (pamphlets, books, flyers)',
      'Sports equipment',
    ],
    purpose: 'Enhanced learning resources',
  },
];

// Community location and context
export const communityContext = {
  location: 'Turf Village, Mhondoro Ngezi',
  communityType: 'Mining community',
  population: 'Highly populated',
  educationalScarcity: 'Limited learning institutions in the area',
  schoolRole: 'Private player working with Ministry of Education to meet community needs',
  catchmentAreas: ['Bedrooms area', 'Co-house area', 'Surrounding villages'],
};

// Parent engagement programs
export const parentEngagementPrograms = [
  {
    name: 'Annual General Meeting (AGM)',
    frequency: 'Annually',
    purpose: 'Fee ratification, school policy decisions, transparency',
    attendance: 'All parents invited',
    decisionMaking: 'Democratic voting on key issues',
  },
  {
    name: 'Consultation Days',
    frequency: 'End of each term',
    duration: '3 days',
    format: 'Personalized appointments',
    purpose: 'Individual learner progress discussion',
  },
  {
    name: 'ECD and Grade 1 Orientation',
    frequency: 'Beginning of academic year',
    purpose: 'Introduce new parents to school environment and policies',
    targetGroup: 'New ECD and Grade 1 parents',
  },
  {
    name: 'Open Door Policy',
    description: "Head's office always open to discuss learner issues",
    accessibility: 'Year-round',
    purpose: 'Address concerns and challenges promptly',
  },
];

// Social media and communication
export const communicationChannels = {
  facebook: 'Regisbridge Private Primary School',
  purpose: 'Community engagement, updates, announcements',
  emailContacts: ['tmutimbire@icloud.com'],
  phoneContacts: ['+263773065311', '+263779097410'],
};

// Volunteer opportunities
export const volunteerOpportunities = [
  {
    role: 'Sports Coaching',
    disciplines: ['Athletics', 'Ball games', 'Swimming', 'Other sports'],
    timeCommitment: 'Sports days (Tuesdays and Thursdays)',
    qualifications: 'Experience in coaching or sports',
  },
  {
    role: 'Sign Language Instruction',
    source: 'Local church volunteers',
    status: 'Being organized',
    benefit: 'Support deaf and hearing learners',
  },
  {
    role: 'Resource Persons',
    subjects: ['Mathematics', 'Agriculture', 'Sciences'],
    purpose: 'Supplement teacher instruction with expertise',
    timeCommitment: 'Flexible',
  },
];

// Social responsibility initiatives
export const socialResponsibilityInitiatives = [
  {
    initiative: 'COVID-19 Safety Measures',
    measures: [
      'Infrared thermometer screening',
      'Sanitization gun deployment',
      'Handwash stations (5 buckets)',
      'Safety protocol education',
    ],
    priority: 'High',
  },
  {
    initiative: 'Boarding Facility for Distance Learners',
    established: 2019,
    purpose: 'Support learners who cannot commute daily due to distance',
    benefit: 'Educational access for remote areas',
  },
  {
    initiative: 'Transport Service',
    purpose: 'Safe transport for learners',
    safety: 'SDC chairperson accompanies drivers',
    affordability: '$16/month',
  },
  {
    initiative: 'Royal Angels Learners Integration',
    year: 2021,
    action: 'Temporary accommodation of learners from closed Royal Angels school',
    infrastructureResponse: 'Construction of additional 1x3 classroom block',
  },
];

// Community impact metrics
export const communityImpactMetrics = {
  totalLearners: {
    ecd: 91,
    primary: 'Not specified',
    total: 'Over 100+',
  },
  employmentCreated: {
    teachers: 15,
    ancillaryStaff: 7,
    transportDrivers: 2,
    constructionWorkers: 'Temporary',
  },
  infrastructureContribution: {
    sewerLineProject: 'Joint with Turf Baptist Church',
    educationalFacilities: '3 classroom blocks, computer lab, boarding facility',
    sportsFacilities: 'Ball game pitches, basketball court, tennis court',
  },
  educationalAccess: 'Filling scarcity of learning institutions in mining community',
};
