import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only apply canonical URL logic in production
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  
  // Set canonical URL header for all pages
  const pathname = request.nextUrl.pathname
  const canonicalUrl = `https://learndsa.app${pathname}`
  
  // Add canonical URL as a custom header that can be used by components
  response.headers.set('x-canonical-url', canonicalUrl)
  
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