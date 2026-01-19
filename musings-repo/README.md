# Musings

An Apple Notes-style website for your personal musings and notes. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🍎 **Apple Notes Aesthetic**: Beautiful beige/cream background with yellow highlights for selected items
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop with adaptive layouts
- 📝 **Markdown Support**: Write your musings in `.mdx` with full markdown formatting
- 🔢 **Math Rendering**: LaTeX math support via KaTeX for technical notes
- 🏷️ **Category Organization**: Color-coded categories with collapsible sections
- 📌 **Pinned Notes**: Pin important musings to the top
- 🎨 **Easy Customization**: Single `config.ts` file for all customization
- ⚡ **Fast**: Static site generation with Next.js for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Generate content and start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your musings!

## 📝 Adding Content

### Create a New Musing

1. Create a new `.mdx` file in `content/musings/`
2. Add frontmatter with metadata
3. Write your content in Markdown
4. Run `npm run dev` to see it live

### Example Musing

Create `content/musings/my-first-note.mdx`:

```mdx
---
title: My First Note
author: Your Name
date: January 15, 2025
pinned: false
category: notes
---

# My First Note

This is my **first** musing! I can use:

- Markdown formatting
- Math equations: $E = mc^2$
- Links: [Google](https://google.com)
```

### Frontmatter Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Title of your musing |
| `author` | string | No | Author name |
| `date` | string | Yes | Publication date |
| `lastUpdated` | string | No | Last update date |
| `pinned` | boolean | No | Pin to top (default: false) |
| `category` | string | No | Category name |

## ⚙️ Customization

### Edit `config.ts`

```typescript
export const config = {
  site: {
    title: "my musings",
    description: "a peek into my notes app",
    author: "Your Name",
  },

  categories: {
    'notes': { color: '#9333ea', order: 1 },
    'ai': { color: '#3b82f6', order: 2 },
    // Add your own!
  },

  ui: {
    selectedColor: '#ffd52e',
    backgroundColor: '#f5f5f0',
  },
}
```

## 🏗️ Project Structure

```
musings/
├── app/                 # Next.js app
├── components/          # React components
├── content/musings/     # Your .mdx files
├── lib/                # Utilities
├── scripts/            # Build scripts
├── styles/             # CSS
└── config.ts          # Configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Deploy! 🎉

### Netlify

1. Push to GitHub
2. Import on [Netlify](https://netlify.com)
3. Build: `npm run build`
4. Publish: `.next`

## 📚 Markdown Features

- **Bold**: `**text**`
- *Italic*: `*text*`
- Links: `[text](url)`
- Math: `$E = mc^2$` or `$$...$$`
- Code blocks with syntax highlighting
- Lists, blockquotes, and more!

## 🛠️ Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run generate-musings` - Generate content

## 📄 License

MIT License - use freely!

---

**Happy writing!** ✍️
