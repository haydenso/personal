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
    "content": "<ul><li>Zen and the Art of Motorcycle Maintenance, Robert Pirsig (1974), p. 38</li><li>test</li><li>so if i add a point here</li><li>and another here</li><li>whip out new ones</li></ul>"
  },
  {
    "slug": "colors-of-wes-anderson",
    "title": "test 2",
    "author": "Timothy Keller",
    "date": "2014",
    "hasNotes": false,
    "isReading": true,
    "pinned": false,
    "content": ""
  },
  {
    "slug": "prayer",
    "title": "Prayer",
    "author": "Timothy Keller",
    "date": "2014",
    "hasNotes": true,
    "isReading": true,
    "pinned": false,
    "content": "<p>what if i just write here. how does it feel?</p>"
  },
  {
    "slug": "severence",
    "title": "Severance",
    "author": "Ling Ma",
    "date": "2018",
    "hasNotes": true,
    "isReading": false,
    "pinned": false,
    "content": "<p>test edit fe LOL</p>\n<p>HEHE how fast is this hah fefeefe jhifefefsefefefefow</p>"
  },
  {
    "slug": "test-added-musing-note",
    "title": "test added musing note",
    "author": "Hayden",
    "date": "2025",
    "lastUpdated": "12-17-2025",
    "hasNotes": false,
    "isReading": false,
    "pinned": false,
    "content": ""
  },
  {
    "slug": "untitled2",
    "title": "Untitled 2",
    "author": "Hayden",
    "date": "2025",
    "lastUpdated": "12-17-2025",
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
    "hasNotes": true,
    "isReading": false,
    "pinned": false,
    "content": "<p>TEST</p>"
  }
]
