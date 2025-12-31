import { MainApp, Tab } from "@/components/main-app"

interface Params {
  params: Promise<{ tab?: string }>
}

export default async function TabPage({ params }: Params) {
  const { tab: rawTab } = await params
  const raw = rawTab ?? ""
  const tab = (raw as string).toLowerCase()

  const allowed: Tab[] = ["about", "musings", "blogs", "projects", "bookshelf", "gallery", "timeline"]
  const initialTab: Tab = (allowed.includes(tab as Tab) ? (tab as Tab) : "about")

  return <MainApp initialTab={initialTab} />
}
