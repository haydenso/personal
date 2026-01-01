import { Footer } from "./footer"

const interests = [
  "multi-agent collaboration and agent infrastructure",
  "continual learning in token space and LLMs",  "intraday energy markets and commodities trading",
  "US-China relations",
  "Chinese elite politics and theory",
  "effective altruism",
  "watching brainrot (anthropology i swear)",
  "weather prediction (ML vs numerical)",
  "post-training + RL environments > pretraining",
  "laufey and olivia dean",
  "nature of friendships and relationships",
  "sherlock holmes and crime investigations",
  "the economics of warfare",
  "progress studies (roots of progress)",
  "formation of states (Singapore & LKY), state capacity libertarianism and supply side progressivism",
  "RL environment x alignment problems (e.g. Alex Pan’s work)"
]

export function Projects() {
  return (
    <main className="flex-1 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-0">
      <div className="px-6 md:px-16 flex-1 w-full max-w-2xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-serif mb-2 text-foreground">projects</h1>
            <p className="text-muted-foreground mb-6">things i've built & am building.</p>
            <p className="text-muted-foreground italic font-serif">my linkedin makes me seem less technical than i am</p>
          </div>

          <div className="flex justify-center gap-3 text-muted-foreground/40">
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground italic font-serif">things im interested in thinking about:</p>
            <ol className="space-y-2 font-serif text-md text-muted-foreground italic list-decimal list-inside">
              {interests.map((interest, index) => (
                <li key={index} className="leading-relaxed">
                  {interest}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground font-serif italic">
              coming soon...
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-16 w-full max-w-5xl mx-auto">
        <Footer />
      </div>
    </main>
  )
}
