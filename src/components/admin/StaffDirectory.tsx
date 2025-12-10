// StaffDirectory Component - Display real staff data from 2021
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Clock, 
  Search,
  Building2
} from 'lucide-react';
import { staffMembers, staffStats } from '@/lib/data/seed-data-staff';
import { AdminHeader } from './shared/AdminHeader';

export function StaffDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.ecNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || 
      staff.department.toLowerCase() === filterDepartment.toLowerCase();
    
    return matchesSearch && matchesDepartment;
  });

  const getQualificationBadge = (staff: typeof staffMembers[0]) => {
    if (staff.qualifications.degree) {
      return <Badge className="bg-purple-600">Degree</Badge>;
    } else if (staff.qualifications.diploma) {
      return <Badge className="bg-blue-600">Diploma</Badge>;
    }
    return null;
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Administration': 'bg-[#1C1A75]',
      'ECD': 'bg-green-600',
      'Primary': 'bg-blue-600',
      'ICT': 'bg-orange-600',
    };
    return colors[department] || 'bg-gray-600';
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Staff Directory (2021)"
        description="Teaching staff from March-April 2021 monthly report"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-[#1C1A75]">{staffStats.totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Degrees</p>
                <p className="text-2xl font-bold text-purple-600">{staffStats.qualifications.degrees}</p>
              </div>
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ECD Teachers</p>
                <p className="text-2xl font-bold text-green-600">{staffStats.departments.ecd}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Primary Teachers</p>
                <p className="text-2xl font-bold text-blue-600">{staffStats.departments.primary}</p>
              </div>
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, position, or EC number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search staff members"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
              aria-label="Filter by department"
            >
              <option value="all">All Departments</option>
              <option value="Administration">Administration</option>
              <option value="ECD">ECD</option>
              <option value="Primary">Primary</option>
              <option value="ICT">ICT</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <Card key={staff.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{staff.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{staff.position}</p>
                </div>
                <Badge className={getDepartmentColor(staff.department)}>
                  {staff.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-700">EC Number:</span>
                <span className="text-gray-600">{staff.ecNumber || 'N/A'}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {staff.qualifications.oLevel && (
                      <Badge variant="outline" className="text-xs">O Level</Badge>
                    )}
                    {staff.qualifications.aLevel && (
                      <Badge variant="outline" className="text-xs">A Level</Badge>
                    )}
                    {getQualificationBadge(staff)}
                  </div>
                </div>

                {staff.qualifications.degree && (
                  <p className="text-xs text-gray-600 ml-6">{staff.qualifications.degree}</p>
                )}
                {staff.qualifications.diploma && (
                  <p className="text-xs text-gray-600 ml-6">{staff.qualifications.diploma}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{staff.experience}</span>
              </div>

              {staff.startDate && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Joined: {new Date(staff.startDate).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No staff members found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Qualifications Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">By Qualification</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Degrees:</span>
                  <span className="font-semibold">{staffStats.qualifications.degrees}</span>
                </li>
                <li className="flex justify-between">
                  <span>Diplomas (General):</span>
                  <span className="font-semibold">{staffStats.qualifications.diplomasGeneral}</span>
                </li>
                <li className="flex justify-between">
                  <span>Diplomas (ECD):</span>
                  <span className="font-semibold">{staffStats.qualifications.diplomasECD}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">By Department</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Administration:</span>
                  <span className="font-semibold">{staffStats.departments.administration}</span>
                </li>
                <li className="flex justify-between">
                  <span>ECD:</span>
                  <span className="font-semibold">{staffStats.departments.ecd}</span>
                </li>
                <li className="flex justify-between">
                  <span>Primary:</span>
                  <span className="font-semibold">{staffStats.departments.primary}</span>
                </li>
                <li className="flex justify-between">
                  <span>ICT:</span>
                  <span className="font-semibold">{staffStats.departments.ict}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">By Experience</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>0-2 years:</span>
                  <span className="font-semibold">{staffStats.experience.lessThan2Years}</span>
                </li>
                <li className="flex justify-between">
                  <span>2-10 years:</span>
                  <span className="font-semibold">{staffStats.experience.twoToTenYears}</span>
                </li>
                <li className="flex justify-between">
                  <span>20+ years:</span>
                  <span className="font-semibold">{staffStats.experience.moreThan20Years}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 text-center py-4 border-t">
        <p>Staff data from March-April 2021 monthly report</p>
        <p className="mt-1">14 qualified teachers + 6 boarding/kitchen staff</p>
      </div>
    </div>
  );
}
