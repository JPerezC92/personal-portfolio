# Philip Perez Castro — Portfolio

Personal portfolio site built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **UI:** React 19, shadcn/ui, class-variance-authority
- **Styling:** Tailwind CSS v4 (CSS-first config), custom color palette
- **Animations:** Framer Motion 12
- **Testing:** Vitest + Testing Library (unit), Playwright (E2E)
- **Linting:** ESLint 9 (flat config), Prettier 3

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm vitest` | Run unit tests |
| `pnpm e2e` | Run Playwright E2E tests |
| `pnpm e2e:ui` | Playwright UI mode |
| `pnpm reactcci` | Scaffold a new component |

## Project Structure

```
src/
  app/              Next.js pages and layout
  projects/         Project domain (ProjectCard, model)
  shared/
    components/     Custom components (Heading, Text, Icon, Motion, etc.)
    components/ui/  shadcn/ui primitives (Button, Separator)
    data/           Static content (projects, skills, social links)
    utils/          Utilities (cn, EnumType, routes)
  theme/
    colors.ts       Standalone reusable color palette
e2e/                Playwright E2E tests
```

## Color Palette

The custom palette at `src/theme/colors.ts` is framework-agnostic and reusable across projects. It includes 8 scales (primary, secondary, accent, sepia, success, info, warning, danger) with 50–950 shades each.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_WEB_URL=http://localhost:3000
```
