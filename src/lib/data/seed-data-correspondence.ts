/**
 * OFFICIAL CORRESPONDENCE & APPLICATIONS
 * Source: Letters to authorities, regulatory applications, official documents
 * Extracted from: docs/aaa.md (lines 1598-1900)
 */

export interface OfficialLetter {
  date: string;
  from: string;
  to: string;
  subject: string;
  purpose: string;
  keyDetails: string[];
  attachments?: string[];
}

// Change of Use Application (Royal Angels to Private College)
export const changeOfUseApplication: OfficialLetter = {
  date: '2021-06-15',
  from: 'Regisbridge Private Primary School / Royal Angels',
  to: 'Mhondoro Ngezi Rural District Council',
  subject: 'Change of Use Application',
  purpose: 'Convert Royal Angels Preparatory School to private secondary college (Form 1-6)',
  keyDetails: [
    'Current: Royal Angels Preparatory School',
    'Proposed: Private College offering Form 1 through Form 6',
    'Intended start date: June 28, 2021',
    'Application submitted with necessary documentation',
    'Awaiting council approval',
  ],
  attachments: ['Change of Use Application Form', 'School registration documents'],
};

// Sewer Line Project Collaboration Letter
export const sewerLineProjectLetter: OfficialLetter = {
  date: '2021-05-11',
  from: 'Regisbridge Private Primary School',
  to: 'Turf Baptist Church',
  subject: 'Sewer Line Infrastructure Project Collaboration',
  purpose: 'Joint infrastructure project for sewer line between church and school',
  keyDetails: [
    'Collaborative project between Turf Baptist Church and Regisbridge School',
    'Total project cost: $1,007 USD',
    'Cost sharing: Cement $114, Gravel $60, Steel $16, Stones $55',
    'Additional costs: Pipe $132, Bricks $130, Labour $500',
    'Community infrastructure improvement',
    'Mutual benefit for both institutions',
  ],
};

// Registration Application to Provincial Educational Director
export const provincialRegistrationApplication: OfficialLetter = {
  date: '2021-06',
  from: 'Regisbridge Private Primary School',
  to: 'Provincial Educational Director, Chinhoyi',
  subject: 'School Registration Application',
  purpose: 'Official registration of Regisbridge Private Primary School with provincial authorities',
  keyDetails: [
    'Location: Stand 3502, Kadoma',
    'Land size: 4 hectares',
    'Infrastructure: 3 classroom blocks',
    'Staffing: 7 qualified teachers',
    'Seeking provincial education authority approval',
  ],
  attachments: [
    'School layout plan',
    'Staff qualification certificates',
    'Health inspection certificates',
    'Fire safety compliance',
  ],
};

// Registration Application to District Schools Inspector
export const districtRegistrationApplication: OfficialLetter = {
  date: '2021-06-16',
  from: 'Regisbridge Private Primary School',
  to: 'District Schools Inspector, Kadoma',
  subject: 'District School Registration Application',
  purpose: 'Formal registration with district education office',
  keyDetails: [
    'Location: Stand 1208, Kadoma',
    'Land size: 1000 square meters',
    'Infrastructure: 6 classrooms',
    'Staffing: 6 qualified teachers',
    'Compliance with district education standards',
  ],
  attachments: [
    'School registration form',
    'Teacher registration certificates',
    'Infrastructure assessment',
  ],
};

// Administrative Arrangements Document
export const administrativeArrangementsDocument = {
  title: 'School Administrative Arrangements',
  date: '2021',
  purpose: 'Define administrative responsibilities and operational procedures',
  sections: [
    {
      category: 'Student Affairs',
      responsibilities: [
        'School uniforms ordering, distribution, and monitoring',
        'Textbook ordering and distribution',
        'Student records management',
        'Student welfare programs',
        'Discipline management',
      ],
    },
    {
      category: 'Academic Affairs',
      responsibilities: [
        'Curriculum implementation oversight',
        'Examination coordination',
        'Timetable management',
        'Resource procurement',
        'Teacher professional development',
      ],
    },
    {
      category: 'Co-curricular Affairs',
      responsibilities: [
        'Extracurricular activities coordination',
        'Sports programs management',
        'Music and arts programs',
        'Event planning and execution',
      ],
    },
    {
      category: 'Support Services',
      responsibilities: [
        'Student counseling services',
        'Parent-teacher communication',
        'Health and safety monitoring',
        'Special needs support',
        'Transport coordination',
      ],
    },
  ],
};

// Employment Termination Process (Official HR Document)
export const employmentTerminationProcess = {
  title: 'Employment Termination Form',
  purpose: 'Standardized exit process for departing employees',
  clearanceDepartments: [
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
  ],
  financialCalculations: {
    CILL: 'Calculated Individual Loan Liability',
    CILN: 'Calculated Individual Loan Number',
    PAYEE: 'Tax deduction on final pay',
    NSSA: 'Social security contribution',
  },
  exitInterviewRequired: true,
  clearanceCertificateIssued: 'Upon completion of all clearances',
};

// Correspondence tracking system
export const correspondenceCategories = [
  'Regulatory Applications',
  'Parental Communication',
  'Inter-school Communication',
  'Government Correspondence',
  'Community Partnerships',
  'Vendor Communication',
  'Staff Communication',
  'Board Communication',
];

export const regulatoryComplianceChecklist = [
  'Provincial education authority registration',
  'District education office registration',
  'Health inspection certificates',
  'Fire safety compliance',
  'ZIMSEC examination center approval',
  'Change of use permissions (for expansion)',
  'Annual operational licenses',
  'Staff qualification verification',
  'Student records compliance',
];
