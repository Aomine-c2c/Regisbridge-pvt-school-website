import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  maxWidth?: '960px' | '1200px' | '1400px' | '1600px';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'gray' | 'navy' | 'transparent';
  className?: string;
}

/**
 * Reusable section container component
 * Provides consistent padding and max-width across pages
 * Used 50+ times across the site
 * 
 * @example
 * <Section maxWidth="1200px" padding="lg">
 *   <h2>Section Content</h2>
 * </Section>
 */
export default function Section({
  children,
  maxWidth = '1200px',
  padding = 'lg',
  background = 'transparent',
  className = '',
}: SectionProps) {
  // Padding variants
  const paddingStyles = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24',
  };

  // Background variants
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    navy: 'bg-brand-navy text-white',
    transparent: 'bg-transparent',
  };

  // Max width mapping - using fixed classes for Tailwind JIT
  const maxWidthClasses = {
    '960px': 'max-w-[960px]',
    '1200px': 'max-w-[1200px]',
    '1400px': 'max-w-[1400px]',
    '1600px': 'max-w-[1600px]',
  } as const;

  return (
    <section className={`${paddingStyles[padding]} ${backgroundStyles[background]} ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
}
