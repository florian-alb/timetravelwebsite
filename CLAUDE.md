# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Architecture

This is a **Next.js 16** app using the **App Router** with **React 19**, **TypeScript**, and **Tailwind CSS v4**.

- `app/layout.tsx` — Root layout with Geist font variables and global metadata
- `app/page.tsx` — Home page (currently the default Next.js starter)
- `app/globals.css` — Global styles using Tailwind v4's `@import "tailwindcss"` syntax with CSS custom properties for background/foreground colors and dark mode via `prefers-color-scheme`

### Key conventions

- Path alias `@/*` maps to the project root (e.g., `@/app/...`, `@/components/...`)
- Tailwind v4 is configured via PostCSS (`postcss.config.mjs`) — no `tailwind.config.*` file; theme tokens are defined with `@theme inline` in CSS
- Dark mode is handled via CSS `prefers-color-scheme` media query, not a class toggle
- Strict TypeScript is enabled
