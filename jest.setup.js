import "@testing-library/jest-dom"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => "",
}))

// Mock next/headers
jest.mock("next/headers", () => ({
  headers: () => new Map(),
  cookies: () => new Map(),
}))

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})
