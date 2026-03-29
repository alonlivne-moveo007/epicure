# Cards & Layout — Mobile vs Desktop Reference

A complete reference for all card components, when and how they are used,
and how every layout dimension changes between mobile and desktop.

---

## Breakpoints

| Name | Value | Applies to |
|------|-------|-----------|
| `bp.$lg` | **1024px** | Section padding, nav height, card ratings, ChefCard overlay, ChefSection body direction, `SectionWrapper` padding |
| *(unnamed)* | **768px** | Global typography scale (h1–h3, body) |
| `bp.$xl` | **1100px** | Defined but not yet used in card/section files |

All breakpoints are **mobile-first** (`min-width`). The base styles target mobile;
everything above the threshold is the desktop override.

---

## Global Typography Scale

Typography is the single source of truth in `global.scss`. Cards do **not** re-declare
`font-size` on their own — they rely on `h3`, `.body`, etc.

| Class / Element | Mobile | Desktop (≥ 768px) |
|-----------------|--------|-------------------|
| `h1` | 1.5rem / 24px | 2rem / 32px |
| `h2` | 1rem / 16px | 1.875rem / 30px |
| `h3` | 1.125rem / 18px | 2.5rem / 40px |
| `.body` | 1rem / 16px | 1.5rem / 24px |
| `.button-text` | 1rem / 16px | 1rem / 16px (same) |

> **Impact on cards:** Every card `name` is an `<h3>`. On mobile the name renders at
> **18px**; on desktop at **40px**. This is the biggest visual jump across all cards
> without any card-specific override.

---

## Layout System

### Container & Section padding

| Token | Value |
|-------|-------|
| `--container-max-width` | 1440px |
| `--container-padding-mobile` | 20px (sides) |
| `--container-padding-desktop` | 128px (sides) |
| `--section-padding-top` | 40px |
| `--grid-gap` | 24px |

`SectionWrapper` automatically switches between the mobile and desktop horizontal
padding at **1024px**.

### How cards are arranged in sections

All three homepage sections place cards inside an **Embla carousel**, not a CSS grid.

```
SectionWrapper
  └─ Carousel                ← Embla horizontal flex container
       └─ .track             ← display: flex; gap: 1.5rem; (Carousel.module.scss)
            └─ .slide        ← flex: 0 0 auto (card keeps its own fixed width)
                 └─ CardComponent
```

Because cards have fixed pixel widths, the carousel simply clips overflow and lets
the user swipe/scroll horizontally on both mobile and desktop.
There is **no responsive CSS grid** for cards on the homepage.
The design-page (`/design`) uses `auto-fill minmax()` grids for the showcase only.

### Navigation height

| | Mobile | Desktop (≥ 1024px) |
|--|--------|---------------------|
| Nav height | 46px | 64px |

---

## RestaurantCard Props

| Prop | Values | Default | Controls |
|------|--------|---------|----------|
| `variant` | `"full"` \| `"mini"` | `"full"` | Width / content density |

No `size` prop. The card responds to screen width automatically via CSS media queries.

---

## Card Reference

---

### 1. RestaurantCard — `variant="full"` (default)

Used in: **RestaurantsSection** (homepage "Popular restaurants" carousel)

```
RestaurantCard (full)
├── .thumb          image
└── .body
    ├── <h3>        name
    ├── <p>         subtitle (chef name or description)
    └── <p>         rating stars ★★★★☆  ← hidden on mobile via CSS
```

| Property | Mobile (< 1024px) | Desktop (≥ 1024px) |
|----------|-------------------|---------------------|
| Card width | **334px** | **379px** |
| Image aspect ratio | 334 / 207 | 379 / 236 |
| Body height | **81px** | auto |
| Body padding | **16px** | 24px 0.75rem |
| Body gap | **10px** | 8px |
| Body alignment | **Left** | Center |
| Name font (h3) | 18px (global) | 40px (global) |
| Subtitle (.body) | 16px — visible | 24px — visible |
| Rating stars | Hidden | Visible |
| Background | `--color-cream` | `--color-cream` |

