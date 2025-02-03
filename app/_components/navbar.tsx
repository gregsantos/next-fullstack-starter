"use client"

import Link from "next/link"
import {UserButton} from "@clerk/nextjs"
import {Button} from "@/components/ui/button"
import {useAuth} from "@clerk/nextjs"

export function Navbar() {
  const {isSignedIn} = useAuth()

  return (
    <nav className='fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='w-full max-w-[2000px] mx-auto flex h-16 items-center px-4 sm:px-8'>
        <Link
          href='/'
          className='text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity'
        >
          Fullstack Starter
        </Link>

        <div className='ml-auto flex items-center gap-2 sm:gap-4'>
          {isSignedIn ? (
            <>
              <Link href='/dashboard' className='hidden sm:block'>
                <Button variant='ghost' size='sm' className='font-medium'>
                  Dashboard
                </Button>
              </Link>
              <UserButton
                afterSignOutUrl='/'
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonPopoverCard: "w-[240px]",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Link href='/sign-in'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='font-medium hidden sm:inline-flex'
                >
                  Sign In
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='font-medium sm:hidden'
                >
                  Login
                </Button>
              </Link>
              <Link href='/sign-up'>
                <Button size='sm' className='font-medium shadow-sm'>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
