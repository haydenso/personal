import { X } from "lucide-react"
import type React from "react"

interface ContentPanelProps {
  onClose: () => void
  children: React.ReactNode
}

export function ContentPanel({ onClose, children }: ContentPanelProps) {
  return (
    <main className="flex-1 p-8 md:p-16 max-w-3xl overflow-y-auto max-md:pt-20 relative">
      <div className="absolute top-4 right-4">
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