---

### 2. RestaurantCard — `variant="mini"`

Used in: **ChefSection** — the restaurant carousel below the chef's bio.

```
RestaurantCard (mini)
├── .thumb          image
└── .body
    ├── <h3>        name
    └── <p>         subtitle  ← visible on mobile, hidden on desktop
```

| Property | Mobile (< 1024px) | Desktop (≥ 1024px) |
|----------|-------------------|---------------------|
| Card width | **245px** | **231px** |
| Card height | auto | **357px** |
| Image aspect ratio | 245 / 151.8 | 231 / 224 |
| Body height | **81px** | auto |
| Body padding | **16px** | 20px 0.5rem 0 |
| Body gap | **10px** | 8px |
| Body alignment | **Left** | Center |
| Name font | 1rem (overridden) | 1.5rem (overridden) |
| Subtitle | Visible | **Hidden via CSS** |
| Rating | Never rendered | Never rendered |

> **Why mini exists:** The ChefSection needs a compact, square-ish restaurant card
> to fit inside the chef's restaurant strip. It overrides the global `h3` size with
> a card-level rule (`font-size: var(--font-size-button)`) to prevent the large
> desktop name from overflowing the narrow card.

---

### 3. DishCard

Used in: **DishesSection** (homepage "Signature dishes" carousel)

```
DishCard
├── .thumb          image — fixed height 306px
└── .body
    ├── <h3>        name
    ├── <p>         description
    ├── .tagRow     diet/allergy tag icons (40×40 px each)
    └── .priceRow   — priceLine — ILS icon + amount — priceLine —
```

| Property | Mobile | Desktop (≥ 1024px) |
|----------|--------|---------------------|
| Card width | **380px** (fixed) | **380px** (fixed) |
| Card height | **654px** (fixed) | **654px** (fixed) |
| Image height | **306px** (fixed) | **306px** (fixed) |
| Name font (h3) | 18px | 40px |
| Description font (.body) | 16px | 24px |
| Price layout | Two gray lines flanking ILS + amount (desktop Figma style) | Same |
| Responsive overrides | None | None |

**Key difference:** `DishCard.module.scss` has **zero `@media` rules**. The card
dimensions are completely fixed at all viewport widths. Only typography grows
(through the global `h3` and `.body` breakpoint at 768px).

> **Note:** The JSX comment says "Mobile price: left-aligned ILS icon + amount, no
> lines." This mobile-specific price layout **has not been implemented** in CSS.
> The price row always uses the desktop two-line layout.

---

### 4. ChefCard

Used in: **ChefSection** — featured chef image with name overlay.
(One card per page, not in a carousel.)

```
ChefCard
├── <Image fill>    full-bleed photo
└── .overlay        bottom strip (semi-transparent white)
    └── <p>         chef name (`.body` class)
```

| Property | Mobile | Desktop (≥ 1024px) |
|----------|--------|---------------------|
| Card width | Fluid (inherits `.cardWrap` width) | `min(40%, 433px)` — capped at Figma card width |
| Aspect ratio | **433 / 338** (always) | **433 / 338** (always) |
| Image sizes hint | `(max-width: 768px) 90vw` | `433px` |
| Overlay padding | `0.9rem 1rem` | `1.25rem 1rem` |
| Name font (.body) | 16px | 24px |
| Card position | Full width, stacked above bio | Left column (~40%), bio to the right |

**ChefSection body layout** (where ChefCard lives):

| | Mobile | Desktop (≥ 1024px) |
|--|--------|---------------------|
| Direction | `flex-direction: column` — card above bio | `flex-direction: row` — card left, bio right |
| Gap | `1.5rem` | `4rem` (64px — matches Figma) |

ChefCard is the **only card that is fluid / responsive in width**. The other three
have fixed pixel widths because they always live in a carousel where width is driven
by the card itself.

---

## Side-by-Side Comparison

### RestaurantCard — responsive behavior per variant

