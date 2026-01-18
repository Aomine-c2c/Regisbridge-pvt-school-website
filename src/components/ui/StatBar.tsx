'use client';

import React from 'react';

export interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  percentage?: number;
  showValue?: boolean;
  color?: 'primary' | 'gold' | 'green' | 'blue' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatBar({
  label,
  value,
  maxValue = 100,
  percentage,
  showValue = true,
  color = 'primary',
  size = 'md',
  className = '',
}: StatBarProps) {
  const calculatedPercentage = percentage ?? (value / maxValue) * 100;
  const clampedPercentage = Math.min(Math.max(calculatedPercentage, 0), 100);

  const colorClasses = {
    primary: 'bg-[#0B1F3B]',
    gold: 'bg-brand-gold',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-400',
  };

  const bgColorClasses = {
    primary: 'bg-[#0B1F3B]/10',
    gold: 'bg-brand-gold/10',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    gray: 'bg-gray-100',
  };

  const textColorClasses = {
    primary: 'text-[#0B1F3B]',
    gold: 'text-brand-gold',
    green: 'text-green-700',
    blue: 'text-blue-700',
    gray: 'text-gray-700',
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const displayValue = percentage !== undefined ? `${Math.round(percentage)}%` : value.toString();

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label and Value */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showValue && (
          <span className={`text-sm font-bold ${textColorClasses[color]}`}>
            {displayValue}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className={`w-full ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <div
          className={`${heightClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${displayValue}`}
        />
      </div>
    </div>
  );
}

interface StatBarListProps {
  stats: Omit<StatBarProps, 'className'>[];
  className?: string;
}

export function StatBarList({ stats, className = '' }: StatBarListProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {stats.map((stat, index) => (
        <StatBar key={index} {...stat} />
      ))}
    </div>
  );
}
