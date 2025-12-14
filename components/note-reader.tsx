import { notes } from "@/content/notes"

interface NoteReaderProps {
  slug: string
}

export function NoteReader({ slug }: NoteReaderProps) {
  const note = notes.find((n) => n.slug === slug)

  if (!note) return null

  return (
    <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-muted-foreground">
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">{note.date}</p>
      <h1 className="text-4xl font-serif mb-8 text-foreground">{note.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </article>
  )
}
