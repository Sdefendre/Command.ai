# DefendreSolutions

**Veteran-Owned Software Development Portfolio**

DefendreSolutions is a modern, comprehensive consultancy website showcasing the services, success stories, and expertise of Defendre Solutions - a veteran-owned software development company. Built with cutting-edge web technologies and featuring a stunning glassmorphism design with full accessibility compliance.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8?style=flat-square&logo=tailwindcss)

## 🚀 Live Demo

Visit the live website: [DefendreSolutions.com](https://defendre-solutions.vercel.app)

## ✨ Features

- **Modern Design**: Glassmorphism UI with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Built with Next.js 15 and optimized for speed
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation; respects reduced motion
- **SEO Optimized**: Complete meta tags, OpenGraph, and structured data
- **Multi-page Architecture**: Homepage, services, success stories, blog, and about pages
- **Consultancy Focus**: Professional services showcase with pricing and timelines

### Pages & Sections

- **Homepage**: Hero, mission, services preview, success stories preview, blog preview, contact
- **Services**: Comprehensive service categories with detailed pricing and timelines
- **Success Stories**: Combined case studies and testimonials with metrics
- **Blog**: Professional insights and articles on technology and development
- **About**: Company story and team information
- **Contact**: Project consultation with timeline and pricing info

## 🛠 Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **SWC** - Fast TypeScript/JavaScript compiler

### Analytics & Monitoring

- **[Vercel Analytics](https://vercel.com/analytics)** - Real-time web analytics and performance monitoring

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sdefendre/DefendreSolutions.git
   cd DefendreSolutions
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Development

### Available Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start development server on localhost:3000 |
| `npm run build` | Create production build                    |
| `npm run start` | Start production server                    |
| `npm run lint`  | Run ESLint checks                          |

### Project Structure

```
DefendreSolutions/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog listing and posts
│   ├── services/          # Services page with categories
│   ├── success-stories/   # Success stories and testimonials
│   ├── globals.css        # Global styles and Tailwind CSS
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Homepage
│   ├── robots.txt        # Search engine directives
│   └── sitemap.xml       # Site map for SEO
├── components/            # React components
│   ├── defendre-solutions-portfolio.tsx  # Main homepage component
│   ├── SectionHead.tsx    # Reusable section headers
│   ├── FloatingDots.tsx   # Animated background
│   └── BuyMeCoffee.tsx    # Support component
├── blog_posts/           # Blog post content files
│   ├── post7.tsx         # Individual blog posts
│   ├── posts8-9.tsx     # Grouped blog posts
│   ├── post10.tsx       # Individual blog posts
│   └── posts11-12.tsx   # Grouped blog posts
├── public/               # Static assets
│   ├── defendre-logo.png # Company logo and favicon
│   └── headshot.png      # Founder photo
├── constants.tsx         # Site data, services, projects, blog content
├── next.config.mjs      # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

### Key Components

- **`DefendreSolutionsPortfolio`**: Main homepage component with consultancy focus
- **`SectionHead`**: Consistent section headers with kicker/title/subtitle pattern
- **`FloatingDots`**: Animated background elements
- **`BuyMeCoffee`**: Support component with glassmorphism styling
- **Service Pages**: Dedicated pages for services, success stories, blog, about
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and ARIA support

### Content Management

All content is centralized in `constants.tsx`:

- **`SITE`**: Company information, contact details, tagline, mission
- **`SERVICES`**: Service categories with detailed pricing and timelines
- **`PROJECTS`**: Portfolio items with metrics, descriptions and links
- **`TESTIMONIALS`**: Client testimonials and reviews
- **`BLOG_POSTS`**: Blog articles with rich content, tags, and metadata

Additional blog content is organized in `blog_posts/` directory with individual and grouped post files.

To update content, modify the respective constants in this file.

#### Adding Blog Posts

Add new blog posts to the `BLOG_POSTS` array in `constants.tsx`:

```typescript
{
  id: "unique-post-id",
  title: "Your Blog Post Title",
  excerpt: "Brief description of the post",
  content: `<p>HTML content of your blog post</p>`,
  author: "Author Name",
  date: "2025-01-17",
  readTime: "5 min read",
  tags: ["Tag1", "Tag2"]
}
```

### Styling Architecture

The project uses **Tailwind CSS v4** with custom design tokens:

- **CSS Custom Properties**: OKLCH color space for consistent theming
- **Glassmorphism Effects**: Custom utility classes (`glass-card`, `glass-button`)
- **Typography**: Inter (sans-serif) and Playfair Display (serif) fonts
- **Design Tokens**: Complete shadcn/ui design system integration

### Performance Features

- **Image Optimization**: WebP/AVIF formats with custom device sizes
- **Code Splitting**: Automatic with Next.js App Router
- **Framer Motion**: Optimized package imports in next.config.mjs
- **SWC Minification**: Fast build-time optimization
- **React Strict Mode**: Development safety and future compatibility

## 🎨 Design System

### Theme Colors (OKLCH)

The project uses OKLCH color space for consistent colors across themes:

- **Primary**: Blue accent colors
- **Backgrounds**: Pure black/white with transparency
- **Glass Effects**: Semi-transparent overlays with blur

### Typography Scale

- **Headings**: Playfair Display (serif) for elegance
- **Body**: Inter (sans-serif) for readability
- **Responsive**: Fluid typography scales

### Component Patterns

- **Glass Cards**: Semi-transparent containers with backdrop blur
- **Animated Sections**: Scroll-triggered animations with Framer Motion
- **Responsive Grid**: CSS Grid and Flexbox layouts

## ♿ Accessibility & Motion

- Animations honor the user’s `prefers-reduced-motion` setting using Framer Motion’s `useReducedMotion()`.
- Background effects (floating dots, shooting stars) scale down on small screens and are disabled when reduced motion is requested.
- Interactive feedback uses ARIA roles and `aria-live` for status messaging.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Select the `DefendreSolutions` project

2. **Configure Build**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**
   - No environment variables required for basic setup
   - Add Google Search Console verification if needed

4. **Deploy**
   - Vercel will automatically deploy on every push to main

### Other Platforms

The project can be deployed to any platform that supports Node.js:

- **Netlify**: Set build command to `npm run build` and publish directory to `out` (after enabling static export)
- **AWS Amplify**: Use the default Next.js build settings
- **Railway**: Connect GitHub repository and use default build settings

## 🔧 Configuration

### Next.js Configuration

Key settings in `next.config.mjs`:

- **Framer Motion Optimization**: Package-level optimization for better performance
- **Image Optimization**: Custom device sizes for responsive images
- **Build Settings**: TypeScript and ESLint error handling for rapid development

### SEO Configuration

Comprehensive SEO setup in `app/layout.tsx`:

- **Meta Tags**: Title, description, keywords, author
- **OpenGraph**: Social media preview optimization
- **Twitter Cards**: Twitter-specific preview settings
- **Structured Data**: JSON-LD for better search visibility
- **Google Fonts**: Inter and Playfair Display with display: swap

### TypeScript Configuration

- **Strict Mode**: Enabled for type safety
- **Path Aliases**: `@/*` maps to the root directory
- **ES2017 Target**: Modern JavaScript features
- **Next.js Plugin**: Automatic type checking integration

## 📄 License

This project is private and proprietary to Defendre Solutions.

## 🤝 Contributing

This is a private portfolio project. For inquiries about collaboration or services, contact:

- **Email**: steve.defendre12@gmail.com
- **LinkedIn**: [Joseph M. Defendre](https://www.linkedin.com/in/joseph-m-defendre-a11a47225/)
- **GitHub**: [@Sdefendre](https://github.com/Sdefendre)

## 📞 Contact & Services

**Defendre Solutions** - Veteran-Owned Software Development

We turn strong ideas into resilient software. Specializing in:

- **Full-Stack Development**: Modern web applications with React, Next.js, TypeScript
- **AI-Powered Applications**: Machine learning integration and AI-driven features
- **MVP Development**: Rapid prototyping and product validation
- **Government-Ready SaaS**: Secure, compliant software solutions
- **Technical Consulting**: Architecture design and development strategy

### Get In Touch

- **Email**: steve.defendre12@gmail.com
- **LinkedIn**: [Connect with Steve Defendre](https://www.linkedin.com/in/joseph-m-defendre-a11a47225/)
- **Portfolio**: [View Live Projects](https://braidsbyrose.com)

---

**Built with discipline, delivered with precision** 🎯
