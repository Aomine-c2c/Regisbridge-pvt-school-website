'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';

import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext';

import { SchoolThemeProvider } from '@/components/providers/SchoolThemeProvider';

export function Providers({ children, features, tenant }: { children: React.ReactNode; features?: any; tenant?: any }) {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg: any) => console.log('SW Registered', reg))
        .catch((err: any) => console.error('SW Registration Error', err));
    }
  }, []);

  return (
    <SettingsProvider>
      <AuthProvider>
        <SchoolThemeProvider tenant={tenant}>
            <FeatureFlagProvider features={features}>
            {children}
            </FeatureFlagProvider>
        </SchoolThemeProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
