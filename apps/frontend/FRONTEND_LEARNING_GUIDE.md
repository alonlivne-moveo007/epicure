# Epicure Frontend Learning Guide

This guide explains how the frontend works as a system, not just as isolated files.  
Read it in order once, then use it as a reference while you code.

---

## 1) High-Level Architecture

### 1.1 What this app is

`@epicure/frontend` is a Next.js App Router app (running in an Nx workspace) that renders a CMS-driven homepage.

- **Rendering model:** mostly React Server Components (RSC)
- **Client interactivity:** isolated to a reusable carousel
- **Data source:** Nest BFF (`/api/homepage`) which itself wraps Strapi content
- **UI strategy:** feature modules + reusable presentational components + SCSS Modules

### 1.2 Folder responsibilities

- `src/app`
  - App Router entry points (`layout.tsx`, `page.tsx`)
  - Global app styles (`global.scss`)
  - Example route handler (`api/hello/route.ts`)
- `src/features/homepage`
  - Homepage domain model/types
  - Homepage data fetching adapter (`get-homepage.ts`)
  - CMS section renderer and section components
- `src/components`
  - Reusable UI building blocks (`SectionWrapper`, cards, carousel, tags)
- `src/lib`
  - Infrastructure helpers (`bff-url.ts`, `strapi-media.ts`)

### 1.3 Layering mental model

Think in 4 layers:

1. **App routing shell** (`src/app`) decides page boundaries.
2. **Feature orchestration** (`features/homepage`) converts CMS schema to UI sections.
3. **Reusable presentation** (`components`) renders UI primitives.
4. **Infra adapters** (`lib`) isolate environment/media concerns.

This layering is good because CMS/backend changes are mostly localized to feature/api/lib files, not every component.

---

## 2) Rendering Flow (Very Important)

## 2.1 What happens when `/` loads

Step-by-step runtime sequence:

1. Browser requests `/`.
2. Next.js executes `src/app/layout.tsx` and `src/app/page.tsx` on the server.
3. `page.tsx` awaits `getHomepage()` (server-side fetch to BFF).
4. `getHomepage()` calls `${base}/api/homepage` with `next: { revalidate: 60 }`.
5. Response JSON is unwrapped from nested envelopes into `HomepageDocument.sections`.
6. `HomepageSections` maps each section and delegates to `renderSection`.
7. `renderSection` picks the correct component by Strapi `__component`.
8. Server renders HTML for all server components.
9. For client islands (`Carousel.client.tsx`), Next sends component payload + JS for hydration.
10. Browser paints server HTML fast, then hydrates carousel behavior (buttons/scroll).

### 2.2 Why this split matters

- **Server Components** handle data and static UI without shipping that logic to browser JS.
- **Client Components** are only used where browser APIs/events are needed.
- Result: smaller client bundle + faster first content render.

### 2.3 Server vs Client in this project

**Server components (default):**
- `src/app/page.tsx`
- Homepage section components
- `SectionWrapper`, `RestaurantCard`, `DishCard`, `TagChip` (all presentational)

**Client component:**
- `src/components/carousel/Carousel.client.tsx` (`'use client'`, uses `useRef`, click handlers, `scrollBy`)

**Server-only module:**
- `src/features/homepage/api/get-homepage.ts` uses `import 'server-only'`

This is a clean architecture: only interactivity crosses the client boundary.

---

## 3) Components Breakdown

## 3.1 `SectionWrapper`

File: `src/components/layout/SectionWrapper/SectionWrapper.tsx`

Purpose:
- Shared section shell (max width, padding, heading, optional footer)
- Enforces consistent section semantics and spacing

Pattern:
- Accepts `title`, `titleId`, `children`, optional `className`
- Applies `aria-labelledby` only when title exists

Why it is useful:
- Keeps section components focused on content
- Avoids duplicating heading/layout logic six times

## 3.2 `RestaurantCard`

File: `src/components/cards/RestaurantCard/RestaurantCard.tsx`

Purpose:
- Presentational card for restaurants (image, name, subtitle, stars)

Notable behavior:
- Rounds rating to 0-5 and renders star glyphs
- Uses `next/image` for optimized image loading

Design tradeoff:
- Stars are visually simple and fast, but no half-star precision.

## 3.3 `DishCard`

File: `src/components/cards/DishCard/DishCard.tsx`

Purpose:
- Presentational dish card (image, name, optional description, optional price)
- Displays a `Popular` badge from `isPopular`

Pattern:
- All fields optional; component fails gracefully with missing CMS fields.

## 3.4 `Carousel`

File: `src/components/carousel/Carousel.client.tsx`

Purpose:
- Reusable horizontal scroller with optional arrows
- Scroll-snap layout via CSS + imperative scroll via ref

