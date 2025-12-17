import { blogs } from "@/content/blogs"

interface BlogReaderProps {
  slug: string
}

export function BlogReader({ slug }: BlogReaderProps) {
  const blog = blogs.find((n) => n.slug === slug)

  if (!blog) return null

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 px-4 md:px-12 py-6 overflow-y-auto min-h-0">
        <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none mx-auto w-full" style={{ maxWidth: 'min(72ch, 100%)' }}>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">{blog.date}</p>
          <h1 className="text-4xl font-serif mb-8 text-foreground">{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </div>
  )
}
