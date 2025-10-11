import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the route is protected (learning-path and its sub-routes)
  const isProtectedRoute = pathname.startsWith('/learning-path')
  
  if (isProtectedRoute) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    if (!token) {
      // Redirect to sign-in page with callback URL
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }
  
  const response = NextResponse.next()
  
  // Only apply canonical URL logic in production
  if (process.env.NODE_ENV === 'production') {
    // Set canonical URL header for all pages
    const canonicalUrl = `https://learndsa.app${pathname}`
    
    // Add canonical URL as a custom header that can be used by components
    response.headers.set('x-canonical-url', canonicalUrl)
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (icon files)
     * - logos (logo files)
     * - manifest.json (PWA manifest)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons|logos|manifest.json).*)',
  ],
}