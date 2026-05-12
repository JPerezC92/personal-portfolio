# DESIGN.md — Design System Specification

**Version:** 1.0.0
**Created by:** Lumen (Visual Director)
**Date:** 2026-05-11
**Stack:** Next.js 16, Tailwind v4 (CSS-first @theme), shadcn CSS custom properties, Framer Motion, CVA, Exo 2 typeface

---

## 1. Design Principles

**1. Purposeful color, not decorative color.** Each hue in the palette serves a defined semantic role. Teal anchors the brand, orange signals interaction and energy, purple marks categorization and metadata. Colors must not be mixed outside their roles.

**2. Readable first.** Contrast and legibility outrank aesthetic preferences in every decision. WCAG 2.2 AA is the floor; AAA is the target for body text and critical UI copy.

**3. Motion serves communication.** Framer Motion spring animations introduce elements on scroll entry. Motion must never obscure content during load, and must degrade gracefully under `prefers-reduced-motion`.

**4. Theme consistency.** All three modes (light-teal, dark, sepia) must produce equivalent visual hierarchy and contrast relationships. No mode should feel like an afterthought.

**5. Bilingual by default.** Layout decisions must account for Spanish strings being 10-20% longer than English equivalents. Fixed-height containers that clip text are a design defect.

---

## 2. Color System

### 2.1 Raw Palette (from global.css @theme block)

All custom palette steps are defined as CSS custom properties and exposed to Tailwind v4 as `color-*` utilities.

#### Primary — Teal

| Step | Hex | Usage signal |
|---|---|---|
| primary-50 | #dafffa | Large background washes (light mode card fills) |
| primary-100 | #b3f8ec | Subtle tint fills |
| primary-200 | #88f2e0 | Hover state backgrounds |
| primary-300 | #5decd3 | Dividers, inactive state borders |
| **primary-400** | **#32e6c7** | **Interactive elements, borders, button fills (default interactive step)** |
| primary-500 | #19cdae | Hover/active state for primary-400 elements |
| primary-600 | #089f87 | Shadow color, deep border accents |
| primary-700 | #007260 | AppBar background tint (`bg-primary-700/20`), footer background |
| primary-800 | #00453a | Accessible text on light backgrounds |
| primary-900 | #001913 | Dark text, deep shadows |
| primary-950 | #000813 | Darkest tones, near-black |
| primary-base | #20e4c2 | Reference midpoint (maps close to primary-400) |

#### Secondary — Orange

| Step | Hex | Usage signal |
|---|---|---|
| secondary-50 | #ffebde | Very light orange fill (rarely needed) |
| secondary-100 | #ffc7b0 | Light orange tint |
| secondary-200 | #ffa47f | Medium-light fill |
| secondary-300 | **#ff804d** | **Highlight text color in dark/sepia modes** (`Highlight` component uses secondary-600 in light mode, secondary-300 in dark/sepia) |
| **secondary-400** | **#fe5c1b** | **Social icon buttons, secondary solid buttons, link underlines** |
| secondary-500 | #e54302 | Hover/active state for secondary-400; icon button background tint base |
| secondary-600 | #b33300 | Dark orange, accessible on light |
| secondary-700 | #812400 | Very dark orange |
| secondary-800 | #4f1400 | Near-brown dark |
| secondary-900 | #200400 | Deepest dark |
| secondary-base | #ff8a5b | Reference midpoint |

#### Accent — Purple

| Step | Hex | Usage signal |
|---|---|---|
| accent-50 | #f9e8ff | Very light purple fill |
| accent-100 | #e3bef6 | Light purple tint |
| accent-200 | #ce94ec | Accessible purple on dark |
| accent-300 | #b86ae3 | Light-mode accessible accent text |
| **accent-400** | **#a43fd9** | **Technology tags fill (`bg-accent-400/50`), accessible purple on dark** |
| **accent-500** | **#8b26c0** | **Same as accent-base — core accent step** |
| accent-600 | #6c1c96 | Darker purple |
| accent-700 | #4e136c | Very dark purple |
| **accent-800** | **#2f0b43** | **Project type label background (`bg-accent-800`)** |
| accent-900 | #12011b | Near-black purple |
| accent-base | #8b26c0 | Reference midpoint (= accent-500) |

