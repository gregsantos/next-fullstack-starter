'use client'

import { SignUp } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams?.get("redirect_url") ?? "/dashboard"

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignUp afterSignUpUrl={redirectUrl} signInUrl="/sign-in" />
      </div>
    </div>
  )
} 