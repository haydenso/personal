# Musings - Apple Notes Style Website

This directory contains a complete, standalone repository for creating your own Apple Notes-style website. This is designed to be extracted and set up as its own independent repository.

## 📦 What's Included

This is a **turnkey solution** for creating a beautiful, Apple Notes-inspired website for your personal musings and notes. It includes:

- ✅ Apple Notes aesthetic (beige background, yellow highlights, clean UI)
- ✅ Resizable sidebar with category organization
- ✅ Mobile-responsive design
- ✅ MDX content support with frontmatter
- ✅ Category-based organization with color coding
- ✅ Easy customization via config file
- ✅ Sample content to get you started
- ✅ Production-ready build system

## 🚀 How to Create Your Own Musings Repository

### Option 1: Create a New Repository from This Directory

1. **Copy this directory to a new location:**
   ```bash
   cp -r musings-repo ../musings
   cd ../musings
   ```

2. **Initialize as a new Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Musings website"
   ```

3. **Create a new repository on GitHub** (named `musings` or whatever you prefer)

4. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/musings.git
   git branch -M main
   git push -u origin main
   ```

5. **Install dependencies and run:**
   ```bash
   npm install
   npm run dev
   ```

### Option 2: Direct Clone Method

If you want others to use this as a template:

1. Push this directory to a new GitHub repository
2. Others can clone it directly:
   ```bash
   git clone https://github.com/YOUR_USERNAME/musings.git
   cd musings
   npm install
   npm run dev
   ```

## 📝 Adding Your Content

1. **Create a new `.mdx` file** in `content/musings/`:

   ```mdx
   ---
   title: Your Note Title
   author: Your Name
   date: January 19, 2025
   category: notes
   pinned: false
   ---

   # Your content here

   This is a note about something interesting...
   ```

2. **Run the generator** (automatically runs with dev/build):
   ```bash
   npm run generate-musings
   ```

3. **View your changes:**
   ```bash
   npm run dev
   ```

## 🎨 Customizing Your Site

Edit `config.ts` in the root directory:

```typescript
export const config = {
  site: {
    title: "my musings",
    description: "a peek into my notes app",
    author: "Your Name",
  },
  ui: {
    selectedColor: "#ffd52e",  // Yellow highlight
    backgroundColor: "#f5f5f0", // Beige background
  },
  categories: {
    'notes': { color: '#9333ea', order: 1 },
    'ai': { color: '#3b82f6', order: 2 },
    // Add your own categories...
  },
}
```

## 🌐 Deploying Your Site

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically:
- Install dependencies
- Run the build script
- Deploy your site
- Give you a URL

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

## 📖 Documentation Files

See the following files for more information:

- `README.md` - General overview and features
- `QUICKSTART.md` - 5-minute setup guide
- `SETUP_COMPLETE.md` - Feature checklist
- `FINAL_SUMMARY.txt` - Complete feature list

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v3
- **Language:** TypeScript
- **Content:** MDX with gray-matter
- **Math:** KaTeX for mathematical expressions
- **UI:** Custom components with Apple Notes aesthetic

## 📂 Project Structure

```
musings/
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page with list
│   └── [category]/[slug]/ # Individual musing pages
├── components/            # Reusable UI components
├── content/
│   └── musings/          # Your .mdx files go here
├── scripts/
│   └── generate-musings.mjs  # Content generator
├── styles/
│   └── globals.css       # Global styles
├── config.ts             # Site configuration
└── package.json          # Dependencies and scripts
```

## 💡 Tips for Success

1. **Start with the sample content** - Modify the example musings to understand the structure
2. **Customize colors** - Make it your own by changing the category colors in `config.ts`
3. **Pin important notes** - Use `pinned: true` in frontmatter for your top musings
4. **Use categories** - Organize your notes into logical categories (notes, ai, ideas, etc.)
5. **Deploy early** - Get it online quickly and iterate from there

## 🎯 Next Steps

1. ✅ Copy this directory to a new location
2. ✅ Initialize as a Git repository
3. ✅ Push to GitHub
4. ✅ Customize `config.ts`
5. ✅ Add your own musings in `content/musings/`
6. ✅ Deploy to Vercel or Netlify
7. ✅ Share your musings website with the world!

## 📄 License

MIT - Feel free to use this for your own personal website or modify it however you like!

---

**Created from the musings functionality in the personal website repository.**

For questions or issues, refer to the documentation files included in this directory.
