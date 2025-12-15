import { NextResponse } from "next/server"
import { getBlogBySlug, markdownToHtml } from "@/lib/mdx"
import { blogs } from "@/content/blogs"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  const mdx = getBlogBySlug(slug)
  if (mdx) {
    return NextResponse.json({
      slug: mdx.slug,
      title: mdx.title,
      date: mdx.date,
      contentHtml: markdownToHtml(mdx.content),
    })
  }

  // Fallback to inline blogs content
  const blog = blogs.find((n) => n.slug === slug)
  if (blog) {
    return NextResponse.json({
      slug: blog.slug,
      title: blog.title,
      date: blog.date,
      contentHtml: blog.content, // already HTML
    })
  }

  return NextResponse.json({ message: "Not found" }, { status: 404 })
}


