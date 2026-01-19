import type React from "react"
import type { Metadata } from "next"
import "../styles/globals.css"
import "katex/dist/katex.min.css"
import { config } from '@/config'

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=STIX+Two+Text:ital,wght@0,400..700;1,400..700&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFD52E" />
      </head>
      <body className="font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}
