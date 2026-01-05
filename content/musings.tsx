export interface Musing {
  slug: string
  title: string
  author: string
  date: string
  lastUpdated?: string
  pinned: boolean
  category: string
  content: string
}

export const musings: Musing[] = [
  {
    "slug": "things",
    "title": "things i want to write about",
    "author": "Hayden",
    "date": "2026",
    "lastUpdated": "01-05-2026",
    "pinned": false,
    "category": "uncategorized",
    "content": "<h2>a list of things i want to write about</h2>\n<p><em>please shoot me a message if you wanna write about them. i have a rough mental model of what is interesting about each. please do bounce ideas of with me!</em></p>\n<p>ai</p>\n<ul><li>ai for everyone</li><li>how anyone can work in AI (ai for everyone)</li><li>a deep dive history into the transformer</li></ul>\n<p>politics</p>\n<ul><li>the geopolitics of the arctic</li><li>an informal guide to hk society and the civil service</li></ul>\n<p>life/heuristics</p>\n<ul><li>a 2025 letter</li><li>how to disagree properly</li><li>on social leverage and social capital</li><li>how to be okay with your parents and friends not understanding what you do (or vice versa)</li><li>how do you update your beliefs</li><li>how to be a good conversationalist</li><li></li><li>why do i like the cold over the warmth</li><li>a 3 part series on attachment theory</li></ul>\n<p>misc</p>\n<ul><li>the etiquette of mahjong </li><li>how to make the most of hkgcc</li><li>what even is work experience</li></ul>"
  },
  {
    "slug": "china-ai",
    "title": "notes on China and AI governance",
    "author": "Hayden",
    "date": "2025",
    "lastUpdated": "12-29-2025",
    "pinned": false,
    "category": "China",
    "content": "<p>can you format this with - for bullet ponts more lceanly in markdown.:</p>\n<p>General governance:</p>\n<ul><li>Markus Anderljung</li></ul>\n<ul><li>https://www.matsprogram.org/mentors?track=governance-strategy</li></ul>\n<ul><li>https://sparai.org/projects/’</li></ul>\n<ul><li>https://www.antonleicht.me/ (on trade and middle-AI economies)</li></ul>\n<ul><li>Concordia AI</li></ul>\n<ul><li>Safe AI Forum: https://saif.org/</li></ul>\n<ul><li>https://forum.effectivealtruism.org/posts/jhuSbNinrrZ54s8Mw/china-x-ai-reference-list-august-2025-update</li></ul>\n<p>* https://docs.google.com/document/d/1OJcHhhBfNwEbeUaT-d4RIq58I1oJ3XGxu2yCzsnieuo/edit?tab=t.0#heading=h.9gc71zl8btmy</p>\n<p>Difficulty of studying China. Even for Chinese speaking folks and with lived experience in China, studying China remains a challenge. For the academics and researchers who deeply understand China, they lack the up to date</p>\n<p>How China makes decisions: https://carnegieendowment.org/research/2023/07/chinas-ai-regulations-and-how-they-get-made?lang=en</p>\n<p>How Chinese companies make decisions</p>\n<p>China</p>\n<ul><li>unified governance vs democracy effect on effective ai distribution</li></ul>\n<ul><li>understansing elite politics</li></ul>\n<p>* technocrats (particularly CS, AI educated) in the central committee</p>\n<ul><li>returnees of foreign educated/tech ceos</li></ul>\n<p>* culture and founding of Chinese big tech</p>\n<p>* profile on Lee Kai Fu, Ma Yi, Harry Shum</p>\n<ul><li>https://80000hours.org/career-reviews/china-related-ai-safety-and-governance-paths/?int_campaign=agi_lp</li></ul>\n<ul><li>look into liang as demis</li></ul>\n<ul><li>hangzhou’s visionaries —&gt; how is the provincial government of Zhejiang helping Hangzhou? Who in the Hangzhou government is helping the ecosystem? Alibaba’s role?</li></ul>\n<p>* hangzhou probably communicates more to silicon valley than beijing</p>\n<ul><li>deep dive into provincial competition</li></ul>\n<ul><li>hot take: china is leaving the west to think about safety (existential and technical safety work)</li></ul>\n<ul><li>the licensing requirement and process for ai models in China hangzhou probably communicates more to silicon valley than beijing</li></ul>\n<p>Hong Kong</p>\n<ul><li>What does AI as a core industry mean?</li></ul>\n<p>* It is like saying I want energy as a core industry</p>\n<p>* do you mean producer? do you mean application? do you mean development?</p>\n<ul><li>https://concordia-ai.com/research/state-of-ai-safety-in-singapore/ (for HK?)</li></ul>\n<p>* singaporean along the road</p>\n<ul><li>https://www.scmp.com/news/hong-kong/society/article/3325910/hong-kong-roll-out-ai-use-200-public-service-procedures-end-2027</li></ul>\n<p>* What does this mean for SMEs</p>\n<ul><li>https://www.hkcgi.org.hk/thought-leadership/publication-detail/2620</li></ul>\n<p>My AI searches:</p>\n<ul><li>https://www.perplexity.ai/search/you-are-the-worlds-leading-exp-L55M5kgaTMCvuYvPAchmIw</li></ul>\n<ul><li>https://grok.com/c/1588abb7-8442-48b7-b262-2761791f93a8</li></ul>\n<ul><li>https://www.perplexity.ai/search/you-are-an-expert-think-tank-r-I3ExlQXOTNOe096Y0vDXvg</li></ul>\n<ul><li></li></ul>\n<p>Actionable steps</p>\n<ul><li>HKU journalism (esp the Karen Hao people)</li></ul>\n<ul><li>Connect with SCMP people</li></ul>\n<p>People I have a list of people in HK/SG working on AI safety</p>\n<p>China/skills:</p>\n<ul><li>https://afraw.substack.com/</li></ul>\n<ul><li>How to use WeChat for primary sources</li></ul>"
  },
  {
    "slug": "engineering",
    "title": "all things software engineering",
    "author": "",
    "date": "2025",
    "lastUpdated": "12-29-2025",
    "pinned": false,
    "category": "software",
    "content": "<p>engineering blogs in the works:</p>\n<ul><li>revamping my personal website and building a personal CMS editor</li><li>building my bespoke people searcher (deciding it to name it holmes or doug)</li><li>the beauty of apple script and bespoke trinkets</li><li>mahjong + reinforcement learning and evals for various LLMs playing mahjong</li><li>finetuning mistral 8B to write like Joan Didion</li></ul>\n<p>cool tools:</p>\n<ul><li>playwriter</li></ul>\n<p>cool blogs</p>\n<ul><li>flights API https://aweirddev.github.io/flights/</li><li>https://ngrok.com/blog/prompt-caching/ (HOW LLMS work great)</li><li>https://www.aleksagordic.com/blog/matmul (GPU 0 to hero)</li><li>https://karpathy.bearblog.dev/year-in-review-2025/</li><li>https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison</li><li>exa labs on GitHub has good examples</li><li>https://jessylin.com/2025/10/20/continual-learning/ - continual learning</li></ul>"
  },
  {
    "slug": "rollups",
    "title": "ai rollups and RL",
    "author": "Hayden",
    "date": "2025",
    "lastUpdated": "12-29-2025",
    "pinned": false,
    "category": "ai",
    "content": "<ul><li>service based economies need to think about the governance of adoption, standardization</li><li>there is alpha in the proprietary data for RL environments</li><li>a major portion of HK is employed by SMBs</li><li>McKinsey/Accenture/Deloitte are not touching SMBs</li><li>'Asia-Pacific (APAC) region will transfer approximately US$5.8 trillion to the next generation between 2023 and 2030'</li><li>we will see a greater transfer or shutdown of businesses in HK</li><li>ai rollup model for mom-and-pop/niche industries</li><li>agi is an engineering/distribution problem imo</li></ul>"
  },
  {
    "slug": "docket",
    "title": "docket of musings",
    "author": "Hayden",
    "date": "2025",
    "lastUpdated": "12-17-2025",
    "pinned": true,
    "category": "notes",
    "content": "<h3>read my list of open questions/docket of musings</h3>\n<p><a href=\"https://haydenso.substack.com/p/212ea3d8-3bc0-4304-bd61-6bfbdf56a882\" target=\"_blank\" rel=\"noopener noreferrer\">https://haydenso.substack.com/p/212ea3d8-3bc0-4304-bd61-6bfbdf56a882</a></p>"
  },
  {
    "slug": "fav-websites",
    "title": "my favourite personal websites",
    "author": "",
    "date": "2025",
    "lastUpdated": "12-17-2025",
    "pinned": false,
    "category": "misc",
    "content": "<h3>favorite internet writers</h3>\n<ul><li>nabeel s qureshi <a href=\"nabeelqu.co\" target=\"_blank\" rel=\"noopener noreferrer\">nabeelqu.co</a></li><li>zhengdong wang<a href=\"zhengdongwang.com\" target=\"_blank\" rel=\"noopener noreferrer\">zhengdongwang.com</a></li><li>adding more...</li></ul>\n<h3>favorite personal websites for design</h3>\n<ul><li><a href=\"https://www.floguo.com/\" target=\"_blank\" rel=\"noopener noreferrer\">floguo.com</a> (inspo for this!) </li><li><a href=\"https://emmiwu.com/\" target=\"_blank\" rel=\"noopener noreferrer\">emmiwu.com</a> (Emmi Wu)</li><li><a href=\"https://jl33-ai.github.io/\" target=\"_blank\" rel=\"noopener noreferrer\">jl33-ai.github.io</a> (Justin) — Nice homepage and pages (simple, text-heavy layout with bold navigation)</li><li><a href=\"https://www.creetz.com/\" target=\"_blank\" rel=\"noopener noreferrer\">creetz.com</a> (Christian) — Technical projects (AI/ML blog and tools like kerneltune)</li><li><a href=\"https://www.sam-peitz.com/writings\" target=\"_blank\" rel=\"noopener noreferrer\">sam-peitz.com/writings</a> (Sam Peitz) — Writings section</li><li><a href=\"https://masonjwang.com/\" target=\"_blank\" rel=\"noopener noreferrer\">masonjwang.com</a> (Mason Wang) — Images in About Me + handbook (structured bio, blog, and bookshelf)</li><li><a href=\"https://jason.ml/\" target=\"_blank\" rel=\"noopener noreferrer\">jason.ml</a> (Jason) — Blog style and font (lowercase, minimalist musings)</li><li><a href=\"https://andrewtrousdale.com/\" target=\"_blank\" rel=\"noopener noreferrer\">andrewtrousdale.com</a> (Andrew Trousdale) — Research and design initiatives</li><li><a href=\"https://malaikaaiyar.me/work/\" target=\"_blank\" rel=\"noopener noreferrer\">malaikaaiyar.me/work</a> (Malaika Aiyar) — Work and experience showcase (with ASCII art)</li><li><a href=\"https://selvaradov.net/\" target=\"_blank\" rel=\"noopener noreferrer\">selvaradov.net</a> (Rohan Selva-Radov) — Personal rambles and interests</li><li><a href=\"https://sriramk.com/\" target=\"_blank\" rel=\"noopener noreferrer\">sriramk.com</a> (Sriram Krishnan) — Blog and memos</li><li><a href=\"https://www.evanlin.ca/\" target=\"_blank\" rel=\"noopener noreferrer\">evanlin.ca</a> (Evan Lin) — Personal curiosities and about section</li><li><a href=\"https://roydenso.com/\" target=\"_blank\" rel=\"noopener noreferrer\">roydenso.com</a> (Royden So) — Design portfolio (Framer-powered projects)</li><li><a href=\"https://mkodama.org/\" target=\"_blank\" rel=\"noopener noreferrer\">/mkodama.org/</a></li></ul>\n<h3>Other Inspirations</h3>\n<p>Stream of thought style:</p>\n<ul><li><a href=\"https://termsheet.gg/\" target=\"_blank\" rel=\"noopener noreferrer\">termsheet.gg</a> — Prediction markets with casual, real-time commentary</li></ul>\n<p>Bookshelf ideas:</p>\n<ul><li><a href=\"https://drewcoffman.com/#shelf\" target=\"_blank\" rel=\"noopener noreferrer\">drewcoffman.com/#shelf</a> (Drew Coffman) — Filtered book collection with liked/life-changing markers</li><li><a href=\"https://jihad.house/shelf/\" target=\"_blank\" rel=\"noopener noreferrer\">jihad.house/shelf</a> — Curated shelf of books and resources</li></ul>\n<p>GitHub inspirations:</p>\n<ul><li><a href=\"https://github.com/alanagoyal/alanagoyal\" target=\"_blank\" rel=\"noopener noreferrer\">github.com/alanagoyal/alanagoyal</a> (Alana Goyal) — Apple Notes-inspired personal website</li><li><a href=\"https://github.com/floguo/website-template\" target=\"_blank\" rel=\"noopener noreferrer\">github.com/floguo/website-template</a> (floguo) — Personal website template with bookshelf &amp; field notes</li></ul>"
  },
  {
    "slug": "thoughts-ai",
    "title": "thoughts on ai",
    "author": "Hayden",
    "date": "2025",
    "lastUpdated": "12-17-2025",
    "pinned": false,
    "category": "ai",
    "content": "<p>thoughts on ai - to be added!</p>"
  }
]
