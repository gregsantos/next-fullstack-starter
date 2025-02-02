import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="bg-card p-6 rounded-lg shadow">
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  )
} 