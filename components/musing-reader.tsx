import { musings } from "@/content/musings"

interface MusingReaderProps {
  slug: string
}

export function MusingReader({ slug }: MusingReaderProps) {
  const musing = musings.find((b) => b.slug === slug)
  if (!musing) return null

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="bg-[#f9f9f9] h-11 flex items-center justify-between px-4 border-b border-[#e5e5e5] text-sm text-[#666]">
        <div className="flex items-center gap-4">
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
