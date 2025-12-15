import { musings } from "@/content/musings"
import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"
import { Footer } from "./footer"

interface MusingsListProps {
  selectedMusing: string | null
  onSelectMusing: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

export function MusingsList({ selectedMusing, onSelectMusing, width, isDragging, onMouseDown }: MusingsListProps) {
  // Sort musings: pinned first, then by date descending
  const sortedMusings = [...musings].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div
      style={{ width: `${width}px` }}
      className={cn(
        "relative overflow-y-auto shrink-0 border-r border-border",
        selectedMusing && "max-md:hidden",
      )}
    >
      <div className="px-8 md:px-16 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full">
        <div>
          <h1 className="text-4xl font-serif mb-2">musings</h1>
          <p className="text-muted-foreground mb-8">a peek into my notes app</p>
        </div>

        <div className="flex-1">
          {sortedMusings.map((musing) => {
            const isSelected = selectedMusing === musing.slug
            // Create a simple preview from content (strip HTML and truncate)
            const preview = musing.content
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/\s+/g, ' ') // Normalize whitespace
              .trim()
              .substring(0, 100) + (musing.content.length > 100 ? '...' : '')

            return (
              <button
                key={musing.slug}
                onClick={() => onSelectMusing(musing.slug)}
                className={cn(
                  "w-full text-left p-3 mb-1 rounded-lg transition-colors border-l-4",
                  isSelected 
                    ? "bg-[#ffd52e] border-[#ffd52e]" 
                    : "bg-transparent border-transparent hover:bg-orange-100"
                )}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={cn(
                      "text-sm font-semibold truncate",
                      isSelected ? "text-foreground" : "text-foreground"
                    )}>
                      {musing.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {musing.author} • {musing.date}
                  </p>
                  {preview && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {preview}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <Footer />
      </div>

      {selectedMusing && <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />}
    </div>
  )
}
