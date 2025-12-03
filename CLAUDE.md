# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Command is a personal operating system and portfolio for military veterans. It's a Next.js 15 application with:

- AI-powered chat assistant for VA benefits guidance
- Financial BattleStation dashboard
- Course content for veteran benefits education
- Landing pages with Three.js backgrounds

## Commands

- `npm run dev` - Start dev server (localhost:3000, Turbopack disabled)
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run check-ai-env` - Verify AI environment variables

## Architecture

### AI Chat System

The Command AI assistant uses Grok models via xAI:

- **API Route**: `app/api/ai-agent/route.ts` - Handles chat streaming with Vercel AI SDK
- **AI Logic**: `lib/ai-agent.ts` - System prompts and prompt building with knowledge base/Reddit context
- **Model Config**: `constants/ai.ts` - Available AI models (currently Grok 4.1 Fast)
- **Supabase Integration**: `lib/supabase.ts` - Rate limiting, conversation storage, course access
- **Knowledge Sources**: `lib/knowledge-base.ts` and `lib/reddit-dataset.ts` - Context augmentation

### Client Components

- Chat interfaces: `components/command/` (CommandChat, ChatInput, Messages, etc.)
- Three.js backgrounds: `components/landing/HeroThreeBackground.tsx`, `components/CommandThreeBackground.tsx`
- Client-only wrappers: `components/ClientOnlyComponents.tsx`, `components/SaaSLandingWrapper.tsx`

### Data Management

- Static content in `constants/` - blog posts, landing content, roadmap, projects
- Supabase for dynamic data - conversations, rate limits, subscriptions, course access

### Key Routes

- `/` - SaaS-style landing page with dynamic imports
- `/command` - AI chat interface
- `/battlestation/*` - Financial dashboard with transactions, budgets, reports
- `/course/*` - Veteran benefits course content

## Code Style

- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS v4
- **UI**: Shadcn UI components in `components/ui/`
- **Animations**: Framer Motion
- **3D**: React Three Fiber with drei

## Environment Variables

Required for AI functionality:

- `XAI_API_KEY` - Grok API key (required)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` - For rate limiting and data persistence

## Linear Integration

Project linked to Linear: https://linear.app/ceceriforma/project/life-command-os-113a92ca8686
