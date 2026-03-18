# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Test:** `pnpm vitest` (no tests written yet, but Vitest + jsdom + testing-library is configured)
- **Run single test:** `pnpm vitest <path>`
- **Generate component:** `pnpm reactcci` (scaffolds component with index, tsx, css, optional test/stories)

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

### Component patterns

**shadcn/ui components** (`src/shared/components/ui/`): Follow shadcn conventions — use `cva()` for variants, `cn()` for class merging, `asChild` via Radix Slot for polymorphism.

**Custom components** (`src/shared/components/*/`): Follow `ComponentName/index.ts` (barrel export) + `ComponentName.tsx` + `ComponentName.css.ts` pattern. Use `cva()` for variant styling, `cn()` for class merging. Polymorphic via `component` prop.

### Styling

- **class-variance-authority** (`cva()`) for all component styling, defined in `.css.ts` files
- **`cn()`** utility (`clsx` + `tailwind-merge`) at `src/shared/utils/cn.ts` for class merging
- **Color palette** defined in `src/theme/colors.ts` (standalone, reusable across projects) and consumed by `tailwind.config.js`
- **CSS custom properties** in `global.css` for shadcn semantic tokens (--background, --foreground, etc.)
- **tailwind.config.js** has custom color palettes (primary/teal, secondary/orange, accent/purple, sepia, semantic colors) with 50-950 shades
- Dark mode via `[data-mode="dark"]`, sepia mode via `[data-mode="sepia"]`
- Custom font: Exo 2 (loaded via `next/font/google`, exposed as `--font-exo-2` CSS variable)
- Custom breakpoint: `3xl` at 1920px

### Conventions

- **Formatting:** Tabs (size 2), single quotes, semicolons, trailing commas, 80 char width
- **Imports:** Auto-sorted via `eslint-plugin-simple-import-sort`
- **Unused vars:** Prefix with `_` to suppress lint errors
- **Animations:** Framer Motion wrappers via the `Motion` component (scroll-triggered `whileInView`)
- **Type-safe enums:** Custom `EnumType()` utility instead of TypeScript enums
- **ESLint:** Flat config (`eslint.config.mjs`) with ESLint 9

### Environment

- `.env.example` has `NEXT_PUBLIC_WEB_URL` — used for OpenGraph metadata and canonical URLs
