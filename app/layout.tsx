import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, STIX_Two_Text, Zalando_Sans, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "katex/dist/katex.min.css"

const zalandoSans = Zalando_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
})
const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
})

export const metadata: Metadata = {
  title: "hayden's blueprint",
  description: "personal website of hayden",
  generator: "v0.app",
  icons: {
    icon: '/face/favicon.ico',
    apple: '/face/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/face/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/face/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/face/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="hayden's blueprint" />
        <meta name="theme-color" content="#FFD52E" />
      </head>
      <body className={`${stixTwoText.variable} ${zalandoSans.variable} ${jetBrainsMono.variable} ${caveat.variable} font-sans antialiased overflow-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
