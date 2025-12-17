"use client"

import Image from "next/image"
import { useState } from "react"

interface ImagesRowProps {
  images: {
    src: string
    alt: string
    href?: string
  }[]
}

export function ImagesRow({ images }: ImagesRowProps) {
  // Track the current src and how many retries we've attempted for each image
  const [imageSrcs, setImageSrcs] = useState<Record<number, string>>(
    images.reduce((acc, _, index) => ({ ...acc, [index]: images[index].src }), {})
  )
  const [attempts, setAttempts] = useState<Record<number, number>>(
    images.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  )

  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%23f3f3f3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='20'>Image unavailable</text></svg>`
  )}`

  const tryNextFallback = (index: number) => {
    const current = imageSrcs[index]
    const attempt = (attempts[index] || 0) + 1

    // Sequence of fallback strategies
    let next = current
    if (attempt === 1) {
      // Toggle extension case (jpg -> JPG, jpeg -> JPEG, png -> PNG, etc.)
      const extMatch = current.match(/(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i)
      if (extMatch) {
        const base = current.slice(0, -extMatch[0].length)
        next = base + extMatch[0].toUpperCase()
      } else {
        next = current + '.JPG'
      }
    } else if (attempt === 2) {
      // Try .webp version (if not already webp)
      if (!/\.webp$/i.test(current)) next = current.replace(/(\.jpg|\.jpeg|\.png|\.gif)$/i, '.webp')
      else next = current + '?v=1'
    } else if (attempt === 3) {
      // Cache-bust the URL
      next = current.includes('?') ? `${current}&cb=1` : `${current}?cb=1`
    } else if (attempt === 4) {
      // If it's the 3rd image (index 2) try a smaller variant to avoid heavy loads
      if (index === 2) {
        const m = current.match(/^(.*)(\.(jpg|jpeg|png|webp|gif))$/i)
        if (m) next = `${m[1]}-sm${m[2]}`
        else next = current + '?small=1'
      } else {
        next = placeholder
      }
    } else {
      // Fallback to placeholder
      next = placeholder
    }

    setAttempts((prev) => ({ ...prev, [index]: attempt }))
    setImageSrcs((prev) => ({ ...prev, [index]: next }))
  }

  const handleImageError = (index: number) => {
    // Avoid retrying forever
    if ((attempts[index] || 0) >= 4) return
    tryNextFallback(index)
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {images.map((image, index) => (
        <div key={index} className="w-full overflow-hidden rounded-lg border border-border h-20 sm:h-24 md:h-28 relative">
          {image.href ? (
            <a
              href={image.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <Image
                src={imageSrcs[index]}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 200px, 25vw"
                style={{ objectFit: 'cover' }}
                onError={() => handleImageError(index)}
                loading="lazy"
                decoding="async"
                className="transition-transform duration-200 hover:scale-105"
              />
            </a>
          ) : (
            <Image
              src={imageSrcs[index]}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 200px, 25vw"
              style={{ objectFit: 'cover' }}
              onError={() => handleImageError(index)}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      ))}
    </div>
  )
}