import { useRouter } from 'next/navigation'
import { musings } from "@/content/musings"
import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"
import { Footer } from "./footer"
import { useEffect, useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"

interface MusingsListProps {
  selectedMusing: string | null
  onSelectMusing: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
  selectedCategory?: string
  onSelectCategory?: (category: string) => void
}

// Color mapping for categories
const categoryColors: Record<string, string> = {
  'notes': '#9333ea', // purple
  'misc': '#eab308', // yellow
  'ai': '#3b82f6', // blue
  'software': '#10b981', // green
  'china': '#ef4444', // red
  'life/human condition': '#8b5cf6', // violet
  'uncategorized': '#6b7280', // gray
}

function getCategoryColor(category: string): string {
  return categoryColors[category] || categoryColors['uncategorized']
}

export function MusingsList({ selectedMusing, onSelectMusing, width, isDragging, onMouseDown, selectedCategory: selectedCategoryProp, onSelectCategory }: MusingsListProps) {
  // Get pinned musings
  const pinned = musings.filter(m => m.pinned)
  const unpinned = musings.filter(m => !m.pinned)
  
  // Build category map with unpinned musings only
  const categoryMap = new Map<string, typeof musings>()
  unpinned.forEach(m => {
    const cat = m.category || 'uncategorized'
    if (!categoryMap.has(cat)) categoryMap.set(cat, [])
    categoryMap.get(cat)!.push(m)
  })
  
  const categories = Array.from(categoryMap.keys()).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  
  // Track which categories are expanded (start all expanded)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories)
  )
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  function renderMusingButton(musing: typeof musings[0]) {
    const isSelected = selectedMusing === musing.slug
    const preview = musing.content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 100) + (musing.content.length > 100 ? '...' : '')
    const router = useRouter()
    const href = `/musings/${musing.category || 'uncategorized'}/${musing.slug}`

    const handleClick = (e: React.MouseEvent) => {
      // On narrow viewports navigate normally so page replaces (mobile UX)
      const isNarrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      if (isNarrow) {
        e.preventDefault()
        router.push(href)
        return
      }

      // Otherwise, keep the split UI: update app state and push URL without full navigation
      e.preventDefault()
      onSelectMusing(musing.slug)
      // Update the address bar without triggering a Next.js navigation
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', href)
        // Manually dispatch a popstate so any listeners (MainApp) can sync if needed
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    }

    return (
      <a
        key={musing.slug}
        href={href}
        onClick={handleClick}
        className={cn(
          "w-full text-left p-4 mb-2 rounded-lg transition-colors border-l-4 block",
          isSelected 
            ? "bg-[#ffd52e] border-[#ffd52e]" 
            : "bg-white border-transparent hover:bg-orange-100"
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
      </a>
    )
  }

  // Start false on the server to avoid hydration mismatch; update on client in effect
  const [isWide, setIsWide] = useState<boolean>(false)

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
        "relative h-full overflow-y-auto shrink-0 border-r border-border",
        selectedMusing && "max-md:hidden",
      )}
    >
      <div className="px-4 md:px-16 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full md:items-stretch">
        <div className="flex-1">
          <h1 className="text-4xl font-serif mb-2">musings</h1>
          <p className="text-muted-foreground mb-6">a peek into my notes app</p>

          {/* Pinned section */}
          {pinned.length > 0 && (
            <>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">Pinned</div>
              {pinned.map((m) => renderMusingButton(m))}
            </>
          )}

          {/* Collapsible categories for rest */}
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3 mt-6 font-mono">Rest</div>
          <div className="space-y-1">
            {categories.map(category => {
              const categoryMusings = categoryMap.get(category) || []
              const isExpanded = expandedCategories.has(category)
              const color = getCategoryColor(category)
              
              return (
                <div key={category} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-100 transition-colors text-left rounded-md"
                  >
                    <div className="flex items-center gap-2.5">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      )}
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-medium text-sm">{category.toLowerCase()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{categoryMusings.length}</span>
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-1">
                      {categoryMusings
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map(m => renderMusingButton(m))
                      }
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Footer />
      </div>

      {selectedMusing && <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />}
    </div>
  )
}
