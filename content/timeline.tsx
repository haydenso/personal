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
    slug: "marathon-2026",
    title: "42.195kms with no training",
    date: "January 18 2026",
    image: "/timeline/marathon.jpg",
    badge: "CURRENT",
    excerpt: "marathon done!",
    content: `
      <p>i stupidly finished the hong kong marathon with no training. my dad was injured so i ran in his place with 3 days notice having not ran for around 3 months seriously. do not recommend.</p>
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
