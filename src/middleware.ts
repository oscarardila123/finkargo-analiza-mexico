import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isAdmin = req.nextUrl.pathname.startsWith("/admin")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")
    const isPublicPage = ["/", "/features", "/precios", "/demo", "/checkout-simple"].includes(req.nextUrl.pathname)

    // Allow public pages without authentication
    if (isPublicPage) {
      return null
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    if (!isAuth && (isDashboard || isAdmin)) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    // Protect admin routes
    if (isAdmin) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
      }
      
      const userRole = token?.role as string
      if (userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    if (isDashboard && isAuth) {
      const userRole = token.role

      if (req.nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      if (req.nextUrl.pathname.startsWith("/dashboard/analytics") && userRole === "VIEWER") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/api/auth")) {
          return true
        }
        
        if (req.nextUrl.pathname.startsWith("/api")) {
          return !!token
        }

        // Allow public pages
        const isPublicPage = ["/", "/features", "/precios", "/demo", "/checkout-simple"].includes(req.nextUrl.pathname)
        if (isPublicPage) {
          return true
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    // Only apply middleware to protected routes
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/((?!auth|test-db|health|db-setup|db-init-simple|staging-diagnostic|webhooks|subscription|stripe|coupons).*)",
    "/checkout/:path*"
  ],
}