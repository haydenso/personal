import { musings } from "@/content/musings"
import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"
import { Footer } from "./footer"
import { useEffect, useState } from "react"

interface MusingsListProps {
  selectedMusing: string | null
  onSelectMusing: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

export function MusingsList({ selectedMusing, onSelectMusing, width, isDragging, onMouseDown }: MusingsListProps) {
  // Separate pinned and rest musings
  const pinned = musings.filter(m => m.pinned)
  const rest = musings.filter(m => !m.pinned)

  function renderMusingButton(musing: typeof musings[0]) {
    const isSelected = selectedMusing === musing.slug
    const preview = musing.content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
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
  }

  const [isWide, setIsWide] = useState<boolean>(() => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = () => setIsWide(mq.matches)
    mq.addEventListener?.("change", handler)
    // fallback for older browsers
    mq.addListener?.(handler)
    handler()
    return () => {
      mq.removeEventListener?.("change", handler)
      mq.removeListener?.(handler)
    }
  }, [])

  return (
    <div
      style={{ width: isWide ? `${width}px` : "100%" }}
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
          {pinned.length > 0 && (
            <>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 mt-4 font-mono">Pinned</div>
              {pinned.map(renderMusingButton)}
            </>
          )}
          {rest.length > 0 && (
            <>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 mt-6 font-mono">Rest</div>
              {rest.map(renderMusingButton)}
            </>
          )}
        </div>

        <Footer />
      </div>

      {selectedMusing && <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />}
    </div>
  )
}
