import { useState } from "react"
import Image from "next/image"
import { timeline } from "@/content/timeline"

export function Timeline() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="flex-1 px-6 md:px-16 pt-28 md:pt-16 pb-8 overflow-y-auto" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground mb-8">Underconsutrction. I'm up to, updated occasionally. Inspired by <a className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid" href="https://sive.rs/now" target="_blank" rel="noopener noreferrer">Derek Sivers</a>.</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.slug} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-background border-2 border-border z-10" />

                  <div className="ml-10">
                    {/* Image card */}
                    <div 
                      className="cursor-pointer group"
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {item.image && (
                        <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                          />
                        </div>
                      )}

                      {item.badge && (
                        <div className="inline-block bg-muted px-2 py-0.5 rounded text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                          {item.badge}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mb-1">{item.date}</p>
                      <h2 className="text-lg font-serif mb-2 group-hover:underline">
                        {item.title} <span className="text-muted-foreground">→</span>
                      </h2>
                      
                      {!isOpen && item.excerpt && (
                        <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                      )}
                    </div>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="mt-4 prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
