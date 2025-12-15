
const interestsData = {
"technical projects": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
  ],
  "my writing": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  ]
}

const icons = {
  "my writing": "★",
  "technical projects": "●"
}

export function InterestsSection() {
  return (
    <div className="grid grid-cols-1 gap-6 mt-20">
      {Object.entries(interestsData).map(([category, items]) => (
        <div key={category} className="border border-border rounded-md p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg" style={{ color: 'oklch(0.42 0.18 25)' }}>{icons[category as keyof typeof icons]}</span>
            <h3 className="font-light text-xs uppercase tracking-wider text-muted-foreground">
              {category}
            </h3>
          </div>

          <div className="space-y-1">
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-sm text-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}