import { config } from '@/config'

export function Footer() {
  return (
    <footer className="pt-2 pb-4 uppercase font-mono text-xs opacity-50 text-muted-foreground">
      <p>{config.footer.text}</p>
    </footer>
  )
}
