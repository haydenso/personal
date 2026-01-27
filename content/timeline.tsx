export interface TimelineEntry {
  slug: string
  title: string
  date: string
  image?: string
  badge?: string
  excerpt: string
  content: string
}

export const timeline: TimelineEntry[] = [
  {
    slug: "dec-2024",
    title: "a little ponderin",
    date: "December 26, 2025",
    image: "/timeline/dec-2024.jpg",
    badge: "CURRENT",
    excerpt: "starting new things",
    content: `
      <p>more to come</p>
    `,
  },
  {
    slug: "jan-2025",
    title: "more pondering",
    date: "January 25, 2025",
    image: "/timeline/jan-2025.jpg",
    excerpt: "Test",
    content: `
      <p>Test</p>
      <p>Test</p>
    `,
  },
]
