import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const zalandoSans = {
  className: "zalando-sans",
  variable: "--font-sans",
}
const stixTwoText = {
  className: "stix-two-text",
  variable: "--font-serif",
}

export const metadata: Metadata = {
  title: "hayden's hq",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=STIX+Two+Text:ital,wght@0,400..700;1,400..700&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
          <link rel="shortcut icon" href="/face/favicon.ico" />
          <link rel="icon" type="image/png" sizes="192x192" href="/face/favicon-192x192.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="/face/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="hayden's hq" />
          <meta name="theme-color" content="#FFD52E" />
      </head>
      <body className={`${stixTwoText.variable} ${zalandoSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
