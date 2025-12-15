interface ImagesRowProps {
  images: {
    src: string
    alt: string
    href?: string
  }[]
}

export function ImagesRow({ images }: ImagesRowProps) {
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
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </a>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}