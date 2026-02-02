# Markdown Support in About Page

The about page now supports full markdown formatting in the `content/about.json` file, including:

## Supported Features

### 1. **Code Blocks**
Use triple backticks with optional language identifier:

```json
{
  "bullets": [
    "Example with code: ```python\ndef hello():\n    print('world')\n```"
  ]
}
```

### 2. **Inline Code**
Use single backticks:
```json
{
  "bullets": [
    "Use the `parseMarkdown()` function to process text"
  ]
}
```

### 3. **Links**
Standard markdown links:
```json
{
  "bullets": [
    "Check out [my GitHub](https://github.com/haydenso)"
  ]
}
```

### 4. **Bold and Italic**
```json
{
  "bullets": [
    "This is **bold** and this is *italic*"
  ]
}
```

### 5. **Lists**
Each slide of bullet text can now include unordered or ordered lists. Start an unordered item with `-` or `*`, and use `1.`, `2.`, etc. for numbered steps.

```json
{
  "bullets": [
    "- first unordered point",
    "- second unordered point",
    "1. ordered step one",
    "2. ordered step two"
  ]
}
```

### 6. **Blockquotes**
Prefix a line with `>` to render a styled blockquote with the existing prose styles.

```json
{
  "bullets": [
    "> this belongs in a callout"
  ]
}
```

## Implementation

The markdown parsing is handled by `/lib/markdown.ts` which:
1. Extracts and preserves code blocks
2. Processes inline code
3. Handles links with proper styling
4. Supports bold and italic formatting
5. Safely escapes HTML to prevent XSS

The main-app.tsx component uses `parseMarkdown()` to convert markdown strings to HTML before rendering with `dangerouslySetInnerHTML`.

## Styling

Code blocks and other markdown elements inherit styles from the `prose` class in `/styles/prose.css`, ensuring consistent formatting with blogs and musings.