| | `variant="full"` | `variant="mini"` |
|--|-----------------|-----------------|
| **CSS classes** | `.card` | `.card .cardMini` |
| **Width — mobile** | 334px | 245px |
| **Width — desktop** | 379px | 231px |
| **Height — mobile** | auto | auto |
| **Height — desktop** | auto | 357px |
| **Image ratio — mobile** | 334/207 | 245/151.8 |
| **Image ratio — desktop** | 379/236 | 231/224 |
| **Body height — mobile** | 81px | 81px |
| **Body padding — mobile** | 16px | 16px |
| **Body padding — desktop** | 24px 0.75rem | 20px 0.5rem 0 |
| **Body gap — mobile** | 10px | 10px |
| **Body gap — desktop** | 8px | 8px |
| **Alignment — mobile** | Left | Left |
| **Alignment — desktop** | Center | Center |
| **Name font — mobile** | 18px (h3 global) | 1rem (overridden) |
| **Name font — desktop** | 40px (h3 global) | 1.5rem (overridden) |
| **Subtitle — mobile** | Visible | Visible |
| **Subtitle — desktop** | Visible | **Hidden via CSS** |
| **Rating — mobile** | Hidden via CSS | Never rendered |
| **Rating — desktop** | Visible | Never rendered |

### All card types

| | RestaurantCard full | RestaurantCard mini | DishCard | ChefCard |
|--|---------------------|---------------------|----------|----------|
| **Width** | 334px→379px | 245px→231px | 380px (fixed) | Fluid (≤433px) |
| **Subtitle** | ✅ always | Mobile only | ✅ | ✗ |
| **Rating** | Desktop only | ✗ | ✗ | ✗ |
| **Price** | ✗ | ✗ | ✅ | ✗ |
| **Tags** | ✗ | ✗ | ✅ | ✗ |
| **Layout context** | Carousel | Carousel (chef strip) | Carousel | Stand-alone |

---

## When to Use Which Card

| Use case | Props |
|----------|-------|
| Restaurant listing (homepage / search) | `<RestaurantCard variant="full" />` |
| Chef's associated restaurants (compact strip) | `<RestaurantCard variant="mini" />` |
| Listing dishes | `<DishCard />` |
| Featuring a single chef with photo | `<ChefCard />` |

### Notes

- Both RestaurantCard variants use **fixed pixel widths** that change at the 1024px
  breakpoint. The carousel clips and the user swipes to see more.
- Mobile layout is **left-aligned** for both variants; desktop is **center-aligned**.
- `ChefCard` is the only card that is fluid in width — it lives outside a carousel.
- Never use `variant="mini"` as the primary restaurant listing card — it hides
  subtitle on desktop and never shows a rating. Reserve it for the chef's strip.

---

## File Map

```
apps/frontend/src/
├── app/
│   ├── global.scss                          ← tokens, typography classes
│   └── styles/
│       ├── _breakpoints.scss                ← $lg: 1024px, $xl: 1100px
│       └── _mixins.scss
├── components/
│   ├── cards/
│   │   ├── RestaurantCard/
│   │   │   ├── RestaurantCard.tsx
│   │   │   └── RestaurantCard.module.scss
│   │   ├── DishCard/
│   │   │   ├── DishCard.tsx
│   │   │   └── DishCard.module.scss
│   │   └── ChefCard/
│   │       ├── ChefCard.tsx
│   │       └── ChefCard.module.scss
│   ├── carousel/
│   │   ├── Carousel.client.tsx
│   │   └── Carousel.module.scss
│   └── layout/
│       └── SectionWrapper/
│           ├── SectionWrapper.tsx
│           └── SectionWrapper.module.scss
└── features/
    └── homepage/
        └── sections/
            ├── RestaurantsSection.tsx        ← uses RestaurantCard (full) in Carousel
            ├── DishesSection.tsx             ← uses DishCard in Carousel
            └── ChefSection.tsx              ← uses ChefCard + RestaurantCard (mini) in Carousel
```
