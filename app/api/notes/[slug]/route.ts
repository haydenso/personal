import { NextResponse } from "next/server"
import { getNoteBySlug, markdownToHtml } from "@/lib/mdx"
import { notes } from "@/content/notes"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  const mdx = getNoteBySlug(slug)
  if (mdx) {
    return NextResponse.json({
      slug: mdx.slug,
      title: mdx.title,
      date: mdx.date,
      contentHtml: markdownToHtml(mdx.content),
    })
  }

  // Fallback to inline notes content
  const note = notes.find((n) => n.slug === slug)
  if (note) {
    return NextResponse.json({
      slug: note.slug,
      title: note.title,
      date: note.date,
      contentHtml: note.content, // already HTML
    })
  }

  return NextResponse.json({ message: "Not found" }, { status: 404 })
}


