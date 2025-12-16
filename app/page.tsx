"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useResizable } from "@/hooks/use-resizable"
import { Sidebar } from "@/components/sidebar"
import { InterestsSection } from "@/components/interests-section"
import { ImagesRow } from "@/components/images-row"
import { Footer } from "@/components/footer"
import { BlogsList } from "@/components/blogs-list"
import { MusingsList } from "@/components/musings-list"
import { BlogReader } from "@/components/blog-reader"
import { MusingReader } from "@/components/musing-reader"
import { Bookshelf } from "@/components/bookshelf"
import { Gallery } from "@/components/gallery"
import { Timeline } from "@/components/timeline"
import { ContentPanel } from "@/components/content-panel"
import { musings } from "@/content/musings"

type Tab = "about" | "musings" | "blogs" | "bookshelf" | "gallery" | "timeline"

export default function PersonalWebsite() {
  const [activeTab, setActiveTab] = useState<Tab>("about")
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [selectedMusing, setSelectedMusing] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sidebar = useResizable({ initialWidth: 192, minWidth: 150, maxWidth: 400 })
  const blogsList = useResizable({
    initialWidth: 600,
    minWidth: 200,
    maxWidth: 600,
    offsetX: sidebar.width,
  })
  const musingsList = useResizable({
    initialWidth: 600,
    minWidth: 200,
    maxWidth: 600,
    offsetX: sidebar.width,
  })

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  // Track viewport width (wide vs narrow) so we can change musings behavior
  const [isWideViewport, setIsWideViewport] = useState<boolean>(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = () => setIsWideViewport(mq.matches)
    mq.addEventListener?.('change', handler)
    mq.addListener?.(handler)
    handler()
    return () => {
      mq.removeEventListener?.('change', handler)
      mq.removeListener?.(handler)
    }
  }, [])

  // Auto-select first musing when musings tab becomes active, but only on wide screens
  useEffect(() => {
    if (activeTab !== 'musings' || selectedMusing) return
    if (!isWideViewport) return

    // Sort musings: pinned first, then by date descending
    const sortedMusings = [...musings].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    if (sortedMusings.length > 0) {
      setSelectedMusing(sortedMusings[0].slug)
    }
  }, [activeTab, selectedMusing, isWideViewport])

  // Auto-select first blog when blogs tab becomes active, but only on wide screens
  useEffect(() => {
    if (activeTab !== 'blogs' || selectedBlog) return
    if (!isWideViewport) return

    ;(async () => {
      const m = await import('@/content/blogs')
      const sorted = [...m.blogs].sort((a: any, b: any) => {
        const [am, ad, ay] = a.date.split('-').map(Number)
        const [bm, bd, by] = b.date.split('-').map(Number)
        return new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime()
      })

      if (sorted.length > 0) setSelectedBlog(sorted[0].slug)
    })()
  }, [activeTab, selectedBlog, isWideViewport])

  // If viewport becomes narrow while a blog is open, close it
  useEffect(() => {
    if (activeTab !== 'blogs') return
    if (isWideViewport) return
    if (selectedBlog) setSelectedBlog(null)
  }, [isWideViewport, activeTab])

  // If viewport becomes narrow while a musing is open, close it (so list is the default view on small screens)
  useEffect(() => {
    if (activeTab !== 'musings') return
    if (isWideViewport) return
    if (selectedMusing) setSelectedMusing(null)
  }, [isWideViewport, activeTab])

  return (
    <div className="flex min-h-screen">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        width={sidebar.width}
        isDragging={sidebar.isDragging}
        onMouseDown={sidebar.handleMouseDown}
        mobileMenuOpen={mobileMenuOpen}
      />

      {activeTab === "blogs" ? (
        <>
          <BlogsList
            selectedBlog={selectedBlog}
            onSelectBlog={setSelectedBlog}
            width={blogsList.width}
            isDragging={blogsList.isDragging}
            onMouseDown={blogsList.handleMouseDown}
          />
          {selectedBlog && (
            <ContentPanel onClose={() => setSelectedBlog(null)}>
              <BlogReader slug={selectedBlog} />
            </ContentPanel>
          )}
        </>
      ) : activeTab === "musings" ? (
        <>
          <MusingsList
            selectedMusing={selectedMusing}
            onSelectMusing={setSelectedMusing}
            width={musingsList.width}
            isDragging={musingsList.isDragging}
            onMouseDown={musingsList.handleMouseDown}
          />
          {selectedMusing && (
            <ContentPanel onClose={() => setSelectedMusing(null)}>
              <MusingReader slug={selectedMusing} onBack={() => setSelectedMusing(null)} />
            </ContentPanel>
          )}
        </>
      ) : activeTab === "bookshelf" ? (
        <Bookshelf />
      ) : activeTab === "gallery" ? (
        <Gallery />
      ) : activeTab === "timeline" ? (
        <Timeline />
      ) : (
        <main className="flex-1 px-8 md:px-16 max-w-6xl overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left column: Bio and images - 60% width on large screens */}
            <div className="lg:w-[60%] space-y-8">
              <div>
                <div className="flex items-center gap-4 pb-6">
                  <img src="/face/logo.png" alt="logo" className="w-12 h-12 rounded-md object-cover" />
                  <div>
                    <h1 className="text-3xl font-serif mb-2">hey there, i'm hayden!</h1>
                    <p className="text-muted-foreground text-sm font-serif">hong kong / haydenso.hk [at] gmail.com</p>
                  </div>
                </div>
              <div className="space-y-4">
                <p className="text-muted-foreground font-serif">member of non-technical technical staff</p>
                <div>
                  <p
                    className="font-serif"
                    style={{
                      color: '#000000',
                      backgroundColor: '#FEEABF',
                      padding: '0 0.375rem',
                      borderRadius: '0.125rem',
                      display: 'inline-block',
                    }}
                  >/currently/ - cofounder @ sidoai.org</p>
                  <ol className="space-y-2 list-decimal list-inside font-serif">
                    <li className="text-foreground"><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">thinking and writing</a> about AI governance, RL environments and China</li>
                    <li className="text-foreground"><a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">reading biographies, sherlock, history and engineering blogs</a></li>
                    <li className="text-foreground">studying cs + planets at hkust, politics at hku</li>
                  </ol>
                </div>

                <div>
                  <p
                    className="font-serif pt-1.5"
                    style={{
                      color: '#000000',
                      backgroundColor: '#FEEABF',
                      padding: '0 0.375rem',
                      borderRadius: '0.125rem',
                      display: 'inline-block',
                    }}
                  >/previously/</p>
                  <ol className="space-y-2 list-decimal list-inside font-serif">
                    <li className="text-foreground">i sold guns in the arctic for a summer. finished high school in Norway <a href="https://uwcrcn.no" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">(UWC)</a></li>
                    <li className="text-foreground">technical: software engineering at <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">Set Sail AI</a> and NLP research at <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">Yale</a></li>
                    <li className="text-foreground">non-technical: HK's foreign relations and trade (Brussels), <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">energy</a> private equity</li>
                  </ol>
                </div>

                  {/* Peek into quick links (sticky note buttons) */}
                  <div className="mt-6">
                    <div className="font-serif mb-2">peek into my:</div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { handleTabChange('musings'); setSelectedMusing(null); }}
                        aria-label="Open notes app"
                        className="inline-block bg-[#FEEABF] text-gray-800 px-3 py-2 rounded-md shadow-lg transform -rotate-3 hover:scale-105 transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        notes app
                      </button>

                      <button
                        onClick={() => { handleTabChange('blogs'); setSelectedBlog(null); }}
                        aria-label="Open writings"
                        className="inline-block bg-[#FEEABF] text-gray-800 px-3 py-2 rounded-md shadow-lg transform hover:scale-105 transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        writings
                      </button>

                      <button
                        onClick={() => { handleTabChange('bookshelf'); }}
                        aria-label="Open bookshelf"
                        className="inline-block bg-[#FEEABF] text-gray-800 px-3 py-2 rounded-md shadow-lg transform -rotate-3 hover:scale-105 transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        bookshelf
                      </button>
                    </div>
                  </div>
              </div>

                <div className="flex items-center gap-4 pt-8 font-serif">
            <span className="text-muted-foreground">contact:</span>
            <a
              href="https://www.linkedin.com/in/haydenso/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
              linkedin
            </a>
            <a
              href="https://github.com/haydsso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
              github
            </a>
            <a
              href="https://x.com/haydsso"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
              twitter
            </a>
            <a              
              href="haydenso.hk@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
            email</a>
          </div>

              </div>
            </div>
            

            {/* Right column: Images + Interests - 40% width on large screens */}
            <div className="lg:w-[40%] lg:mt-0 space-y-6">
              <InterestsSection />
              <ImagesRow images={[
                { src: "/about/about-1.jpg", alt: "Image 1" },
                { src: "/about/about-2.jpg", alt: "Image 2" },
                { src: "/about/about-3.jpg", alt: "Image 3" },
                { src: "/about/about-4.jpg", alt: "Image 4" }
              ]} />
            </div>
          </div>
          
          {/* images moved into the right column (see above) */}
          
          <Footer />
        </main>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
