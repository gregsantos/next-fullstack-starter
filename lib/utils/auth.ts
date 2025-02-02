import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }
  
  return userId
} 