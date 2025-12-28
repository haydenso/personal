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
  return (
    <div
      style={{ width: isWide ? `${width}px` : "100%" }}
      className={cn(
        "relative h-full overflow-y-auto shrink-0",
        selectedBlog && "max-md:hidden",
      )}
    >
      <div className="px-4 md:px-16 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full items-center md:items-stretch">
        <div className="bg-[#FEEABF] rounded-md p-8">
          <h1 className="text-4xl font-serif mb-2 text-foreground">blogs</h1>
          <p className="text-muted-foreground mb-6">field observations & works-in-progress.</p>

          <ol className="list-decimal list-inside space-y-4 font-serif text-md">
            {sortedBlogs.map((blog) => (
              <li key={blog.slug}>
                <Link href={`/blogs/${blog.slug}`} className="text-foreground underline hover:text-foreground/80 hover:font-semibold">
                  {blog.title}
                </Link>
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
