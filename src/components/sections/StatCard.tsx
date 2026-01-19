import React from 'react';

export interface StatCardProps {
  value: string | number;
  label: string;
  icon?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  variant?: 'default' | 'navy' | 'gold';
  className?: string;
}

/**
 * Reusable stat card component
 * For displaying key metrics and statistics
 * Used across dashboard pages and info sections
 * 
 * @example
 * <StatCard 
 *   value="450" 
 *   label="Total Students" 
 *   icon="school"
 *   variant="navy"
 * />
 */
export default function StatCard({
  value,
  label,
  icon,
  trend,
  variant = 'default',
  className = '',
}: StatCardProps) {
  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    navy: 'bg-brand-navy text-white border border-brand-navy-light',
    gold: 'bg-brand-gold text-brand-navy border border-brand-gold-dark',
  };

  const iconColor = {
    default: 'text-brand-navy',
    navy: 'text-brand-gold',
    gold: 'text-brand-navy',
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 ${variantStyles[variant]} ${className}`}>
      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-between mb-2">
          <span className={`material-symbols-outlined text-[32px] ${iconColor[variant]}`}>
            {icon}
          </span>
          {trend && (
            <span className={`text-sm font-bold flex items-center gap-1 ${
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="material-symbols-outlined text-[16px]">
                {trend.direction === 'up' ? 'trending_up' : 'trending_down'}
              </span>
              {trend.value}
            </span>
          )}
        </div>
      )}

      {/* Value */}
      <div className="text-3xl md:text-4xl font-black mb-1">
        {value}
      </div>

      {/* Label */}
      <div className={`text-sm font-medium ${
        variant === 'navy' ? 'text-gray-300' : 
        variant === 'gold' ? 'text-brand-navy/80' : 
        'text-gray-600'
      }`}>
        {label}
      </div>
    </div>
  );
}
