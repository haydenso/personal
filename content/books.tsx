export interface Book {
  slug: string
  title: string
  author: string
  date: string
  lastUpdated?: string
  rating?: number
  avgRating?: number
  review?: string
  pinned: boolean
  hidden?: boolean
  goodreadsLink?: string
  content: string
}

const allBooks: Book[] = [
  {
    "slug": "boy-tales-of-childhood-roald-dahls-autobiography-1",
    "title": "Boy: Tales of Childhood (Roald Dahl's Autobiography, #1)",
    "author": "Roald Dahl",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 4,
    "avgRating": 4.07,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228746542?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-boy-in-the-striped-pajamas",
    "title": "The Boy in the Striped Pajamas",
    "author": "John Boyne",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 4,
    "avgRating": 4.17,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228745884?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "fantastic-mr-fox",
    "title": "Fantastic Mr. Fox",
    "author": "Roald Dahl",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 4,
    "avgRating": 4.09,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228744999?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "macbeth",
    "title": "Macbeth",
    "author": "William Shakespeare",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 3,
    "avgRating": 3.86,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228743057?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-island",
    "title": "The Island",
    "author": "Athol Fugard",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 3,
    "avgRating": 3.79,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228742486?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-millionaire-fastlane-crack-the-code-to-wealth-and-live-rich-for-a-lifetime",
    "title": "The Millionaire Fastlane: Crack the Code to Wealth and Live Rich for a Lifetime!",
    "author": "M.J. DeMarco",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 4,
    "avgRating": 4.28,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228740337?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-geography-of-thought-how-asians-and-westerners-think-differently-and-why",
    "title": "The Geography of Thought: How Asians and Westerners Think Differently... and Why",
    "author": "Richard E.  Nisbett",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 3,
    "avgRating": 3.81,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228739557?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-bfg",
    "title": "The BFG",
    "author": "Roald Dahl",
    "date": "2025",
    "lastUpdated": "01-18-2025",
    "rating": 4,
    "avgRating": 4.23,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228738080?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "sharp-objects",
    "title": "Sharp Objects",
    "author": "Gillian Flynn",
    "date": "2025",
    "lastUpdated": "11-24-2025",
    "rating": 4,
    "avgRating": 4.04,
    "review": "A little inferior to gone girl but nonetheless a messed up banger. How does Flynn come up with plots like this???",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/8095509309?utm_medium=api&utm_source=rss",
    "content": "A little inferior to gone girl but nonetheless a messed up banger. How does Flynn come up with plots like this???"
  },
  {
    "slug": "what-it-takes-lessons-in-the-pursuit-of-excellence",
    "title": "What It Takes: Lessons in the Pursuit of Excellence",
    "author": "Stephen A. Schwarzman",
    "date": "2025",
    "lastUpdated": "11-11-2025",
    "rating": 4,
    "avgRating": 4.21,
    "review": "A pleasant read after meeting the man. A career of deal making seems to be worth thinking more deeply about.",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/8064388948?utm_medium=api&utm_source=rss",
    "content": "A pleasant read after meeting the man. A career of deal making seems to be worth thinking more deeply about."
  },
  {
    "slug": "verity",
    "title": "Verity",
    "author": "Colleen Hoover",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 4,
    "avgRating": 4.28,
    "review": "a fast read but lacking full character development.",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7999570990?utm_medium=api&utm_source=rss",
    "content": "a fast read but lacking full character development."
  },
  {
    "slug": "attached-the-new-science-of-adult-attachment-and-how-it-can-help-you-findand-keeplove",
    "title": "Attached: The New Science of Adult Attachment and How It Can Help You Find—and Keep—Love",
    "author": "Amir Levine",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 4,
    "avgRating": 4.1,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/8024137342?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-bed-of-procrustes-philosophical-and-practical-aphorisms",
    "title": "The Bed of Procrustes: Philosophical and Practical Aphorisms",
    "author": "Nassim Nicholas Taleb",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 3,
    "avgRating": 3.77,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7702869116?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-oligarchaposs-daughter",
    "title": "The Oligarch&apos;s Daughter",
    "author": "Joseph Finder",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 4,
    "avgRating": 4.12,
    "review": "i have a special place for espionage-intelligence-geopolitics-power type novels, this one is a pretty standard one. i've been a sucker for good character development, this one left some in the dust... solid read, but could've been better",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7819397704?utm_medium=api&utm_source=rss",
    "content": "i have a special place for espionage-intelligence-geopolitics-power type novels, this one is a pretty standard one. i've been a sucker for good character development, this one left some in the dust... solid read, but could've been better"
  },
  {
    "slug": "the-first-gentleman",
    "title": "The First Gentleman",
    "author": "Bill Clinton",
    "date": "2025",
    "lastUpdated": "07-28-2025",
    "rating": 3,
    "avgRating": 3.91,
    "review": "fast finish but kinda meh. good palate cleanser but typical plot",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7780894561?utm_medium=api&utm_source=rss",
    "content": "fast finish but kinda meh. good palate cleanser but typical plot"
  },
  {
    "slug": "careless-people-a-cautionary-tale-of-power-greed-and-lost-idealism",
    "title": "Careless People: A Cautionary Tale of Power, Greed, and Lost Idealism",
    "author": "Sarah Wynn-Williams",
    "date": "2025",
    "lastUpdated": "06-16-2025",
    "rating": 4,
    "avgRating": 4.13,
    "review": "spending my summer thinking about policy, this, albeit a somewhat strongly opinionated memoir, is a jarring insider narrative in technology and government",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7626466542?utm_medium=api&utm_source=rss",
    "content": "spending my summer thinking about policy, this, albeit a somewhat strongly opinionated memoir, is a jarring insider narrative in technology and government"
  },
  {
    "slug": "recursion",
    "title": "Recursion",
    "author": "Blake Crouch",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 4,
    "avgRating": 4.15,
    "review": "2nd Blake Crouch book finished in a week, solid stuff",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7626466675?utm_medium=api&utm_source=rss",
    "content": "2nd Blake Crouch book finished in a week, solid stuff"
  },
  {
    "slug": "dark-matter",
    "title": "Dark Matter",
    "author": "Blake Crouch",
    "date": "2025",
    "lastUpdated": "06-04-2025",
    "rating": 4,
    "avgRating": 4.12,
    "review": "one of these stay up till 6am for 2 nights in a row books",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7626466000?utm_medium=api&utm_source=rss",
    "content": "one of these stay up till 6am for 2 nights in a row books"
  },
  {
    "slug": "thirteen-eddie-flynn-4",
    "title": "Thirteen (Eddie Flynn, #4)",
    "author": "Steve Cavanagh",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 4,
    "avgRating": 4.2,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7770363175?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "paper-towns",
    "title": "Paper Towns",
    "author": "John Green",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 3,
    "avgRating": 3.68,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7626466325?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "gone-girl",
    "title": "Gone Girl",
    "author": "Gillian Flynn",
    "date": "2025",
    "lastUpdated": "10-27-2025",
    "rating": 4,
    "avgRating": 4.22,
    "review": "read this a while back... hands down the fastest book I've gone through. still one of my favs. solid characters.",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7626466143?utm_medium=api&utm_source=rss",
    "content": "read this a while back... hands down the fastest book I've gone through. still one of my favs. solid characters."
  },
  {
    "slug": "the-great-alone",
    "title": "The Great Alone",
    "author": "Kristin Hannah",
    "date": "2024",
    "lastUpdated": "08-10-2025",
    "rating": 4,
    "avgRating": 4.45,
    "review": "the only book i've ever shed a single tear",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225423895?utm_medium=api&utm_source=rss",
    "content": "the only book i've ever shed a single tear"
  },
  {
    "slug": "conversations-with-friends",
    "title": "Conversations with Friends",
    "author": "Sally Rooney",
    "date": "2024",
    "lastUpdated": "01-17-2025",
    "rating": 3,
    "avgRating": 3.73,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225421295?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-play-of-daniel-keyes-flowers-for-algernon",
    "title": "Flowers for Algernon",
    "author": "Bert Coules",
    "date": "2024",
    "lastUpdated": "04-28-2025",
    "rating": 4,
    "avgRating": 4.09,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225367014?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-trading-game-a-confession",
    "title": "The Trading Game: A Confession",
    "author": "Gary  Stevenson",
    "date": "2024",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4.11,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225454727?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "red-notice-a-true-story-of-high-finance-murder-and-one-mans-fight-for-justice",
    "title": "Red Notice: A True Story of High Finance, Murder, and One Man's Fight for Justice",
    "author": "Bill Browder",
    "date": "2024",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4.39,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225412141?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-rosie-project-don-tillman-1",
    "title": "The Rosie Project (Don Tillman, #1)",
    "author": "Graeme Simsion",
    "date": "2024",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225424681?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-rosie-effect-don-tillman-2",
    "title": "The Rosie Effect (Don Tillman, #2)",
    "author": "Graeme Simsion",
    "date": "2024",
    "lastUpdated": "01-17-2025",
    "rating": 3,
    "avgRating": 3.62,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225422636?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "normal-people",
    "title": "Normal People",
    "author": "Sally Rooney",
    "date": "2024",
    "lastUpdated": "01-17-2025",
    "rating": 3,
    "avgRating": 3.81,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225452543?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-subtle-art-of-not-giving-a-fck-a-counterintuitive-approach-to-living-a-good-life",
    "title": "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life",
    "author": "Mark Manson",
    "date": "2023",
    "lastUpdated": "01-17-2025",
    "rating": 3,
    "avgRating": 3.87,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225453122?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "animal-farm",
    "title": "Animal Farm",
    "author": "George Orwell",
    "date": "2022",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4.09,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225453920?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "a-christmas-carol",
    "title": "A Christmas Carol",
    "author": "Charles Dickens",
    "date": "2021",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4.07,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225462203?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "how-to-win-friends-influence-people",
    "title": "How to Win Friends & Influence People",
    "author": "Dale Carnegie",
    "date": "2021",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4.22,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225468473?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-wind-up-bird-chronicle",
    "title": "The Wind-Up Bird Chronicle",
    "author": "Haruki Murakami",
    "date": "2021",
    "lastUpdated": "01-17-2025",
    "rating": 4,
    "avgRating": 4.16,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225469310?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "the-ride-of-a-lifetime-lessons-learned-from-15-years-as-ceo-of-the-walt-disney-company",
    "title": "The Ride of a Lifetime: Lessons Learned from 15 Years as CEO of the Walt Disney Company",
    "author": "Robert Iger",
    "date": "2021",
    "lastUpdated": "10-20-2025",
    "rating": 4,
    "avgRating": 4.37,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7225469970?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  },
  {
    "slug": "matilda",
    "title": "Matilda",
    "author": "Roald Dahl",
    "date": "2019",
    "lastUpdated": "01-18-2025",
    "rating": 4,
    "avgRating": 4.33,
    "review": "",
    "pinned": false,
    "goodreadsLink": "https://www.goodreads.com/review/show/7228737382?utm_medium=api&utm_source=rss",
    "content": "No review yet."
  }
]

// Sort by lastUpdated (latest first), then filter out hidden books
export const books: Book[] = allBooks
  .sort((a, b) => {
    const dateA = a.lastUpdated || a.date
    const dateB = b.lastUpdated || b.date
    // Parse dates in MM-DD-YYYY format, fallback to YYYY format
    const parseDate = (dateStr: string) => {
      if (dateStr.includes('-')) {
        const [month, day, year] = dateStr.split('-')
        return new Date(`${year}-${month}-${day}`)
      }
      return new Date(dateStr)
    }
    return parseDate(dateB).getTime() - parseDate(dateA).getTime()
  })
  .filter(book => !book.hidden)

// Hidden books (not shown in main bookshelf)
export const hiddenBooks: Book[] = allBooks.filter(book => book.hidden)
