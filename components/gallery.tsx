"use client"

import { useState, useRef, useEffect } from "react"

interface ScatterImage {
  id: string
  src: string
  alt: string
  left: number
  top: number
  rotate: number
  scale: number
  z: number
  w: number
  h: number
}

export function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const baseImages = Array.from({ length: 12 }).map((_, i) => `/gallery/image-${(i % 8) + 1}.svg`)

  const [images, setImages] = useState<ScatterImage[]>([])

  // compute random scatter positions within the container
  const scatter = () => {
    const container = containerRef.current
    const width = container?.clientWidth || Math.min(window.innerWidth, 1600)
    const height = container?.clientHeight || Math.min(window.innerHeight, 1000)

    const generated: ScatterImage[] = baseImages.map((src, i) => {
      // compute image width relative to container width and clamp
      const w = Math.max(100, Math.min(260, Math.floor(width / 4) - (i % 3) * 8))
      const h = Math.floor((w * 3) / 4)
      const left = Math.floor(Math.random() * Math.max(16, width - w - 32))
      const top = Math.floor(Math.random() * Math.max(16, height - h - 32))
      const rotate = Math.round((Math.random() * 36 - 18) * 10) / 10 // -18..18
      const scale = Math.round((0.95 + Math.random() * 0.3) * 100) / 100
      return { id: `${i}`, src, alt: `Gallery ${i + 1}`, left, top, rotate, scale, z: i + 1, w, h }
    })

    setImages(generated)
  }

  useEffect(() => {
    scatter()
    const onResize = () => scatter()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 w-full min-h-screen overflow-hidden bg-[radial-gradient(circle,#f8f8f8 1px,transparent 1px)] bg-[length:20px_20px] p-6">
      <div className="px-4 md:px-14 pt-15 md:pt-12 pb-0 max-w-3xl">
        <h1 className="text-4xl font-serif mb-8">gallery - under construction</h1>

        <div className="mb-4">
          <button
            onClick={scatter}
            className="bg-[#ffd52e] text-gray-800 px-3 py-2 rounded-md shadow hover:scale-105 transition-transform font-serif"
          >
            Shuffle
          </button>
        </div>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-5xl h-[calc(100vh-10rem)] mt-4 px-8 md:px-16 overflow-hidden">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            draggable={false}
            className="absolute rounded-md transition-transform duration-300"
            style={{
              left: img.left,
              top: img.top,
              width: img.w,
              height: img.h,
              transform: `rotate(${img.rotate}deg) scale(${img.scale})`,
              zIndex: img.z,
            }}
          />
        ))}
      </div>

      {/* Shuffle button moved above canvas (under title) */}
    </div>
  )
}