#### Sepia — Warm Yellow

| Step | Hex | Usage signal |
|---|---|---|
| sepia-50 | #fdf6e3 | Sepia mode background (maps to CSS `--background: hsl(45 67% 93%)`) |
| sepia-100 | #f1e4bf | Sepia mode card surface |
| sepia-200 | #e6d399 | Sepia mode muted surfaces |
| sepia-300 | #dcc171 | Sepia mode borders |
| sepia-400 | #d2af4a | Sepia mode border emphasis |
| sepia-500 | #b89631 | Sepia mode ring / focus |
| sepia-600 | #8f7425 | Sepia mode muted-foreground text |
| sepia-700 | #665319 | Sepia mode dark text |
| sepia-800 | #3d320c | Sepia mode deepest dark |
| sepia-900 | #161100 | Sepia mode near-black |
| **sepia-base** | **#e9d8a5** | **About section photo frame background** |

#### Semantic Palettes (success / info / warning / danger)

These palettes exist in the token set but are not yet wired to any rendered component. Their base values:
- success-base: #2ef09f (bright green)
- info-base: #20a4f3 (sky blue)
- warning-base: #ff9f1c (amber)
- danger-base: #e71d36 (red)

Reserve these exclusively for status indicators, form validation, and system feedback. Do not use them decoratively.

---

### 2.2 Semantic Tokens (CSS custom properties, per mode)

These are the shadcn-compatible semantic tokens set in `@layer base` in global.css. They are what components should reference for surface and text colors.

| Token | Light mode (`:root`) | Dark mode | Sepia mode |
|---|---|---|---|
| `--background` | hsl(168 100% 92%) — very light teal | hsl(170 100% 2%) — near-black teal | hsl(45 67% 93%) — warm cream |
| `--foreground` | hsl(165 100% 5%) — deep teal-black | hsl(44 52% 85%) — warm cream | hsl(42 100% 5%) — near-black warm |
| `--card` | same as background | hsl(170 100% 4%) — slightly lighter than bg | same as background |
| `--card-foreground` | same as foreground | same as foreground | same as foreground |
| `--muted` | hsl(166 40% 84%) — muted teal | hsl(170 30% 12%) — dark muted teal | hsl(45 40% 80%) — muted warm |
| `--muted-foreground` | hsl(170 40% 30%) — medium teal | hsl(44 30% 60%) — medium warm | hsl(42 40% 30%) — medium warm |
| `--border` | hsl(170 40% 70%) — soft teal border | hsl(170 40% 20%) — dark teal border | hsl(45 40% 60%) — soft warm border |
| `--input` | same as border | same as border | same as border |
| `--ring` | hsl(170 76% 51%) — bright teal focus | hsl(170 76% 51%) — same | hsl(45 67% 50%) — gold focus |
| `--destructive` | hsl(352 78% 51%) — red | same | same |
| `--radius` | 0.5rem | (inherits) | (inherits) |

**Gap identified:** `--card` in light and sepia modes is identical to `--background`. Cards in these modes have no surface differentiation from the page. Card distinction currently relies entirely on border and shadow. This is acceptable intentional design if borders and shadows are always present, but is a fragility worth noting.

---

### 2.3 Color Role Definitions (when to use each color)

#### Teal (primary) — Brand and Structure

Use for: primary action buttons, interactive borders, focus rings, nav link underlines, section separators, AppBar background tint, footer background, card borders, card shadow glow, image overlay tint.

Do not use for: metadata labels, status indicators, decorative highlights in text.

#### Orange (secondary) — Interaction and Energy

Use for: social icon buttons, CV download button (primary CTA — note this is currently styled as `colorScheme='primary'`), highlighted text in body copy (via Highlight component — secondary-600 in light mode, secondary-300 in dark/sepia), secondary action buttons, hover state color for secondary actions.

Do not use for: backgrounds at full opacity on light surfaces (contrast insufficient), success/error states, decorative borders.

