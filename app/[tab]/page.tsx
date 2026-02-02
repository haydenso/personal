import { MainApp, Tab } from "@/components/main-app"
import { markdownToHtml } from "@/lib/mdx"
import { readFile } from "fs/promises"
import path from "path"

interface Params {
  params: Promise<{ tab?: string }>
}

export default async function TabPage({ params }: Params) {
  const { tab: rawTab } = await params
  const raw = rawTab ?? ""
  const tab = (raw as string).toLowerCase()

  const filePath = path.join(process.cwd(), "content", "about.md")
  let aboutHtml = ""

  try {
    const content = await readFile(filePath, "utf8")
    aboutHtml = markdownToHtml(content)
  } catch {
    aboutHtml = ""
  }

  const allowed: Tab[] = ["hq", "about", "musings", "blogs", "projects", "bookshelf", "gallery", "timeline"]
  const initialTab: Tab = (allowed.includes(tab as Tab) ? (tab as Tab) : "hq")

  return <MainApp initialTab={initialTab} aboutHtml={aboutHtml} />
}