How communication works:
- Sections pass children via composition:
  - `RestaurantsSection` composes `RestaurantCard` slides
  - `DishesSection` composes `DishCard` slides
  - `ChefSection` composes `RestaurantCard` slides

Reusability pattern:
- `Carousel` does not know what card type it renders.
- It only manages scrolling and accessibility labels.

---

## 4) Data Layer & API

## 4.1 Frontend -> Backend communication

Main path:
- Frontend server code calls Nest BFF (`/api/homepage`)
- BFF aggregates/forwards Strapi content
- Frontend receives envelope and maps to feature-level types

Files:
- `src/features/homepage/api/get-homepage.ts`
- `src/lib/bff-url.ts`
- `src/features/homepage/model/homepage.types.ts`

## 4.2 Fetching pattern

`getHomepage()`:
- Runs server-side only (`server-only`)
- Uses `fetch(url, { next: { revalidate: 60 } })`
- Throws on non-OK responses
- Extracts `sections` defensively from unknown JSON

Caching mental model:
- `revalidate: 60` means generated data can be reused for up to 60 seconds.
- Great for CMS content that changes occasionally.
- During active debugging/content editing, `cache: 'no-store'` can be easier.

## 4.3 Data shapes

The core union is `HomepageSection` discriminated by `__component`.

This enables:
- Type-safe section routing in `section-registry.tsx`
- Safe component props narrowing per section type

Example concept:
- `'sections.hero'` -> `SectionsHero`
- `'sections.restaurants'` -> `SectionsRestaurants`
- `'sections.dishs'` -> `SectionsDishs` (note Strapi UID spelling)

The code intentionally tolerates partial/null fields, which is practical for CMS-driven content.

---

## 5) State & Logic

## 5.1 Where state lives

- **No global client state library** (Redux/Zustand/etc.) currently used.
- Most “state” is server-fetched content in `page.tsx`.
- Client runtime state is minimal and local to carousel ref.

This is a valid architecture for content-heavy marketing pages.

## 5.2 Server-side vs client-side logic

**Server-side logic**
- Fetching homepage data
- Unwrapping and validating API response shape
- Choosing which section component to render

**Client-side logic**
- Carousel arrow click handlers
- Smooth scrolling interactions

Rule of thumb used here:
- If no browser API/event is needed, keep it server-side.

## 5.3 Derived data examples

- Price label derived in `DishesSection`: `₪${d.price}`
- Hero fallback class derived from missing background image
- Chef restaurants title derived (`Chef's restaurants`) from name

Derived data lives close to where it is rendered, which improves readability.

---

## 6) Lists & Keys (Important)

## 6.1 How lists are rendered

Lists appear in:
- Homepage sections list
- Restaurant, dish, and chef restaurant carousels
- Tags list
- Carousel internal slide wrapping

## 6.2 Why keys matter

React keys let React match old vs new list items efficiently and correctly during reconciliation.
Bad keys can cause UI bugs (wrong item reused, focus issues, stale state).

## 6.3 Current key strategy and risks

Good:
- Most feature lists use `id` with fallback (`name`/`slug`)

Potential issue:
- `HomepageSections` uses `section.id ?? index`
- `Carousel` wraps children with `key={index}`

Index keys are acceptable for static, never-reordered lists, but risky if CMS editors reorder content.

Recommended improvement:
- Prefer stable composite keys when possible (e.g. `${section.__component}:${section.id}` with robust fallback).
- In `Carousel`, prefer preserving child keys rather than re-keying by index.

---

## 7) Styling (CSS / SCSS)

## 7.1 Structure

- Global baseline styles in `src/app/global.scss`
- Feature/component-local styles in `*.module.scss`

Most UI styling is scoped modules (good), but `global.scss` still includes a large chunk of Nx starter/demo selectors not used by current homepage.

## 7.2 Scoping behavior

CSS Modules provide per-file scoped class names, reducing accidental collisions.

Examples:
- `HeroSection.module.scss`
- `Carousel.module.scss`
- `DishCard.module.scss`

## 7.3 Naming conventions

Observed convention:
- semantic class names (`.layout`, `.copy`, `.cardItem`, `.mediaImg`)
- small, local utility classes (`.visuallyHidden`)

This keeps styles understandable without BEM verbosity.

## 7.4 Layout techniques used

- **Flexbox**: row/column layouts (`AboutSection`, `ChefSection`, carousel track)
- **Responsive media queries**: breakpoints at 640/768/1100
- **`clamp()`**: fluid typography and hero height
- **`scroll-snap`**: smooth carousel UX

---

## 8) HTML & Semantics

## 8.1 Semantic structure

Good usage:
- `<main>` for page content
- `<section>` for content blocks
- `<h1>` for hero title and `<h2>` for section titles
- `<article>` for card-like content units
- `<ul>/<li>` for tags list

