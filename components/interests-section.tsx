
const interestsData = {
  "technical projects": [
    "interpretability research on hurricane prediction",
    "agent-based simulation of airplane boarding",
    "natural language processing + biomedical informatics (pre-chatGPT era)"
  ],
  "selected writing": [
    "on China and AI governance",
    "my thesis on AI adoption and rollups",
    "the career chameleon"
  ]
}

const icons = {
  "selected writing": "★",
  "technical projects": "●"
}

export function InterestsSection() {
  return (
    <div className="grid grid-cols-1 gap-6 mt-20">
      {Object.entries(interestsData).map(([category, items]) => (
        <div key={category} className="border border-border rounded-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg" style={{ color: '#FFD52E' }}>{icons[category as keyof typeof icons]}</span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {category}
            </h3>
          </div>

          <div className="space-y-1">
            <ul className="space-y-1 list-none">
              {items.map((item, index) => (
                <li key={index} className="text-sm text-foreground leading-relaxed font-serif relative pl-4">
                  <span className="absolute left-0 top-1.5 w-1 h-1 bg-current rounded-full opacity-60"></span>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}