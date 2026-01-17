/**
 * Lightweight platform helpers
 * Provide a single place to check for browser availability
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export const safeWindow = <T>(fn: () => T, fallback?: T): T | undefined => {
  if (!isBrowser()) return fallback
  try {
    return fn()
  } catch (e) {
    // swallow to avoid breaking SSR; caller may handle undefined
    return fallback
  }
}
