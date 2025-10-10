import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://learndsa.app'
  
  // Main pages
  const routes = [
    '',
    '/about',
    '/learning-path',
    '/data-structures',
    '/algorithms',
    '/bookmarks',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/dmca',
    '/accessibility',
  ]

  // Data structure pages
  const dataStructures = [
    '/data-structures/arrays',
    '/data-structures/linked-lists',
    '/data-structures/stacks',
    '/data-structures/queues',
    '/data-structures/trees',
    '/data-structures/graphs',
    '/data-structures/hash-tables',
  ]

  // Algorithm pages
  const algorithms = [
    '/algorithms/sorting',
    '/algorithms/searching',
    '/algorithms/dynamic-programming',
    '/algorithms/divide-and-conquer',
    '/algorithms/greedy',
    '/algorithms/graph',
  ]

  const allRoutes = [...routes, ...dataStructures, ...algorithms]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : route.includes('/data-structures') || route.includes('/algorithms') ? 0.8 : 0.6,
  }))
}