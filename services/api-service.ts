import { env } from '@/env.mjs';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiService = {
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...init } = options;
    const url = new URL(`${env.NEXT_PUBLIC_API_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  },
}; 