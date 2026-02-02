import { readFile } from "fs/promises"
import path from "path"
import { markdownToHtml } from "@/lib/mdx"

export async function GET() {
  const filePath = path.join(process.cwd(), "content", "about.md")

  try {
    const content = await readFile(filePath, "utf8")
    const html = markdownToHtml(content)
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    })
  } catch {
    return new Response("About content not found", { status: 404 })
  }
}
