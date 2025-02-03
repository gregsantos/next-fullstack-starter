import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import {ClerkClientProvider} from "./_components/providers/clerk-provider"
import {Providers} from "./_components/providers/providers"
import {Navbar} from "./_components/navbar"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkClientProvider>
          <Providers>
            <Navbar />
            <div className='mt-16'>{children}</div>
          </Providers>
        </ClerkClientProvider>
      </body>
    </html>
  )
}
