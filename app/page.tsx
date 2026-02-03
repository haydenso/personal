import { MainApp } from "@/components/main-app"
import { markdownToHtml } from "@/lib/mdx"
import { getAboutContent } from "@/lib/about"
import { readFile } from "fs/promises"
import path from "path"

export default async function Page() {
  const filePath = path.join(process.cwd(), "content", "about.md")
  let aboutHtml = ""

  try {
    const content = await readFile(filePath, "utf8")
    aboutHtml = markdownToHtml(content)
  } catch {
    aboutHtml = ""
  }

  const aboutContent = await getAboutContent()

  return <MainApp initialTab={"hq"} aboutHtml={aboutHtml} aboutContent={aboutContent} />
}
