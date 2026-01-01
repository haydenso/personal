import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

// Enhanced Markdown → HTML converter that handles colors, highlights, and all formatting
function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")

  function escapeHtml(raw) {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function processInlineMarkdown(text) {
    // First process bold and italic
    let processedText = text
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Handle strikethrough
    processedText = processedText.replace(/~~(.*?)~~/g, '<del>$1</del>')

    // Handle inline code
    processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Then handle links
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
    const links = []
    let match

    // Extract all links
    while ((match = linkPattern.exec(processedText)) !== null) {
      links.push({ text: match[1], url: match[2] })
    }

    // Replace links with placeholders
    processedText = processedText.replace(linkPattern, '___LINK___')

    // Escape HTML but preserve our custom tags
    processedText = processedText
      .replace(/<mark>/g, '___MARK_START___')
      .replace(/<\/mark>/g, '___MARK_END___')
      .replace(/<span style="[^"]*color:[^"]*">/g, '___SPAN_START___')
      .replace(/<\/span>/g, '___SPAN_END___')
      .replace(/<u>/g, '___U_START___')
      .replace(/<\/u>/g, '___U_END___')

    processedText = escapeHtml(processedText)

    // Restore our custom tags
    processedText = processedText
      .replace(/___MARK_START___/g, '<mark>')
      .replace(/___MARK_END___/g, '</mark>')
      .replace(/___SPAN_START___/g, '<span style="color: red">') // Default to red, can be customized
      .replace(/___SPAN_END___/g, '</span>')
      .replace(/___U_START___/g, '<u>')
      .replace(/___U_END___/g, '</u>')

    // Restore the HTML tags
    processedText = processedText
      .replace(/&lt;strong&gt;/g, '<strong>')
      .replace(/&lt;\/strong&gt;/g, '</strong>')
      .replace(/&lt;em&gt;/g, '<em>')
      .replace(/&lt;\/em&gt;/g, '</em>')
      .replace(/&lt;del&gt;/g, '<del>')
      .replace(/&lt;\/del&gt;/g, '</del>')
      .replace(/&lt;code&gt;/g, '<code>')
      .replace(/&lt;\/code&gt;/g, '</code>')

    // Restore links as HTML
    links.forEach(({ text, url }) => {
      processedText = processedText.replace('___LINK___',
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
    })

    return processedText
  }

  const html = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (/^\s*$/.test(line)) {
      i++
      continue
    }

    // Code blocks
    if (/^```/.test(line)) {
      const code = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i])
        i++
      }
      if (i < lines.length && /^```/.test(lines[i])) i++
      html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)
      continue
    }

    // Headings - improved regex to handle spaces properly
    const heading = line.match(/^(\#{1,6})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      const text = processInlineMarkdown(heading[2])
      html.push(`<h${level}>${text}</h${level}>`)
      i++
      continue
    }

    // Blockquotes
    if (/^>\s?/.test(line)) {
      const quote = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(processInlineMarkdown(lines[i].replace(/^>\s?/, "")))
        i++
      }
      html.push(`<blockquote>${quote.join("<br/>")}</blockquote>`)
      continue
    }

    // Unordered lists
    if (/^[-*]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        const itemText = processInlineMarkdown(lines[i].replace(/^[-*]\s+/, ""))
        items.push(`<li>${itemText}</li>`)
        i++
      }
      html.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        const itemText = processInlineMarkdown(lines[i].replace(/^\d+\.\s+/, ""))
        items.push(`<li>${itemText}</li>`)
        i++
      }
      html.push(`<ol>${items.join("")}</ol>`)
      continue
    }

    // Horizontal rules
    if (/^---+$/.test(line)) {
      html.push('<hr/>')
      i++
      continue
    }

    // Tables
    if (/^\|.*\|$/.test(line)) {
      const table = []
      // Header row
      table.push(lines[i])
      i++

      // Separator row
      if (i < lines.length && /^\|[\s\-\|:]+\|$/.test(lines[i])) {
        table.push(lines[i])
        i++
      }

      // Data rows
      while (i < lines.length && /^\|.*\|$/.test(lines[i])) {
        table.push(lines[i])
        i++
      }

      // Convert table to HTML
      const tableHtml = table.map(row => {
        const cells = row.split('|').slice(1, -1).map(cell => cell.trim())
        if (table.indexOf(row) === 0) {
          return `<tr>${cells.map(cell => `<th>${processInlineMarkdown(cell)}</th>`).join('')}</tr>`
        } else if (table.indexOf(row) === 1) {
          return '' // Skip separator
        } else {
          return `<tr>${cells.map(cell => `<td>${processInlineMarkdown(cell)}</td>`).join('')}</tr>`
        }
      }).filter(row => row).join('')

      html.push(`<table>${tableHtml}</table>`)
      continue
    }

    // Regular paragraphs
    const para = [line]
    i++
    while (i < lines.length && !/^\s*$/.test(lines[i])) {
      if (/^(?:```|#{1,6}\s|>\s|[-*]\s|\d+\.\s|^\|.*\|$)/.test(lines[i])) break
      para.push(lines[i])
      i++
    }
    const text = processInlineMarkdown(para.join(" ").trim())
    if (text) html.push(`<p>${text}</p>`)
  }

  return html.join("\n")
}

// Helper to parse date strings like "December 17 2025" or "January 2025"
function parseDate(dateStr) {
  if (!dateStr) return new Date(0)

  const parts = dateStr.trim().split(/\s+/)
  if (parts.length === 3) {
    // Month Day Year
    return new Date(`${parts[0]} ${parts[1]}, ${parts[2]}`)
  } else if (parts.length === 2) {
    // Month Year
    return new Date(`${parts[0]} 1, ${parts[1]}`)
  }
  return new Date(0) // fallback
}

// Generate blogs content
function generateBlogs() {
  const blogsDir = path.join(rootDir, "content/blogs")
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".mdx"))

  const blogs = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(blogsDir, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      content: markdownToHtml(content),
    }
  })

  // Sort blogs by date (latest first)
  blogs.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

  const output = `export interface Blog {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export const blogs: Blog[] = ${JSON.stringify(blogs, null, 2)}
`

  fs.writeFileSync(path.join(rootDir, "content/blogs.tsx"), output)
  console.log(`✓ Generated content for ${blogs.length} blogs`)
}

// Generate musings content
function generateMusings() {
  const musingsDir = path.join(rootDir, "content/musings")
  const files = fs.readdirSync(musingsDir).filter((f) => f.endsWith(".mdx"))

  const musings = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(musingsDir, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content: mdxContent } = matter(fileContents)

    // Read metadata from frontmatter with defaults (allow explicit slug and category)
    const fileSlug = data.slug || slug
    const title = data.title || fileSlug
    const author = data.author || ""
    const date = data.date || ""
    const lastUpdated = data.lastUpdated
    const pinned = data.pinned ?? false
    const rawCategory = data.category
    const category = typeof rawCategory === 'string' ? rawCategory : (rawCategory ? String(rawCategory) : 'uncategorized')
    const content = markdownToHtml(mdxContent)

    return {
      slug: fileSlug,
      title,
      author,
      date,
      ...(lastUpdated && { lastUpdated }),
      pinned,
      category,
      content,
    }
  })

  const output = `export interface Musing {
  slug: string
  title: string
  author: string
  date: string
  lastUpdated?: string
  pinned: boolean
  category: string
  content: string
}

export const musings: Musing[] = ${JSON.stringify(musings, null, 2)}
`

  fs.writeFileSync(path.join(rootDir, "content/musings.tsx"), output)
  console.log(`✓ Generated content for ${musings.length} musings`)
}

// Run generators
generateBlogs()
generateMusings()