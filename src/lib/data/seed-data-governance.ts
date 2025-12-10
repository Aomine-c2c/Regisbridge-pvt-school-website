/**
 * GOVERNANCE & CONSTITUTION DATA
 * Source: School Constitution documents from aaa.md
 * Extracted: School structure, management, rules, and policies
 */

export interface Director {
  name: string;
  title: string;
  role: string;
  qualifications: string[];
  experience: string;
  responsibilities: string[];
}

export interface BoardStructure {
  boardOfDirectors: {
    numberOfDirectors: number;
    quorum: number;
    directors: Director[];
  };
  schoolManagementBoard: {
    minimumMembers: number;
    responsibilities: string[];
    financialAuthority: {
      dailyExpenses: string;
      monthlyLimit: string;
      requiresApproval: string;
    };
  };
  sdcBoard: {
    name: string;
    selectionMethod: string;
    minimumMembers: number;
    maximumMembers: number;
    remuneration: string;
    responsibilities: string[];
  };
}

export const directors: Director[] = [
  {
    name: 'Tichaona Mutimbire',
    title: 'Founding Director & Executive Chairman',
    role: 'Policy implementation and business development strategy',
    qualifications: [
      'Bachelor\'s Degree in Telecommunications',
      'MBA (in progress) - Midlands State University, Gweru',
    ],
    experience: 'Engineering background with business management studies',
    responsibilities: [
      'Spearheading policy implementation',
      'Business development strategy',
      'Overall governance and direction',
    ],
  },
  {
    name: 'Precious Nyadenga',
    title: 'Operations Director & Principal',
    role: 'Day-to-day school management and operations',
    qualifications: [
      'Diploma in Education - Seke Teachers College, Zimbabwe',
      'Diploma in Business Studies - Damelin, South Africa',
    ],
    experience:
      'Vast experience in education industry in Zimbabwe, Italy, and South Africa as kindergarten principal. With the group since 2012.',
    responsibilities: [
      'Day-to-day school management',
      'Enrolment decisions',
      'Logistical support to teaching staff',
      'Interface with stakeholders',
      'Principal Director of Regisbridge Primary School',
    ],
  },
];

export const governanceStructure: BoardStructure = {
  boardOfDirectors: {
    numberOfDirectors: 2,
    quorum: 2,
    directors: directors,
  },
  schoolManagementBoard: {
    minimumMembers: 1, // At least one director must be included
    responsibilities: [
      'Day-to-day running of the school',
      'Hiring and firing of school employees',
      'Incurrence of expenses $100-$300 per month',
      'Purchase of assets or inventory $100-$300',
      'Entering into leases $200-$500 annually',
      'Contract management $100-$300',
    ],
    financialAuthority: {
      dailyExpenses: 'Up to $300 USD per month',
      monthlyLimit: '$300 USD',
      requiresApproval: 'Expenses over $300 require Board of Directors approval',
    },
  },
  sdcBoard: {
    name: 'School Development Committee (SDC)',
    selectionMethod: 'Elected by vote of parents in annual meeting',
    minimumMembers: 4,
    maximumMembers: 8,
    remuneration: 'None - unpaid volunteer service',
    responsibilities: [
      'Representation of parents and children interests',
      'Overseeing expenditure of SDC funds',
      'Overseeing safety and health of all children',
      'Overseeing transport and catering services',
      'Organizing annual activities',
      'Interface between parents and school management',
    ],
  },
};

// School positioning statements
export const schoolPositioning = {
  philosophy:
    'Learning is a joyful journey that begins from a young age and continues throughout our lives culminating in a lifelong pursuit of knowledge and wisdom. We achieve this as a close knit family, bound by respect for each other, the children, our clients, families, the community and the environment.',
  vision:
    'To be a leading global institute in the provision of quality early childhood, primary and secondary education programmes as well as training and professional development for lifelong learners.',
  mission:
    'To foster a learning organisation in partnership with parents, global institutions and organisations to provide innovative educational and training programmes towards the development of dynamic individuals with strong moral values and a passion for lifelong learning.',
  motto: 'Supervincimus (Latin) – More than conquerors',
  coreValues: [
    {
      name: 'Excellence',
      description: 'We have an excellent spirit which motivates us in everything we do',
    },
    {
      name: 'Wisdom',
      description:
        'We treasure wisdom in its three forms: Sophia (insight into reality), Phronesis (prudence and mindset), Sunesis (comprehension and understanding)',
    },
    {
      name: 'Success',
      description:
        'We believe in impacting the whole world with an investment of our personality to make the world a better place than we found it',
    },
    {
      name: 'Diligence',
      description:
        'We value conscientiousness in paying proper attention to a task, exercising carefulness, persistence and determination',
    },
    {
      name: 'Integrity',
      description: 'We value honesty and strong moral principles, and moral uprightness',
    },
  ],
};

