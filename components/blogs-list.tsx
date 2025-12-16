import { blogs } from "@/content/blogs"
import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"
import { Footer } from "./footer"
import { useEffect, useState } from "react"

interface BlogsListProps {
  selectedBlog: string | null
  onSelectBlog: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

// Helper function to parse date string (MM-DD-YYYY) and return comparable timestamp
function parseBlogDate(dateString: string): number {
  const [month, day, year] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).getTime()
}

// Sort blogs in reverse chronological order (newest first)
function sortBlogsByDate() {
  return [...blogs].sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date))
}

export function BlogsList({ selectedBlog, onSelectBlog, width, isDragging, onMouseDown }: BlogsListProps) {
  const [isWide, setIsWide] = useState<boolean>(() => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches)

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

  const sortedBlogs = sortBlogsByDate()
  return (
    <div
      style={{ width: isWide ? `${width}px` : "100%" }}
      className={cn(
        "relative overflow-y-auto shrink-0 border-r border-border",
        selectedBlog && "max-md:hidden",
      )}
    >
      <div className="px-8 md:px-16 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full">
        <div className="bg-[#FEEABF] rounded-md p-8">
          <h1 className="text-4xl font-serif mb-2 text-foreground">blogs</h1>
          <p className="text-muted-foreground mb-6">field observations & works-in-progress.</p>

          <ol className="list-decimal list-inside space-y-4 font-serif text-lg">
            {sortedBlogs.map((blog) => (
              <li key={blog.slug}>
                <button onClick={() => onSelectBlog(blog.slug)} className="text-foreground hover:bg-[#FFD52E] underline decoration-dotted decoration-1 underline-offset-2 text-left">
                  {blog.title}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <Footer />
      </div>

      {selectedBlog && <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />}
    </div>
  )
}
