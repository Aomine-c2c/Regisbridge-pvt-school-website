'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
}

// Parse stat value to extract number, suffix, and check for percentage
function parseStatValue(value: string) {
  // Handle percentages (e.g., "100%", "98%")
  if (value.includes('%')) {
    return {
      number: parseFloat(value.replace('%', '')),
      suffix: '%',
      hasColon: false,
    };
  }
  
  // Handle ratios (e.g., "1:10")
  if (value.includes(':')) {
    // For ratios, we'll just animate the first number
    const parts = value.split(':');
    return {
      number: parseFloat(parts[0]),
      suffix: `:${parts[1]}`,
      hasColon: true,
    };
  }
  
  // Handle plain numbers with + suffix (e.g., "50+")
  if (value.includes('+')) {
    return {
      number: parseFloat(value.replace('+', '')),
      suffix: '+',
      hasColon: false,
    };
  }
  
  // Plain number
  return {
    number: parseFloat(value),
    suffix: '',
    hasColon: false,
  };
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3, triggerOnce: true });
  const { number, suffix } = parseStatValue(value);
  
  const animatedValue = useCountUp({
    end: isVisible ? number : 0,
    duration: 2500,
    start: 0,
    suffix: suffix,
  });

  return (
    <figure 
      ref={ref}
      className="flex flex-col items-center text-center gap-1 p-4 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <div 
        className={`p-3 bg-brand-gold/10 rounded-full mb-2 text-brand-gold transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
      </div>
      <p 
        className={`text-3xl font-bold tracking-tight text-brand-gold transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        {animatedValue}
      </p>
      <figcaption 
        className={`text-gray-500 font-medium text-sm uppercase tracking-wide transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        {label}
      </figcaption>
    </figure>
  );
}
