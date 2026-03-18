# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Unit tests:** `pnpm vitest` or `pnpm vitest <path>` for a single test
- **E2E tests:** `pnpm e2e` (Playwright + Chromium, starts dev server automatically)
- **E2E UI mode:** `pnpm e2e:ui`
- **Generate component:** `pnpm reactcci` (scaffolds component with tsx, css, optional test/stories)

## Architecture

Next.js 16 App Router portfolio site (React 19). All content is static (no API routes, no database).

### Path aliases

- `@/projects/*` → `src/projects/*`
- `@/shared/*` → `src/shared/*`
- `@/theme/*` → `src/theme/*`

### Key directories

- `src/app/` — Next.js App Router pages and layout
- `src/projects/` — Project domain (ProjectCard component, project model)
- `src/shared/components/ui/` — shadcn/ui primitives (Button, Separator)
- `src/shared/components/` — Custom reusable components (Text, Heading, Icon, Motion, Highlight, AppBar)
- `src/shared/data/` — Static content: project list, skills, social links
- `src/theme/colors.ts` — Standalone reusable color palette (zero framework deps)
- `e2e/` — Playwright E2E tests

### Component patterns

**shadcn/ui components** (`src/shared/components/ui/`): Follow shadcn conventions — use `cva()` for variants, `cn()` for class merging, `asChild` via Radix Slot for polymorphism.

**Custom components** (`src/shared/components/*/`): `ComponentName.tsx` + `ComponentName.css.ts` pattern. Use `cva()` for variant styling, `cn()` for class merging. Polymorphic via `component` prop. No barrel files — import directly from the file.

### Styling

- **Tailwind CSS v4** with CSS-first config — all theme defined in `@theme` block in `global.css`
- **class-variance-authority** (`cva()`) for all component styling, defined in `.css.ts` files
- **`cn()`** utility (`clsx` + `tailwind-merge`) at `src/shared/utils/cn.ts` for class merging
- **Color palette** defined in `src/theme/colors.ts` (standalone, reusable across projects) and in `global.css` `@theme`
- **CSS custom properties** in `global.css` for shadcn semantic tokens (--background, --foreground, etc.)
- Custom color palettes (primary/teal, secondary/orange, accent/purple, sepia, semantic colors) with 50-950 shades
- Dark mode via `@custom-variant dark` targeting `[data-mode="dark"]`
- Sepia mode via `@custom-variant sepia` targeting `[data-mode="sepia"]`
- Custom font: Exo 2 (loaded via `next/font/google`, exposed as `--font-exo-2` CSS variable)
- Custom breakpoint: `3xl` at 1920px

### Conventions

- **Formatting:** Tabs (size 2), single quotes, semicolons, trailing commas, 80 char width
- **Imports:** Auto-sorted via `eslint-plugin-simple-import-sort`. Always use `@/` aliases, never relative paths
- **Unused vars:** Prefix with `_` to suppress lint errors
- **Animations:** Framer Motion wrappers via the `Motion` component (scroll-triggered `whileInView`)
- **Type-safe enums:** Custom `EnumType()` utility instead of TypeScript enums
- **ESLint:** Flat config (`eslint.config.mjs`) with ESLint 9

### Environment

- `.env.example` has `NEXT_PUBLIC_WEB_URL` — used for OpenGraph metadata and canonical URLs
