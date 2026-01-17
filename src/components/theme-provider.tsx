'use client'

import * as React from 'react'

// Dark mode disabled - light mode only
// Stub to prevent import errors
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// Stub hook to prevent errors in components that still reference it
export const useTheme = () => ({
  theme: 'light' as const,
  setTheme: () => { },
  themes: ['light'] as const
})
