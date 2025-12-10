/**
 * FACILITIES & BOARDING DATA
 * Source: Health Inspection Report (April 29, 2021) - Turf Clinic
 * Extracted from: docs/aaa.md
 */

export interface HealthInspectionReport {
  date: string;
  inspectorOrganization: string;
  inspectorName: string;
  inspectorRole: string;
  reportType: string;
  findings: {
    boysHostel: {
      capacity: number;
      currentOccupancy: number;
      staff: number;
      rooms: Array<{
        roomNumber: number;
        size: string;
        occupancy: number;
        beds: string;
      }>;
      issues: string[];
    };
    girlsHostel: {
      capacity: number;
      currentOccupancy: number;
      rooms: Array<{
        roomNumber: number;
        size: string;
        occupancy: number;
        beds: string;
      }>;
      issues: string[];
      ablutionFacilities: string;
    };
    kitchen: {
      location: string;
      issues: string[];
    };
    general: string[];
  };
  recommendations: string[];
  followUpDate: string;
  conclusion: string;
}

export const healthInspectionApril2021: HealthInspectionReport = {
  date: '2021-04-29',
  inspectorOrganization: 'Turf Clinic',
  inspectorName: 'Marira Memory',
  inspectorRole: 'Environmental Health Practitioner',
  reportType: 'Boarding Facilities COVID-19, Sanitation and Hygiene Inspection',
  findings: {
    boysHostel: {
      capacity: 10,
      currentOccupancy: 8,
      staff: 2,
      rooms: [
        {
          roomNumber: 1,
          size: '18m²',
          occupancy: 4,
          beds: '2 bunk beds',
        },
      ],
      issues: [
        'Windows were closed on inspection day',
        'Staff room untidy with dusty floors',
        'Rooms overcrowded considering floor area',
        'No adequate ventilation',
        'No adequate ablution facilities',
        'Walls had cobwebs',
      ],
    },
    girlsHostel: {
      capacity: 7,
      currentOccupancy: 7,
      rooms: [
        {
          roomNumber: 1,
          size: '<20m²',
          occupancy: 4,
          beds: '2 bunk beds',
        },
        {
          roomNumber: 2,
          size: '<20m²',
          occupancy: 3,
          beds: '1 bunk bed + 1 mattress on floor',
        },
      ],
      issues: [
        'Room floor area less than 20m² cannot accommodate 4 students',
        'One student sleeping on mattress on floor',
        'Walls had cobwebs',
      ],
      ablutionFacilities: 'adequate',
    },
    kitchen: {
      location: 'In boys hostel building',
      issues: [
        'Food stuffs and vegetables stored on the floor',
        'Kitchen dirty including stove and deep freezer',
        'No food preparation places or storage places for food stuffs',
        'No ventilation - all windows closed',
      ],
    },
    general: [
      'School selling cement near student hostels',
      'No screening of customers at gate - COVID-19 risk',
    ],
  },
  recommendations: [
    'Kitchen to have basic kitchen equipment in good working order',
    'Kitchen to have food preparation area and storage area for utensils, cookware',
    'All food handlers to be medically examined',
    'All windows to be opened to allow adequate natural ventilation',
    'Cleaning of floors and removal of cobwebs',
    'Bunk beds to be replaced by single beds',
    'Room to accommodate only 2 students for social distancing',
    'No weddings or sporting activities allowed until advised otherwise',
    'Screening of all visiting persons at the gate',
    'Limit the number of people entering hostel grounds',
  ],
  followUpDate: '2021-05-13',
  conclusion:
    'The school hostel premises do not meet minimum requirements. A lot needs to be done to improve living conditions and avoid disease outbreak. Follow-up inspection in 2 weeks.',
};

// Boarding statistics from the health report
export const boardingStatistics2021 = {
  totalCapacity: 17,
  totalOccupancy: 15,
  boysHostel: {
    students: 8,
    staff: 2,
    totalOccupants: 10,
  },
  girlsHostel: {
    students: 7,
    staff: 0, // Staff not specified in report
    totalOccupants: 7,
  },
  staffAssigned: 4, // From monthly report: 4 assigned members
  kitchenStaff: 2, // From monthly report
};

