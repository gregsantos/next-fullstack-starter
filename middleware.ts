import {authMiddleware} from "@clerk/nextjs"
import {NextResponse} from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  afterAuth(auth, req) {
    // Handle authentication result
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url)
      // Store the original URL as redirect_url
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Redirect signed in users to dashboard if they try to access auth pages
    if (
      auth.userId &&
      (req.nextUrl.pathname.startsWith("/sign-in") ||
        req.nextUrl.pathname.startsWith("/sign-up"))
    ) {
      // Check if there's a redirect_url in the query params
      const redirectUrl = req.nextUrl.searchParams.get("redirect_url")
      if (redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, req.url))
      }
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
})

// Configure Middleware Matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
