import { useState } from "react"

const timelineData = [
  {
    slug: "h2-2025",
    title: "h2 2025: finally some action",
    date: "Jul - Dec 2025",
    content: `
      <p>To be added!</p>
    `,
  },
  {
    slug: "h1-2025",
    title: "h1 2025: a period of inaction",
    date: "Jan - Jun 2025",
    content: `<p>Doing nothing.</p>`,
  },
]

export function Timeline() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main className="flex-1 px-6 md:px-16 pt-28 md:pt-16 pb-0 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif mb-8">timeline - under construction!</h1>
        <p className="text-muted-foreground mb-8">i optimistically aim to do monthly updates, but probably more like quarterly. inspired by <a className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid" href="https://selvaradov.net/">rohan</a></p>

        <div className="space-y-4">
          {timelineData.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.slug}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left rounded-md border border-border bg-[#FEEABF] flex items-center justify-between p-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-md font-serif text-foreground">{item.title}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                      <path d="M6 9l6 6 6-6" stroke="#E0B326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-2 border border-border rounded-md bg-white p-4 font-serif">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
