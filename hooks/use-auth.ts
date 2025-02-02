import { useAuth as useClerkAuth } from "@clerk/nextjs"

export const useAuth = () => {
  return useClerkAuth()
} 