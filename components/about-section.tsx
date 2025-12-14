import { Footer } from "./footer"

export function AboutSection() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-serif mb-2">flo·guo</h1>
        <p className="text-muted-foreground text-sm">/ˈfloʊ.ɡwoʊ/</p>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">noun</p>
        <ol className="space-y-2 list-decimal list-inside">
          <li className="text-foreground">
            old soul with a curious spirit; habitual book collector; admirer of quiet beauty.
          </li>
          <li className="text-foreground">
            founding design engineer at{" "}
            <a
              href="https://paradigmai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
              Paradigm
            </a>
            ; previously at{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
            >
              Vercel
            </a>
            .
          </li>
        </ol>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <span className="text-muted-foreground">See also:</span>
        <a
          href="https://github.com/floguo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
        >
          GitHub
        </a>
        <a
          href="https://x.com/floguo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
        >
          Twitter
        </a>
      </div>
      </div>

      <Footer />
    </div>
  )
}
