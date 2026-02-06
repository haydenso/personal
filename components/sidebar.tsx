"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

type Tab = "hq" | "about" | "musings" | "blogs" | "projects" | "research" | "bookshelf" | "now"

interface SidebarProps {
  activeTab: Tab
  onTabChange?: (tab: Tab) => void
  width: number
  isDragging?: boolean
  onMouseDown?: (e: React.MouseEvent) => void
  mobileMenuOpen?: boolean
}

export function Sidebar({ activeTab, onTabChange, width, isDragging = false, onMouseDown, mobileMenuOpen = false }: SidebarProps) {
  const router = useRouter()
  const tabs: Tab[] = ["hq", "about", "musings", "blogs", "projects", "research", "bookshelf", "now"]

  const handleTabClick = (tab: Tab) => {
    if (onTabChange) return onTabChange(tab)
    // fallback: navigate using router if no handler was provided (server-rendered layouts)
    const path = tab === 'hq' ? '/' : `/${tab}`
    try {
      router.push(path)
    } catch (e) {
      if (typeof window !== 'undefined') window.location.pathname = path
    }
  }

  return (
    <aside
      style={{ width: `${width}px`, borderRight: '3px double var(--border)' }}
      className={cn(
        "relative shrink-0 bg-background",
        "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:shadow-lg",
        "max-md:transition-transform max-md:duration-150",
        mobileMenuOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
      )}
    >
      {/* Ribbon Bookmark */}
      <div className="absolute top-0 left-8 w-8 h-40 z-10 group">
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(rgba(8, 110, 184, 0.65), rgba(8, 110, 184, 0.65)), url('/blueprint.jpg')",
            backgroundColor: '#086EB8',
            backgroundRepeat: 'no-repeat, repeat',
            backgroundSize: 'auto, 420px',
            backgroundPosition: 'center, top left',
            border: '1px solid #086EB8',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.25), inset -1px -1px 2px rgba(0,0,0,0.15)',
          }}
        >
        </div>
      </div>
      <style jsx>{`
        @keyframes sheen {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
      <nav className="flex flex-col gap-2 p-8 pt-54">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "text-left py-1 transition-colors uppercase tracking-widest text-xs",
              activeTab === tab ? "text-foreground" : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Sidebar is fixed width now; no resize handle */}
    </aside>
  )
}
