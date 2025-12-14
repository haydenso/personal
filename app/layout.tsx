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
  title: "floguo's cozy nook",
  description: "personal website of flora guo",
  generator: "v0.app",
  icons: {
    icon: {
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
      type: 'image/svg+xml',
    },
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
      </head>
      <body className={`${stixTwoText.variable} ${zalandoSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
