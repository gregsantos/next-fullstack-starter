"use client"

import {useEffect} from "react"
import {Button} from "@/components/ui/button"

interface ErrorProps {
  error: Error & {digest?: string}
  reset: () => void
}

export default function Error({error, reset}: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold'>Something went wrong!</h2>
      <Button
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  )
}
