declare module 'next/image' {
  import * as React from 'react'

  type StaticImageData = {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }

  interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: StaticImageData | string
    width?: number | string
    height?: number | string
    fill?: boolean
    sizes?: string
    style?: React.CSSProperties
    quality?: number
    priority?: boolean
    loading?: 'lazy' | 'eager'
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    unoptimized?: boolean
  }

  const Image: React.ForwardRefExoticComponent<
    ImageProps & React.RefAttributes<HTMLImageElement>
  >

  export default Image
  export { StaticImageData }
}
