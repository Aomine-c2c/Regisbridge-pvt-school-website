// AdminHeader Component - Header for admin pages with breadcrumbs
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface AdminHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
}

export function AdminHeader({
  title,
  description,
  breadcrumbs,
  action,
}: AdminHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin')}
            className="h-auto p-0 hover:bg-transparent"
          >
            <Home className="h-4 w-4" />
          </Button>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>/</span>
              {item.path ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(item.path!)}
                  className="h-auto p-0 hover:bg-transparent hover:underline"
                >
                  {item.label}
                </Button>
              ) : (
                <span className="font-medium text-gray-900">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Title and Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-gray-600 mt-1">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
