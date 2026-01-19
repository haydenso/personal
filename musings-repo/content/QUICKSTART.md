# Quick Start Guide

Get your Musings site up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Add Your First Musing

Create a file `content/musings/my-note.mdx`:

```mdx
---
title: My First Note
author: Your Name
date: January 19, 2025
category: notes
pinned: false
---

# Hello World!

This is my first musing. I can write **markdown** here!

- Lists work
- Math too: $E = mc^2$
- And [links](https://example.com)
```

## 3. Customize Your Site

Edit `config.ts`:

```typescript
export const config = {
  site: {
    title: "my musings",  // Change this!
    author: "Your Name",  // And this!
  },
  
  categories: {
    // Add your own categories with colors
    'personal': { color: '#ff6b6b', order: 1 },
    'work': { color: '#4ecdc4', order: 2 },
  },
}
```

## 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Build for Production

```bash
npm run build
npm run start
```

## 6. Deploy

Push to GitHub and deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) - both have free tiers!

---

That's it! You now have a beautiful Apple Notes-style site for your personal musings.

For more details, see [README.md](README.md)
