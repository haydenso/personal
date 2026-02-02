// Client-safe Markdown → HTML converter
// Supports headings, paragraphs, blockquotes, lists, links, images, inline code, and fenced code blocks

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")

  function escapeHtml(raw: string): string {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function processInlineMarkdown(text: string): string {
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
    const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)(?:<!--\s*({[^}]+})\s*-->)?/g
    const links: Array<{ text: string; url: string }> = []
    const images: Array<{ alt: string; url: string; attrs?: string }> = []
    let match

    while ((match = imagePattern.exec(text)) !== null) {
      const attrs = match[3] ? JSON.parse(match[3]) : {}
      images.push({ alt: match[1], url: match[2], attrs: JSON.stringify(attrs) })
    }

    let processedText = text.replace(imagePattern, "___IMAGE___")

    while ((match = linkPattern.exec(processedText)) !== null) {
      links.push({ text: match[1], url: match[2] })
    }

    processedText = processedText.replace(linkPattern, "___LINK___")

    processedText = escapeHtml(processedText)

    images.forEach(({ alt, url, attrs }) => {
      const parsedAttrs = attrs ? JSON.parse(attrs) : {}
      const widthAttr = parsedAttrs.width ? ` width="${parsedAttrs.width}"` : ""
      processedText = processedText.replace(
        "___IMAGE___",
        `<img src="${url}" alt="${alt}"${widthAttr} />`
      )
    })

    links.forEach(({ text, url }) => {
      processedText = processedText.replace(
        "___LINK___",
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
      )
    })

    processedText = processedText.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`)
    processedText = processedText.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    processedText = processedText.replace(/\*(.+?)\*/g, "<em>$1</em>")

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
