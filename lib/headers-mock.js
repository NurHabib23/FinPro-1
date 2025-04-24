// Mock implementation of next/headers
export function cookies() {
  return {
    get: () => null,
    getAll: () => [],
    set: () => {},
    delete: () => {},
  }
}

export function headers() {
  return new Map()
}
