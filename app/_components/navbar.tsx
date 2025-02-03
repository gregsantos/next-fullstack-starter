'use client'

import Link from "next/link"
import {UserButton} from "@clerk/nextjs"
import {Button} from "@/components/ui/button"
import {useAuth} from "@clerk/nextjs"

export function Navbar() {
  const {isSignedIn} = useAuth()

  return (
    <nav className='fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center justify-between'>
        <Link href='/' className='font-semibold'>
          Fullstack Starter
        </Link>

        <div className='flex items-center gap-4'>
          {isSignedIn ? (
            <>
              <Link href='/dashboard'>
                <Button variant='outline' size='sm'>
                  Dashboard
                </Button>
              </Link>
              <UserButton
                afterSignOutUrl='/'
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            </>
          ) : (
            <>
              <Link href='/sign-in'>
                <Button variant='outline' size='sm'>
                  Sign In
                </Button>
              </Link>
              <Link href='/sign-up'>
                <Button size='sm'>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 