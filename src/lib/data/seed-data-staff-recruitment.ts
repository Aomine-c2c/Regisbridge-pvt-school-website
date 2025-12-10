/**
 * STAFF RECRUITMENT & PERSONNEL DATA
 * Source: Teacher CVs, employment documents, staff information
 * Extracted from: docs/aaa.md (lines 1900-2014)
 */

export interface TeacherCV {
  fullName: string;
  position: string;
  currentEmployer: string;
  yearsOfExperience: number;
  qualifications: {
    degree: string;
    institution: string;
    year: number;
  }[];
  employmentHistory: {
    school: string;
    position: string;
    startYear: number;
    endYear: number | 'Present';
    achievements?: string[];
  }[];
  specializations: string[];
  examSyllabi: string[];
  computerSkills: boolean;
  extraCurricular: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
  references: string;
}

export const teacherCVs: TeacherCV[] = [
  {
    fullName: 'Anthony Mutswari',
    position: 'English and History Head of Department',
    currentEmployer: 'St. Harriet High School',
    yearsOfExperience: 28, // 1993-2021
    qualifications: [
      {
        degree: 'Diploma in Education',
        institution: 'Gweru Teachers College',
        year: 1993,
      },
      {
        degree: 'BA English and Communication Studies',
        institution: 'Zimbabwe Open University',
        year: 2007,
      },
    ],
    employmentHistory: [
      {
        school: 'St. Harriet High School',
        position: 'HOD English and History',
        startYear: 2019,
        endYear: 'Present',
        achievements: [
          'Managing English and History departments',
          'Curriculum coordination and staff supervision',
        ],
      },
      {
        school: 'Washington High School',
        position: 'English and Literature Teacher',
        startYear: 2016,
        endYear: 2019,
        achievements: [
          '93% pass rate in IGCSE English (2017)',
          '100% pass rate in A Level Literature (2017-2018)',
          'Boarding master duties',
        ],
      },
      {
        school: 'Herentals College',
        position: 'English and History Teacher',
        startYear: 2013,
        endYear: 2015,
        achievements: [
          'Cambridge O Level and A Level teaching',
          'Sports master for handball and swimming',
        ],
      },
      {
        school: 'Various schools',
        position: 'English, History, Shona Teacher',
        startYear: 1993,
        endYear: 2013,
        achievements: [
          '20 years of teaching across multiple institutions',
          'Consistent academic excellence',
        ],
      },
    ],
    specializations: [
      'English Language',
      'English Literature',
      'History',
      'Shona Language',
    ],
    examSyllabi: [
      'Cambridge IGCSE',
      'Cambridge O Level',
      'Cambridge A Level',
      'ZIMSEC',
    ],
    computerSkills: true,
    extraCurricular: [
      'Handball',
      'Swimming',
      'Athletics',
      'Boarding supervision',
      'Student counseling',
    ],
    contactInfo: {
      email: 'mutsvaria@gmail.com',
      phone: '+263772989231',
    },
    references: 'Available upon request',
  },
];

// Leadership transitions (from newsletter)
export const leadershipTransitions = [
  {
    date: '2021-02',
    event: 'Mr. Musodza resigned as headmaster',
    reason: 'Personal reasons',
    note: 'Served school with dedication',
  },
  {
    date: '2021-03-15',
    event: 'Mr. Mutambasere started as new headmaster',
    background: 'Experienced educator',
    welcome: 'Warmly welcomed by school community',
  },
];

// Staff qualifications summary
export const staffQualificationsSummary = {
  minimumQualification: 'Diploma in Education',
  highestQualification: 'Bachelor of Education',
  ecdTeachers: {
    qualification: 'Diploma in Early Childhood Development',
    specialization: 'Infant teaching',
  },
  primaryTeachers: {
    qualifications: ['Diploma in Education', 'Bachelor of Education'],
    subjects: 'All primary subjects',
  },
  specialistTeachers: {
    french: {
      availability: 'Full-time',
      levels: 'ECD to Grade 7 + adult classes',
    },
  },
  totalStaff: 15,
  maleStaff: 6,
  femaleStaff: 9,
  note: 'All staff are qualified professionals',
};

// Desired staff qualities (from recruitment materials)
export const desiredStaffQualities = [
  'Qualified teachers (Diploma or degree in Education)',
  'Subject specialization (English, Maths, Sciences)',
  'Experience with Cambridge syllabi',
  'Computer literacy',
  'Boarding school experience',
  'Extra-curricular skills (sports, music, drama)',
  'Student counseling abilities',
  'Strong classroom management',
  'Parent communication skills',
  'Teamwork and collaboration',
];

// Staff development priorities
export const staffDevelopmentPriorities = [
  'Continuous professional development workshops',
  'Cambridge syllabus training',
  'ICT integration in teaching',
  'Student-centered learning methodologies',
  'Assessment and evaluation techniques',
  'Special needs education',
  'Classroom management strategies',
  'Parent engagement strategies',
];

// Boarding staff responsibilities
export const boardingStaffResponsibilities = [
  'Student welfare and supervision',
  'Night duty rotation',
  'Health and safety monitoring',
  'Discipline management',
  'Study time supervision',
  'Meal time coordination',
  'Parent communication',
  'Emergency response',
];
