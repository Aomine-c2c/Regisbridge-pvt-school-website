import React from 'react';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  variant?: 'navy' | 'gold' | 'gradient' | 'image';
  backgroundImage?: string;
  badges?: Array<{
    text: string;
    variant?: 'navy' | 'gold';
  }>;
  cta?: {
    text: string;
    href: string;
  };
  className?: string;
}

/**
 * Reusable page hero section component
 * Used across 30+ pages for consistent hero sections
 * 
 * @example
 * <PageHero 
 *   title="About Our Institution"
 *   subtitle="Excellence in education since 1974"
 *   variant="navy"
 * />
 */
export default function PageHero({
  title,
  subtitle,
  variant = 'navy',
  backgroundImage,
  badges,
  cta,
  className = '',
}: PageHeroProps) {
  // Background styles based on variant
  const backgroundStyles = {
    navy: 'bg-brand-navy',
    gold: 'bg-brand-gold',
    gradient: 'bg-gradient-to-r from-brand-navy to-brand-navy-light',
    image: backgroundImage 
      ? `bg-cover bg-center` 
      : 'bg-brand-navy',
  };

  // Text color based on variant
  const textColor = variant === 'gold' ? 'text-brand-navy' : 'text-white';

  return (
    <section
      className={`relative py-20 text-center ${backgroundStyles[variant]} ${className}`}
      style={variant === 'image' && backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(11, 31, 59, 0.7), rgba(11, 31, 59, 0.7)), url(${backgroundImage})`,
      } : undefined}
    >
      <div className="max-w-[960px] mx-auto px-4">
        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex justify-center gap-3 mb-6">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  badge.variant === 'gold'
                    ? 'bg-brand-gold text-brand-navy'
                    : 'bg-white/20 text-white'
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${textColor}`}>
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className={`text-lg md:text-xl ${
            variant === 'gold' ? 'text-brand-navy/80' : 'text-gray-200'
          } max-w-[720px] mx-auto`}>
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        {cta && (
          <div className="mt-8">
            <a
              href={cta.href}
              className="inline-block px-8 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg hover:bg-brand-gold-light transition-colors shadow-lg"
            >
              {cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
