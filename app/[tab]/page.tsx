import { MainApp, Tab } from "@/components/main-app"

interface Params {
  params: { tab?: string }
}

export default function TabPage({ params }: Params) {
  const raw = params?.tab ?? ""
  const tab = (raw as string).toLowerCase()

  const allowed: Tab[] = ["about", "musings", "blogs", "bookshelf", "gallery", "timeline"]
  const initialTab: Tab = (allowed.includes(tab as Tab) ? (tab as Tab) : "about")

  return <MainApp initialTab={initialTab} />
}
