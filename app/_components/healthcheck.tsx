"use client"

import {useApiQuery, useApiMutation} from "@/lib/hooks/api-hooks"
import {useState, useEffect} from "react"

interface HealthCheck {
  status: string
  timestamp: string
  received?: unknown
}

export function HealthCheckComponent() {
  const [isClient, setIsClient] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const {data, isLoading, error} = useApiQuery<HealthCheck>(
    "health",
    undefined,
    {
      queryKey: ["health"],
    }
  )

  const {mutate, isPending: isMutating} = useApiMutation<
    HealthCheck,
    {someData: string}
  >("health", {
    onSuccess: () => {
      setPostSuccess(true)
      setTimeout(() => setPostSuccess(false), 3000)
    },
  })

  if (!isClient) return null
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const formattedDate = data?.timestamp
    ? new Date(data.timestamp).toLocaleString()
    : ""

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p>Status: {data?.status}</p>
        <p className='text-sm text-gray-500'>Last updated: {formattedDate}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <button
          onClick={() => mutate({someData: "test"})}
          disabled={isMutating}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
        >
          {isMutating ? "Updating..." : "Test POST"}
        </button>
        {postSuccess && (
          <p className='text-sm text-green-600'>POST request successful!</p>
        )}
      </div>
    </div>
  )
}