// School history
export const schoolHistory = {
  founded: 2012,
  originalName: 'Royal Angels Preparatory School',
  originalPurpose: 'Early childhood development centre for Turf community children',
  expansion: {
    year: 2018,
    milestone: 'Regisbridge Private School established',
    services: [
      'Day and boarding facilities',
      'ECD to Grade 7',
      'Future expansion to Form 6 planned',
    ],
  },
  currentEnrollment: 286, // As of April 2021
  locations: [
    {
      name: 'Regisbridge Private School',
      address: 'Stand 3502, Turf Village, Mhondoro Ngezi, Zimbabwe',
      levels: 'ECD to Grade 7',
      boardingAvailable: true,
    },
  ],
};

// Financial management policies
export const financialPolicies = {
  bankAccounts: {
    minimum: 3,
    location: 'Banks local to Ngezi Turf',
    signatories: 2,
    withdrawalRequirement: 'Two signatures of appointed directors',
  },
  pettyCash: {
    accounts: 1,
    managedBy: 'School Management Board',
    signatories: 1,
    transactionLimit: '$50 USD - transactions above must be at bank',
  },
  dailyBanking: {
    threshold: '$100 USD',
    requirement: 'Deposit by end of banking day if daily takings exceed threshold',
  },
  approvalLevels: {
    managementBoard: {
      expenses: '$100-$300 USD per month',
      assets: '$100-$300 USD',
      leases: '$200-$500 USD annually',
      contracts: '$100-$300 USD',
    },
    boardOfDirectors: {
      expenses: 'Over $300 USD',
      assets: 'Over $300 USD',
      leases: 'Over $500 USD annually',
      contracts: 'Over $300 USD',
      other: ['New line of business', 'Director appointments', 'Pro bono projects'],
    },
  },
};

// Behavior standards and discipline policies
export const disciplinePolicies = {
  principles: ['Respect', 'Responsibility', 'Rights'],
  disruptiveBehaviors: {
    minor: [
      'Chronic minor offences',
      'Smoking',
      'Profanity',
      'Disrespect',
      'Insubordination',
      'Failure to obey instructions',
      'Forging notes or excuses',
      'Non-attendance or poor attendance',
      'Loitering',
      'Petty theft',
      'Fighting',
      'Bullying',
    ],
    severe: [
      'Vandalism',
      'Disruption to school operations',
      'Verbal abuse',
      'Racial and/or discriminatory misconduct',
      'Sexual harassment or assault',
      'Sexual misconduct or abuse',
      'Physical violence or abuse',
      'Use or possession of weapons',
      'Illegal activity',
    ],
  },
  forbiddenConsequences: [
    'Corporal punishment',
    'Collective responsibility (group punishment)',
    'Academic work as disciplinary procedure',
    'Evaluation procedures as disciplinary procedure',
    'Immobilisation, isolation or humiliating techniques',
  ],
  guidanceTechniques: [
    'Prevention',
    'Encouraging',
    'Recording',
    'Redirection',
    'Distraction',
    'Ignoring (for non-harmful behaviors)',
    'Natural Consequences',
    'Logical Consequences',
  ],
};

// Stakeholder duties
export const stakeholderDuties = {
  students: [
    'Participate fully in learning opportunities',
    'Attend school regularly and punctually',
    'Contribute to orderly and safe learning environment',
    'Respect the rights of others',
    'Comply with discipline policies',
  ],
  parents: [
    'Support children in achieving learning success',
    'Ensure children attend school as required',
    'Communicate regularly with school',
    'Ensure basic needs are met (well-nourished, well-rested)',
    'Support teachers in education efforts',
    'Pay school fees on first day of term',
    'Inform school of child\'s special requirements',
  ],
  teachers: [
    'Respect the rights of students',
    'Teach diligently prescribed subjects',
    'Implement positive teaching strategies',
    'Encourage students in pursuit of learning',
    'Monitor teaching effectiveness',
    'Accommodate different learning styles',
    'Participate in individual program planning',
    'Review learning expectations and progress regularly',
    'Create and maintain orderly, safe learning environment',
    'Maintain appropriate order and discipline',
    'Show concern for dignity and welfare of students',
    'Attend to health, comfort and safety of students',
  ],
  principal: [
    'Act as educational leader',
    'Ensure reasonable steps for safe, orderly, effective learning environment',
    'Overall responsibility for school including teachers and staff',
  ],
  supportStaff: [
    'Maintain attitude of concern for dignity and welfare of students',
    'Cooperate with school board, principal, teachers, staff',
    'Maintain orderly, safe, supportive learning environment',
    'Respect the rights of students',
  ],
};

// School's legal and constitutional information
export const legalInformation = {
  officialName: 'Regisbridge Private College',
  registeredAddress: 'Stand 3502, Turf Village, Mhondoro Ngezi, Zimbabwe',
  alternateAddress: 'Stand 1208, Turf Village, Mhondoro Ngezi, Zimbabwe', // Mentioned in constitution variant
  email: 'tmutimbire@icloud.com',
  phone: '+263 78 345 4496',
  alternatePhone: '+263 77 306 5311',
  purpose:
    'Providers of educational services, tuition in academic, professional and technical fields, examination centers, libraries, distance education facilities, and representatives for tertiary institutions',
  jurisdiction: 'Republic of Zimbabwe',
  localAuthority: 'Mhondoro Ngezi Rural District Council',
};
