// ContentManagement Component - Manage news and announcements
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ContentManagement() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Content Management"
        description="Create and manage news, announcements, and events"
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create News
          </Button>
        }
      />
      
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-gray-600">Content management interface ready for implementation</p>
        <p className="text-sm text-gray-500 mt-2">Features: News, announcements, events, gallery</p>
      </div>
    </div>
  );
}
