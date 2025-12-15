import { musings } from "@/content/musings"

interface MusingReaderProps {
  slug: string
}

export function MusingReader({ slug }: MusingReaderProps) {
  const musing = musings.find((b) => b.slug === slug)
  if (!musing) return null

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {musing.lastUpdated && (
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
          Last updated {musing.lastUpdated}
        </p>
      )}
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">{musing.title}</h1>
        <p className="text-muted-foreground">{musing.author}</p>
        <p className="text-sm text-muted-foreground mt-1">{musing.date}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: musing.content }} />
    </article>
  )
}
