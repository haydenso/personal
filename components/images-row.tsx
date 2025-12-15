import { useState } from "react"

interface ImagesRowProps {
  images: {
    src: string
    alt: string
    href?: string
  }[]
}

export function ImagesRow({ images }: ImagesRowProps) {
  const [imageSrcs, setImageSrcs] = useState<Record<number, string>>(
    images.reduce((acc, _, index) => ({ ...acc, [index]: images[index].src }), {})
  )

  const handleImageError = (index: number) => {
    const currentSrc = imageSrcs[index]
    let newSrc = currentSrc

    if (currentSrc.toLowerCase().endsWith('.jpg')) {
      // If ends with .jpg (case insensitive), try .JPG
      const base = currentSrc.slice(0, -4)
      newSrc = base + '.JPG'
    } else if (currentSrc.toLowerCase().endsWith('.jpeg')) {
      const base = currentSrc.slice(0, -5)
      newSrc = base + '.JPEG'
    } else if (currentSrc.toLowerCase().endsWith('.png')) {
      const base = currentSrc.slice(0, -4)
      newSrc = base + '.PNG'
    } else if (currentSrc.toLowerCase().endsWith('.gif')) {
      const base = currentSrc.slice(0, -4)
      newSrc = base + '.GIF'
    } else if (currentSrc.toLowerCase().endsWith('.webp')) {
      const base = currentSrc.slice(0, -5)
      newSrc = base + '.WEBP'
    }

    if (newSrc !== currentSrc) {
      setImageSrcs(prev => ({ ...prev, [index]: newSrc }))
    }
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