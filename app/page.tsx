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
import { ContentPanel } from "@/components/content-panel"
import { musings } from "@/content/musings"

type Tab = "about" | "musings" | "blogs" | "bookshelf"

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

  // Auto-select first musing when musings tab becomes active
  useEffect(() => {
    if (activeTab === "musings" && !selectedMusing) {
      // Sort musings: pinned first, then by date descending
      const sortedMusings = [...musings].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1
        if (!a.pinned && b.pinned) return 1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      
      if (sortedMusings.length > 0) {
        setSelectedMusing(sortedMusings[0].slug)
      }
    }
  }, [activeTab, selectedMusing])

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
              <MusingReader slug={selectedMusing} />
            </ContentPanel>
          )}
        </>
      ) : activeTab === "bookshelf" ? (
        <Bookshelf />
      ) : (
        <main className="flex-1 px-8 md:px-16 max-w-6xl overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left column: Bio and images - 60% width on large screens */}
            <div className="lg:w-[60%] space-y-8">
              <div>
                <h1 className="text-3xl font-serif mb-2">hey there, i'm hayden!</h1>
                <p className="text-muted-foreground text-sm font-serif">hong kong </p>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground font-serif">member of non-technical technical staff</p>
                <ol className="space-y-2 list-decimal list-inside font-serif">
                  <li className="text-foreground">
                    currently working on AI (governance, RL environments and evals) 
                  </li>
                  <li className="text-foreground">
                    i think about China, AI and the weather
                  </li>
                  <li className="text-foreground">
                    i sold guns in the arctic for a summer
                  </li>
                    <li className="text-foreground">
                    i like to 
                  </li>
                  <li className="text-foreground">
                    founding design engineer at{" "}
                    <a
                      href="https://paradigmai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
                    >
                      Paradigm
                    </a>
                    ; previously at{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
                    >
                      Vercel
                    </a>
                    .
                  </li>
                  <p>places i've lived: hong kong, flekke (norway), svalbard, brussels, london, toronto</p>
                </ol>

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
            haydenso.hk [at] gmail.com</a>
          </div>

              </div>
            </div>
            

            {/* Right column: Interests - 40% width on large screens */}
            <div className="lg:w-[40%] lg:mt-0">
              <InterestsSection />
            </div>
          </div>
          
          <ImagesRow images={[
                { src: "/about/about-1.jpg", alt: "Image 1" },
                { src: "/about/about-2.jpg", alt: "Image 2" },
                { src: "/about/about-3.jpg", alt: "Image 3" },
                { src: "/about/about-4.jpg", alt: "Image 4" }
              ]} />
          
          <Footer />
        </main>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
