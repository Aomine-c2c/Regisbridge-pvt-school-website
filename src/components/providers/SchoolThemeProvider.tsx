'use client';

import { useEffect } from 'react';

interface SchoolThemeProviderProps {
  tenant?: {
    primaryColor?: string | null;
    secondaryColor?: string | null;
  } | null;
  children: React.ReactNode;
}

export function SchoolThemeProvider({ tenant, children }: SchoolThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    
    if (tenant?.primaryColor) {
      root.style.setProperty('--brand-navy', tenant.primaryColor);
    } else {
        // Fallback or default
        root.style.setProperty('--brand-navy', '#0F172A');
    }

    if (tenant?.secondaryColor) {
      root.style.setProperty('--brand-gold', tenant.secondaryColor);
    } else {
        // Fallback or default
        root.style.setProperty('--brand-gold', '#D97706');
    }
  }, [tenant]);

  return <>{children}</>;
}
