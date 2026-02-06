// Simple markdown parser for about page JSON content
// Handles code blocks, links, bold, italic, inline code

export function parseMarkdown(text: string): string {
  if (!text) return ''

  function escapeHtml(raw: string): string {
    return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  // First, process code blocks (must happen before inline processing)
  const codeBlocks: string[] = []
  let processed = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escapedCode = escapeHtml(code.trim())
    const html = lang 
      ? `<pre><code class="language-${lang}">${escapedCode}</code></pre>`
      : `<pre><code>${escapedCode}</code></pre>`
    codeBlocks.push(html)
    return `___CODE_BLOCK_${codeBlocks.length - 1}___`
  })

  // Process inline code (before escaping)
  const inlineCodes: string[] = []
  processed = processed.replace(/`([^`]+)`/g, (_, code) => {
    inlineCodes.push(`<code>${escapeHtml(code)}</code>`)
    return `___INLINE_CODE_${inlineCodes.length - 1}___`
  })

  // Process links
  const links: Array<{ text: string; url: string }> = []
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    links.push({ text, url })
    return `___LINK_${links.length - 1}___`
  })

  // Escape HTML (preserve our placeholders)
  processed = escapeHtml(processed)

  // Process bold and italic (after escaping)
  processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Restore code blocks
  codeBlocks.forEach((html, i) => {
    processed = processed.replace(`___CODE_BLOCK_${i}___`, html)
  })

  // Restore inline code
  inlineCodes.forEach((html, i) => {
    processed = processed.replace(`___INLINE_CODE_${i}___`, html)
  })

  // Restore links
  links.forEach(({ text, url }, i) => {
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #E0EBFC;" class="underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid">${text}</a>`
    processed = processed.replace(`___LINK_${i}___`, linkHtml)
  })

  return formatBlocks(processed)
}

function formatBlocks(raw: string): string {
  const lines = raw.split("\n")
  const parts: string[] = []
  let paragraphLines: string[] = []
  let openList: "ul" | "ol" | null = null

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return
    const text = paragraphLines.join(" ").trim()
    if (text) {
      parts.push(text)
    }
    paragraphLines = []
  }

  const closeList = () => {
    if (!openList) return
    parts.push(`</${openList}>`)
    openList = null
  }

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    if (/^\s*$/.test(line)) {
      flushParagraph()
      closeList()
      continue
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/)
    if (blockquoteMatch) {
      flushParagraph()
      closeList()
      const quoteLines: string[] = [blockquoteMatch[1].trim()]
      while (index + 1 < lines.length && /^>\s?/.test(lines[index + 1])) {
        index++
        quoteLines.push(lines[index].replace(/^>\s?/, "").trim())
      }
      parts.push(`<blockquote>${quoteLines.filter(Boolean).join("<br/>")}</blockquote>`)
      continue
    }

    const unorderedMatch = line.match(/^[-*]\s+(.*)$/)
    if (unorderedMatch) {
      flushParagraph()
      if (openList !== "ul") {
        closeList()
        parts.push("<ul>")
        openList = "ul"
      }
      parts.push(`<li>${unorderedMatch[1].trim()}</li>`)
      continue
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/)
    if (orderedMatch) {
      flushParagraph()
      if (openList !== "ol") {
        closeList()
        parts.push("<ol>")
        openList = "ol"
      }
      parts.push(`<li>${orderedMatch[1].trim()}</li>`)
      continue
    }

    paragraphLines.push(line.trim())
  }

  flushParagraph()
  closeList()

  return parts.join("\n")
}
