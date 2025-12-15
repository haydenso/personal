"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useResizable } from "@/hooks/use-resizable"
import { Sidebar } from "@/components/sidebar"
import { AboutSection } from "@/components/about-section"
import { BlogsList } from "@/components/blogs-list"
import { MusingsList } from "@/components/musings-list"
import { BlogReader } from "@/components/blog-reader"
import { MusingReader } from "@/components/musing-reader"
import { Bookshelf } from "@/components/bookshelf"
import { ContentPanel } from "@/components/content-panel"

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
        <main className="flex-1 px-8 md:px-16 max-w-3xl overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0">
          <AboutSection />
        </main>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
