# Research Brief: Clean Architecture Migration Plan

**Date:** 2026-05-09
**Requested by:** Curator (Project Lead)
**Prepared by:** Augur (Senior Research Analyst)
**Objective:** Identify feature modules, map existing files to target layers, recommend a static-data service pattern, and sequence the migration of `src/` toward the modular clean architecture defined in `.claude/agents/atrium.md`.

---

## 1. Feature Module Inventory

Five discrete modules are identifiable from the source. Each is named by its domain concern, not by its current folder location.

### 1.1 `projects` module

| Existing file | Current path | Target layer |
|---|---|---|
| `project.model.ts` | `src/projects/models/` | `domain/entities/project.ts` |
| `useProjectList.tsx` | `src/shared/data/` | `hooks/use-project-list.ts` |
| `projectList.tsx` | `src/shared/data/` | `services/projects.service.ts` (static provider — see §3) |
| `ProjectCard.tsx` | `src/projects/components/ProjectCard/` | `components/ProjectCard.tsx` |
| _(missing)_ | — | `domain/errors/projects-service.error.ts` (must be created) |

Notes:
- `useProjectList.tsx` calls `useTranslations('Projects')` and returns `Project[]`. It is already a hook in shape — it belongs in the hook layer.
- `projectList.tsx` is the raw static data array in Spanish hardcoded strings. It is superseded by `useProjectList.tsx` (which uses i18n keys) and appears to be dead/legacy. See Risk §6.1.
- `Highlight` component is imported inside `useProjectList.tsx` to render JSX inside data objects (`description: ReactNode`). This is the sharpest architectural coupling in the codebase — see Risk §6.2.

### 1.2 `skills` module

| Existing file | Current path | Target layer |
|---|---|---|
| `skills.ts` (inline `Skill` interface + `skillList` array) | `src/shared/data/` | `domain/entities/skill.ts` (interface) + `services/skills.service.ts` (data array) |
| _(missing)_ | — | `hooks/use-skill-list.ts` |
| _(missing)_ | — | `components/SkillList.tsx` (inlined in `page.tsx` today) |
| _(missing)_ | — | `domain/errors/skills-service.error.ts` |

Notes:
- `skills.ts` conflates the entity definition (`Skill` interface) with the data (`skillList`). They belong in separate files under the target architecture.
- The rendering logic for the skills grid lives inline in `page.tsx` (lines 185-213). It has no dedicated component file today.
- `skillList` does not call `useTranslations` — only the section heading label comes from i18n. The data itself is purely static (icon + hex color). This makes the skills module the simplest to migrate.

### 1.3 `social-links` module

| Existing file | Current path | Target layer |
|---|---|---|
| `socialList.ts` (inline type + data) | `src/shared/data/` | `domain/entities/social-link.ts` (interface) + `services/social-links.service.ts` (data array) |
| _(missing)_ | — | `hooks/use-social-list.ts` |
| _(missing)_ | — | `components/SocialList.tsx` (inlined in `page.tsx` hero + footer) |
| _(missing)_ | — | `domain/errors/social-links-service.error.ts` |

Notes:
- `socialList` is consumed in two separate places in `page.tsx`: the hero CTA row (lines 129-142) and the footer (lines 244-257). Both are currently inline JSX with no extracted component.
- The type for each social link item is implicit (no exported interface). The entity file will need to make it explicit.

### 1.4 `navigation` module

| Existing file | Current path | Target layer |
|---|---|---|
| `sections.ts` | `src/shared/utils/` | `domain/entities/section.ts` (the `SectionList` type) + `services/navigation.service.ts` (the `sectionList` data object) |
| `web.routes.ts` | `src/shared/utils/` | `services/navigation.service.ts` (route builders live here alongside the section data) |
| `AppBar.tsx` | `src/shared/components/AppBar/` | `components/AppBar.tsx` |
| `LocaleSwitcher.tsx` | `src/shared/components/LocaleSwitcher/` | `components/LocaleSwitcher.tsx` |
| _(missing)_ | — | `hooks/use-navigation.ts` (thin hook exposing `sectionList` and route helpers to components) |
| _(missing)_ | — | `domain/errors/navigation-service.error.ts` |

