# Contributing to DefendreSolutions

Thank you for your interest in contributing to DefendreSolutions! This document provides guidelines and information for potential contributors.

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **Git** for version control
- A **GitHub account**

### Development Setup

1. **Fork the repository** (if you have access)
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/DefendreSolutions.git
   cd DefendreSolutions
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code formatting is handled automatically (run `npm run format`)
- **Husky + lint-staged**: Pre-commit hook formats staged files
- **Naming Conventions**:
  - Components: PascalCase (`DefendreSolutionsPortfolio`)
  - Files: kebab-case or PascalCase for components
  - Variables: camelCase
  - Constants: UPPER_SNAKE_CASE

### Component Guidelines

- **Single Responsibility**: Each component should have one clear purpose
- **Props Interface**: Define TypeScript interfaces for all props
- **Accessibility**: Follow WCAG guidelines
- **Responsive Design**: Mobile-first approach

Example component structure:
```typescript
interface ComponentProps {
  title: string;
  description?: string;
}

export default function Component({ title, description }: ComponentProps) {
  return (
    <div className="responsive-class">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### Styling Guidelines

- **Tailwind CSS**: Use Tailwind utility classes
- **Custom CSS**: Minimal custom CSS in globals.css only
- **Responsive Design**: Use Tailwind responsive prefixes
- **Accessibility**: Ensure proper color contrast and focus states

### Content Updates

Content is split across `constants/` modules:

- `constants/site.ts`: Company information (name, email, tagline, mission)
- `constants/services.ts`: Service categories and pricing
- `constants/projects.ts`: Portfolio items with metrics and links
- `constants/testimonials.ts`: Client quotes
- `constants/blog.ts`: Blog posts with metadata and tags
- `constants.tsx`: Re-exports (legacy imports keep working)

### Animation Guidelines

- **Framer Motion**: Use for complex animations
- **Performance**: Prefer CSS transforms over layout changes
- **Accessibility**: Respect `prefers-reduced-motion`
- **Subtle Effects**: Keep animations professional and subtle
- **Shared Variants**: Use helpers in `lib/motion.ts` (fadeInUp, hoverScaleProps, viewport)

## 🧪 Testing

### Manual Testing

Before submitting changes:

1. **Development Build**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

3. **Lint Check**:
  ```bash
  npm run lint
  ```
4. **Format (optional)**:
  ```bash
  npm run format
  ```

### Testing Checklist

- [ ] All pages load without errors (homepage, services, success stories, blog, about)
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Service category tabs work with mouse and keyboard navigation
- [ ] Animations are smooth and appropriate
- [ ] Contact information and email links work correctly
- [ ] All internal and external links work and open appropriately
- [ ] Keyboard navigation works throughout (Tab, arrow keys, Enter, Space)
- [ ] ARIA attributes and screen reader compatibility verified
- [ ] SEO meta tags are present and accurate

## 📦 Deployment

### Development Deployment

The project auto-deploys to Vercel on every push to the main branch.

### Preview Deployments

- Pull requests automatically generate preview deployments
- Test your changes in the preview environment
- Ensure no build errors or warnings

## 🐛 Bug Reports

When reporting bugs, include:

- **Environment**: Browser, OS, device
- **Steps to Reproduce**: Clear step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

## ✨ Feature Requests

For new features:

- **Description**: Clear explanation of the feature
- **Use Case**: Why this feature would be valuable
- **Implementation Ideas**: Technical approach (if applicable)
- **Mockups/Designs**: Visual representation if relevant

## 📋 Pull Request Process

1. **Create Feature Branch**: `git checkout -b feature/feature-name`
2. **Make Changes**: Follow coding guidelines
3. **Test Thoroughly**: Ensure everything works
4. **Commit Changes**: Use descriptive commit messages
5. **Push Branch**: `git push origin feature/feature-name`
6. **Create Pull Request**: Use the provided template

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested in production build
- [ ] Responsive design verified
- [ ] Accessibility checked

## Screenshots
(If applicable)
```

### Review Process

1. **Automated Checks**: Ensure all CI checks pass (type-check, lint, build)
2. **Code Review**: Address reviewer feedback
3. **Testing**: Verify functionality in preview deployment
4. **Approval**: Get approval from maintainers
5. **Merge**: Squash and merge to main branch

## 🎯 Project Goals

Keep these goals in mind when contributing:

- **Performance**: Maintain fast loading times
- **Accessibility**: Ensure inclusive design
- **SEO**: Optimize for search engines
- **Professional**: Maintain professional appearance
- **Veteran Values**: Honor military precision and discipline

## 📞 Questions & Support

For questions about contributing:

- **Email**: steve.defendre12@gmail.com
- **LinkedIn**: [Joseph M. Defendre](https://www.linkedin.com/in/joseph-m-defendre-a11a47225/)

## 🏆 Recognition

Contributors will be acknowledged in:
- Project documentation
- LinkedIn recommendations (if desired)
- Professional references (for significant contributions)

---

**Thank you for helping make DefendreSolutions better!** 🙏
