export interface Note {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export const notes: Note[] = [
  {
    "slug": "favourite-links",
    "title": "Flo's Bookmarks",
    "date": "10-27-2025",
    "excerpt": "",
    "content": "<p>A collection of websites, articles, and resources I find myself returning to.</p>\n<h2>Writing</h2>\n<ul><li><a href=\"https://map.simonsarris.com/p/breadcrumbs\" target=\"_blank\" rel=\"noopener noreferrer\">Breadcrumbs</a> - Simon Sarris</li><li><a href=\"https://boxx.substack.com/p/loneliness-the-four-circles-of-belonging\" target=\"_blank\" rel=\"noopener noreferrer\">The Four Circles of Belonging</a> - Joss Murphy</li></ul>\n<h2>Resources</h2>\n<ul><li><a href=\"https://emojicombos.com/kaomoji\" target=\"_blank\" rel=\"noopener noreferrer\">Kaomoji</a> - Copy paste kaomoji ⋆˙⟡</li></ul>"
  },
  {
    "slug": "hello-world",
    "title": "Hello world",
    "date": "10-26-2025",
    "excerpt": "",
    "content": "<p>I've been meaning to update my personal website for sometime.</p>\n<p>Around 11pm last night, I finally sublimated desire into action. So, I opened up v0 and prompted into the wee hours of the morning: happily click-clacking until my laptop peeped a soft sigh of exhaustion and went kaput for the night.</p>\n<p>And 20 hours later... here we are.</p>\n<p>Expect more updates soon.</p>\n<p>With love,</p>\n<p>Flo</p>"
  },
  {
    "slug": "long-game",
    "title": "Playing the Long Game",
    "date": "10-27-2025",
    "excerpt": "",
    "content": "<p>Last Monday I enjoyed a particularly unpleasant bout of food poisioning.</p>\n<p>The next day did not spare me aftershocks of nausea. I felt less productive than unusual.</p>\n<p>So, I decided to make up for it in the evening: I would get in a bunch of small UI PR's!</p>\n<p>After click-clacking late into the night, I felt proud of my efforts.</p>\n<p>Cue dramatic irony: unbeknownst to my naiveté, the dev resources it took to review these PRs more than counteracted my good intentions.</p>\n<p>Intentions, whether pure or foul, matter less than the actual outcomes.</p>\n<blockquote>Thoughtful intention persists beyond a flurry of heedless goodwill.</blockquote>\n<p>I hope to play the long game in more areas of my life.</p>"
  }
]
