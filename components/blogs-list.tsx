import Link from "next/link"
import { blogs } from "@/content/blogs"
import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"
import { Footer } from "./footer"
import { useEffect, useState, useMemo } from "react"

interface BlogsListProps {
  selectedBlog: string | null
  onSelectBlog: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

const interests = [
  "twilight, the series and time of day; middle school reading",
  "lim poetry; art by statistical, stochastic machines",
  "midnight conversation; wholesome nostalgic gossip",
  "3am walks in boston winter; too cold for comfort, enough to keep moving",
  '"tell me your life story in four minutes"; whatever you find beautiful',
  "the anthropocene reviewed, shipping out; witty observation and warm voices",
  "shard theory, assembly theory; grand ambitious theories of everything",
  "poetry, vibes decomposition; concepts as vectors spaces",
  "the swiss alps; mountain climbing",
  "freedom, flourishing",
  "simplicity, specificity, spontaneity"
]

export function BlogsList({ selectedBlog, onSelectBlog, width, isDragging, onMouseDown }: BlogsListProps) {
  // Start false on the server to avoid hydration mismatch; update on client in effect
  const [isWide, setIsWide] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = () => setIsWide(mq.matches)
    mq.addEventListener?.("change", handler)
    mq.addListener?.(handler)
    handler()
    return () => {
      mq.removeEventListener?.("change", handler)
      mq.removeListener?.(handler)
    }
  }, [])

  // Memoize sorted blogs to avoid re-sorting on every render
  const sortedBlogs = useMemo(() => {
    const parseDate = (dateStr: string) => {
      const [monthDay, year] = dateStr.split(' ')
      const months: Record<string, number> = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      }
      const parts = monthDay.split(' ')
      const month = months[parts[0]] || 0
      const day = parseInt(parts[1]) || 1
      return new Date(parseInt(year), month, day).getTime()
    }
    return [...blogs].sort((a, b) => parseDate(b.date) - parseDate(a.date))
  }, [])

  // Format date to YYYY-MM-DD format (handles "September 15 2025")
  const formatDate = (dateStr: string) => {
    const months: Record<string, string> = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
      'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
    }

    const parts = dateStr.trim().split(/\s+/)
    // Expect formats like: [MonthName, Day, Year]
    if (parts.length >= 3) {
      const monthName = parts[0]
      const day = parts[1].padStart(2, '0')
      const year = parts[2]
      const month = months[monthName] || '01'
      return `${year}-${month}-${day}`
    }

    // Fallback: try to parse with Date
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) {
      const y = String(d.getFullYear())
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    }

    // As a last resort, return the original string
    return dateStr
  }

  return (
    <div className="flex-1 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-0">
      <div className="px-6 md:px-16 flex-1 w-full max-w-2xl mx-auto">        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-serif mb-2">blogs</h1>
            <p className="text-muted-foreground mb-6">field observations & works-in-progress.</p>
          </div>

          <div className="flex justify-center gap-3 text-muted-foreground/40">
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
          </div>

          {/* Blog Posts */}
          <div className="space-y-4">
            <p className="text-muted-foreground italic font-serif">
              i write substack-type pieces here, check out musings for my personal wiki or  projects for full work logs.
            </p>
            
            <div className="space-y-4">
              {sortedBlogs.map((blog) => (
                <Link 
                  key={blog.slug} 
                  href={`/blogs/${blog.slug}`}
                  className="grid grid-cols-[6.5rem_1fr] gap-6 group hover:opacity-70 transition-opacity"
                >
                  <span className="text-muted-foreground/60 font-mono text-sm tabular-nums">
                    {formatDate(blog.date)}
                  </span>
                  <span className="text-foreground font-serif text-base leading-relaxed group-hover:underline">
                    {blog.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {selectedBlog && <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />}
    </div>
  )
}
