// StudentManagement Component - Manage students
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function StudentManagement() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Student Management"
        description="Enroll and manage student records, grades, and attendance"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Enroll Student
          </Button>
        }
      />
      
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-600">Student management interface ready for implementation</p>
        <p className="text-sm text-gray-500 mt-2">Features: Enrollment, grades, attendance tracking</p>
      </div>
    </div>
  );
}
