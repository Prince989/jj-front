import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and their allowed roles
const protectedRoutes = {
    '/admission': ['businessUser'],
    // Add more protected routes here as needed
    // '/some-route': ['role1', 'role2']
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
            const [_, allowedRoles] = matchedRoute

            // Check if user's role is allowed
            if (!userRole || !allowedRoles.includes(userRole)) {
                // Redirect to 401 if user's role is not allowed
                return NextResponse.redirect(new URL('/401', request.url))
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

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        '/admission/:path*',
        // Add more protected paths here as needed
        // '/some-route/:path*'
    ]
} 