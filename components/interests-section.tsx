
const interestsData = {
"technical projects": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
  ],
  "my writing": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
  ]
}

const icons = {
  "my writing": "★",
  "technical projects": "●"
}

export function InterestsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {Object.entries(interestsData).map(([category, items]) => (
        <div key={category} className="border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-red-500 text-lg">{icons[category as keyof typeof icons]}</span>
            <h3 className="font-light text-xs uppercase tracking-wider text-muted-foreground">
              {category}
            </h3>
          </div>

          <div className="space-y-2">
            <ul className="space-y-2">
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