import { Footer } from "./footer"

const interests = [
  "Chinese elite politics and political economy",
  "multi-agent collaboration and agent infrastructure",
  "continual learning in token space and RL x alignment problems",  "intraday energy markets and commodities trading",
  "watching brainrot (it's anthropology i swear)",
  "weather prediction (ML vs numerical)",
  "laufey and olivia dean",
  "sherlock holmes and crime investigations",
  "the economics of warfare",
  "progress studies, formation of states (Singapore & LKY), state capacity libertarianism and supply side progressivism",
]

export function Projects() {
  return (
    <main className="flex-1 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-0">
      <div className="px-6 md:px-16 flex-1 w-full max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-serif mb-2 text-foreground">projects</h1>
            <p className="text-muted-foreground mb-6">things i've built & am building.</p>
            <p className="text-muted-foreground italic font-serif">my linkedin makes me seem less technical than i am. i swear i can code.</p>
          </div>

          <div className="flex justify-center gap-3 text-muted-foreground/40">
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
          </div>

          <div className="space-y-6">
            <h2 className="italic text-xl font-serif text-foreground">my research</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif font-semibold text-foreground">
                  Mechanistically Interpreting the Latent Space of Hurricane Predictions
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  <span className="underline">Hayden So</span> & Julian Mak. Preprint in preparation
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-semibold text-foreground">
                  ImmspaCy: Extracting Gene-disease Associations for Systems Immunology Discoveries{" "}
                  <a href="https://drive.google.com/file/d/1TpCJZVuaJodIvPxFvH1rhOhDjONqnjlA/view?usp=sharing" 
                     className="text-foreground/70 hover:text-foreground underline" 
                     target="_blank" 
                     rel="noopener noreferrer">
                    (Poster
                  </a>
                  ,{" "}
                  <a href="https://drive.google.com/file/d/1Xr-8Z91jExkxQy-vdI-OulSgSKUE85Qa/view" 
                     className="text-foreground/70 hover:text-foreground underline" 
                     target="_blank" 
                     rel="noopener noreferrer">
                    Paper)
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  <span className="underline">Hayden So</span>, Steven H. Kleinstein (Yale School of Medicine) & Kei-Hoi Cheung (Yale School of Public Health)
                </p>
                <p className="text-sm text-muted-foreground font-serif italic">
                  Poster presentation at Bioinformatics Open Days 2023, Portugal
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-semibold text-foreground">
                  Investigating Boarding Methods in a Multi-aisle Flying Wing Aircraft Design{" "}
                  <a href="https://arxiv.org/abs/2410.17870" 
                     className="text-foreground/70 hover:text-foreground underline" 
                     target="_blank" 
                     rel="noopener noreferrer">
                    (Arxiv)
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground font-serif">
                  Emil Ryd, Vihaan Khandelwal, <span className="underline">Hayden So</span> & Jason Steffen
                </p>
                <p className="text-sm text-muted-foreground font-serif italic">
                  Submitted to the European Journal of Operations Management
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 text-muted-foreground/40">
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl italic font-serif">things i think about/interested in</h2>
            <ol className="space-y-2 font-serif text-md text-muted-foreground list-decimal list-inside">
              {interests.map((interest, index) => (
                <li key={index} className="leading-relaxed">
                  {interest}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground font-serif italic">
              more coming soon...
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-16 w-full max-w-3xl mx-auto">
        <Footer />
      </div>
    </main>
  )
}
