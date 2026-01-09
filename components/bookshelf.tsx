import { useState } from "react"
import { books } from "@/content/books"
import { albums } from "@/content/music"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"

type Tab = "books" | "music"

export function Bookshelf() {
  const [activeTab, setActiveTab] = useState<Tab>("books")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // Books are already filtered for hidden ones
  const currentItems = activeTab === "books" ? books : albums
  const imagePath = activeTab === "books" ? "books" : "music"

  return (
    <div className="flex-1 px-6 md:px-16 overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-serif mb-8">bookshelf</h1>
        <p className="text-muted-foreground mb-8">
          {activeTab === "books"
            ? "my books since childhood. powered by my Goodreads RSS feed (so cool this is open)"
            : "my music on repeat "
          }
        </p>

        {/* Tab buttons */}
        <div className="flex gap-1 mb-8 p-1 bg-muted rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("books")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === "books"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Books
          </button>
          <button
            onClick={() => setActiveTab("music")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === "music"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Music
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.slug}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item.slug)}
            >
              <div className={cn(
                "bg-muted overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded",
                activeTab === "books" ? "aspect-[3/4]" : "aspect-square"
              )}>
                <img
                  src={`/${imagePath}/${item.slug}.jpg`}
                  alt={`Cover of ${item.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling!.classList.remove('hidden')
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 items-center justify-center hidden">
                  <div className="text-center p-4">
                    <div className="text-xs text-muted-foreground mb-2">Cover</div>
                    <div className="text-sm font-medium text-foreground line-clamp-3">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {activeTab === "books" ? (item as any).author : (item as any).artist}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-base font-serif font-medium text-foreground line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm font-serif text-muted-foreground">
                  {activeTab === "books" ? (item as any).author : (item as any).artist}, {item.lastUpdated || item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <Footer />
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  {(() => {
                    const selected = (currentItems as any[]).find((it: any) => it.slug === selectedItem) as any
                    return (
                      <>
                        <h2 className="text-xl font-serif mb-1">{selected?.title}</h2>
                        <p className="text-sm text-muted-foreground">
                          {activeTab === "books" ? selected?.author : selected?.artist}, {selected?.lastUpdated || selected?.date}
                        </p>
                      </>
                    )
                  })()}
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
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
                  dangerouslySetInnerHTML={{ __html: (currentItems as any[]).find((item: any) => item.slug === selectedItem)?.content || 'No notes available.' }}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedItem(null)}
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