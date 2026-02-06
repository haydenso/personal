"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Footer } from "./footer"
import { timeline } from "@/content/timeline"

type NowTab = "gallery" | "timeline"

interface PolaroidImage {
  id: string
  src: string
  alt: string
  rotate: number
  index: number
}

export function Now() {
  const [activeTab, setActiveTab] = useState<NowTab>("timeline")

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
      {/* Tab Content */}
      {activeTab === "timeline" ? (
        <TimelineContent onTabChange={setActiveTab} />
      ) : (
        <GalleryContent onTabChange={setActiveTab} />
      )}
    </div>
  )
}

// Gallery content with integrated tab switcher
function GalleryContent({ onTabChange }: { onTabChange: (tab: NowTab) => void }) {
  const [images, setImages] = useState<PolaroidImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageCount = 7
        const imageFiles = Array.from({ length: imageCount }, (_, i) => `gallery-${i + 1}.jpg`)

        const loadedImages = imageFiles.map((file, i) => ({
          id: `${i}`,
          src: `/gallery/${file}`,
          alt: `Gallery photo ${i + 1}`,
          rotate: Math.random() * 8 - 4,
          index: i,
        }))

        setImages(loadedImages)
        setLoading(false)
      } catch (error) {
        console.error('Error loading gallery images:', error)
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  return (
    <div 
      className="flex-1 overflow-y-auto flex flex-col justify-between pb-0"
      style={{
        backgroundColor: '#086EB8',
        backgroundImage: "linear-gradient(rgba(8, 110, 184, 0.9), rgba(8, 110, 184, 0.9)), image-set(url('/blueprint.jpg') type('image/jpeg'))",
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 320px',
        backgroundPosition: 'center, top left',
        color: '#EBEFF4'
      }}
    >
      <div className="px-6 md:px-16 pt-28 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif mb-4 text-[#E0EBFC]">now</h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => onTabChange("timeline")}
              className="px-4 py-2 rounded-md font-serif transition-all bg-white/10 text-[#A5D8FF] hover:bg-white/15"
            >
              timeline
            </button>
            <button
              onClick={() => onTabChange("gallery")}
              className="px-4 py-2 rounded-md font-serif transition-all bg-white/20 text-[#E0EBFC] border border-[#A5D8FF]"
            >
              gallery
            </button>
          </div>

          {loading ? (
            <p className="text-[#A5D8FF]">Loading gallery...</p>
          ) : (
            <>
              <p className="text-[#A5D8FF] mb-12">moments captured on film</p>

              {/* Polaroid wall grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-50"
                    style={{
                      transform: `rotate(${img.rotate}deg)`,
                    }}
                  >
                    {/* Clothespin */}
                    <div className="relative mx-auto w-3 h-6 -mb-2 z-10">
                      <div 
                        className="w-full h-full rounded-sm"
                        style={{
                          background: 'linear-gradient(to bottom, #D4A574 0%, #C9985E 50%, #D4A574 100%)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      />
                    </div>

                    {/* Polaroid frame */}
                    <div 
                      className="bg-white shadow-lg p-3 pb-8"
                      style={{
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.15)'
                      }}
                    >
                      {/* Image container */}
                      <div className="relative w-full aspect-square bg-gray-50 mb-2 flex items-center justify-center">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={img.index < 5}
                          quality={85}
                        />
                      </div>

                      {/* Caption area */}
                      <div className="text-center">
                        <p 
                          className="text-xs text-gray-700"
                          style={{
                            fontFamily: 'var(--font-handwriting)',
                            fontSize: '0.875rem'
                          }}
                        >
                          archive #{img.index + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-16">
        <Footer />
      </div>
    </div>
  )
}

// Timeline content with integrated tab switcher
function TimelineContent({ onTabChange }: { onTabChange: (tab: NowTab) => void }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div 
      className="flex-1 overflow-y-auto flex flex-col justify-between pb-0"
      style={{
        backgroundColor: '#086EB8',
        backgroundImage: "linear-gradient(rgba(8, 110, 184, 0.9), rgba(8, 110, 184, 0.9)), image-set(url('/blueprint.jpg') type('image/jpeg'))",
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 320px',
        backgroundPosition: 'center, top left',
        color: '#EBEFF4'
      }}
    >
      <div className="px-6 md:px-16 pt-28 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif mb-4 text-[#E0EBFC]">now</h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => onTabChange("timeline")}
              className="px-4 py-2 rounded-md font-serif transition-all bg-white/20 text-[#E0EBFC] border border-[#A5D8FF]"
            >
              timeline
            </button>
            <button
              onClick={() => onTabChange("gallery")}
              className="px-4 py-2 rounded-md font-serif transition-all bg-white/10 text-[#A5D8FF] hover:bg-white/15"
            >
              gallery
            </button>
          </div>

          <p className="text-sm text-[#A5D8FF] mb-8">Underconsutrction. I'm up to, updated occasionally. Inspired by <a className="text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid" href="https://sive.rs/now" target="_blank" rel="noopener noreferrer">Derek Sivers</a>.</p>

          {/* Timeline content wrapper with narrower max-width */}
          <div className="max-w-2xl">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-[#A5D8FF]/50" />

            <div className="space-y-8">
              {timeline.map((item, i) => {
                const isOpen = open === i
                return (
                  <div key={item.slug} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-[#086EB8] border-2 border-[#E0EBFC] z-10" />

                    <div className="ml-10">
                      {/* Image card */}
                      <div 
                        className="cursor-pointer group"
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        {item.image && (
                          <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 600px"
                            />
                          </div>
                        )}

                        {item.badge && (
                          <div className="inline-block bg-white/20 px-2 py-0.5 rounded text-xs font-mono text-[#E0EBFC] uppercase tracking-widest mb-2">
                            {item.badge}
                          </div>
                        )}

                        <p className="text-xs text-[#A5D8FF] mb-1">{item.date}</p>
                        <h2 className="text-lg font-serif mb-2 group-hover:underline text-[#E0EBFC]">
                          {item.title} <span className="text-[#A5D8FF]">→</span>
                        </h2>
                        
                        {!isOpen && item.excerpt && (
                          <p className="text-sm text-[#A5D8FF]">{item.excerpt}</p>
                        )}
                    </div>

                      {/* Expanded content */}
                      {isOpen && (
                        <div className="mt-4 prose prose-sm max-w-none prose-invert">
                          <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto w-full px-6 md:px-16">
        <Footer />
      </div>
    </div>
  )
}
