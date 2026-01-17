/**
 * Design System Tokens
 * Extracted from premium_school_homepage design templates
 * 
 * This file centralizes all design tokens from the new design system:
 * - Colors (primary blue, backgrounds, text)
 * - Typography (Inter font family, sizes)
 * - Spacing (padding, margins, gaps)
 * - Border radius values
 * - Shadows and effects
 */

export const designTokens = {
  // Color Palette
  colors: {
    // Primary Colors - Deep Purple/Plum (from school blazers, hats, logo)
    primary: {
      DEFAULT: '#5A1F3C',      // Deep Purple/Plum - Main brand color
      dark: '#3d1429',         // Darker shade for hover states
      light: '#7a2e52',        // Lighter shade for backgrounds
      50: '#faf5f7',
      100: '#f4e6ed',
      200: '#e8cdd9',
      300: '#d9a8bb',
      400: '#a85479',
      500: '#5A1F3C',
      600: '#3d1429',
      700: '#2d0f1e',
      800: '#1e0a14',
      900: '#0f050a',
    },

    // Secondary Colors - Royal/Navy Blue (from logo outline, ties, motto)
    secondary: {
      DEFAULT: '#2E2B7B',      // Royal/Navy Blue - Secondary brand color
      dark: '#1f1c53',         // Darker shade
      light: '#4542a8',        // Lighter shade
      50: '#f5f5fc',
      100: '#e8e7f7',
      200: '#d1cfed',
      300: '#b5b2e2',
      400: '#7873c4',
      500: '#2E2B7B',
      600: '#1f1c53',
      700: '#17143d',
      800: '#0f0d28',
      900: '#080714',
    },
    
    // Background Colors
    backgroundLight: '#f6f6f8',   // Light mode background
    backgroundDark: '#101622',    // Dark mode background
    
    // Surface Colors
    surface: {
      white: '#ffffff',
      gray50: '#f9fafb',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray800: '#1f2937',
      gray900: '#111827',
    },
    
    // Text Colors
    text: {
      dark: '#3A3A3A',         // Charcoal (from uniform skirts, shorts, shoes)
      light: '#616f89',
      muted: '#9ca3af',
      secondary: '#4b5563',       // Secondary text
      white: '#ffffff',          // White text (dark backgrounds)
      gray200: '#e5e7eb',        // Light gray text
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      gray600: '#4b5563',
    },
    
    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Accent Colors (from designs)
    purple: '#9333ea',
    amber: '#f59e0b',
  },
  
  // Typography
  typography: {
    fontFamily: {
      display: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '900',
    },
    
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // Spacing (matching Tailwind defaults but documented)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',     // 2px
    DEFAULT: '0.25rem',  // 4px (from design)
    md: '0.375rem',     // 6px
    lg: '0.5rem',       // 8px (from design)
    xl: '0.75rem',      // 12px (from design)
    '2xl': '1rem',      // 16px
    '3xl': '1.5rem',    // 24px
    full: '9999px',     // Fully rounded
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Animation Timings
  animation: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Layout
  layout: {
    maxWidth: {
      container: '1400px',
      content: '1200px',
    },
    
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
} as const;

// Type exports for TypeScript
export type DesignTokens = typeof designTokens;
export type ColorToken = keyof typeof designTokens.colors;
export type SpacingToken = keyof typeof designTokens.spacing;
