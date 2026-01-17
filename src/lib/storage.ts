import { isBrowser } from '@/lib/platform'

export const getItem = (key: string): string | null => {
  if (!isBrowser()) return null
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

export const setItem = (key: string, value: string): void => {
  if (!isBrowser()) return
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    // ignore storage errors (quota, disabled, etc.)
  }
}

export const removeItem = (key: string): void => {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(key)
  } catch (e) {
    // ignore
  }
}

export const getJSON = <T = any>(key: string): T | null => {
  const raw = getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch (e) {
    return null
  }
}

export const setJSON = (key: string, value: unknown): void => {
  try {
    setItem(key, JSON.stringify(value))
  } catch (e) {
    // ignore
  }
}

export default {
  getItem,
  setItem,
  removeItem,
  getJSON,
  setJSON,
}