Notes:
- `AppBar.tsx` receives its `sections` prop from `page.tsx`, where the section labels are built inline with `useTranslations('Nav')`. The hook layer should absorb this construction so the component receives ready-to-render data.
- `LocaleSwitcher.tsx` reads `routing` from `@/i18n/routing` and `usePathname` directly. It has no service dependency; its logic is pure locale-path manipulation. It fits cleanly as a self-contained component inside the `navigation` module.
- `EnumType` utility is used both in `sections.ts` and inside `AppBar.tsx`. The utility itself belongs in `src/shared/utils/` (see §4).

### 1.5 `i18n` infrastructure (not a feature module — shared infrastructure)

| Existing file | Current path | Disposition |
|---|---|---|
| `src/i18n/routing.ts` | `src/i18n/` | Stay in `src/i18n/` — Next.js/next-intl convention; not a feature |
| `src/i18n/request.ts` | `src/i18n/` | Stay in `src/i18n/` — server-side config |
| `src/i18n/navigation.ts` | `src/i18n/` | Stay in `src/i18n/` — if it exists |
| `src/proxy.ts` | `src/` | Stay at root as `middleware.ts` alias — Next.js middleware convention |

---

## 2. What Remains in `src/shared/`

The following files are true cross-cutting utilities with no single feature owner. They remain in `src/shared/` after all modules migrate.

| File | Reason to stay shared |
|---|---|
| `shared/components/Heading/` | Generic typography primitive — used by all features |
| `shared/components/Highlight/` | Generic inline emphasis — used by projects and hero copy |
| `shared/components/Icon/` | Generic icon wrapper — used by skills |
| `shared/components/Motion/` | Generic Framer Motion wrapper — used by hero and nav |
| `shared/components/Text/` | Generic typography primitive |
| `shared/components/ui/button.tsx` | Design-system primitive |
| `shared/components/ui/separator.tsx` | Design-system primitive |
| `shared/utils/cn.ts` | Tailwind class merge utility — universal |
| `shared/utils/rgbDataURL.ts` | Image blur placeholder utility — used by projects and hero |
| `shared/utils/enumType.ts` | Generic TypeScript enum factory — used by navigation and AppBar |
| `shared/utils/envVariables.ts` | Environment config — used by navigation routes and layout |
| `src/theme/colors.ts` | Design-system token file — stays at `src/theme/` |

The `shared/data/` subdirectory dissolves entirely: all three files (`skills.ts`, `socialList.ts`, `useProjectList.tsx`) migrate into their respective modules. `projectList.tsx` is a legacy duplicate and should be deleted (see Risk §6.1).

---

## 3. Static Data Service Pattern Recommendation

**Recommendation: retain the `services/` layer as a static data provider — do not omit it.**

Rationale:

1. Atrium's spec mandates `domain/errors/{feature}-service.error.ts` with no exceptions. That file exists to be returned by the service. Omitting the service layer would orphan the error type.
2. The service boundary enforces a single point of change if data ever moves from local TypeScript arrays to a CMS, API, or database. For a portfolio that is currently static but could add a headless CMS, preserving the boundary costs nothing and avoids a future full-layer refactor.
3. The pattern is already partially in place: `projectList.tsx` is a raw data array (service shape), and `useProjectList.tsx` is a hook that calls it. The migration formalises what already exists.

**Adapted pattern for static data (no HTTP):**

```typescript
// src/modules/skills/services/skills.service.ts
import { Skill } from '@/modules/skills/domain/entities/skill';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';

export const skillsService = {
  getAll: (): Skill[] | SkillsServiceError => {
    try {
      return skillList; // local array defined in this file or imported from a sibling data file
    } catch (error) {
      return new SkillsServiceError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
};
```

Key adaptations vs the HTTP pattern in Atrium's spec:
- Return type is synchronous (`T | FeatureServiceError`, not `Promise<T | FeatureServiceError>`) because there is no async I/O. If/when a CMS is added, only the service changes — the hook's `queryFn` already handles the error branch.
- No `apiClient`, no `parseJsendData`, no `<unknown>` generic. The data is typed at source.
- The try/catch is retained to satisfy Atrium's error-wrapping rule and to guard against unexpected runtime failures in data construction (e.g., environment variable reads in `envVariables.ts`).
- For the `projects` module, the service returns the raw `Project[]` with `description: ReactNode` built from i18n strings. The `useTranslations` call stays in the hook (`use-project-list.ts`), not the service. The service provides the static structure; the hook injects translated content. This requires the `description` field to be built at the hook layer, not embedded in the service data array — a deliberate layering decision.

