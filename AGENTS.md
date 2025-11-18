# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js 15 App Router routes, shared layouts, and metadata definitions.
- `components/`: Reusable UI blocks composed with Tailwind CSS and Framer Motion helpers.
- `constants/` & `data/`: Structured content for services, projects, FAQs, and newsletters; edit here to update copy.
- `blog_posts/`: Long-form TSX articles that power `/blog`; keep filenames slug-aligned.
- `public/`: Static assets served verbatim; optimize new media to `.webp` and include alt text.
- `scripts/` & `deploy_blog.sh`: Automation for newsletters and blog publishing—coordinate with marketing before running.
- `docs/`, `DEVELOPMENT.md`, `DEPLOYMENT.md`, `CONTRIBUTING.md`: Canonical references for deeper architecture and process detail.

## Build, Test, and Development Commands
- `npm run dev` — Start the local dev server on `http://localhost:3000` with hot reload.
- `npm run build` — Type-check and create the production bundle in `.next/`.
- `npm start` — Serve the compiled build; mirrors the Vercel production target.
- `npm run lint` — Run ESLint with the Next.js rule set; resolve warnings before committing.
- `npm run format` — Apply Prettier formatting across the repo.
- `npm run send-newsletter` — Execute `scripts/send-newsletter.js` to draft email content.

## Coding Style & Naming Conventions
- TypeScript throughout; `.tsx` for React components, `.ts` for utilities and config.
- Use 2-space indentation, named exports, and typed props via interfaces or `type` aliases.
- Components and folders: PascalCase. Hooks/utilities: camelCase. Durable constants: UPPER_SNAKE_CASE.
- Tailwind-first styling in `app/globals.css`; extend tokens instead of bespoke inline styles.
- Husky + lint-staged run Prettier on staged files—install dependencies to enable local hooks.

## Testing Guidelines
- No official test runner yet; introduce Vitest + React Testing Library as features warrant it.
- Co-locate tests as `Component.test.tsx` and mock external services.
- Until automation is in place, smoke-test Framer Motion flows, reduced-motion fallbacks, and dark-mode output before every PR.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat`, `fix`, `chore`, `docs`, etc.) and scope messages (`feat(blog): add operator checklist`).
- Update `CHANGELOG.md` when shipping user-facing changes and note migrations in `DEPLOYMENT.md` if needed.
- PRs require a concise summary, test evidence (commands, screenshots, or Loom), and linked issues or Notion tasks.
- Confirm `npm run lint` and `npm run build` pass locally; keep diffs focused and call out follow-up work explicitly.
