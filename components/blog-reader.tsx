import { blogs } from "@/content/blogs"

interface BlogReaderProps {
  slug: string
}

export function BlogReader({ slug }: BlogReaderProps) {
  console.log('[BlogReader] Received slug:', slug)
  console.log('[BlogReader] Available slugs:', blogs.map(b => b.slug))
  
  const blog = blogs.find((n) => n.slug === slug)
  
  if (!blog) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 px-4 md:px-12 py-6 overflow-y-auto min-h-0">
          <main className="max-w-3xl mx-auto px-8 py-12">
            <p className="mb-4">Blog not found for slug: <code className="bg-muted px-2 py-1 rounded">{slug}</code></p>
            <p className="text-sm text-muted-foreground mb-4">Available slugs:</p>
            <ul className="list-disc pl-5 mb-6 text-sm">
              {blogs.map((b) => (
                <li key={b.slug}>
                  <a href={`/blogs/${b.slug}`} className="underline text-blue-600 hover:text-blue-800">{b.slug}</a> - {b.title}
                </li>
              ))}
            </ul>
            <a href="/" className="inline-block bg-background border border-border rounded-md px-3 py-2 hover:bg-muted">← Back to home</a>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 md:px-12 py-2 md:py-6 overflow-y-auto min-h-0" style={{ paddingLeft: 'max(7vw, 1rem)', paddingRight: 'max(7vw, 1rem)' }}>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">{blog.date}</p>
        <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none mx-auto w-full" style={{ maxWidth: 'min(80ch, 100%)' }}>
          <h1 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8" style={{ color: 'oklch(0.4 0.22 25)' }}>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </div>
  )
}
