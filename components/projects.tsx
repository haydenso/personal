import { Footer } from "./footer"

export function Projects() {
  return (
    <main className="flex-1 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-0">
      <div className="px-6 md:px-16 flex-1 w-full max-w-5xl mx-auto">
        <div className="bg-[#FEEABF] rounded-md p-8">
          <h1 className="text-4xl font-serif mb-2 text-foreground">projects</h1>
          <p className="text-muted-foreground mb-6">things i've built & am building.</p>

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
