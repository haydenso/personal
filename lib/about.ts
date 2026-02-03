import { promises as fs } from "fs"
import path from "path"
import { parseMarkdown } from "./markdown"

export interface AboutBadge {
  text: string
  link?: {
    text: string
    href: string
  }
}

export interface AboutImage {
  src: string
  alt?: string
  caption?: string
}

export interface AboutSection {
  title: string | null
  bullets: string[]
}

export interface AboutContent {
  badge?: AboutBadge
  topImage?: {
    src: string
    caption?: string
  }
  images: AboutImage[]
  sections: AboutSection[]
}

export async function getAboutContent(): Promise<AboutContent> {
  const filePath = path.join(process.cwd(), "content", "about.json")

  try {
    const raw = await fs.readFile(filePath, "utf8")
    const parsed = JSON.parse(raw)

    const sections = (parsed.sections || []).map((section: any) => ({
      title: section.title ?? null,
      bullets: (section.bullets || []).map((bullet: string) => parseMarkdown(bullet)),
    }))

    return {
      badge: parsed.badge,
      topImage: parsed.topImage,
      images: parsed.images || [],
      sections,
    }
  } catch {
    return {
      images: [],
      sections: [],
    }
  }
}
