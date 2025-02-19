import {useQuery, useMutation, QueryKey} from "@tanstack/react-query"
import {apiClient} from "@/lib/api/client"

interface QueryConfig<T> {
  queryKey: QueryKey
  enabled?: boolean
  select?: (data: T) => T
}

export function useApiQuery<T>(
  path: string,
  params?: Record<string, string>,
  config?: QueryConfig<T>
) {
  return useQuery({
    queryKey: config?.queryKey ?? [path, params],
    queryFn: () => apiClient.get<T>(path, params),
    enabled: config?.enabled,
    select: config?.select,
  })
}

export function useApiMutation<TData, TVariables>(
  path: string,
  config?: {
    onSuccess?: (data: TData) => void
    onError?: (error: Error) => void
  }
) {
  return useMutation({
    mutationFn: (variables: TVariables) =>
      apiClient.post<TData, TVariables>(path, variables),
    ...config,
  })
}
