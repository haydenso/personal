import { musings } from "@/content/musings"
import { ChevronLeft } from "lucide-react"

interface MusingReaderProps {
  slug: string
  onBack?: () => void
}
export function MusingReader({ slug, onBack }: MusingReaderProps) {
  const musing = musings.find((b) => b.slug === slug)
  if (!musing) return null

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="bg-[#f9f9f9] h-11 flex items-center justify-between px-4 border-b border-[#e5e5e5] text-sm text-[#666]">
        <div className="flex items-center gap-3">
          {/* Back for mobile */}
          {onBack && (
            <button onClick={onBack} className="md:hidden flex items-center gap-1 p-1 text-[#e0b326] hover:text-[#c4a825] text-lg">
              <ChevronLeft className="w-6 h-6" />
              <span>Notes</span>
            </button>
          )}
          <span>Aa</span>
          <span>☰</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-12 py-8 overflow-y-auto bg-white min-h-0">
        <article className="max-w-none">
          <div className="note-time text-sm text-[#888] mb-8">
            {musing.date}
            {musing.lastUpdated && ` • Last updated ${musing.lastUpdated}`}
          </div>
          <div 
            className="note-body text-sm leading-relaxed text-[#333] prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: musing.content }} 
          />
        </article>
      </div>
    </div>
  )
}
