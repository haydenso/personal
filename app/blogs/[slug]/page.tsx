import React from 'react'
import { BlogReader } from '@/components/blog-reader'

interface Props { params: Promise<{ slug: string }> }

export default async function BlogPage({ params }: Props) {
  const { slug } = await params
  return (
    <main className="w-full max-w-4xl mx-auto px-4 md:px-8 py-4 md:py-8">
      <BlogReader slug={slug} />
    </main>
  )
}
