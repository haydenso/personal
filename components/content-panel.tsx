import { X, ChevronLeft } from "lucide-react"
import type React from "react"

interface ContentPanelProps {
  onClose: () => void
  children: React.ReactNode
  /** Optional label to show as a back button on small viewports (e.g. "Notes") */
  backLabel?: string
}

export function ContentPanel({ onClose, children, backLabel }: ContentPanelProps) {
  return (
    <main className="flex-1 p-8 md:p-16 max-w-3xl overflow-y-auto max-md:pt-20 relative">
      {/* Back button for mobile/tablet (shown when a backLabel is provided) */}
      {backLabel && (
        <div className="absolute top-4 left-4 md:hidden">
          <button
            onClick={onClose}
            className="flex items-center gap-3 p-1 text-[#ffd52e] hover:text-[#e0b326] font-serif text-lg"
            aria-label="Back to list"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>{backLabel}</span>
          </button>
        </div>
      )}

      {/* Close (X) for larger viewports */}
      <div className="absolute top-4 right-4 hidden md:block">
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Close reading panel"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {children}
    </main>
  )
}
