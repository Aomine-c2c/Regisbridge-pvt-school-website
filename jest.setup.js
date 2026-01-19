// Learn more: https://github.com/testing-library/jest-dom
// In v6+ of @testing-library/jest-dom, importing extends expect automatically
import * as matchers from '@testing-library/jest-dom/matchers'
import { jest, expect, beforeAll, afterAll } from '@jest/globals'
if (typeof expect !== 'undefined' && expect.extend) {
  expect.extend(matchers)
}

// Note: Environment variables are now set in jest.config.cjs to avoid parsing issues

// Lightweight WHATWG Fetch API polyfills for tests that rely on Request/Response/Headers
// Only add minimal shims if truly missing (Node 18+ and Next.js usually provide these)
(() => {
  try {
    const g = globalThis;
    const w = typeof window !== 'undefined' ? window : undefined;

    // Headers - use existing if available
    if (typeof g.Headers === 'undefined' && w && w.Headers) {
      g.Headers = w.Headers;
    }
    // Only add minimal shim if still truly missing (rare in modern environments)
    if (typeof g.Headers === 'undefined') {
      g.Headers = class HeadersShim {
        constructor(init) { this.map = new Map(Object.entries(init || {})); }
        get(k) { return this.map.get(String(k).toLowerCase()); }
        set(k, v) { this.map.set(String(k).toLowerCase(), String(v)); }
        append(k, v) { this.set(k, v); }
        has(k) { return this.map.has(String(k).toLowerCase()); }
      };
    }

    // Note: undici polyfills are now loaded at top of file before any imports
  } catch {
    // Silently ignore polyfill errors - tests will fail if truly needed
  }
})();

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  redirect: jest.fn(),
}))

// Mock Next.js headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
  headers: jest.fn(() => new Map()),
}))

// Suppress console errors during tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
