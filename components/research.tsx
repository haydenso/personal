import { Footer } from "./footer"

export function Research() {
  return (
    <main className="flex-1 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-0">
      <div className="px-6 md:px-16 flex-1 w-full max-w-3xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-serif mb-2 text-foreground">research</h1>
            <p className="text-muted-foreground mb-6">my academic work & publications.</p>
          </div>

          <div className="space-y-4">
            <p className="font-serif mb-6">currently my main technical research interests are interpretability of ai weather models, continual learning and reinforcement learning</p>

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

          <p className="text-[#A5D8FF] italic font-serif">other side quests</p>

          <div className="space-y-3 pb-10">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <a href="https://aisafetyhk.org" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  queuing theory paper - simulating my high school lunch queue
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">i hate waiting in line</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-16 w-full max-w-3xl mx-auto">
        <Footer />
      </div>
    </main>
  )
}
