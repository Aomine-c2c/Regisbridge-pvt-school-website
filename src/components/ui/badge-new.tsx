import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'purple' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  primary: 'bg-blue-100 dark:bg-blue-900/30 text-design-primary',
  secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  purple: 'bg-purple-600 text-white',
  amber: 'bg-amber-600 text-white',
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-3 py-1',
  lg: 'text-sm px-4 py-1.5',
};

/**
 * Badge Component
 * 
 * Small tag/label component for categories, status, and labels
 * Matches the badge styles from the design templates
 */
export const BadgeNew: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  return (
    <span 
      className={cn(
        'inline-block font-bold rounded-full uppercase tracking-wide',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default BadgeNew;
