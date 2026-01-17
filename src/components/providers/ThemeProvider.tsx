"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { isBrowser, safeWindow } from '@/lib/platform'
import { getItem, setItem } from '@/lib/storage'

type Theme = "dark" | "light" | "system"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

type ThemeProviderComponentProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderComponentProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (isBrowser()) {
      try {
        const savedTheme = getItem('theme')
        return (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system')
          ? (savedTheme as Theme)
          : (defaultTheme as Theme))
      } catch (e) {
        return defaultTheme as Theme
      }
    }
    return defaultTheme as Theme
  })

  useEffect(() => {
    if (!isBrowser()) return
    safeWindow(() => {
      const root = document.documentElement
      root.classList.remove('light', 'dark')

      if (theme === 'system') {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const systemTheme = mq.matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
        return
      }

      root.classList.add(theme)
    })
  }, [theme])

  const value: ThemeContextType = {
    theme,
    setTheme: (t: Theme) => {
      try {
        setItem('theme', t)
      } catch (e) {
        // ignore
      }
      setThemeState(t)
    },
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
