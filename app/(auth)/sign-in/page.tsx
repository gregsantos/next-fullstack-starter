'use client'

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams?.get("redirect_url") ?? "/dashboard"

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn afterSignInUrl={redirectUrl} signUpUrl="/sign-up" />
      </div>
    </div>
  )
} 