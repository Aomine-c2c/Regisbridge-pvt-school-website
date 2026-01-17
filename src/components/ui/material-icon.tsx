import React from 'react';

export interface MaterialIconProps {
  icon: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  filled?: boolean;
}

const sizeMap = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
  '4xl': 'text-6xl',
};

/**
 * Material Icon Component
 * 
 * Wrapper for Google Material Symbols Outlined icons
 * @param icon - Icon name (e.g., 'school', 'menu', 'check_circle')
 * @param className - Additional CSS classes
 * @param size - Icon size preset
 * @param filled - Whether to use filled variant
 */
export const MaterialIcon: React.FC<MaterialIconProps> = ({
  icon,
  className = '',
  size = 'md',
  filled = false,
}) => {
  const sizeClass = sizeMap[size];
  const filledClass = filled ? 'material-symbols-outlined-filled' : '';
  
  return (
    <span className={`material-symbols-outlined ${sizeClass} ${filledClass} ${className}`}>
      {icon}
    </span>
  );
};

export default MaterialIcon;
