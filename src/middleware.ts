import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add routes to protectedRoutes to specify the role requirements:
// Use ['businessUser'] for business-only routes
// Use [] for routes that just need authentication

type RoleType = 'businessUser' | string;
const protectedRoutes: Record<string, RoleType[]> = {
    '/admission': ['businessUser'],
    '/dashboard': [],     // Another example of auth-only route
    '/validation': []      // Another example of auth-only route
}

export function middleware(request: NextRequest) {
    const userData = request.cookies.get('userData')
    const pathname = request.nextUrl.pathname

    // Check if the current path is protected
    const isProtectedRoute = Object.keys(protectedRoutes).some(route => pathname.startsWith(route))

    if (!isProtectedRoute) {
        return NextResponse.next()
    }

    // If protected route but no userData, redirect to login
    if (!userData) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('returnUrl', pathname)

        return NextResponse.redirect(loginUrl)
    }

    try {
        const user = JSON.parse(userData.value)
        const userRole = user?.role?.name

        // Find the matching protected route
        const matchedRoute = Object.entries(protectedRoutes).find(([route]) => pathname.startsWith(route))

        if (matchedRoute) {
            const [, allowedRoles] = matchedRoute

            // If allowedRoles is empty array, any authenticated user can access
            if (allowedRoles.length > 0) {
                // Check if user's role is allowed
                if (!userRole || !allowedRoles.includes(userRole)) {
                    // Redirect to 401 if user's role is not allowed
                    return NextResponse.redirect(new URL('/401', request.url))
                }
            }
        }

        return NextResponse.next()
    } catch (error) {
        // If there's any error parsing the userData, redirect to login

        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('returnUrl', pathname)

        return NextResponse.redirect(loginUrl)
    }
}

// In config.matcher, I added all the protected paths.
// This is necessary because the middleware only runs on 
// paths specified here.

export const config = {
    matcher: [
        '/admission/:path*',
        '/dashboard/:path*',
        "/validation/:path*",
    ]
} 