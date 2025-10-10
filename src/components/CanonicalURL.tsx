// Utility function to generate canonical URL for any page
export function generateCanonicalUrl(pathname: string = ''): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://learndsa.app' 
    : 'http://localhost:3000'
  
  // Ensure pathname starts with /
  const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  
  return `${baseUrl}${cleanPathname}`
}

// Metadata helper for canonical URLs
export function generateCanonicalMetadata(pathname: string = '') {
  return {
    alternates: {
      canonical: generateCanonicalUrl(pathname)
    }
  }
}