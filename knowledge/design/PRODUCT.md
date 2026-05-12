# PRODUCT.md — Portfolio Product Identity Brief

**Version:** 1.0.0
**Created by:** Lumen (Visual Director)
**Date:** 2026-05-11

---

## 1. Product Purpose

Philip Junior Perez Castro's personal portfolio is a bilingual (Spanish / English) web presence that communicates professional identity, technical capability, and project work to hiring managers, technical leads, and collaborators in the frontend software development industry. The site is the primary first-touch artefact for job applications and freelance inquiries.

---

## 2. Owner Profile

**Name:** Philip Junior Perez Castro
**Role:** Junior Frontend Developer (TypeScript / React focus)
**Location:** Peru (Ancash origin; current base unspecified in copy)
**Education:** SENATI Software Development (2019-2021), self-taught
**Stack signal:** TypeScript, React, Next.js, HTML5, CSS3, JavaScript, full-stack experience (DDD/clean architecture mentioned in project descriptions)

---

## 3. Target Audience

**Primary:** Engineering hiring managers and technical leads at product companies or agencies evaluating junior-to-mid frontend talent.
**Secondary:** Developer community peers (Gentleman Programming community is referenced in two projects — signals community engagement).
**Tertiary:** Open source collaborators or potential freelance clients who encounter the portfolio via social links.

---

## 4. Tone of Voice

- **Register:** Warm, earnest, and professionally ambitious. Not terse or corporate. Not informal or casual.
- **Perspective:** First-person, direct. "I'm a passionate self-taught developer..." — personal and honest.
- **Aspiration signal:** The copy explicitly names current learning goals (TypeScript deepening) — projects openness and growth mindset rather than false seniority.
- **Community orientation:** Two project descriptions credit the Gentleman Programming community — signals team player and collaborative spirit.
- **Avoid:** Hyperbole, vague claims ("expert in everything"), em dashes in UI copy, jargon without context.

---

## 5. Content Inventory (current)

| Section | EN key | ES key | Notes |
|---|---|---|---|
| Navigation | About me / Skills / Projects | Sobre mi / Conocimientos / Proyectos | ES "Conocimientos" is meaningfully different from "Skills" — more specific, review if scope expands |
| Hero | Welcome greeting + name + headline + CV button | Bienvenido... + same structure | ES headline is ~10% longer — acceptable in current fluid layout |
| About | Bio paragraph 1 + Bio paragraph 2 | Same structure | Bio 1 ES is marginally longer; OK for paragraph flow |
| Skills | Title only (section rendered by data) | Conocimientos | Fine |
| Projects | Title + 4 project descriptions + "Technologies" label | Same structure | All ES strings are 5-20% longer than EN — acceptable in current card layout, but tag labels ("Tecnologias") should be verified at smallest breakpoint |

---

## 6. Key User Journeys

1. **Recruiter fast scan:** AppBar name + hero headline + CV download button. Must be above the fold on all viewports. CTA must be visually primary.
2. **Portfolio deep dive:** About section (credibility) > Skills (technical match) > Projects (evidence). Linear scroll, no branching required.
3. **Social outreach:** SocialList icons in hero (primary discovery) and footer (secondary). Must be visually accessible at both locations.
4. **Locale switch:** Language toggle in AppBar. Must not disrupt scroll position or visual state.

---

## 7. Differentiation Signals

- Teal + orange + purple palette is distinctive and non-generic — signals design sensibility beyond "default shadcn portfolio."
- Three theme modes (light teal, dark, sepia) signal attention to accessibility and user preference.
- Bilingual (ES/EN) is genuinely differentiating in the Peruvian/Latin American developer market.
- Community project contributions (Gentleman Programming) are social proof of collaboration and code quality.

---

## 8. Success Criteria (design perspective)

- CV download is the primary conversion action; its button must pass WCAG AA contrast in all three themes.
- Social icon buttons must meet the 44px minimum touch target.
- Hero text is readable without scrolling on a 375px wide viewport.
- Theme switching must not produce any flash of unstyled content or perceptual jarring.
- All text content must be readable with `prefers-reduced-motion` active (no content hidden behind motion gates).
