'use client'

import { MusingsList } from "@/components/musings-list"
import { MusingReader } from "@/components/musing-reader"
import { useState, useCallback, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { config } from '@/config'

export function MainApp({ initialSlug }: { initialSlug?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedMusing, setSelectedMusing] = useState<string | null>(initialSlug || null)
  const [listWidth, setListWidth] = useState(config.ui.defaultListWidth)
  const [isDragging, setIsDragging] = useState(false)

  // Sync state with URL on popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/') {
        setSelectedMusing(null)
      } else {
        const parts = path.split('/')
        const slug = parts[parts.length - 1]
        setSelectedMusing(slug)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleSelectMusing = useCallback((slug: string) => {
    setSelectedMusing(slug)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedMusing(null)
    router.push('/')
  }, [router])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(300, Math.min(800, e.clientX))
      setListWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: config.ui.backgroundColor }}>
      <MusingsList
        selectedMusing={selectedMusing}
        onSelectMusing={handleSelectMusing}
        width={listWidth}
        isDragging={isDragging}
        onMouseDown={handleMouseDown}
      />
      {selectedMusing && (
        <MusingReader slug={selectedMusing} onBack={handleBack} />
      )}
    </div>
  )
}
