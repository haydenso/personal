import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogsDirectory = path.join(process.cwd(), "content/blogs")
const musingsDirectory = path.join(process.cwd(), "content/musings")

export interface BlogMetadata {
  slug: string
  title: string
  date: string
  excerpt: string
}

export interface BlogWithContent extends BlogMetadata {
  content: string
}

export interface MusingMetadata {
  slug: string
  title: string
  author: string
  date: string
  lastUpdated?: string
  hasNotes: boolean
  isReading: boolean
  pinned: boolean
}

export interface MusingWithContent extends MusingMetadata {
  content: string
}

// Helper to get all blog files
export function getBlogFiles() {
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }
  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith(".mdx"))
}

// Get all blogs metadata
export function getAllBlogs(): BlogMetadata[] {
  const files = getBlogFiles()

  const blogs = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(blogsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
    }
  })

  return blogs.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// Get a single blog by slug
export function getBlogBySlug(slug: string): BlogWithContent | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      content,
    }
  } catch {
    return null
  }
}

// Musing helper functions
export function getMusingFiles() {
  if (!fs.existsSync(musingsDirectory)) {
    return []
  }
  return fs.readdirSync(musingsDirectory).filter((file) => file.endsWith(".mdx"))
}

export function getAllMusings(): MusingMetadata[] {
  const files = getMusingFiles()

  const musings = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(musingsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      author: data.author || "",
      date: data.date || "",
      lastUpdated: data.lastUpdated,
      hasNotes: data.hasNotes ?? (content.trim().length > 0),
      isReading: data.isReading ?? false,
      pinned: data.pinned ?? false,
    }
  })

  return musings
}

export function getMusingBySlug(slug: string): MusingWithContent | null {
  try {
    const fullPath = path.join(musingsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      author: data.author || "",
      date: data.date || "",
      lastUpdated: data.lastUpdated,
      hasNotes: data.hasNotes ?? (content.trim().length > 0),
      isReading: data.isReading ?? false,
      pinned: data.pinned ?? false,
      content,
    }
  } catch {
    return null
  }
}

// Minimal Markdown → HTML converter for our MDX content
// Supports: headings, paragraphs, blockquotes, lists, links, and fenced code blocks
export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")

  function escapeHtml(raw: string): string {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function processInlineMarkdown(text: string): string {
    // First escape HTML, then convert markdown links to HTML <a> tags
    // We use a placeholder to protect link syntax during escaping
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
    const links: Array<{ text: string; url: string }> = []
    let match

    // Extract all links
    while ((match = linkPattern.exec(text)) !== null) {
      links.push({ text: match[1], url: match[2] })
    }

    // Replace links with placeholders
    let processedText = text.replace(linkPattern, '___LINK___')

    // Escape HTML in the remaining text
    processedText = escapeHtml(processedText)

    // Restore links as HTML
    links.forEach(({ text, url }) => {
      processedText = processedText.replace('___LINK___',
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
    })

    return processedText
  }

  const html: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    if (/^```/.test(line)) {
      const code: string[] = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i])
        i++
      }
      if (i < lines.length && /^```/.test(lines[i])) i++
      html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const level = heading[1].length
      const text = processInlineMarkdown(heading[2])
      html.push(`<h${level}>${text}</h${level}>`)
      i++
      continue
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      html.push(`<blockquote>${escapeHtml(quote.join("\n")).replace(/\n/g, "<br/>")}</blockquote>`)
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        const itemText = processInlineMarkdown(lines[i].replace(/^[-*]\s+/, ""))
        items.push(`<li>${itemText}</li>`)
        i++
      }
      html.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        const itemText = processInlineMarkdown(lines[i].replace(/^\d+\.\s+/, ""))
        items.push(`<li>${itemText}</li>`)
        i++
      }
      html.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    const para: string[] = [line]
    i++
    while (i < lines.length && !/^\s*$/.test(lines[i])) {
      if (/^(?:```|#{1,6}\s|>\s|[-*]\s|\d+\.\s)/.test(lines[i])) break
      para.push(lines[i])
      i++
    }
    const text = processInlineMarkdown(para.join(" ").trim())
    if (text) html.push(`<p>${text}</p>`)
  }

  return html.join("\n")
}
