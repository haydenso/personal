import { musings } from '@/content/musings'
import React from 'react'
import { ChevronLeft, Menu } from 'lucide-react'
import Link from 'next/link'

interface Props { params: Promise<{ category: string, slug: string }> }

export default async function MusingFullPage({ params }: Props) {
  const { category, slug } = await params
  const musing = musings.find((m) => m.slug === slug && (m.category || 'uncategorized') === category)
  if (!musing) return <main className="p-12">Musing not found</main>

  return (
    <div className="min-h-screen bg-[#f5f5f0] md:bg-white">
      {/* Hamburger menu for mobile */}
      <Link 
        href="/musings"
        className="fixed top-6 left-6 z-50 md:hidden bg-white border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Back to menu"
      >
        <Menu className="w-5 h-5" />
      </Link>

      {/* Content box */}
      <div className="h-screen md:min-h-0 pt-20 px-4 pb-4 md:pt-0 md:px-0 md:pb-0">
        <div className="flex flex-col h-[calc(100vh-6rem)] md:min-h-screen bg-white rounded-xl md:rounded-none shadow-lg md:shadow-none overflow-hidden">
          {/* Toolbar */}
          <div className="bg-[#f9f9f9] h-11 flex items-center justify-between px-4 border-b border-[#e5e5e5] text-sm text-[#666]">
            <div className="flex items-center gap-3">
              {/* Back button */}
              <Link href="/musings" className="flex items-center gap-1 p-1 text-[#e0b326] hover:text-[#c4a825] text-lg">
                <ChevronLeft className="w-6 h-6" />
                <span>Notes</span>
              </Link>
              <span className="uppercase text-xs font-mono text-muted-foreground hidden md:inline">{musing.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Aa</span>
              <span>☰</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 md:px-12 py-6 md:py-8 overflow-y-auto bg-white" style={{ paddingLeft: 'max(7vw, 1rem)', paddingRight: 'max(7vw, 1rem)' }}>
            <article className="max-w-none mx-auto w-full" style={{ maxWidth: 'min(72ch, 100%)' }}>
              <div className="note-time text-sm text-[#888] mb-6 md:mb-8">
                {musing.date}
                {musing.lastUpdated && ` • Last updated ${musing.lastUpdated}`}
              </div>
              <div 
                className="note-body text-sm leading-relaxed text-[#333] prose-musings prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: musing.content }} 
              />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
