import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"
import katex from "katex"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use relative paths from the script location
const projectRoot = path.join(__dirname, "..")
const contentDir = path.join(projectRoot, "content")
const blogsDir = path.join(contentDir, "blogs")
const musingsDir = path.join(contentDir, "musings")

// Enhanced Markdown → HTML converter that handles colors, highlights, and all formatting
function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")

  function escapeHtml(raw) {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function processInlineMarkdown(text) {
    // First handle LaTeX math (both inline and display)
    let processedText = text
    const katexPlaceholders = []
    
    // Handle display math \\[...\\] or $$...$$
    processedText = processedText.replace(/\\\[(.*?)\\\]/gs, (match, latex) => {
      try {
        const rendered = katex.renderToString(latex, { displayMode: true, throwOnError: false })
        katexPlaceholders.push(rendered)
        return `___KATEX_${katexPlaceholders.length - 1}___`
      } catch (e) {
        return match
      }
    })
    
    processedText = processedText.replace(/\$\$(.*?)\$\$/gs, (match, latex) => {
      try {
        const rendered = katex.renderToString(latex, { displayMode: true, throwOnError: false })
        katexPlaceholders.push(rendered)
        return `___KATEX_${katexPlaceholders.length - 1}___`
      } catch (e) {
        return match
      }
    })
    
    // Handle inline math \\(...\\) or $...$
    processedText = processedText.replace(/\\\((.*?)\\\)/g, (match, latex) => {
      try {
        const rendered = katex.renderToString(latex, { displayMode: false, throwOnError: false })
        katexPlaceholders.push(rendered)
        return `___KATEX_${katexPlaceholders.length - 1}___`
      } catch (e) {
        return match
      }
    })
    
    // Handle inline math $...$ (only if contains letters or LaTeX commands, not just numbers)
    processedText = processedText.replace(/\$([^\$]*[a-zA-Z\\][^\$]*)\$/g, (match, latex) => {
      try {
        const rendered = katex.renderToString(latex, { displayMode: false, throwOnError: false })
        katexPlaceholders.push(rendered)
        return `___KATEX_${katexPlaceholders.length - 1}___`
      } catch (e) {
        return match
      }
    })
    
    // Then process bold and italic
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Handle strikethrough
    processedText = processedText.replace(/~~(.*?)~~/g, '<del>$1</del>')

    // Handle inline code
    processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Handle images first (before links, since images also use []())
    const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)(?:<!--\s*({[^}]+})\s*-->)?/g
    const images = []
    let match
    
    // Extract all images
    while ((match = imagePattern.exec(processedText)) !== null) {
      const attrs = match[3] ? JSON.parse(match[3]) : {}
      images.push({ alt: match[1], url: match[2], attrs })
    }
    
    // Replace images with placeholders
    processedText = processedText.replace(imagePattern, '___IMAGE___')

    // Then handle links
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
    const links = []

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

    // Restore images as HTML
    images.forEach(({ alt, url, attrs }) => {
      const widthAttr = attrs.width ? ` width="${attrs.width}"` : ''
      processedText = processedText.replace('___IMAGE___',
        `<img src="${url}" alt="${alt}"${widthAttr} />`)
    })

    // Restore links as HTML
    links.forEach(({ text, url }) => {
      processedText = processedText.replace('___LINK___',
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
    })

    // Restore KaTeX rendered HTML
    katexPlaceholders.forEach((html, index) => {
      processedText = processedText.replace(`___KATEX_${index}___`, html)
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

// Helper to parse date strings like "December 17, 2025", "2025-12-20", "12-29-2025", or "January 2025"
function parseDate(dateStr) {
  if (!dateStr) return new Date(0)

  // Try parsing as ISO date first (YYYY-MM-DD, YYYY-MM, or YYYY)
  const isoMatch = dateStr.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/)
  if (isoMatch) {
    const year = isoMatch[1]
    const month = isoMatch[2] || '01'
    const day = isoMatch[3] || '01'
    return new Date(`${year}-${month}-${day}`)
  }

  // Try parsing as MM-DD-YYYY format
  const usMatch = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (usMatch) {
    const month = usMatch[1]
    const day = usMatch[2]
    const year = usMatch[3]
    return new Date(`${year}-${month}-${day}`)
  }

  // Remove commas and extra spaces, normalize
  const cleaned = dateStr.replace(/,/g, '').replace(/\s+/g, ' ').trim()
  const parts = cleaned.split(' ')

  if (parts.length >= 3) {
    // Try different formats: "Month Day Year" or "Day Month Year"
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const monthIndex = monthNames.findIndex(m => m.toLowerCase() === parts[0].toLowerCase())

    if (monthIndex !== -1) {
      // Month first: "December 31 2024"
      return new Date(`${parts[0]} ${parts[1]}, ${parts[2]}`)
    } else {
      // Try day first: "31 December 2024"
      const dayMonthIndex = monthNames.findIndex(m => m.toLowerCase() === parts[1].toLowerCase())
      if (dayMonthIndex !== -1) {
        return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`)
      }
    }
  } else if (parts.length === 2) {
    // Month Year
    return new Date(`${parts[0]} 1, ${parts[1]}`)
  }

  // Try parsing as ISO date or other formats
  const parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) {
    return parsed
  }

  return new Date(0) // fallback
}

// Generate blogs content
function generateBlogs() {
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

  fs.writeFileSync(path.join(contentDir, "blogs.tsx"), output)
  console.log(`✓ Generated content for ${blogs.length} blogs`)
}

// Generate musings content
function generateMusings() {
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

  // Sort musings by lastUpdated or date (latest first)
  musings.sort((a, b) => {
    const dateA = parseDate(a.lastUpdated || a.date)
    const dateB = parseDate(b.lastUpdated || b.date)
    return dateB.getTime() - dateA.getTime()
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

  fs.writeFileSync(path.join(contentDir, "musings.tsx"), output)
  console.log(`✓ Generated content for ${musings.length} musings`)
}

// Run generators
generateBlogs()
generateMusings()