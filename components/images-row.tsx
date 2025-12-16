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
    <div className="grid grid-cols-4 gap-2 mt-4">
      {images.map((image, index) => (
        <div key={index} className="w-full overflow-hidden rounded-lg border border-border h-20 sm:h-24 md:h-28">
          {image.href ? (
            <a
              href={image.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={imageSrcs[index]}
                alt={image.alt}
                onError={() => handleImageError(index)}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </a>
          ) : (
            <img
              src={imageSrcs[index]}
              alt={image.alt}
              onError={() => handleImageError(index)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}