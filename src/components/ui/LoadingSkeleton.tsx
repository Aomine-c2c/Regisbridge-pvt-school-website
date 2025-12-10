'use client';

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'image' | 'stat' | 'avatar' | 'button';
  className?: string;
  lines?: number;
}

export default function LoadingSkeleton({ 
  variant = 'text', 
  className = '',
  lines = 3 
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-300 rounded';

  if (variant === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} h-4 ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} p-6 ${className}`}>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-400 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-400 rounded w-3/4" />
            <div className="h-3 bg-gray-400 rounded w-full" />
            <div className="h-3 bg-gray-400 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="w-full aspect-video bg-gray-400" />
      </div>
    );
  }

  if (variant === 'stat') {
    return (
      <div className={`${baseClasses} p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-3" />
        <div className="h-8 bg-gray-400 rounded w-20 mx-auto mb-2" />
        <div className="h-3 bg-gray-400 rounded w-24 mx-auto" />
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="w-12 h-12 bg-gray-400 rounded-full" />
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className={`${baseClasses} h-12 w-32 ${className}`} />
    );
  }

  return null;
}

// Preset loading components
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} variant="card" />
      ))}
    </div>
  );
}

export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} variant="stat" />
      ))}
    </div>
  );
}

export function ImageGallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} variant="image" className="aspect-square" />
      ))}
    </div>
  );
}
