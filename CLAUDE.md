# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Install dependencies**: `bun install`
- **Development**: `bun run dev` (React Router dev server)
- **Build**: `bun run build` (React Router build)
- **Start production**: `bun run start` (React Router serve)
- **Type checking**: `bun run typecheck` (TypeScript compiler)

## Architecture Overview

This is a React Router 7 application demonstrating different rendering strategies:

### Rendering Modes
- **CSR** (`/csr`): Client-side rendering with hydration
- **SSR** (`/ssr`): Server-side rendering with dynamic data
- **SSG** (`/ssg`): Static site generation at build time
- **Cached** (`/cached`): Cached responses with ISR-like behavior

### Key Files
- `app/root.tsx`: Root layout with global styles and navigation
- `app/routes.ts`: Route configuration file defining all routes
- `app/entry.server.tsx`: Server entry point for SSR
- `app/entry.client.tsx`: Client entry point for hydration
- `react-router.config.ts`: React Router configuration (SSR enabled, SSG for `/ssg`)

### Structure
- Uses Tailwind CSS for styling
- TypeScript throughout
- Modern React with hooks and functional components
- Route-based code splitting
- Server-side rendering with React Router 7

### Development Setup
- Uses Vite with React Router plugin
- PostCSS for CSS processing with Tailwind
- No tests configured (only type checking)
- Built with Bun runtime

### Route Patterns
- `/`: Homepage with navigation to all rendering demos
- `/csr`: Client-side rendering demonstration
- `/ssr`: Server-side rendering demonstration  
- `/ssg`: Static site generation demonstration
- `/cached`: Cached responses demonstration
- `/*`: Catch-all route