**Alternative considered and rejected — omit service entirely:** would require every hook to access raw data directly, making the layer boundary untestable and the future CMS migration harder. Rejected.

---

## 4. Migration Sequence

Ordered simplest-first, by coupling complexity and blast radius.

### Step 1 — `skills` module
- Lowest coupling: no JSX in data, no i18n in data, no existing partial structure to untangle.
- Files created: `domain/entities/skill.ts`, `domain/errors/skills-service.error.ts`, `services/skills.service.ts`, `hooks/use-skill-list.ts`, `components/SkillList.tsx`.
- Files migrated out: `src/shared/data/skills.ts` (deleted after migration).
- `page.tsx` skills section (lines 185-213) replaced with `<SkillList />`.
- Risk level: Low.

### Step 2 — `social-links` module
- Low coupling: no JSX in data, no i18n in data. Two consumption sites in `page.tsx` but both are simple map/render patterns.
- Files created: `domain/entities/social-link.ts`, `domain/errors/social-links-service.error.ts`, `services/social-links.service.ts`, `hooks/use-social-list.ts`, `components/SocialList.tsx`.
- Files migrated out: `src/shared/data/socialList.ts` (deleted after migration).
- `page.tsx` hero row and footer both replaced with `<SocialList />`.
- Risk level: Low.

### Step 3 — `navigation` module
- Medium coupling: `sections.ts` feeds `AppBar` via `page.tsx`; route building references `envVariables.ts` (shared). `AppBar.tsx` already lives in shared components — it moves to the module.
- Files created: `domain/entities/section.ts`, `domain/errors/navigation-service.error.ts`, `services/navigation.service.ts`, `hooks/use-navigation.ts`, `components/AppBar.tsx`, `components/LocaleSwitcher.tsx`.
- Files migrated out: `src/shared/utils/sections.ts`, `src/shared/utils/web.routes.ts`, `src/shared/components/AppBar/`, `src/shared/components/LocaleSwitcher/`.
- `page.tsx` `AppBar` invocation simplified — `useNavigation` hook provides the sections array.
- Risk level: Medium (AppBar is rendered on every page via `page.tsx`; any breakage is immediately visible).

### Step 4 — `projects` module
- Highest coupling: `description: ReactNode` embeds JSX and i18n calls inside the data layer; `projectList.tsx` is a dead duplicate; `ProjectCard` has an existing partial home in `src/projects/`.
- Files created: `domain/entities/project.ts` (moved from `src/projects/models/project.model.ts`), `domain/errors/projects-service.error.ts`, `services/projects.service.ts`, `hooks/use-project-list.ts`, `components/ProjectCard.tsx`.
- Files migrated out: `src/projects/` directory (entire, replaced by `src/modules/projects/`), `src/shared/data/useProjectList.tsx`, `src/shared/data/projectList.tsx` (deleted as dead code).
- `page.tsx` projects section simplified — hook call and `<ProjectCard />` remain but import paths update.
- Risk level: High (see §6.2 for the `ReactNode`-in-data coupling issue).

### Step 5 — tsconfig alias update
- Add `@/modules/*` alias to `tsconfig.json` paths at the start of migration (before Step 1) so all module imports resolve from day one.
- This is a prerequisite, not a feature step. It should be done before Step 1 begins.

---

## 5. Sources

