import {QueryClient} from "@tanstack/react-query"
import {ApiRequestError} from "@/lib/api/client"

// Retry delay with exponential backoff
const getRetryDelay = (failureCount: number) => {
  return Math.min(1000 * Math.pow(2, failureCount), 30000) // Max 30 seconds
}

// Determine if error should trigger a retry
const shouldRetry = (error: unknown) => {
  // Don't retry client errors (400-499)
  if (
    error instanceof ApiRequestError &&
    error.status >= 400 &&
    error.status < 500
  ) {
    return false
  }

  // Don't retry specific error cases
  if (error instanceof ApiRequestError) {
    const noRetryStatuses = [401, 403, 404, 409, 422]
    if (noRetryStatuses.includes(error.status)) {
      return false
    }
  }

  return true
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: (failureCount, error) => {
        if (!shouldRetry(error)) return false
        return failureCount < 3 // Max 3 retries
      },
      retryDelay: getRetryDelay,
    },
    mutations: {
      retry: (failureCount, error) => {
        if (!shouldRetry(error)) return false
        return failureCount < 2 // Max 2 retries for mutations
      },
      retryDelay: getRetryDelay,
    },
  },
})
