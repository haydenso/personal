export interface Musing {
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

export const musings: Musing[] = [
  {
    "slug": "analog",
    "title": "Analog",
    "author": "Robert Hassan",
    "date": "2022",
    "lastUpdated": "10-26-2025",
    "hasNotes": true,
    "isReading": true,
    "pinned": true,
    "content": "<ul><li>Zen and the Art of Motorcycle Maintenance, Robert Pirsig (1974), p. 38</li></ul>"
  },
  {
    "slug": "colors-of-wes-anderson",
    "title": "Colors of Wes Anderson",
    "author": "Hannah Strong",
    "date": "2025",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": ""
  },
  {
    "slug": "prayer",
    "title": "Prayer",
    "author": "Timothy Keller",
    "date": "2014",
    "hasNotes": false,
    "isReading": true,
    "pinned": false,
    "content": ""
  },
  {
    "slug": "severence",
    "title": "Severance",
    "author": "Ling Ma",
    "date": "2018",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": ""
  },
  {
    "slug": "wabi-sabi",
    "title": "Wabi-Sabi for Artists, Designers, and Creatives",
    "author": "Leonard Koren",
    "date": "1994",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": ""
  }
]
