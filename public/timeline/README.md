# Timeline Images

To add images to your timeline entries, place them in `/public/timeline/` with the slug name.

For example:
- `/public/timeline/dec-2024.jpg` for the December 2024 entry
- `/public/timeline/jan-2025.jpg` for the January 2025 entry

## Image Recommendations

- **Aspect ratio**: 16:9 or similar landscape format works best
- **Resolution**: 1200px wide recommended
- **Format**: JPG or PNG
- **Size**: Keep under 500KB for fast loading

## Adding New Timeline Entries

Edit `/components/timeline.tsx` and add entries to the `timelineData` array:

```typescript
{
  slug: "unique-slug",
  title: "Entry Title",
  date: "Month Day, Year",
  image: "/timeline/unique-slug.jpg",
  badge: "CURRENT", // optional
  excerpt: "Short preview text...",
  content: `
    <p>Full content in HTML...</p>
  `,
}
```

Timeline entries appear in the order they're listed in the array.
