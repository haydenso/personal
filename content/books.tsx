export interface Book {
  slug: string
  title: string
  author: string
  year: number
  lastUpdated?: string
  hasNotes: boolean
  isReading: boolean
  content: string
}

export const books: Book[] = [
  {
    "slug": "analog",
    "title": "Analog",
    "author": "Robert Hassan",
    "year": 2022,
    "lastUpdated": "10-26-2025",
    "hasNotes": true,
    "isReading": true,
    "content": "<ul><li>Zen and the Art of Motorcycle Maintenance, Robert Pirsig (1974), p. 38</li></ul>"
  },
  {
    "slug": "colors-of-wes-anderson",
    "title": "Colors of Wes Anderson",
    "author": "Hannah Strong",
    "year": 2025,
    "hasNotes": false,
    "isReading": false,
    "content": ""
  },
  {
    "slug": "prayer",
    "title": "Prayer",
    "author": "Timothy Keller",
    "year": 2014,
    "hasNotes": false,
    "isReading": true,
    "content": ""
  },
  {
    "slug": "severence",
    "title": "Severance",
    "author": "Ling Ma",
    "year": 2018,
    "hasNotes": false,
    "isReading": false,
    "content": ""
  },
  {
    "slug": "wabi-sabi",
    "title": "Wabi-Sabi for Artists, Designers, and Creatives",
    "author": "Leonard Koren",
    "year": 1994,
    "hasNotes": false,
    "isReading": false,
    "content": ""
  }
]
