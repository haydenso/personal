import React from 'react'
import { Sidebar } from '@/components/sidebar'

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeTab={'blogs'}
        width={150}
        isDragging={false}
        mobileMenuOpen={false}
      />

      <main className="flex-1 overflow-y-auto pt-16 md:pt-16 px-0 md:px-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  )
}
