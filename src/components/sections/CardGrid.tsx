import React from 'react';

export interface CardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Reusable responsive card grid component
 * Handles responsive column layouts automatically
 * Used 30+ times for feature grids, service lists, etc.
 * 
 * @example
 * <CardGrid columns={3} gap="lg">
 *   <Card>...</Card>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </CardGrid>
 */
export default function CardGrid({
  children,
  columns = 3,
  gap = 'lg',
  className = '',
}: CardGridProps) {
  // Column variants (mobile → tablet → desktop)
  const columnStyles = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  // Gap variants
  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={`grid grid-cols-1 ${columnStyles[columns]} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  );
}
