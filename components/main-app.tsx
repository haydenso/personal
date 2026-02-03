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
import { HQ } from "@/components/hq"
import { musings } from "@/content/musings"
import { blogs } from "@/content/blogs"
import type { AboutContent } from "@/lib/about"

export type Tab = "hq" | "about" | "musings" | "blogs" | "projects" | "bookshelf" | "gallery" | "timeline"

const defaultAboutTopImage = {
  src: "/saul.jpeg",
  caption: "Saul Steinberg's Self Portrait, 1949",
}

interface MainAppProps {
  initialTab?: Tab
  aboutHtml?: string
  aboutContent?: AboutContent
}

export function MainApp({ initialTab = "hq", aboutHtml = "", aboutContent }: MainAppProps) {
  // derive the current tab primarily from the URL (single source of truth)
  // use a short-lived `pendingTab` to reflect immediate UI after user tap
  const [pendingTab, setPendingTab] = useState<Tab | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [selectedMusing, setSelectedMusing] = useState<string | null>(null)
  const [selectedMusingCategory, setSelectedMusingCategory] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const deriveTabFromPath = (path?: string | null): Tab => {
    if (!path) return initialTab
    const seg = path.split('/')[1] || ''
    const allowed: Tab[] = ["hq", "about", "musings", "blogs", "projects", "bookshelf", "gallery", "timeline"]
    return seg === '' ? 'hq' : (allowed.includes(seg as Tab) ? (seg as Tab) : 'hq')
  }

  const derivedTab = deriveTabFromPath(pathname)
  const activeTab = pendingTab ?? derivedTab
  const isAboutTab = activeTab === "about"
  const aboutSections = aboutContent?.sections ?? []
  const aboutImages = aboutContent?.images ?? []
  const aboutBadge = aboutContent?.badge
  const aboutTopImageData = aboutContent?.topImage ?? defaultAboutTopImage

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
    const path = tab === "hq" ? "/" : `/${tab}`
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
    const allowed: Tab[] = ["hq", "about", "musings", "blogs", "projects", "bookshelf", "gallery", "timeline"]
    const tab: Tab = seg === '' ? 'hq' : (allowed.includes(seg as Tab) ? (seg as Tab) : 'hq')
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

  const headerFadeStyle = activeTab === 'hq'
    ? {
      background: 'linear-gradient(180deg, rgba(8, 110, 184, 0.96) 0%, rgba(8, 110, 184, 0.75) 40%, rgba(8, 110, 184, 0.35) 70%, rgba(8, 110, 184, 0) 100%)'
    }
    : {
      background: 'linear-gradient(180deg, rgba(224, 235, 252, 0.96) 0%, rgba(224, 235, 252, 0.75) 40%, rgba(224, 235, 252, 0.35) 70%, rgba(224, 235, 252, 0) 100%)'
    }

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="fixed top-0 left-0 right-0 z-40 h-15 md:hidden pointer-events-none backdrop-blur-md"
        style={headerFadeStyle}
      />
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#E0EBFC] border border-[#A5D8FF] text-[#1D376B] rounded-md p-1.5 hover:bg-[#CFE0F7] shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
      ) : activeTab === "hq" ? (
        <HQ />
      ) : (
        <main className="flex-1 px-6 md:px-16 overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left column: Bio and images - 60% width on large screens; expand to full width for the about page */}
            <div className={activeTab === 'about' ? 'w-full mx-auto max-w-3xl space-y-8' : 'lg:w-[60%] space-y-8'}>
                <div className="space-y-4 prose prose-sm max-w-none">
                  <div className="after:clear-both after:block after:content-['']">
                    {aboutTopImageData?.src && (
                      <figure className="md:float-right md:w-[220px] md:max-w-[34vw] md:ml-6 md:mb-4 md:mt-0 w-full max-w-[260px] mx-auto mb-6 mt-0">
                        <img src={aboutTopImageData.src} alt={aboutTopImageData.caption || 'portrait'} className="w-full rounded-sm object-cover" />
                        {aboutTopImageData.caption && (
                          <figcaption className="text-[13px] text-muted-foreground mt-1 font-serif">
                            {aboutTopImageData.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                    <div className="md:pt-0">
                      {isAboutTab && aboutBadge && (
                        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.4em] text-[#086EB8]">
                          <span>{aboutBadge.text}</span>
                          {aboutBadge.link && (
                            <a
                              href={aboutBadge.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#086EB8] underline decoration-dotted decoration-1 underline-offset-2"
                            >
                              {aboutBadge.link.text}
                            </a>
                          )}
                        </div>
                      )}
                      {aboutHtml ? <div dangerouslySetInnerHTML={{ __html: aboutHtml }} /> : null}
                    </div>
                  </div>
                </div>

              {/* Peek into quick links (sticky note buttons) */}
              <div className="pt-3 mt-6">
                <div className="font-serif text-[15px] mb-2">
                  <span style={{ color: '#1D376B', backgroundColor: '#E0EBFC', padding: '0 0.375rem', borderRadius: '0.125rem', display: 'inline-block' }}>/please wander! peek into my: /</span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => { handleTabChange('musings'); setSelectedMusing(null); }}
                    aria-label="Open notes app"
                    className="inline-block border border-dotted border-[#A5D8FF] text-[#1D376B] px-3 py-2 rounded-md transform -rotate-1 hover:bg-[#D6E4FA] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                  >
                    notes app
                  </button>

                  <button
                    onClick={() => { handleTabChange('blogs'); setSelectedBlog(null); }}
                    aria-label="Open writings"
                    className="inline-block border border-dotted border-[#A5D8FF] text-[#1D376B] px-3 py-2 rounded-md hover:bg-[#D6E4FA] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                  >
                    writings
                  </button>

                  <button
                    onClick={() => { handleTabChange('bookshelf'); }}
                    aria-label="Open bookshelf"
                    className="inline-block border border-dotted border-[#A5D8FF] text-[#1D376B] px-3 py-2 rounded-md transform -rotate-1 hover:bg-[#D6E4FA] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                  >
                    bookshelf
                  </button>

                  <button
                    onClick={() => { handleTabChange('gallery'); }}
                    aria-label="Open gallery"
                    className="inline-block border border-dotted border-[#A5D8FF] text-[#1D376B] px-3 py-2 rounded-md hover:bg-[#D6E4FA] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
                  >
                    gallery
                  </button>

                  <button
                    onClick={() => { handleTabChange('projects'); }}
                    aria-label="Open projects"
                    className="inline-block border border-dotted border-[#A5D8FF] text-[#1D376B] px-3 py-2 rounded-md transform rotate-1 hover:bg-[#D6E4FA] hover:border-solid transition-all cursor-pointer select-none font-mono text-sm"
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
                  href="https://github.com/haydenso"
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
                  href="mailto:haydenso.hk@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
                >
                  email
                </a>
                <a
                  href="https://scholar.google.com/citations?user=B1qjlbQAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
                >
                  scholar
                </a>
              </div>
              {isAboutTab && aboutSections.length > 0 && (
                <div className="mt-10 space-y-6">
                  {aboutSections.map((section, sectionIndex) => (
                    <section
                      key={`about-section-${sectionIndex}`}
                      className="rounded-3xl border border-border bg-white/70 p-6 shadow-sm text-foreground"
                    >
                      {section.title && (
                        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-3">
                          {section.title}
                        </p>
                      )}
                      <div className="space-y-4 text-sm leading-relaxed">
                        {section.bullets.map((bullet, bulletIndex) => (
                          <div
                            key={`section-${sectionIndex}-bullet-${bulletIndex}`}
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: bullet }}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
              {isAboutTab && aboutImages.length > 0 && (
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {aboutImages.map((image, index) => (
                    <figure
                      key={`about-image-${index}`}
                      className="overflow-hidden rounded-2xl border border-border bg-white/70"
                    >
                      <img
                        src={image.src}
                        alt={image.alt || image.caption || `about image ${index + 1}`}
                        className="h-40 w-full object-cover"
                      />
                      {image.caption && (
                        <figcaption className="px-3 py-2 text-[12px] text-muted-foreground">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </div>
            

            {/* Right column: Images + Interests - 40% width on large screens (hidden on about) */}
            {activeTab !== 'about' && (
              <div className="lg:w-[40%] lg:mt-0 space-y-6">
                <InterestsSection />
                <ImagesRow images={[
                  { src: "/about/about-1.jpg", alt: "Image 1" },
                  { src: "/about/about-2.jpg", alt: "Image 2" },
                  { src: "/about/about-3.jpg", alt: "Image 3" }
                ]} />
              </div>
            )}
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
