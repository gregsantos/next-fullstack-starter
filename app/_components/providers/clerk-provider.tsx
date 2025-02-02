'use client'

import {ClerkProvider as Clerk} from "@clerk/nextjs"
import type {ReactNode} from "react"

interface ClerkClientProviderProps {
  children: ReactNode
}

export function ClerkClientProvider({children}: ClerkClientProviderProps) {
  return (
    <Clerk
      appearance={{
        baseTheme: undefined,
        variables: {colorPrimary: "#000000"},
        elements: {
          card: "bg-white shadow-none",
          navbar: "hidden",
          footer: "hidden",
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <div suppressHydrationWarning>{children}</div>
    </Clerk>
  )
} 