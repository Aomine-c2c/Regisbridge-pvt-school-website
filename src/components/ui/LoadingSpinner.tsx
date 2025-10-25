import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#1C1A75',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-2 animate-spin rounded-full`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Loading...',
  className = ''
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-lg p-8 flex items-center space-x-4 shadow-lg">
        <LoadingSpinner size="lg" />
        <span className="text-[#1C1A75] font-medium">{message}</span>
      </div>
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  lines = 1
}) => {
  const skeletonLines = Array.from({ length: lines }, (_, i) => (
    <div
      key={i}
      className={`animate-pulse bg-gray-200 rounded ${i === lines - 1 ? 'h-4' : 'h-4 mb-2'}`}
      style={{
        width: i === lines - 1 ? '60%' : '100%',
        height: '16px',
      }}
    />
  ));

  return (
    <div className={`space-y-2 ${className}`}>
      {skeletonLines}
    </div>
  );
};

export default LoadingSpinner;