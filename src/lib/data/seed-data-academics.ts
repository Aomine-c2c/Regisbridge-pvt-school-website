/**
 * ACADEMIC PROGRAMS & CURRICULUM DATA
 * Source: Term 1 2021 Newsletter, Registration Applications, Class Branding
 * Extracted from: docs/aaa.md (lines 1700-2014)
 */

export interface GradeSevenResults {
  year: number;
  totalLearners: number;
  subjectResults: {
    subject: string;
    units: number;
    candidates: number;
    passRate: string;
  }[];
  overallPassRate: string;
  notes: string;
}

export const gradeSeven2020Results: GradeSevenResults = {
  year: 2020,
  totalLearners: 12,
  subjectResults: [
    {
      subject: 'English',
      units: 1,
      candidates: 12,
      passRate: '100%',
    },
    {
      subject: 'Mathematics',
      units: 1,
      candidates: 12,
      passRate: '75%',
    },
    {
      subject: 'Shona',
      units: 1,
      candidates: 12,
      passRate: '100%',
    },
    {
      subject: 'General Paper',
      units: 1,
      candidates: 12,
      passRate: '100%',
    },
    {
      subject: 'Agriculture',
      units: 1,
      candidates: 12,
      passRate: '75%+',
    },
  ],
  overallPassRate: '83.5%',
  notes:
    'Only 2 learners failed to pass with 6 or better in all 5 subjects. Mathematics was the most challenging subject.',
};

// New Grade 7 syllabus subjects (2021 onwards)
export const newGradeSevenSyllabus = {
  implementationYear: 2021,
  subjects: [
    'Mathematics',
    'English Language',
    'Indigenous Language (Shona)',
    'Agriculture, Science and Technology',
    'Social Sciences',
    'Physical Education and Arts',
  ],
  examBoard: 'ZIMSEC',
  note: 'Departure from old syllabus system - parents urged to buy necessary textbooks',
};

// Class and Block Branding (Inspirational naming system)
export interface BlockBranding {
  blockName: string;
  newName: string;
  namedAfter: string;
  significance: string;
}

export interface ClassBranding {
  grade: string;
  birdName: string;
  symbolism?: string;
}

export const blockBranding: BlockBranding[] = [
  {
    blockName: 'Computer Lab / ECD Block',
    newName: 'Charles Babbage Block',
    namedAfter: 'Charles Babbage',
    significance: 'Inventor of computers',
  },
  {
    blockName: 'Grade 1, 2, 3 Block',
    newName: 'John Pestalozzi Block',
    namedAfter: 'John Pestalozzi',
    significance: 'Renowned educationist',
  },
  {
    blockName: 'Grade 4 Block',
    newName: 'Alexander Bell Block',
    namedAfter: 'Alexander Graham Bell',
    significance: 'Inventor of the telephone',
  },
  {
    blockName: 'Grade 5, 6, 7 Block',
    newName: 'Isaac Newton Block',
    namedAfter: 'Isaac Newton',
    significance: 'Discovered force of gravity, physical mathematics and formulas',
  },
];

export const classBranding: ClassBranding[] = [
  { grade: 'ECD A', birdName: 'Macaws', symbolism: 'Colorful and vibrant learners' },
  { grade: 'ECD B1', birdName: 'Parrots', symbolism: 'Vocal and expressive' },
  { grade: 'ECD B2', birdName: 'Kingfishers', symbolism: 'Quick and precise' },
  { grade: 'Grade 1', birdName: 'Rollers', symbolism: 'Graceful beginners' },
  { grade: 'Grade 2', birdName: 'Falcons', symbolism: 'Sharp and focused' },
  { grade: 'Grade 3', birdName: 'Cranes', symbolism: 'Elegant and balanced' },
  { grade: 'Grade 4', birdName: 'Skylarks', symbolism: 'High-flying achievers' },
  { grade: 'Grade 5', birdName: 'Weavers', symbolism: 'Builders and creators' },
  { grade: 'Grade 6', birdName: 'Flamingos', symbolism: 'Unique and confident' },
  { grade: 'Grade 7', birdName: 'Eagles', symbolism: 'Leaders and champions' },
];

// Foreign language programs
export const foreignLanguagePrograms = {
  french: {
    language: 'French',
    implementationYear: 2020,
    levels: 'ECD to Grade 7',
    adultClasses: true,
    communityAccess: true,
    fee: 'Available at fee',
    status: 'Active',
    note: 'School appeals for French pamphlets, books, flyers to support program',
  },
  signLanguage: {
    language: 'Sign Language',
    implementationYear: 'Planned',
    purpose: 'Language used by deaf people',
    instructors: 'Volunteer teachers from local churches',
    status: 'Planning',
  },
};

// Academic improvement strategies (2021)
export const academicImprovementStrategies = [
  'Increase studying time including morning work and weekend studies',
  'Use more past examination papers',
  'Teachers encouraged to give more homework',
  'Source resource persons especially for Maths and Agriculture',
  'Encourage learners to visit villages during holidays for Shona cultural learning',
  'Display Shona artifacts (duri, mutswi, rusero) brought from home',
  'Use of videos, CDs, and TV for Science and Agriculture',
  'Parent support highly appreciated',
];

