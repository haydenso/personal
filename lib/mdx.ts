import fs from "fs"
import path from "path"
import matter from "gray-matter"

const blogsDirectory = path.join(process.cwd(), "content/blogs")
const musingsDirectory = path.join(process.cwd(), "content/musings")

export interface BlogMetadata {
  slug: string
  title: string
  date: string
  desc: string
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

// Helper to parse date strings like "December 17 2025" or "January 2025"
function parseDate(dateStr: string): Date {
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
      desc: data.desc || "",
      excerpt: data.excerpt || "",
    }
  })

  return blogs.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
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
      desc: data.desc || "",
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
      pinned: data.pinned ?? false,
      // note: hasNotes and isReading were removed; any required behavior should be derived from content or other fields
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
      pinned: data.pinned ?? false,
      content,
    }
  } catch {
    return null
  }
}

// Full-featured Markdown → HTML converter for our MDX content
// Supports: headings, paragraphs, blockquotes, lists, links, images, code blocks, bold, italic, strikethrough, math (KaTeX), tables
export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")

  function escapeHtml(raw: string): string {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function processInlineMarkdown(text: string): string {
    // First escape HTML, then convert markdown links and images to HTML
    // We use placeholders to protect link/image syntax during escaping
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
    const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)(?:<!--\s*({[^}]+})\s*-->)?/g
    const links: Array<{ text: string; url: string }> = []
    const images: Array<{ alt: string; url: string; attrs?: string }> = []
    let match

    // Extract all images first (before links, since images also have []())
    while ((match = imagePattern.exec(text)) !== null) {
      const attrs = match[3] ? JSON.parse(match[3]) : {}
      images.push({ alt: match[1], url: match[2], attrs: JSON.stringify(attrs) })
    }

    // Replace images with placeholders
    let processedText = text.replace(imagePattern, '___IMAGE___')

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
      .replace(/___SPAN_START___/g, '<span style="color: red">')
      .replace(/___SPAN_END___/g, '</span>')
      .replace(/___U_START___/g, '<u>')
      .replace(/___U_END___/g, '</u>')

    // Process bold and italic
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Handle strikethrough
    processedText = processedText.replace(/~~(.*?)~~/g, '<del>$1</del>')

    // Handle inline code
    processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Restore images as HTML
    images.forEach(({ alt, url, attrs }) => {
      const parsedAttrs = attrs ? JSON.parse(attrs) : {}
      const widthAttr = parsedAttrs.width ? ` width="${parsedAttrs.width}"` : ''
      processedText = processedText.replace('___IMAGE___',
        `<img src="${url}" alt="${alt}"${widthAttr} />`)
    })

    // Restore links as HTML with color
    links.forEach(({ text, url }) => {
      processedText = processedText.replace('___LINK___',
        `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #086EB8;">${text}</a>`)
    })

    return processedText
  }

  // Hoisted helper for parsing nested unordered lists so ordered list parser
  // can reuse the same logic when mixing ordered/unordered nested lists.
  function parseNestedList(startIndex: number, baseIndent = 0): { html: string; nextIndex: number } {
    const items: string[] = []
    let j = startIndex

    while (j < lines.length) {
      const listMatch = lines[j].match(/^(\s*)[-*]\s+(.*)$/)
      if (!listMatch) break

      const indent = listMatch[1].length
      const content = listMatch[2]

      if (indent < baseIndent) break

      if (indent === baseIndent) {
        const itemText = processInlineMarkdown(content)
        j++

        if (j < lines.length) {
          const nextMatch = lines[j].match(/^(\s*)[-*]\s+/)
          if (nextMatch && nextMatch[1].length > indent) {
            const nestedResult = parseNestedList(j, nextMatch[1].length)
            items.push(`<li>${itemText}${nestedResult.html}</li>`)
            j = nestedResult.nextIndex
          } else {
            items.push(`<li>${itemText}</li>`)
          }
        } else {
          items.push(`<li>${itemText}</li>`)
        }
      } else {
        break
      }
    }

    return {
      html: `<ul>${items.join('')}</ul>`,
      nextIndex: j,
    }
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

    // Unordered lists with nesting support
    if (/^(\s*)[-*]\s+/.test(line)) {
      function parseNestedList(startIndex: number, baseIndent = 0): { html: string; nextIndex: number } {
        const items: string[] = []
        let j = startIndex
        
        while (j < lines.length) {
          const listMatch = lines[j].match(/^(\s*)[-*]\s+(.*)$/)
          if (!listMatch) break
          
          const indent = listMatch[1].length
          const content = listMatch[2]
          
          if (indent < baseIndent) break
          
          if (indent === baseIndent) {
            const itemText = processInlineMarkdown(content)
            j++
            
            if (j < lines.length) {
              const nextMatch = lines[j].match(/^(\s*)[-*]\s+/)
              if (nextMatch && nextMatch[1].length > indent) {
                const nestedResult = parseNestedList(j, nextMatch[1].length)
                items.push(`<li>${itemText}${nestedResult.html}</li>`)
                j = nestedResult.nextIndex
              } else {
                items.push(`<li>${itemText}</li>`)
              }
            } else {
              items.push(`<li>${itemText}</li>`)
            }
          } else {
            break
          }
        }
        
        return {
          html: `<ul>${items.join('')}</ul>`,
          nextIndex: j
        }
      }
      
      const result = parseNestedList(i, line.match(/^(\s*)[-*]\s+/)![1].length)
      html.push(result.html)
      i = result.nextIndex
      continue
    }

    // Ordered lists with nesting support
    if (/^(\s*)\d+\.\s+/.test(line)) {
      function parseNestedOrderedList(startIndex: number, baseIndent = 0): { html: string; nextIndex: number } {
        const items: string[] = []
        let j = startIndex
        
        while (j < lines.length) {
          const listMatch = lines[j].match(/^(\s*)\d+\.\s+(.*)$/)
          if (!listMatch) break
          
          const indent = listMatch[1].length
          const content = listMatch[2]
          
          if (indent < baseIndent) break
          
          if (indent === baseIndent) {
            const itemText = processInlineMarkdown(content)
            j++
            
            if (j < lines.length) {
              const nextOrderedMatch = lines[j].match(/^(\s*)\d+\.\s+/)
              const nextUnorderedMatch = lines[j].match(/^(\s*)[-*]\s+/)
              
              if (nextOrderedMatch && nextOrderedMatch[1].length > indent) {
                const nestedResult = parseNestedOrderedList(j, nextOrderedMatch[1].length)
                items.push(`<li>${itemText}${nestedResult.html}</li>`)
                j = nestedResult.nextIndex
              } else if (nextUnorderedMatch && nextUnorderedMatch[1].length > indent) {
                const nestedResult = parseNestedList(j, nextUnorderedMatch[1].length)
                items.push(`<li>${itemText}${nestedResult.html}</li>`)
                j = nestedResult.nextIndex
              } else {
                items.push(`<li>${itemText}</li>`)
              }
            } else {
              items.push(`<li>${itemText}</li>`)
            }
          } else {
            break
          }
        }
        
        return {
          html: `<ol>${items.join('')}</ol>`,
          nextIndex: j
        }
      }
      
      const result = parseNestedOrderedList(i, line.match(/^(\s*)\d+\.\s+/)![1].length)
      html.push(result.html)
      i = result.nextIndex
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
      const table: string[] = []
      table.push(lines[i])
      i++

      if (i < lines.length && /^\|[\s\-\|:]+\|$/.test(lines[i])) {
        table.push(lines[i])
        i++
      }

      while (i < lines.length && /^\|.*\|$/.test(lines[i])) {
        table.push(lines[i])
        i++
      }

      const tableHtml = table.map(row => {
        const cells = row.split('|').slice(1, -1).map(cell => cell.trim())
        if (table.indexOf(row) === 0) {
          return `<tr>${cells.map(cell => `<th>${processInlineMarkdown(cell)}</th>`).join('')}</tr>`
        } else if (table.indexOf(row) === 1) {
          return ''
        } else {
          return `<tr>${cells.map(cell => `<td>${processInlineMarkdown(cell)}</td>`).join('')}</tr>`
        }
      }).filter(row => row).join('')

      html.push(`<table>${tableHtml}</table>`)
      continue
    }

    const para: string[] = [line]
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
