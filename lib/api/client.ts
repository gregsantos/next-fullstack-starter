import {env} from "@/env.mjs"

interface ApiError {
  message: string
  status: number
}

interface ApiResponse<T> {
  data: T
  status: number
}

interface ApiClientConfig {
  baseUrl: string
  headers?: Record<string, string>
}

// Custom error class for API errors
export class ApiRequestError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "ApiRequestError"
  }
}

// Add a factory function to create the API client with config
export const createApiClient = (config: ApiClientConfig) => {
  const baseUrl = config.baseUrl

  async function handleResponse<T>(
    response: Response
  ): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: response.statusText,
        status: response.status,
      }))

      throw new ApiRequestError(response.status, error.message)
    }

    const data = await response.json()
    return {data, status: response.status}
  }

  return {
    async get<T>(path: string, params?: Record<string, string>): Promise<T> {
      const url = new URL(`${baseUrl}${path}`)
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value)
        })
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
      })

      const {data} = await handleResponse<T>(response)
      return data
    },

    async post<T, TData = unknown>(path: string, data?: TData): Promise<T> {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      const {data: responseData} = await handleResponse<T>(response)
      return responseData
    },

    async put<T>(path: string, data: unknown): Promise<ApiResponse<T>> {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        body: JSON.stringify(data),
      })
      const responseData = await handleResponse<T>(response)
      return responseData
    },

    async delete<T>(path: string): Promise<ApiResponse<T>> {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "DELETE",
        headers: {
          ...config.headers,
        },
      })
      const data = await handleResponse<T>(response)
      return data
    },
  }
}

// Create a default instance
export const apiClient = createApiClient({
  baseUrl: env.NEXT_PUBLIC_API_URL,
})
