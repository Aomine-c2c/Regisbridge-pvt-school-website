// ReportsAnalytics Component - View reports and analytics
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Reports & Analytics"
        description="Generate reports and view detailed analytics"
        action={
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        }
      />
      
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-600">Reports & analytics interface ready for implementation</p>
        <p className="text-sm text-gray-500 mt-2">Features: Custom reports, charts, data export</p>
      </div>
    </div>
  );
}
