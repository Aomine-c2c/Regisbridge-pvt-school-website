'use client'

import * as React from 'react'

//Dark mode disabled - light mode only
// Stub to prevent import errors
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// Proper hook implementation to prevent errors in components that reference it
export function useTheme() {
  const [theme] = React.useState('light' as const);
  
  return {
    theme,
    setTheme: (_theme: string) => {},
    themes: ['light'] as const
  };
}
