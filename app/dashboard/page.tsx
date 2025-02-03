import {auth} from "@clerk/nextjs"
import {redirect} from "next/navigation"

export default async function DashboardPage() {
  const {userId} = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-8'>Dashboard</h1>
      <div className='bg-card p-6 rounded-lg shadow'>
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  )
}