// Reading program
export const readingProgram = {
  name: 'Take Reading Home',
  description: 'Joint venture between parents, kids, and teachers',
  frequency: 'Daily',
  levels: 'ECD to Grade 7',
  monitoring: 'Ready-made reading communication books (especially infant classes)',
  parentRole: 'Ensure kids read daily, comment on progress',
  teacherRole: 'Spearhead program, assist with challenges, monitor progress',
};

// Sports houses
export const sportsHouses = ['Aquila', 'Sparta', 'Fraser'];

// Sports programs and competitions
export const sportsPrograms = {
  season2021: 'Athletics (complicated by COVID-19)',
  restrictions: 'Ministry has not given clear mandate for competitions',
  structure: {
    interhouse: 'Competitions within school houses',
    interschool: 'Competitions with other schools',
    zonal: 'Turf Urban Zone competitions',
  },
  turfUrbanZone: {
    name: 'Turf Urban Zone',
    schools: [
      'Regisbridge',
      'Munashe',
      'Maranatha',
      'Turf 2',
      'Otfields',
      'Good Shepherd',
    ],
    disciplines: ['Athletics', 'Ball games', 'Music', 'Chess', 'Quiz', 'More'],
  },
  sportsDays: 'Tuesdays and Thursdays',
  dresscode: 'Sports attires on sports days',
};

// Timetable and schedule
export const schoolSchedule = {
  winterTimetable: {
    primary: '08:15 AM',
    ecd: '08:45 AM',
  },
  assemblyDays: ['Monday', 'Wednesday'],
  assemblyDressCode: 'Purple blazers, purple sun hats, long-sleeved jerseys and tracksuits (winter)',
  sportsDays: ['Tuesday', 'Thursday'],
};

// End of term activities (Term 1 2021)
export const term1Activities = {
  civviesDay: '2021-05-12',
  civviesFees: {
    ecd: 1, // USD
    primary: 2, // USD
    note: 'Fundraising day - parents free to give generously',
  },
  tuckshopDay: '2021-05-12',
  termlyTests: {
    start: '2021-05-17',
    end: '2021-05-28',
    grades: 'Grade 1 to 7',
  },
  consultation: {
    start: '2021-05-31',
    end: '2021-06-02',
    note: 'Personalised consultation appointments issued a week before',
  },
  closingDate: '2021-06-04',
  earlyClosing: '2021-06-03', // Regisbridge closes a day early
};

// Examination center status
export const examinationCenter = {
  status: 'Full-fledged Grade 7 examination center',
  examBoard: 'ZIMSEC',
  sittingsCompleted: 3,
  safeInstalled: true,
  note: 'Safe required by ZIMSEC to store exams securely before writing',
};

// Computer lab expansion
export const computerLabProgram = {
  desktops: {
    year2020Addition: 3,
    purpose: 'Reduce learner ratio per computer',
  },
  policy: {
    studentLaptops: 'Allowed to bring own laptops during ICT lessons',
    eLearning: 'Promoting e-learning approach',
    communityAccess: 'Open to community for computer studies',
  },
  futurePlans: {
    hexcoCentre: 'Planned professional course center',
    fundraising: 'Appeals for donations of desktops and laptops',
  },
  socialMedia: 'Regisbridge Private Primary School on Facebook',
};

// Music and character development
export const musicProgram = {
  philosophy:
    'Music is a powerful language with potential to mould behavior and character',
  activities: [
    'National Anthem singing',
    'Brand school song',
    'National pledges recitation at Assembly',
  ],
  goal: 'Raise children who are academically excellent, morally and emotionally upright',
};

// Academic calendar structure
export const academicCalendarStructure = {
  openingPolicy: 'Opens before Government schools',
  closingPolicy: 'Closes a day before Government schools',
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
    weeks: 14,
  },
  note: 'Dates subject to COVID-19 adjustments',
};

// Holiday expectations for parents
export const holidayExpectations = [
  'Kids continue to read books during holidays',
  'Kids write holiday homework',
  'All torn uniforms mended before next term',
  'Kids have complete winter uniforms',
  'All fees paid on or before school opening',
  'Parents buy necessary books and equipment',
];

// Medium of instruction
export const mediumOfInstruction = {
  language: 'English',
  levels: 'ECD to Grade 7',
  note: 'Learners enjoy conversing in English',
};

// Staffing summary (from newsletter)
export const staffingSummaryNewsletter = {
  total: 15,
  male: 6,
  female: 9,
  qualifications: 'Diploma in Education to Bachelor of Education degrees',
  ecdTeachers: {
    total: 'All specialized in Infant teaching',
    qualification: 'Diplomas in ECD',
  },
  frenchTeacher: {
    gender: 'Female',
    availability: 'Available for adult classes',
  },
};

// Infrastructural development (from newsletter)
export const infrastructureDevelopment2021 = {
  boarding: {
    established: 2019,
    purpose: 'For those who cannot afford to walk due to distances',
  },
  staffHouse: {
    started: 2020,
    expectedCompletion: 'End of 2021',
    status: 'Under construction',
  },
  classroomBlock: {
    size: '1x3 classrooms',
    purpose: 'Accommodate learners from temporarily closed Royal Angels',
    status: 'Under construction',
  },
  directors: 'Mr and Mrs Mutimbire',
  note: 'Salute to directors for wonderful construction support',
};
