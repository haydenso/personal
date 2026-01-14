"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
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
import { Projects } from "@/components/projects"
import { ContentPanel } from "@/components/content-panel"
import { musings } from "@/content/musings"
import { blogs } from "@/content/blogs"

export type Tab = "about" | "musings" | "blogs" | "projects" | "bookshelf" | "gallery" | "timeline"

const interests = [
  "Chinese elite politics and political economy",
  "multi-agent collaboration and agent infrastructure",
  "continual learning in token space and RL x alignment problems",
  "intraday energy markets and commodities trading",
  "watching brainrot (it's anthropology i swear)",
  "weather prediction (ML vs numerical)",
  "laufey and olivia dean",
  "sherlock holmes and crime investigations",
  "the economics of warfare",
  "progress studies, formation of states (Singapore & LKY), state capacity libertarianism and supply side progressivism",
]

interface MainAppProps {
  initialTab?: Tab
}

export function MainApp({ initialTab = "about" }: MainAppProps) {
  // derive the current tab primarily from the URL (single source of truth)
  // use a short-lived `pendingTab` to reflect immediate UI after user tap
  const [pendingTab, setPendingTab] = useState<Tab | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [selectedMusing, setSelectedMusing] = useState<string | null>(null)
  const [selectedMusingCategory, setSelectedMusingCategory] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [interestsExpanded, setInterestsExpanded] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const deriveTabFromPath = (path?: string | null): Tab => {
    if (!path) return initialTab
    const seg = path.split('/')[1] || ''
    const allowed: Tab[] = ["about", "musings", "blogs", "projects", "bookshelf", "gallery", "timeline"]
    return seg === '' ? 'about' : (allowed.includes(seg as Tab) ? (seg as Tab) : 'about')
  }

  const derivedTab = deriveTabFromPath(pathname)
  const activeTab = pendingTab ?? derivedTab

  // Lock sidebar to the minimum width and disable resizing by constraining min/max to the same value
  const sidebar = useResizable({ initialWidth: 150, minWidth: 150, maxWidth: 150 })
  const blogsList = useResizable({
    initialWidth: 600,
    minWidth: 200,
    maxWidth: 600,
    offsetX: sidebar.width,
  })
  const musingsList = useResizable({
    initialWidth: 500,
    minWidth: 300,
    maxWidth: 800,
    offsetX: sidebar.width,
  })

  const lastNavRef = useRef<{ tab: Tab | null; time: number }>({ tab: null, time: 0 })

  // Navigate and set a transient pendingTab to avoid visual race while the router updates
  const handleTabChange = (tab: Tab) => {
    const now = Date.now()
    // ignore duplicate quick events
    if (lastNavRef.current.tab === tab && now - lastNavRef.current.time < 400) return
    lastNavRef.current = { tab, time: now }

    // set pending to immediately reflect the user's choice in the UI
    setPendingTab(tab)
    setMobileMenuOpen(false)

    // push URL path (let pathname drive the canonical state)
    const path = tab === "about" ? "/" : `/${tab}`
    router.push(path)

    // clear pending tab if navigation doesn't settle within reasonable time
    setTimeout(() => {
      setPendingTab((p) => (p === tab ? null : p))
    }, 1200)
  }

  // Track viewport width (wide vs narrow) so we can change musings behavior
  // Start false on the server to avoid hydration mismatch; update on client in effect
  const [isWideViewport, setIsWideViewport] = useState<boolean>(false)
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

  // When the canonical pathname changes, clear pendingTab if it matches the derived tab
  useEffect(() => {
    if (!pathname) return
    const seg = pathname.split('/')[1] || ''
    const allowed: Tab[] = ["about", "musings", "blogs", "projects", "bookshelf", "gallery", "timeline"]
    const tab: Tab = seg === '' ? 'about' : (allowed.includes(seg as Tab) ? (seg as Tab) : 'about')
    if (pendingTab === tab) setPendingTab(null)

    // Parse musings deep link: /musings/:category/:slug
    const musingsMatch = pathname.match(/^\/musings\/([^\/]+)\/([^\/]+)(?:\/|$)/)
    if (musingsMatch) {
      const [, category, slug] = musingsMatch
      setSelectedMusingCategory(category)
      setSelectedMusing(slug)
      return
    }

    // If pathname is not musings, clear category (but preserve selectedMusing until user closes)
    if (tab !== 'musings') {
      setSelectedMusingCategory(null)
    }
  }, [pathname, pendingTab])

  // Sync browser history popstate so pushState/popState updates (from MusingsList) are reflected in the UI
  useEffect(() => {
    const handler = () => {
      const path = typeof window !== 'undefined' ? window.location.pathname : pathname
      const musingsMatch = path.match(/^\/musings\/([^\/]+)\/([^\/]+)(?:\/|$)/)
      if (musingsMatch) {
        const [, category, slug] = musingsMatch
        setSelectedMusingCategory(category)
        setSelectedMusing(slug)
        setPendingTab('musings')
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handler)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handler)
      }
    }
  }, [])

  // Only auto-select the first item on initial page load (deep link), not on client navigation
  const initialMountRef = useRef(true)
  useEffect(() => {
    if (!initialMountRef.current) return

    // Only auto-select on wide viewports
    if (!isWideViewport) {
      initialMountRef.current = false
      return
    }

    // If the initial path is musings, auto-open the first pinned musing (or most recent if no pinned)
    if (derivedTab === 'musings' && !selectedMusing) {
      const sortedMusings = [...musings].sort((a, b) => {
        // Pinned musings first
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        // Within same pinned status, sort by lastUpdated (newest first), fallback to date
        const dateA = a.lastUpdated || a.date
        const dateB = b.lastUpdated || b.date
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      })

      if (sortedMusings.length > 0) {
        const firstMusing = sortedMusings[0]
        setSelectedMusing(firstMusing.slug)
        // Update URL to reflect the selected musing
        const href = `/musings/${firstMusing.category || 'uncategorized'}/${firstMusing.slug}`
        window.history.replaceState({}, '', href)
      }
    }

    // If the initial path is blogs, auto-open the most recent blog
    if (derivedTab === 'blogs' && !selectedBlog && blogs.length > 0) {
      // Import blogs synchronously - it's already in the bundle
      const sorted = [...blogs].sort((a, b) => {
        const parseDate = (dateStr: string) => {
          const [monthDay, year] = dateStr.split(' ')
          const months: Record<string, number> = {
            'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
            'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
          }
          const [month, day] = monthDay.split(' ')
          return new Date(parseInt(year), months[month] || 0, parseInt(day) || 1).getTime()
        }
        return parseDate(b.date) - parseDate(a.date)
      })
      if (sorted.length > 0) setSelectedBlog(sorted[0].slug)
    }

    initialMountRef.current = false
  }, [isWideViewport, derivedTab])

  // Close selected blog/musing on narrow viewports
  useEffect(() => {
    if (activeTab !== 'blogs') return
    if (isWideViewport) return
    if (selectedBlog) setSelectedBlog(null)
  }, [isWideViewport, activeTab])

  useEffect(() => {
    if (activeTab !== 'musings') return
    if (isWideViewport) return
    if (selectedMusing) setSelectedMusing(null)
  }, [isWideViewport, activeTab])

  // Auto-select top musing when switching to musings tab on wide viewports
  useEffect(() => {
    if (activeTab !== 'musings') return
    if (!isWideViewport) return
    if (selectedMusing) return // Don't override if already selected

    const sortedMusings = [...musings].sort((a, b) => {
      // Pinned musings first
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      // Within same pinned status, sort by lastUpdated (newest first), fallback to date
      const dateA = a.lastUpdated || a.date
      const dateB = b.lastUpdated || b.date
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

    if (sortedMusings.length > 0) {
      const firstMusing = sortedMusings[0]
      setSelectedMusing(firstMusing.slug)
      // Update URL to reflect the selected musing
      const href = `/musings/${firstMusing.category || 'uncategorized'}/${firstMusing.slug}`
      window.history.replaceState({}, '', href)
    }
  }, [activeTab, isWideViewport, selectedMusing])

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-[#FFF8E7] border border-[#e5d5b5] rounded-lg p-2.5 hover:bg-[#FEEABF] shadow-sm"
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
            selectedCategory={selectedMusingCategory || undefined}
            onSelectMusing={(s) => { setSelectedMusing(s) }}
            onSelectCategory={(c) => { setSelectedMusingCategory(c) }}
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
      ) : activeTab === "projects" ? (
        <Projects />
      ) : activeTab === "bookshelf" ? (
        <Bookshelf />
      ) : activeTab === "gallery" ? (
        <Gallery />
      ) : activeTab === "timeline" ? (
        <Timeline />
      ) : (
        <main className="flex-1 px-6 md:px-16 overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left column: Bio and images - 60% width on large screens */}
            <div className="lg:w-[60%] space-y-8">
              <div>
                <div className="flex items-center gap-4 pb-6">
                  <img src="/face/logo.png" alt="logo" className="w-12 h-12 rounded-md object-cover" />
                  <div>
                    <h1 className="text-3xl font-serif mb-2">hey, i'm hayden!</h1>
                    <p className="text-muted-foreground text-sm font-serif">hong kong / haydenso.hk [at] gmail.com</p>
                  </div>
                </div>
              <div className="space-y-4">
                <p className="text-muted-foreground font-serif">non-technically technical and technically non-technical</p>
                <div>
                  <p
                    className="font-serif pt-1.5 mt-4 mb-2 text-[15px]"
                    style={{
                      color: '#000000',
                      backgroundColor: '#FEEABF',
                      padding: '0 0.375rem',
                      borderRadius: '0.125rem',
                      display: 'inline-block',
                    }}
                  >/currently/ - starting <a href="https://sidoai.org/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">sidoai.org</a></p>                  <ol className="space-y-2 list-decimal list-inside font-serif">
                    <li className="text-foreground text-sm"><a href="/blogs" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">thinking and writing</a> about applied AI + RL, geopolitics and growth strategy</li>
                    <li className="text-foreground text-sm">studying cs + planets at hkust, politics at hku</li>
                    <li className="text-foreground text-sm"><a href="https://www.goodreads.com/user/show/186578130-hayden-so" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">reading sherlock and engineering blogs</a>, listening to laufey and dwarkesh</li>
                    <li className="text-foreground text-sm">
                      <button 
                        onClick={() => setInterestsExpanded(!interestsExpanded)}
                        className="inline-flex items-center gap-1 text-foreground hover:opacity-70 transition-opacity"
                        aria-label="Toggle interests"
                      >
                        <span>interested in (reveal)</span>
                        <svg 
                          className={`w-3 h-3 transition-transform ${interestsExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          strokeWidth="2.5" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </li>
                  </ol>
                  {interestsExpanded && (
                    <ol className="mt-3 space-y-1.5 list-decimal list-inside font-serif ml-4 text-sm text-muted-foreground italic">
                      {interests.map((interest, index) => (
                        <li key={index} className="leading-relaxed">
                          {interest}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                <div>
                  <p
                    className="font-serif pt-1.5 mt-4 mb-2 text-[15px]"
                    style={{
                      color: '#000000',
                      backgroundColor: '#FEEABF',
                      padding: '0 0.375rem',
                      borderRadius: '0.125rem',
                      display: 'inline-block',
                    }}
                  >/previously/</p>                  <ol className="space-y-2 list-decimal list-inside font-serif">
                    <li className="text-foreground text-sm">sold guns in the arctic for a summer (polar bears!), did high school in <a href="https://uwcrcn.no" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">Norway</a></li>
                    <li className="text-foreground text-sm">technical: NLP research at <a href="https://medicine.yale.edu/biomedical-informatics-data-science/" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">Yale</a> and software engineering at <a href="https://chatbot.com.hk" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">Set Sail AI</a></li>
                    <li className="text-foreground text-sm">hybrid: tech strategy consulting and <a href="https://en.wikipedia.org/wiki/Administrative_Officer_(Hong_Kong)" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">district governance</a> + AI adoption</li>
                    <li className="text-foreground text-sm">non-technical: HK's foreign relations and trade (Brussels) and <a href="https://www.cip.com/" target="_blank" rel="noopener noreferrer" className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid">energy</a> private equity</li>                  </ol>
                </div>
              </div>

                  {/* Peek into quick links (sticky note buttons) */}
                  <div className="pt-3 mt-6">
                    <div className="font-serif text-[15px] mb-2">
                      <span style={{ color: '#000000', backgroundColor: '#FEEABF', padding: '0 0.375rem', borderRadius: '0.125rem', display: 'inline-block' }}>/please wander! peek into my: /</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <button
                        onClick={() => { handleTabChange('musings'); setSelectedMusing(null); }}
                        aria-label="Open notes app"
                        className="inline-block border border-dotted border-[#FFD52E] text-[#b36b00] px-3 py-2 rounded-md transform -rotate-1 hover:bg-[#fff6db] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        notes app
                      </button>

                      <button
                        onClick={() => { handleTabChange('blogs'); setSelectedBlog(null); }}
                        aria-label="Open writings"
                        className="inline-block border border-dotted border-[#FFD52E] text-[#b36b00] px-3 py-2 rounded-md hover:bg-[#fff6db] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        writings
                      </button>

                      <button
                        onClick={() => { handleTabChange('bookshelf'); }}
                        aria-label="Open bookshelf"
                        className="inline-block border border-dotted border-[#FFD52E] text-[#b36b00] px-3 py-2 rounded-md transform -rotate-1 hover:bg-[#fff6db] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        bookshelf
                      </button>

                      <button
                        onClick={() => { handleTabChange('gallery'); }}
                        aria-label="Open gallery"
                        className="inline-block border border-dotted border-[#FFD52E] text-[#b36b00] px-3 py-2 rounded-md hover:bg-[#fff6db] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        gallery
                      </button>

                      <button
                        onClick={() => { handleTabChange('projects'); }}
                        aria-label="Open projects"
                        className="inline-block border border-dotted border-[#FFD52E] text-[#b36b00] px-3 py-2 rounded-md transform rotate-1 hover:bg-[#fff6db] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                      >
                        projects
                      </button>
                    </div>
                  </div>

                <div className="flex flex-wrap gap-4 pt-8 font-serif justify-center md:justify-start text-center">
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
                        <a
              href="https://scholar.google.com/citations?user=B1qjlbQAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
              scholar
            </a>
          </div>

              </div>
            </div>
            

            {/* Right column: Images + Interests - 40% width on large screens */}
            <div className="lg:w-[40%] lg:mt-0 space-y-6">
              <InterestsSection />
              <ImagesRow images={[
                { src: "/about/about-1.jpg", alt: "Image 1" },
                { src: "/about/about-2.jpg", alt: "Image 2" },
                { src: "/about/about-3.jpg", alt: "Image 3" }
              ]} />
            </div>
          </div>
          
          {/* images moved into the right column (see above) */}
          
          <div className="max-w-6xl mx-auto w-full">
            <Footer />
          </div>
        </main>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
