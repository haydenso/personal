// Configuration for your musings site
// Customize this to match your preferences!

export const config = {
  // Site metadata
  site: {
    title: "my musings",
    description: "a peek into my notes app",
    author: "Your Name",
    url: "https://yoursite.com",
  },

  // Category configuration
  // Add your own categories with custom colors and display order
  categories: {
    'notes': { color: '#9333ea', order: 1 },      // purple
    'ai': { color: '#3b82f6', order: 2 },         // blue
    'software': { color: '#10b981', order: 3 },   // green
    'ideas': { color: '#ef4444', order: 4 },      // red
    'finance': { color: '#f59e0b', order: 5 },    // amber
    'life': { color: '#8b5cf6', order: 6 },       // violet
    'misc': { color: '#eab308', order: 7 },       // yellow
  },

  // Default category for musings without one
  defaultCategory: 'uncategorized',

  // UI customization
  ui: {
    // The yellow highlight color when a musing is selected
    selectedColor: '#ffd52e',
    
    // Background color (Apple Notes beige/cream)
    backgroundColor: '#f5f5f0',
    
    // Sidebar background
    sidebarBackground: '#ffffff',
    
    // Default list width in pixels (on desktop)
    defaultListWidth: 400,
  },

  // Footer text
  footer: {
    text: `© ${new Date().getFullYear()}. Built with Musings`,
    version: '1.0.0',
  },
}

// Helper functions to get category config
export function getCategoryColor(category: string): string {
  return config.categories[category as keyof typeof config.categories]?.color || '#6b7280'
}

export function getCategoryOrder(category: string): number {
  return config.categories[category as keyof typeof config.categories]?.order || 999
}