This provides a sensible document outline.

## 8.2 Accessibility patterns present

Good:
- `html lang="en"`
- `aria-labelledby` on titled sections
- carousel region labels (`role="region"`, `aria-roledescription="carousel"`)
- descriptive arrow button labels
- star rating has `aria-label`

Potential improvements:
- Some decorative images use empty `alt` correctly, but content images should ensure meaningful `alt` when image conveys content.
- Search placeholder in hero is a fake input (`span`), so it is not keyboard/search functional yet.

---

## 9) Patterns & Best Practices

## 9.1 Strong patterns already in place

1. **Feature-local types + API adapter**
   - Keeps CMS coupling inside homepage feature.
2. **Discriminated union + section registry**
   - Scales cleanly as CMS blocks grow.
3. **Client island isolation**
   - Interactivity scoped to one component.
4. **Defensive null-safe rendering**
   - CMS variance doesn’t crash UI.
5. **Reusable presentational components**
   - Cards and wrappers are composable and easy to test.

## 9.2 Potential anti-patterns / improvement points

1. **Index-based keys in dynamic lists**
   - Risky for reorderable CMS content.
2. **Large leftover global stylesheet**
   - Increases cognitive load; remove unused Nx starter CSS.
3. **Stringly typed media fields (`unknown`)**
   - Consider typed parse/normalize layer before render.
4. **No explicit loading/error UI on homepage**
   - Server error currently throws; user-facing fallback could be improved.
5. **Minimal test coverage**
   - Existing spec is not aligned with async Server Component data flow.

---

## 10) Learning Notes (For Junior -> Senior Growth)

### 10.1 Why this architecture is good for CMS pages

When content changes frequently and interactions are limited:
- Server Components reduce client JS and simplify data loading.
- CMS sections map naturally to typed section components.
- Shared wrappers keep visual consistency and reduce drift.

### 10.2 Tradeoffs to understand

- **Pro:** Server-first rendering boosts initial performance.
- **Con:** More logic runs on server, so debugging can feel less “browser-centric.”

- **Pro:** Flexible `unknown` + null-safe rendering survives backend shape changes.
- **Con:** Too much looseness can hide integration bugs; typed normalization helps.

- **Pro:** Carousel as a client island keeps bundles small.
- **Con:** Cross-island interaction patterns become important if app gets more interactive.

### 10.3 Senior mental model

Use this progression:
1. **Boundary first:** where data crosses (BFF -> frontend feature)
2. **Composition second:** how reusable UI pieces assemble
3. **Runtime third:** what executes on server vs client
4. **Failure modes fourth:** what happens on missing fields, API errors, reorder, caching

If you can explain those four layers, you understand the system deeply.

---

## Helpful Snippets

### Server page entrypoint

```tsx
import { getHomepage } from '@/features/homepage/api/get-homepage';
import { HomepageSections } from '@/features/homepage/sections/HomepageSections';

export default async function Index() {
  const homepage = await getHomepage();
  return <HomepageSections sections={homepage.sections} />;
}
```

### Typed dynamic section dispatch

```tsx
switch (section.__component) {
  case 'sections.hero':
    return <HeroSection key={key} {...section} />;
  case 'sections.restaurants':
    return <RestaurantsSection key={key} {...section} />;
  // ...
}
```

### Client-only carousel boundary

```tsx
'use client';

const trackRef = useRef<HTMLDivElement | null>(null);
const scrollByPage = (direction: -1 | 1) => {
  const track = trackRef.current;
  if (!track) return;
  track.scrollBy({ left: amount, behavior: 'smooth' });
};
```

---

## Key Takeaways

- This frontend is intentionally **server-first** with a narrow client interactivity island.
- Homepage rendering is **CMS dynamic-zone driven**, mapped through a type-safe registry.
- UI architecture separates **feature orchestration** from **reusable presentational components**.
- Data integration is defensive and practical, with ISR-style caching (`revalidate: 60`).
- Main next steps for maturity: stronger key stability, reduced global CSS noise, and better tests/error states.

## Things to Improve

- Replace index-based keys where list ordering can change.
- Add structured error and loading UX for homepage fetch failures.
- Trim unused selectors from `global.scss` (legacy Nx starter CSS).
- Introduce a typed normalization layer for Strapi media/entities before rendering.
- Add integration tests around `getHomepage()` and section rendering permutations.

## Questions to Think About

- If editors reorder sections daily, are your keys and cache settings still safe?
- Where should schema validation live: BFF, frontend adapter, or both?
- At what point does this app need client-side state orchestration beyond local refs?
- How would you add interactive search to hero without bloating client bundle size?
- If a new CMS section is introduced, what exact files need updates and why?

