import React from 'react';

export interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  iconColor?: string;
  iconBgColor?: string;
  valueColor?: string;
  className?: string;
}

/**
 * Stat Card Component
 * 
 * Displays a statistic with an icon, large value, and label
 * Matches the stats section from premium_school_homepage design
 */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  iconColor = 'text-design-primary',
  iconBgColor = 'bg-design-primary/10',
  valueColor = 'text-design-primary',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center text-center gap-1 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}>
      <div className={`p-3 ${iconBgColor} rounded-full mb-2 ${iconColor}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className={`text-3xl font-bold tracking-tight ${valueColor}`}>{value}</p>
      <p className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">{label}</p>
    </div>
  );
};

export default StatCard;
