export interface Album {
  slug: string
  title: string
  artist: string
  date: string
  lastUpdated?: string
  hasNotes: boolean
  isListening: boolean
  pinned: boolean
  content: string
}

export const albums: Album[] = [
  {
    "slug": "album-1",
    "title": "Album One",
    "artist": "Artist One",
    "date": "2023",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isListening": false,
    "pinned": false,
    "content": "Placeholder content for album"
  },
  {
    "slug": "album-2",
    "title": "Album Two",
    "artist": "Artist Two",
    "date": "2024",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isListening": true,
    "pinned": false,
    "content": "Placeholder content for album"
  },
  {
    "slug": "album-3",
    "title": "Album Three",
    "artist": "Artist Three",
    "date": "2024",
    "lastUpdated": "10-26-2025",
    "hasNotes": false,
    "isListening": false,
    "pinned": false,
    "content": "Placeholder content for album"
  }
]