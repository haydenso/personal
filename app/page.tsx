import { MainApp } from "@/components/main-app"
import { markdownToHtml } from "@/lib/mdx"
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

  return <MainApp initialTab={"hq"} aboutHtml={aboutHtml} />
}