#### Purple (accent) — Categorization and Metadata

Use for: technology tag pills, project type labels, badge-style metadata. Sparingly in body text to mark named entities (possible future use).

Do not use for: primary interactive elements, borders at page-structure level, any element requiring AAA contrast on a light background at alpha < 80%.

#### Sepia (warm yellow) — Sepia Theme Surface

Use for: the sepia theme's background and surface token values, and the About section photo frame background (`bg-sepia-base`). Also decorates dark mode text (`dark:text-sepia-200` on headings, `dark:text-sepia-100` on body text).

Do not use for: interactive elements in non-sepia modes, decorative borders in light mode.

---

### 2.4 Contrast Audit Notes

The following pairings are used in the current codebase. Approximated contrast ratios are provided for design planning; precise values must be verified with a WCAG contrast checker against the rendered output.

| Pairing | Mode | Approx ratio | Target | Status |
|---|---|---|---|---|
| `foreground` on `background` (body text) | Light | ~17:1 | AA | Pass |
| `foreground` on `background` (body text) | Dark | ~15:1 | AA | Pass |
| `foreground` on `background` (body text) | Sepia | ~18:1 | AA | Pass |
| `primary-400` (#32e6c7) on `background` (light) | Light | ~1.9:1 | AA | **Fail — critical** |
| `primary-400` (#32e6c7) on dark `background` | Dark | ~9:1 | AA | Pass |
| `secondary-400` (#fe5c1b) on `background` (light) | Light | ~3.1:1 | AA for large text | Marginal |
| `secondary-600` (#b33300) as Highlight text on light bg | Light | ~5.8:1 | AA | Pass |
| `accent-400` (#a43fd9) on dark bg | Dark | ~5.2:1 | AA | Pass |
| `accent-800` (#2f0b43) tag bg + light foreground | All | N/A | Need browser verify | Unverified |
| Solid `primary-400` button text (`text-neutral-900` on #32e6c7) | All | ~9.1:1 | AA | Pass |

**Priority contrast flags:**
1. `primary-400` (#32e6c7) is a border, shadow, and icon color. Outline/ghost/link button text now uses `text-primary-700` in light mode — WCAG AA satisfied. Resolved.
2. `Highlight` component uses `text-secondary-600` (#b33300) in light mode, `dark:text-secondary-300` in dark/sepia. WCAG AA satisfied in all modes. Resolved.
3. No blocking contrast findings remain.

---

## 3. Typography

### 3.1 Typeface

**Primary:** Exo 2 (Google Fonts, loaded via Next.js font optimization as `var(--font-exo-2)`, aliased in Tailwind as `--font-exo2`).

**Character:** Exo 2 is a geometric sans-serif with slightly futuristic, technical character. Wide tracking on uppercase letterforms pairs well with the teal/tech aesthetic. It is legible at display sizes and compact at body sizes.

**Missing:** No serif or monospace face is defined. If code snippets are added in the future, a monospace stack should be added to the @theme block.

### 3.2 Type Scale

Two CVA scale systems exist: `Heading` (display) and `Text` (body/UI). Both use Exo 2 and are mobile-first with an `md:` bump.

#### Heading Scale (Heading.css.ts)

Base class: `text-2xl font-bold uppercase font-exo2 dark:text-sepia-200`

| Variant | Mobile size | Desktop (md+) size | Weight | Leading |
|---|---|---|---|---|
| xs | text-xs (12px) | text-sm (14px) | font-black | default |
| sm | text-sm (14px) | text-base (16px) | font-black | default |
| md | text-md (16px) | text-lg (18px) | font-black | default |
| lg | text-lg (18px) | text-xl (20px) | font-black | default |
| xl | text-xl (20px) | text-2xl (24px) | font-black | default |
| 2xl | text-2xl (24px) | text-3xl (30px) | font-black | default |
| 3xl | text-3xl (30px) | text-4xl (36px) | font-black | default |
| 4xl | text-4xl (36px) | text-5xl (48px) | font-black | default |
| 5xl | text-5xl (48px) | text-6xl (60px) | font-black | leading-[80%] |
| 6xl (default) | text-6xl (60px) | text-7xl (72px) | font-black | leading-[80%] |

Note: The base class hardcodes `text-2xl font-bold` but all variants override with `font-black` and a higher size. The `text-2xl font-bold` base only applies if a `fontSize` prop is not passed — which would use the default of `6xl`, overriding both. In practice the base `text-2xl font-bold` is always overridden. This is a Medium technical debt finding but not a visual defect.

Note: `leading-[80%]` on the two largest sizes (5xl, 6xl) produces very tight line spacing — appropriate for hero-scale single-line display use, but will clip descenders on multi-line content. Do not use these sizes for multi-line headings.

#### Text Scale (Text.css.ts)

Base class: `dark:text-sepia-100 font-exo2 tracking-wide`
Default variant: `md` (text-base / text-lg at md+)

| Variant | Mobile size | Desktop (md+) size | Weight | Leading |
|---|---|---|---|---|
| xs | text-xs (12px) | text-sm (14px) | font-semibold | leading-6 |
| sm | text-sm (14px) | text-base (16px) | font-semibold | leading-6 |
| md (default) | text-base (16px) | text-lg (18px) | font-semibold | leading-6 |
| lg | text-lg (18px) | text-xl (20px) | font-semibold | leading-6 |
| xl | text-xl (20px) | text-2xl (24px) | font-semibold | leading-6 |
| 2xl | text-2xl (24px) | text-3xl (30px) | font-semibold | leading-6 |
| 3xl | text-3xl (30px) | text-4xl (36px) | font-semibold | leading-6 |

Note: `leading-6` (24px fixed) is correct for `xs` through `md` but becomes a tight constraint for `lg` and above, where 24px line-height against 20-36px font size produces compressed paragraph spacing. Consider `leading-relaxed` for Text variants `lg` and above.

### 3.3 Usage Conventions

- **Headings** are always `uppercase`. This is enforced in the base class. Do not override with `normal-case` unless intentional (as in the Hero greeting which wraps Text inside a Heading element to break the all-caps treatment).
- **Body text** uses `tracking-wide` (0.025em). This aids legibility of Exo 2 at body sizes.
- **Button labels** use `font-semibold tracking-wider` from the CVA base — slightly wider tracking than body for UI label distinction.
- **Tag/badge text** uses Text `xs` — confirm this renders minimum 12px on mobile.

### 3.4 Hierarchy Mapping

| Element | Component | Variant |
|---|---|---|
| Hero name | Heading inside Heading | 5xl |
| Section titles (About, Skills, Projects) | Heading h2 | 3xl |
| AppBar brand name | Heading span | 2xl |
| Project card title | Heading h3 | xl |
| Technologies subsection label | Heading h4 | lg |
| Body paragraphs | Text p | md (default) |
| Technology tags | Text span | xs |
| Button labels | Button (CVA base) | sm/md/lg by size prop |

---

## 4. Spacing and Sizing Rhythm

### 4.1 Base Unit

Tailwind v4 uses a 4px base unit (0.25rem). All spacing should be multiples of 4px.

### 4.2 Key Spacing Conventions in Use

| Context | Value | Rationale |
|---|---|---|
| Section top padding (mobile) | pt-16 (64px) | Clears fixed AppBar + breathing room |
| Section top padding (desktop md+) | pt-28 (112px) | Larger breathing room at wider viewports |
| Section title to separator | mt-4 (16px) | Tight coupling — title and rule read as a unit |
| Separator to content | mb-16 (64px) | Generous gap before content begins |
| Card internal padding | p-4 (16px) | Compact but adequate |
| Card title to separator | mt-4 / mb-8 | Proportional card-internal rhythm |
| Hero image to text | mt-4 md:mt-8 | Responsive breathing between illustration and copy |
| Button gap in groups | gap-2 (8px) | Tight grouping for CTA + social icons |
| Social icon gap in footer | gap-x-4 (16px) | Slightly more air in footer context |
| Tag gap | gap-2 (8px) | Standard chip row |

### 4.3 Border Radius System

The shadcn `--radius` token is set to `0.5rem` (8px). Derived steps:

| Token | Value | Use |
|---|---|---|
| `--radius-lg` / `rounded-lg` | 0.5rem (8px) | Card corners (`rounded-xl` = 12px overrides this), modal containers |
| `--radius-md` | calc(0.5rem - 2px) = 6px | Mid-size components (chips, inputs) |
| `--radius-sm` | calc(0.5rem - 4px) = 4px | Small components, icon buttons with `rounded` (= 4px default) |
| `rounded-xl` (12px) | Tailwind default | Project cards |
| `rounded-full` | Tailwind default | Social icon buttons, avatar-style elements |
| `rounded-md` (6px) | Tailwind default | Tech tag pills, project type label, photo frame |

**Convention:** Cards use `rounded-xl`. Icon buttons use `rounded-full`. Tags and badges use `rounded-md`. Standard buttons use `rounded` (= `--radius-sm` area, ~4px). Photo containers use `rounded-md`.

### 4.4 Touch Targets

The `size='icon'` button variant uses `size-11` (44px × 44px), meeting the WCAG 2.5.5 minimum touch target requirement.

---

## 5. Motion System

### 5.1 Implementation

All animation uses Framer Motion via the `Motion` wrapper component (`src/shared/components/Motion/Motion.tsx`).

### 5.2 Current Pattern Inventory

| Animation | Target | Pattern | Values |
|---|---|---|---|
| Hero image entrance | `<picture>` | `initial: {opacity:0, x:-100}` → `animate: {opacity:1, x:0}` | `duration:2, type:'spring'` |
| Hero text entrance | `<div>` | `initial: {opacity:0, y:100}` → `animate: {opacity:1, y:0}` | `duration:2, type:'spring'` |
| Section scroll reveal | `<section>` | `animate: {opacity:0, y:8}` / `whileInView: {opacity:1, y:0}` | `duration:2, type:'spring', viewport: {once:true, amount: 0.2}` |
| Nav collapse/expand | `<div>` | variants: `active` (display:block, opacity:1, height:auto) / `collapsed` (opacity:0, height:0) | No explicit duration |
| Card image overlay | CSS transition | `after:transition-all after:duration-300` | CSS, not Framer |
| AppBar | CSS transition | `transition-all duration-300 ease-in-out` | CSS |

### 5.3 Motion Principles

**Spring type:** All Framer Motion animations use `type: 'spring'`. This produces natural, physical deceleration with slight overshoot. The `duration: 2` setting on spring type is interpreted as a damping constraint, not a rigid duration — the actual visual duration will be shorter (spring settles).

**Entry direction:** Hero image enters from left (x: -100). Hero text enters from below (y: 100). Section content enters from slight below (y: 8). This creates a layered sense of content "arriving" from different directions, establishing depth.

**Scroll reveal:** Sections use `whileInView` with `once: true` — content animates in on first viewport entry and stays visible. The `amount: 0.2` threshold means 20% of the section must be in view before animating.

**Reduced-motion:** The `Motion` component calls `useReducedMotion()` from Framer Motion and removes transition timing when reduction is requested. Resolved.

### 5.4 Recommended Motion Tokens

| Token name | Purpose | Recommended value |
|---|---|---|
| `motion-spring-default` | Standard spring for entrances | `{ type: 'spring', stiffness: 100, damping: 20 }` |
| `motion-spring-snappy` | Fast UI feedback (nav toggle) | `{ type: 'spring', stiffness: 200, damping: 25 }` |
| `motion-duration-base` | CSS transitions (card hover, AppBar) | `300ms` |
| `motion-duration-slow` | Overlay transitions | `300ms` (current value is correct) |
| `motion-easing-standard` | CSS easing | `ease-in-out` (current value is correct) |

**Offset / translate values:** Keep entrance offsets small (y: 8-16px for scroll reveals) and reserve large offsets (x: -100, y: 100) for hero-level first impressions only. The current usage follows this principle.

---

## 6. Component Color Usage Patterns

### 6.1 Button Component (button.tsx)

The Button uses CVA with `variant` × `colorScheme` × `size` dimensions.

**Variants:** solid / outline / ghost / link
**Color schemes:** primary (teal) / secondary (orange)
**Sizes:** sm / md / lg / icon

#### Recommended usage by context

| Context | Variant | ColorScheme | Size | Notes |
|---|---|---|---|---|
| Primary CTA (CV download) | solid | primary | md | Currently correct. Produces `bg-primary-400` with `text-neutral-900` — passes contrast. |
| Social icon buttons (SocialList) | outline | secondary | icon | Currently correct. |
| Navigation links (AppBar) | link | primary | md | Currently correct. |
| Project link buttons (GitHub, Web, API) | ghost | secondary | icon | Currently set with additional `bg-secondary-500/10` — small extra tint. Acceptable. |
| Mobile nav toggle (hamburger) | ghost | primary | icon | Currently correct. |

**Color scheme gap:** There is no `accent` colorScheme in the button. Technology tags and project type labels use accent-based colors but are not buttons — they are Text/span components. This is the correct design decision. Do not add an accent button colorScheme without a clear use case.

**Link variant note:** The link variant uses a pseudo-element underline (`before:border-b`) that animates `scale-x-0` → `scale-x-100` on hover. Transition classes are wrapped in `motion-safe:` — animation is suppressed when `prefers-reduced-motion` is set. Resolved.

### 6.2 ProjectCard (ProjectCard.tsx)

| Element | Color | Token / Utility |
|---|---|---|
| Card container border | Teal, 50% opacity | `border-primary-400/50` |
| Card shadow glow | Teal | `shadow-primary-500/30` |
| Card background | Teal, 10% opacity fill | `bg-primary-400/10` |
| Image section border | Teal, 50% opacity | `border-primary-400/50` |
| Image overlay (hover removes) | Deep teal | `after:bg-primary-900/50` |
| Project type label background | Deep purple | `bg-accent-800` |
| Project type label border | Orange | `border-secondary-400` |
| Link icon buttons | Orange ghost | `variant='ghost' colorScheme='secondary'` + `bg-secondary-500/10` |
| Technology tag pills | Purple, 50% opacity | `bg-accent-400/50` |
| Separator | (inherits border token) | Separator component |

**Design observation:** The card achieves a coherent tri-color treatment — teal for structure, orange for actions, purple for metadata. This is the strongest implementation of the three-color role system in the codebase and should be the reference pattern for future surface design.

### 6.3 AppBar (AppBar.tsx + AppBar.css.ts)

| Element | Color | Notes |
|---|---|---|
| Header background | Teal, 20% opacity | `bg-primary-700/20` + `backdrop-blur-2xl` |
| Brand name | Inherits foreground | Heading component, uppercase |
| Nav links | Teal link variant | `colorScheme='primary' variant='link'` |
| Mobile toggle icon | Teal ghost | `variant='ghost' size='icon'` |
| Mobile nav divider | Teal | `border-primary-400` |

### 6.4 Separator (separator.tsx)

The Separator inherits `--border` token. In all three modes this produces a subtle, low-contrast rule — appropriate for section divisions that should not compete with content.

### 6.5 Highlight Component (Highlight.tsx)

Uses `text-secondary-600` (#b33300) in light mode and `dark:text-secondary-300` (#ff804d) in dark/sepia modes, with `text-shadow: 0 0 10px rgb(255 128 77 / opacity)`. The orange glow effect is visually distinctive and thematically consistent with the secondary role (energy / emphasis). The light-mode step meets WCAG AA contrast requirements.

---

## 7. Theme Modes

### 7.1 Light Mode (`:root`)

Background: very light teal-white (`hsl(168 100% 92%)` — approximately #dbfff7). Text: near-black teal (`hsl(165 100% 5%)`). The palette is cool and crisp. Interactive elements at `primary-400` appear vibrant against the pale background. The overall tone is energetic and tech-forward.

**Key concern:** `primary-400` as text color is low-contrast in this mode. Ensure teal is only used as text on dark/primary surfaces, not on the light background.

### 7.2 Dark Mode (`[data-mode='dark']`)

Background: near-black teal (`hsl(170 100% 2%)`). Text: warm cream (`hsl(44 52% 85%)`). The warm foreground against a cool-dark background creates comfortable reading contrast. `dark:text-sepia-200` on headings and `dark:text-sepia-100` on body text are applied via Tailwind variants — verify these are triggered by the `data-mode='dark'` custom variant.

**Note:** The `@custom-variant dark` is defined as `[data-mode='dark']` selector, not the media query `prefers-color-scheme: dark`. Theme is user-explicit, not system-auto. This is a deliberate design decision (the user has a theme switcher). Document this to avoid confusion when contributors expect `dark:` classes to respond to the OS dark mode setting.

### 7.3 Sepia Mode (`[data-mode='sepia']`)

Background: warm cream (`hsl(45 67% 93%)`). Text: near-black warm (`hsl(42 100% 5%)`). The palette shifts from cool-teal to warm-amber. The teal interactive elements (`primary-400`) may appear incongruous against a warm sepia background — they retain brand identity but the temperature contrast is noticeable. This is intentional (consistent brand color across modes) but may warrant a softer teal step (primary-500 or primary-600) for border and shadow elements in sepia mode to reduce the temperature dissonance.

---

## 8. Breakpoints

Tailwind defaults plus one custom breakpoint:

| Breakpoint | Width | Notes |
|---|---|---|
| (none) | 0+ | Mobile first, all base styles |
| sm | 640px | Minor layout adjustments (e.g., hero max-height bump) |
| md | 768px | Major layout shifts: ProjectCard goes from single-column to two-column; nav expands from hamburger to horizontal |
| lg | 1024px | ProjectCard description reappears (hidden at md); heading sizes bump |
| xl | 1280px | Main content container changes from `px-4` to `px-0` (full width of max-w-screen-xl) |
| 2xl | 1536px | Hero max-height bump |
| 3xl | 1920px | Custom breakpoint defined; not yet used in observed components |

**Critical breakpoint:** `md` at 768px is where the most significant layout transitions happen. Project descriptions are now visible at all viewport widths — the `md:h-0 md:opacity-0` hide that previously created a 768px–1023px content gap was removed. Resolved.

---

## 9. Iconography

Icons are sourced from `react-icons` with multiple icon families:
- `FaGithub`, `FaHamburger` from `react-icons/fa`
- `RiGlobalFill` from `react-icons/ri`
- `TbApi` from `react-icons/tb`

Icon sizes are managed via the `Icon` component. Specific icon-size tokens are not defined in global.css — sizing is done via Tailwind text-size utilities or component props.

**Convention:** Use `size='2xl'` (Text size scale) on standalone skill icons. Use inline icon sizing (inherits from parent text size) in buttons.

---

## 10. Accessibility Checklist (Design-Level)

| Requirement | Status | Priority |
|---|---|---|
| Body text contrast (all modes) | Pass (estimated) | Verified by token values |
| Primary-400 as text on light background | Pass (`text-primary-700` in light mode) | Resolved |
| Secondary-300 Highlight text on light background | Pass (`text-secondary-600` in light mode) | Resolved |
| Icon button touch targets (44px min) | Pass (`size-11` = 44px) | Resolved |
| prefers-reduced-motion in Motion component | Pass (useReducedMotion() implemented) | Resolved |
| Alt text on images | Present (checked in JSX) | Pass |
| Link titles on icon-only links | Present (`title` prop on Link) | Pass |
| Focus ring visible | `--ring` token defined for all modes | Pass (needs browser verification) |
| Keyboard navigation order | Not audited — needs browser verification | Unverified |
| ARIA labels on icon-only buttons | Missing — `title` is not an ARIA label | Medium — add `aria-label` to icon buttons |

---

## 11. Copy Tone and Locale Notes

### English copy tone
Personal, earnest, growth-oriented. Avoids superlatives. Names learning goals honestly ("my current goal is to deepen..."). Community contributions signal collaboration. CV CTA is simply "CV" — terse and direct, appropriate for a button label.

### Spanish copy tone
Equivalent register. "Bienvenido a mi perfil" slightly warmer than "Welcome to my profile." "Conocimientos" (Knowledge/Expertise) vs "Skills" is a meaningful choice — "conocimientos" is broader and more intellectual in register. Preserve this difference.

### Length considerations
| Section | ES length vs EN | Risk |
|---|---|---|
| Hero headline | ~10% longer | Low (fluid wrap layout) |
| About bio 1 | ~5% longer | Low (paragraph layout) |
| Nav "Sobre mí" | ~60% longer than "About me" | Low (nav is flex, wraps fine) |
| Nav "Conocimientos" vs "Skills" | 3x character count | Medium at mobile nav — verify wrapping |
| Project descriptions | 5-20% longer | Low (unconstrained height) |
| "Technologies" / "Tecnologías" label in cards | 15% longer | Low (Heading, not constrained) |

No string pair has a length difference severe enough to break the current layout. However, if fixed-height containers are added to project cards in future, Spanish strings will require extra care.

---

## 12. Files Reference

| File | Role |
|---|---|
| `src/app/global.css` | Single source of truth for all palette and semantic tokens |
| `src/shared/components/ui/button.tsx` | CVA button — primary interactive component |
| `src/shared/components/Heading/Heading.css.ts` | Display type scale |
| `src/shared/components/Text/Text.css.ts` | Body/UI type scale |
| `src/shared/components/Highlight/Highlight.css.ts` | Inline highlight treatment |
| `src/shared/components/Motion/Motion.tsx` | All animation wrapper |
| `src/modules/projects/components/ProjectCard.tsx` | Reference implementation of tri-color pattern |
| `src/modules/navigation/components/AppBar.tsx` | Nav pattern + mobile collapse |
| `src/modules/social-links/components/SocialList.tsx` | Icon button row pattern |
| `src/app/[locale]/page.tsx` | Page composition + Section scroll-reveal pattern |
| `messages/en.json` | English copy |
| `messages/es.json` | Spanish copy |

---

## 13. Priority Findings for Implementing Specialist (Forge)

The following findings are ranked by severity. Critical and High items should be addressed before release.

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | ~~High~~ | ~~`Motion` component has no `prefers-reduced-motion` guard~~ | **Resolved** — `useReducedMotion()` added in PR #31 |
| 2 | ~~High~~ | ~~`primary-400` used as text on light background in outline/ghost/link buttons — fails WCAG AA~~ | **Resolved** — `text-primary-700` in light mode in PR #31 |
| 3 | ~~High~~ | ~~`secondary-300` Highlight text fails WCAG AA on light background~~ | **Resolved** — `text-secondary-600` in light mode in PR #31 |
| 4 | ~~High~~ | ~~Icon buttons ~36-38px, below 44px minimum touch target~~ | **Resolved** — `size-11` (44px) in PR #31 |
| 5 | ~~Medium~~ | ~~Project descriptions invisible at 768px-1023px viewport~~ | **Resolved** — `md:h-0 md:opacity-0` removed in PR #33 |
| 6 | Medium | Icon-only buttons have `title` props but no `aria-label` | Add `aria-label` matching the `title` value to all icon-only Button instances |
| 7 | ~~Medium~~ | ~~CSS link underline animation does not respect `prefers-reduced-motion`~~ | **Resolved** — `motion-safe:` prefixes added in PR #33 |
| 8 | Low | `--card` token is identical to `--background` in light and sepia modes | Acceptable if border + shadow are always present, but fragile. Consider a 2-3% lightness offset. |
| 9 | Low | Heading CVA base has `text-2xl font-bold` that is always overridden by variant classes | Remove dead base classes; keep only `uppercase font-bold font-exo2 dark:text-sepia-200` in the base |
| 10 | Low | Text `leading-6` (fixed 24px) is too tight for `lg` and above Text variants | Change `leading-6` to `leading-relaxed` or `leading-7` for lg, xl, 2xl, 3xl Text variants |
