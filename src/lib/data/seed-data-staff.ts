/**
 * Staff Data from Monthly Reports
 * Real staff information extracted from March-April 2021 report
 */

export interface StaffMember {
  id: string;
  name: string;
  ecNumber: string;
  position: string;
  department: string;
  qualifications: {
    oLevel: boolean;
    aLevel: boolean;
    diploma: string | null;
    degree: string | null;
  };
  experience: string;
  startDate?: string;
}

export const staffMembers: StaffMember[] = [
  // School Leadership
  {
    id: 'staff-001',
    name: 'T. Mutambasere',
    ecNumber: '0225902 V',
    position: 'Head Teacher',
    department: 'Administration',
    qualifications: {
      oLevel: true,
      aLevel: true,
      diploma: null,
      degree: 'B.Ed Administration',
    },
    experience: '20+ years as teacher and head',
    startDate: '2021-03-15',
  },
  {
    id: 'staff-002',
    name: 'P.K. Mhlanga',
    ecNumber: '0884950 B',
    position: 'Deputy Head',
    department: 'Administration',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed General',
      degree: null,
    },
    experience: '10+ years',
  },

  // ECD Department
  {
    id: 'staff-003',
    name: 'T. Munyani',
    ecNumber: 'M155134',
    position: 'Teacher In Charge (TIC)',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: null,
      degree: 'B.Ed ECD',
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-004',
    name: 'T. Shambare',
    ecNumber: '1992967S',
    position: 'ECD Teacher',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed ECD',
      degree: null,
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-005',
    name: 'C. Gwazawafa',
    ecNumber: '1336237X',
    position: 'ECD Teacher',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed ECD',
      degree: null,
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-006',
    name: 'T. Matinia',
    ecNumber: '',
    position: 'Teacher',
    department: 'Primary',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed General',
      degree: null,
    },
    experience: '2-5 years',
  },
  {
    id: 'staff-007',
    name: 'G. Nyadenga',
    ecNumber: '1998279R',
    position: 'ECD Teacher',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed ECD',
      degree: null,
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-008',
    name: 'T. Goneso',
    ecNumber: 'M162944',
    position: 'ECD Teacher',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: null,
      degree: 'B.Ed ECD',
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-009',
    name: 'M. Gotora',
    ecNumber: '1995241P',
    position: 'ECD Teacher',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed ECD',
      degree: null,
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-010',
    name: 'E. Hondo',
    ecNumber: '1997245S',
    position: 'ECD Teacher',
    department: 'ECD',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed ECD',
      degree: null,
    },
    experience: '5-10 years',
  },

  // Primary Department
  {
    id: 'staff-011',
    name: 'E. Dhiura',
    ecNumber: '5503670Z',
    position: 'Primary Teacher',
    department: 'Primary',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed General',
      degree: null,
    },
    experience: '5-10 years',
  },
  {
    id: 'staff-012',
    name: 'M. Nhende',
    ecNumber: '2004836T',
    position: 'Primary Teacher',
    department: 'Primary',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed General',
      degree: null,
    },
    experience: '1-2 years',
  },
  {
    id: 'staff-013',
    name: 'R. Nyamaropa',
    ecNumber: '1996507Q',
    position: 'Grade 3 Teacher',
    department: 'Primary',
    qualifications: {
      oLevel: true,
      aLevel: false,
      diploma: 'Diploma in Ed General',
      degree: null,
    },
    experience: '1-2 years',
  },
  {
    id: 'staff-014',
    name: 'W. Mafunga',
    ecNumber: '0998176Y',
    position: 'ICT Coordinator',
    department: 'ICT',
    qualifications: {
      oLevel: true,
      aLevel: true,
      diploma: 'Diploma in Ed General',
      degree: null,
    },
    experience: '5-10 years',
  },
];

// Staff Statistics (as of April 2021)
export const staffStats = {
  totalStaff: 14,
  qualifications: {
    degrees: 3,
    diplomasGeneral: 6,
    diplomasECD: 5,
  },
  departments: {
    administration: 2,
    ecd: 7,
    primary: 4,
    ict: 1,
  },
  experience: {
    lessThan2Years: 2,
    twoToTenYears: 11,
    moreThan20Years: 1,
  },
};

// Boarding Staff (4 staff members + 2 kitchen staff)
export const boardingStaffCount = {
  caregivers: 4,
  kitchen: 2,
  total: 6,
};

export default staffMembers;