| Source | Type |
|---|---|
| `src/shared/data/useProjectList.tsx` | Fact — read directly |
| `src/shared/data/projectList.tsx` | Fact — read directly |
| `src/projects/models/project.model.ts` | Fact — read directly |
| `src/projects/components/ProjectCard/ProjectCard.tsx` | Fact — read directly |
| `src/shared/data/skills.ts` | Fact — read directly |
| `src/shared/data/socialList.ts` | Fact — read directly |
| `src/shared/utils/sections.ts` | Fact — read directly |
| `src/shared/utils/web.routes.ts` | Fact — read directly |
| `src/shared/utils/envVariables.ts` | Fact — read directly |
| `src/shared/utils/enumType.ts` | Fact — read directly |
| `src/shared/utils/cn.ts` | Fact — read directly |
| `src/shared/utils/rgbDataURL.ts` | Fact — read directly |
| `src/shared/components/AppBar/AppBar.tsx` | Fact — read directly |
| `src/shared/components/LocaleSwitcher/LocaleSwitcher.tsx` | Fact — read directly |
| `src/app/[locale]/page.tsx` | Fact — read directly |
| `src/app/[locale]/layout.tsx` | Fact — read directly |
| `src/proxy.ts` | Fact — read directly |
| `src/i18n/routing.ts`, `request.ts` | Fact — read directly |
| `src/theme/colors.ts` | Fact — read directly |
| `messages/en.json` | Fact — read directly |
| `.claude/agents/atrium.md` | Fact — authoritative target architecture rulebook |

---

## 6. Risk Notes

### 6.1 `projectList.tsx` is dead code — Fact
`projectList.tsx` (`src/shared/data/`) is a hardcoded Spanish-language duplicate of the same data in `useProjectList.tsx`. It is not imported anywhere in the codebase (confirmed by file content and page.tsx imports). It should be deleted before or during Step 4, not migrated. Leaving it risks a future developer treating it as the canonical data source.

### 6.2 `ReactNode` embedded in domain entity — Fact, High Risk
The `Project` entity's `description` field is typed `ReactNode` (`project.model.ts` line 7). This means translated JSX markup (including `<Highlight>` component usage) is constructed inside `useProjectList.tsx` and stored in a domain object. This violates the clean architecture principle of keeping the domain layer free of UI concerns.

The migration must resolve this before the `projects` module can be considered compliant. Two options exist (resolution is for Curator to decide, not Augur to prescribe):
- **Option A:** Change `description` to `string` or a structured markdown/content type in the entity; render Highlight in the component layer from that string. Requires message format changes.
- **Option B:** Accept `ReactNode` in the entity as a deliberate portfolio-specific pragmatic choice and document the deviation. The entity stays non-standard but the rest of the layer boundaries are correct.

This is the only architectural decision in the migration that requires explicit resolution before Step 4 can begin.

### 6.3 `AppBar.css` import — Fact, Low Risk
`AppBar.tsx` imports `./AppBar.css` (a sibling CSS file). This file was not read during this research session. When migrating AppBar to `src/modules/navigation/components/`, the CSS file must move with it and the relative import (`./AppBar.css`) remains valid as a same-folder sibling import — which is the one permitted relative form per Atrium's import rules.

### 6.4 No `@/modules` alias exists yet — Fact
`tsconfig.json` currently has no `@/modules` alias. Atrium's spec acknowledges this and defers `@/modules` import-path checks to post-migration. The alias must be added to `tsconfig.json` before the first module file is written, or all new module files will have unresolvable imports from day one.

### 6.5 `proxy.ts` naming — Fact, Low Risk
`src/proxy.ts` is the Next.js middleware file. Its filename does not follow the Next.js convention of `middleware.ts`. This is pre-existing and out of scope for the clean architecture migration, but worth noting if a rename is considered during migration prep.

### 6.6 `about` section has no data module — Hypothesis
The "About me" section in `page.tsx` (lines 146-183) renders biographical copy entirely via `useTranslations('About')` inline — no data file, no model, no hook. There is no `about` module to migrate. The section is purely a layout+i18n concern. This is correct as-is and needs no module.

---

## 7. Gaps

- `src/shared/components/AppBar/AppBar.css` was not read. Its contents (class names, specificity, potential conflicts) are unknown and could affect the AppBar migration.
- `src/i18n/navigation.ts` was listed in the original structure summary but was not found during Glob. It may not exist or may have been renamed. The actual i18n navigation helper surface is unverified.
- No existing tests for `useProjectList`, `skillList`, or `socialList` were found during this session. Test migration scope for those units is unverified.
- The `tsconfig.json` alias configuration was not read. The exact current alias set needs to be confirmed before Step 5 (alias addition) is executed.
