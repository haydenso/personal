import React from 'react'
import { BlogReader } from '@/components/blog-reader'
import { Menu } from 'lucide-react'
import Link from 'next/link'

interface Props { params: Promise<{ slug: string }> }

export default async function BlogPage({ params }: Props) {
  const { slug } = await params
  return (
    <>
      {/* Hamburger menu for mobile */}
      <Link 
        href="/blogs"
        className="fixed top-6 left-6 z-50 md:hidden bg-white border border-border rounded-lg p-2.5 hover:bg-muted"
        aria-label="Back to menu"
      >
        <Menu className="w-5 h-5" />
      </Link>

      {/* Mobile: white box with padding, Desktop: clean full page */}
      <div className="min-h-screen pt-20 px-4 pb-4 md:bg-transparent md:pt-0 md:px-0 md:pb-0">
        <div className="rounded-xl overflow-hidden md:bg-transparent md">
          <BlogReader slug={slug} />
        </div>
      </div>
    </>
  )
}
