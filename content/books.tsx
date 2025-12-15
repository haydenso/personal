export interface Book {
  slug: string
  title: string
  author: string
  date: string
  lastUpdated?: string
  hasNotes: boolean
  isReading: boolean
  pinned: boolean
  content: string
}

export const books: Book[] = [
  {
    "slug": "analog",
    "title": "Analog",
    "author": "Robert Hassan",
    "date": "2022",
    "lastUpdated": "10-26-2025",
    "hasNotes": true,
    "isReading": false,
    "pinned": false,
    "content": "Placeholder content for book"
  },
  {
    "slug": "colors-of-wes-anderson",
    "title": "Colors of Wes Anderson",
    "author": "Unknown",
    "date": "2023",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": "Placeholder content for book"
  },
  {
    "slug": "long-game",
    "title": "The Long Game",
    "author": "Unknown",
    "date": "2024",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isReading": true,
    "pinned": false,
    "content": "Placeholder content for book"
  },
  {
    "slug": "prayer",
    "title": "Prayer",
    "author": "Unknown",
    "date": "2024",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": "Placeholder content for book"
  },
  {
    "slug": "severence",
    "title": "Severence",
    "author": "Unknown",
    "date": "2024",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": "Placeholder content for book"
  }
]