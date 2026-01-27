"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Footer } from "./footer"

interface PolaroidImage {
  id: string
  src: string
  alt: string
  rotate: number
  index: number
}

export function Gallery() {
  const [images, setImages] = useState<PolaroidImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dynamically load all images from gallery folder
    const loadImages = async () => {
      try {
        // Get all SVG files from gallery folder
        const imageFiles = [
          'image-1.svg',
          'image-2.svg',
          'image-3.svg',
          'image-4.svg',
          'image-5.svg',
          'image-6.svg',
          'image-7.svg',
          'image-8.svg',
        ]

        const loadedImages = imageFiles.map((file, i) => ({
          id: `${i}`,
          src: `/gallery/${file}`,
          alt: `Gallery photo ${i + 1}`,
          rotate: Math.random() * 8 - 4, // -4 to 4 degrees
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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading gallery...</p>
      </div>
    )
  }

  return (
    <div 
      className="flex-1 overflow-y-auto flex flex-col justify-between min-h-screen pb-0"
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
          <h1 className="text-4xl font-serif mb-4 text-[#E0EBFC]">gallery</h1>
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
                  <div className="relative w-full aspect-square bg-gray-100 mb-2">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
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
                      memory #{img.index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 md:px-16">
        <Footer />
      </div>
    </div>
  )
}
