import '@testing-library/jest-dom/vitest'
// Basic jsdom shims for tests that access browser APIs at import time
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  // Minimal matchMedia mock
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as any
}

// Basic localStorage mock
if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {}
  // @ts-ignore
  globalThis.localStorage = {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => { store[key] = String(value) },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { Object.keys(store).forEach(k => delete store[k]) },
    key: (index: number) => Object.keys(store)[index] ?? null,
    length: 0,
  } as any
}

// Ensure document.cookie is writable in jsdom
try {
  Object.defineProperty(document, 'cookie', { writable: true, value: '' })
} catch {}
