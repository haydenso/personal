import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"
import katex from "katex"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.join(__dirname, "..")
const contentDir = path.join(projectRoot, "content")
const musingsDir = path.join(contentDir, "musings")

// Enhanced Markdown → HTML converter with KaTeX support
function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")

  function escapeHtml(raw) {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function processInlineMarkdown(text) {
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
    
    processedText = processedText.replace(/\$([^\$]*[a-zA-Z\\][^\$]*)\$/g, (match, latex) => {
      try {
        const rendered = katex.renderToString(latex, { displayMode: false, throwOnError: false })
        katexPlaceholders.push(rendered)
        return `___KATEX_${katexPlaceholders.length - 1}___`
      } catch (e) {
        return match
      }
    })
    
    // Process bold and italic
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Handle strikethrough
    processedText = processedText.replace(/~~(.*?)~~/g, '<del>$1</del>')

    // Handle inline code
    processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

    // Handle images
    const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)(?:<!--\s*({[^}]+})\s*-->)?/g
    const images = []
    let match
    
    while ((match = imagePattern.exec(processedText)) !== null) {
      const attrs = match[3] ? JSON.parse(match[3]) : {}
      images.push({ alt: match[1], url: match[2], attrs })
    }
    
    processedText = processedText.replace(imagePattern, '___IMAGE___')

    // Handle links
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
    const links = []

    while ((match = linkPattern.exec(processedText)) !== null) {
      links.push({ text: match[1], url: match[2] })
    }

    processedText = processedText.replace(linkPattern, '___LINK___')

    // Preserve HTML tags for highlights and colors
    processedText = processedText
      .replace(/<mark>/g, '___MARK_START___')
      .replace(/<\/mark>/g, '___MARK_END___')
      .replace(/<span style="[^"]*color:[^"]*">/g, '___SPAN_START___')
      .replace(/<\/span>/g, '___SPAN_END___')
      .replace(/<u>/g, '___U_START___')
      .replace(/<\/u>/g, '___U_END___')

    processedText = escapeHtml(processedText)

    // Restore custom tags
    processedText = processedText
      .replace(/___MARK_START___/g, '<mark>')
      .replace(/___MARK_END___/g, '</mark>')
      .replace(/___SPAN_START___/g, '<span style="color: red">')
      .replace(/___SPAN_END___/g, '</span>')
      .replace(/___U_START___/g, '<u>')
      .replace(/___U_END___/g, '</u>')

    // Restore HTML tags
    processedText = processedText
      .replace(/&lt;strong&gt;/g, '<strong>')
      .replace(/&lt;\/strong&gt;/g, '</strong>')
      .replace(/&lt;em&gt;/g, '<em>')
      .replace(/&lt;\/em&gt;/g, '</em>')
      .replace(/&lt;del&gt;/g, '<del>')
      .replace(/&lt;\/del&gt;/g, '</del>')
      .replace(/&lt;code&gt;/g, '<code>')
      .replace(/&lt;\/code&gt;/g, '</code>')

    // Restore images
    images.forEach(({ alt, url, attrs }) => {
      const widthAttr = attrs.width ? ` width="${attrs.width}"` : ''
      processedText = processedText.replace('___IMAGE___',
        `<img src="${url}" alt="${alt}"${widthAttr} />`)
    })

    // Restore links
    links.forEach(({ text, url }) => {
      processedText = processedText.replace('___LINK___',
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`)
    })

    // Restore KaTeX
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

    // Headings
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
    if (/^(\s*)[-*]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^(\s*)[-*]\s+/.test(lines[i])) {
        const content = lines[i].replace(/^(\s*)[-*]\s+/, '')
        items.push(`<li>${processInlineMarkdown(content)}</li>`)
        i++
      }
      html.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    // Ordered lists
    if (/^(\s*)\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^(\s*)\d+\.\s+/.test(lines[i])) {
        const content = lines[i].replace(/^(\s*)\d+\.\s+/, '')
        items.push(`<li>${processInlineMarkdown(content)}</li>`)
        i++
      }
      html.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    // Horizontal rules
    if (/^---+$/.test(line)) {
      html.push('<hr/>')
      i++
      continue
    }

    // Regular paragraphs
    const para = [line]
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

// Helper to parse date strings
function parseDate(dateStr) {
  if (!dateStr) return new Date(0)

  // Try ISO format
  const isoMatch = dateStr.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/)
  if (isoMatch) {
    const year = isoMatch[1]
    const month = isoMatch[2] || '01'
    const day = isoMatch[3] || '01'
    return new Date(`${year}-${month}-${day}`)
  }

  // Try MM-DD-YYYY
  const usMatch = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (usMatch) {
    return new Date(`${usMatch[3]}-${usMatch[1]}-${usMatch[2]}`)
  }

  // Try natural language
  const parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) {
    return parsed
  }

  return new Date(0)
}

// Generate musings content
function generateMusings() {
  if (!fs.existsSync(musingsDir)) {
    fs.mkdirSync(musingsDir, { recursive: true })
    console.log('⚠ Created empty musings directory. Add .mdx files to get started!')
    return
  }

  const files = fs.readdirSync(musingsDir).filter((f) => f.endsWith(".mdx"))

  if (files.length === 0) {
    console.log('⚠ No .mdx files found in content/musings/')
    console.log('  Add some musings to get started!')
    return
  }

  const musings = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(musingsDir, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content: mdxContent } = matter(fileContents)

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

  // Sort by lastUpdated or date (latest first)
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

// Run generator
generateMusings()
