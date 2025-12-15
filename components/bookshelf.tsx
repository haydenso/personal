import { useState } from "react"
import { musings } from "@/content/musings"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"

export function Bookshelf() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null)

  return (
    <div className="flex-1 px-8 md:px-16 max-w-6xl overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0">
      <div>
        <h1 className="text-4xl font-serif mb-8">Bookshelf</h1>
        <p className="text-muted-foreground mb-8">A visual collection of books I've read or am reading.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {musings.map((musing) => (
            <div
              key={musing.slug}
              className="group cursor-pointer"
              onClick={() => setSelectedBook(musing.slug)}
            >
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={`/books/${musing.slug}.jpg`}
                  alt={`Cover of ${musing.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling!.classList.remove('hidden')
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 flex items-center justify-center hidden">
                  <div className="text-center p-4">
                    <div className="text-xs text-muted-foreground mb-2">Cover</div>
                    <div className="text-sm font-medium text-foreground line-clamp-3">
                      {musing.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {musing.author}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {musing.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {musing.author}, {musing.lastUpdated}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-serif mb-1">
                    {musings.find(m => m.slug === selectedBook)?.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {musings.find(m => m.slug === selectedBook)?.author}, {musings.find(m => m.slug === selectedBook)?.lastUpdated}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  My Notes
                </label>
                <div 
                  className="text-sm text-muted-foreground prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: musings.find(m => m.slug === selectedBook)?.content || 'No notes available.' }}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}