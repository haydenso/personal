import { blogs } from "@/content/blogs"

interface BlogReaderProps {
  slug: string
}

export function BlogReader({ slug }: BlogReaderProps) {
  const blog = blogs.find((n) => n.slug === slug)

  if (!blog) return null

  return (
    <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-muted-foreground">
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">{blog.date}</p>
      <h1 className="text-4xl font-serif mb-8 text-foreground">{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  )
}