// Infrastructure projects from management meeting agenda
export interface InfrastructureProject {
  category: string;
  projectName: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

export const infrastructureProjects: InfrastructureProject[] = [
  {
    category: 'Construction',
    projectName: 'School Block - Roofing',
    status: 'in-progress',
    priority: 'high',
    description: 'One by three rooms classroom block at roofing stage',
  },
  {
    category: 'Construction',
    projectName: 'Staff House - Roofing',
    status: 'in-progress',
    priority: 'high',
    description: 'One staff house at roofing stage',
  },
  {
    category: 'Construction',
    projectName: 'School Block - Beam Filling',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Construction',
    projectName: 'School Block - Plastering',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Construction',
    projectName: 'School Block - Flooring',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Construction',
    projectName: 'School Block - Painting',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Construction',
    projectName: 'Bricks Moulding',
    status: 'planning',
    priority: 'low',
  },
  {
    category: 'Construction',
    projectName: 'Culture Hut',
    status: 'planning',
    priority: 'low',
  },
  {
    category: 'Boarding',
    projectName: 'Tiling Matinia\'s Room',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Boarding',
    projectName: 'Curtain Rails - All Rooms',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Boarding',
    projectName: 'Sewer System Upgrade',
    status: 'planning',
    priority: 'high',
    description: 'Repair of toilet and shower systems in boarding house',
  },
  {
    category: 'Boarding',
    projectName: 'Fireplace Installation',
    status: 'planning',
    priority: 'low',
  },
  {
    category: 'Boarding',
    projectName: 'Beds Maintenance',
    status: 'planning',
    priority: 'medium',
    description: 'Bunk beds to be replaced by single beds per health inspection',
  },
  {
    category: 'Boarding',
    projectName: 'Wardrobes Purchase',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Boarding',
    projectName: 'Geysers Installation',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Maintenance',
    projectName: 'Main Gates Repair',
    status: 'planning',
    priority: 'high',
    description: 'Repair two main gates to prevent domestic animals entering',
  },
  {
    category: 'Maintenance',
    projectName: 'School Building Repainting',
    status: 'planning',
    priority: 'medium',
  },
  {
    category: 'Equipment',
    projectName: 'Garden Tools & Work Suits',
    status: 'planning',
    priority: 'low',
    description: 'More garden tools and work suits for grounds men',
  },
  {
    category: 'Equipment',
    projectName: 'COVID-19 Equipment',
    status: 'planning',
    priority: 'high',
    description: 'Additional thermometer and extra suits',
  },
  {
    category: 'Equipment',
    projectName: 'Writing Boards',
    status: 'planning',
    priority: 'medium',
    description: 'More writing boards in classrooms',
  },
  {
    category: 'Equipment',
    projectName: 'Furniture Repair',
    status: 'planning',
    priority: 'medium',
    description: 'Repair broken furniture and purchase new chairs for infant classes',
  },
];

// Income generating projects identified
export const incomeGeneratingProjects = [
  {
    name: 'Bee Keeping',
    status: 'identified',
    category: 'Agriculture',
    priority: 'medium',
  },
  {
    name: 'Chicken Rearing',
    status: 'identified',
    category: 'Agriculture',
    priority: 'medium',
  },
  {
    name: 'School Garden',
    status: 'planning',
    category: 'Agriculture',
    priority: 'medium',
  },
];

// Facilities summary
export const facilitiesSummary = {
  boardingCapacity: 17,
  currentBoarders: 15,
  classrooms: 12, // Based on 12 grades/classes
  staffHouses: 1, // Under construction
  playgroundFacilities: ['Basketball court'],
  safetyMeasures: {
    covid19: [
      '5 masks per student',
      'Social distancing (max 20 kids per class)',
      'Hand washing at gate',
      'Sanitization',
      'Temperature checking',
      'Regular fumigation of classrooms',
    ],
  },
  boardingAmenities: [
    'Television set for entertainment',
    'Telephone facility for parent communication',
    'Daily room and toilet cleaning',
    'Specified meal timetable and diet',
  ],
  teacherWelfare: [
    'Tea at 10 o\'clock with bread',
    'Lunch at 1 o\'clock',
    'Salary increases 30-40% (effective May 2021)',
  ],
};
