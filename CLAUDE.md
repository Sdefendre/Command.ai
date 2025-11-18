# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DefendreSolutions is a veteran-owned software development consultancy website - a multi-page Next.js 15 application with glassmorphism design showcasing services, success stories, blog content, and comprehensive business information with WCAG 2.1 AA accessibility compliance.

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build (ignores TS/ESLint errors)
npm run lint         # Run ESLint checks
npm start            # Start production server (requires build first)

# Quick fixes before commits
npx eslint . --fix   # Auto-fix linting issues
npx tsc --noEmit     # Check TypeScript errors (not enforced in build)
```

## Architecture Overview

### Multi-Page Application Structure
**Homepage** (`components/defendre-solutions-portfolio.tsx`, 630+ lines) with sections:
- Hero with scroll-based zoom/opacity animations
- Mission statement with veteran badge
- Services preview with interactive tabs and keyboard navigation
- Success stories preview with key metrics
- Blog preview with latest posts
- Contact section with project info, timeline, and pricing

**Additional Pages**:
- `/services` - Comprehensive service categories with detailed pricing
- `/success-stories` - Combined case studies and testimonials with metrics
- `/blog` - Professional blog with technical articles
- `/about` - Company story and team information

### Key Files to Know
- `components/defendre-solutions-portfolio.tsx`: Main homepage component with consultancy focus
- `app/services/page.tsx`: Services page with interactive category tabs
- `app/success-stories/page.tsx`: Success stories and testimonials showcase
- `app/blog/page.tsx`: Blog listing page with post previews
- `app/about/page.tsx`: Company story and team information
- `constants.tsx`: ALL content data (SITE, SERVICES, PROJECTS, TESTIMONIALS, BLOG_POSTS)
- `blog_posts/`: Individual blog post content files
- `app/globals.css`: Tailwind v4 config with glass morphism classes
- `app/layout.tsx`: SEO metadata and font loading

### Tech Stack Specifics
- **Next.js 15.2.4** with App Router (no Pages Router)
- **React 19** with TypeScript strict mode
- **Tailwind CSS v4** (new `@theme inline` syntax, OKLCH colors)
- **Framer Motion** for all animations (optimized imports)
- **No UI library** - custom glass morphism components only
- **Minimal state management** - useState for tabs and mobile menu, no Redux/Zustand
- **No backend** - pure static site, no API routes
- **WCAG 2.1 AA Compliant** - Full accessibility with keyboard navigation and ARIA support

## Development Patterns

### Glass Morphism CSS Classes
Located in `app/globals.css`:
- `.glass-morph`: Base effect with backdrop-blur
- `.glass-card`: Interactive cards with hover scale
- `.glass-button-primary`: Blue gradient buttons
- `.glass-button-secondary`: Gray variant
- `.glass-nav`: Navigation bar styling

### Animation Patterns
All animations use Framer Motion:
```tsx
// Scroll-based transforms (hero section)
const { scrollY } = useScroll()
const scale = useTransform(scrollY, [0, 500], [1, 0.8])

// Content reveal on scroll
whileInView={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 20 }}
```

### Component Organization
- **No component library** - build custom components
- **Inline components** - ServiceCard, ProjectCard defined inside main component
- **Reusable**: Only `SectionHead.tsx` and `FloatingDots.tsx` are separate

## Content Updates

### Quick Content Changes
Edit `constants.tsx`:
```tsx
SITE = {
  name: "Defendre Solutions",
  email: "steve.defendre12@gmail.com",
  linkedin: "https://www.linkedin.com/in/joseph-m-defendre-a11a47225/",
  github: "https://github.com/Sdefendre",
  tagline: "Veteran • Builder • Consultant",
  mission: "Combining military precision with cutting-edge AI to help small businesses compete in the digital age"
}

SERVICES = {
  categories: [
    { id, title, description, services: [{ name, description, price, timeline, includes[] }] }
  ]
}

PROJECTS = [
  { title, tag, desc, metrics, links: { live?, codeLink? } }
]

TESTIMONIALS = [
  { quote, author }
]
```

### Service Management
Services are now data-driven via `SERVICES` constant in `constants.tsx`:
- **Service Categories**: Quick Wins, AI Solutions, Modernization
- **Each Service**: Name, description, price range, timeline, included features
- **Services Page**: Interactive tabs with keyboard navigation (arrow keys, Home/End)
- **Homepage Preview**: Displays selected category with pricing

## Important Configuration

### Build Configuration Issues
`next.config.mjs` has **error suppression enabled**:
```javascript
eslint: { ignoreDuringBuilds: true }     // ⚠️ Builds ignore lint errors
typescript: { ignoreBuildErrors: true }  // ⚠️ Builds ignore TS errors
```
Always run `npm run lint` and `npx tsc --noEmit` manually before deploying.

### Tailwind CSS v4 Notes
- Uses new `@theme inline` directive in globals.css
- OKLCH color space for consistent light/dark colors
- Custom properties like `--color-primary`, `--color-background`
- Mobile optimizations reduce blur for performance

### Image Assets
- `/public/defendre-logo.png`: Company logo (also favicon)
- `/public/headshot.png`: Founder photo
- Images unoptimized in config for simplicity

## Common Tasks

### Add New Project
1. Edit `constants.tsx` PROJECTS array
2. Include: title, tag, desc, metrics (optional), links: { live?, codeLink? } (optional)
3. Metrics format: "300% increase • 2-week delivery • 5-star review" (bullet separated)

### Modify Glass Effects
Edit `app/globals.css` glass classes - adjust:
- `backdrop-blur` values (performance impact on mobile)
- `background` opacity in rgba/oklch values
- `box-shadow` for depth effects

### Add New Page/Section
1. **For new pages**: Create in `app/page-name/page.tsx` 
2. **For homepage sections**: Add to `components/defendre-solutions-portfolio.tsx`
3. **Add navigation**: Update both desktop and mobile menu links
4. **Implement smooth scroll**: Use `id` attribute for homepage sections
5. **Use consistent components**: `SectionHead`, `FloatingDots`, glass morphism classes
6. **Accessibility**: Add proper ARIA attributes and keyboard navigation

### Deploy Changes
```bash
npm run build  # Will succeed even with errors
git add -A
git commit -m "your message"
git push origin main
# Vercel auto-deploys from main branch
```

## Known Issues & Limitations

1. **No test infrastructure** - No Jest/Vitest setup
2. **Build bypasses errors** - Manual checking required  
3. **Large main component** - 630+ lines in homepage component
4. **No environment variables** - All config hard-coded
5. **No error boundaries** - No error handling for production
6. **Contact form** - Frontend only (mailto:), needs backend integration for form submission
7. **BuyMeCoffee component** - References undefined component but works correctly

## Performance Considerations

- Framer Motion animations optimized via `optimizePackageImports`
- Mobile glass effects reduced (less blur) for 60fps
- Lazy loading not implemented for sections
- No code splitting beyond Next.js defaults
- Images could benefit from next/image optimization