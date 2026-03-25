# Epicure — Design Guide

> Values extracted strictly from Figma property panels and canvas annotations.
> Nothing is inferred or proposed. If a value was not visible in the screenshots, it is marked **NOT DEFINED IN FIGMA**.

---

## 1. Typography

**Font family:** `Helvetica Neue`
_Source: All text layer specs on the "03 DESKTOP TYPOGRAPHY" and "03 MOBILE TYPOGRAPHY" pages._

`line-height` and `letter-spacing` are **NOT DEFINED IN FIGMA** — not shown in any visible property panel.

### Desktop

| Element    | Weight  | CSS `font-weight` | Size  | Color     |
|------------|---------|-------------------|-------|-----------|
| H1         | Thin    | 100               | 32px  | `#000000` |
| H2         | Thin    | 100               | 30px  | `#000000` |
| H3         | Regular | 400               | 40px  | `#000000` |
| Body Text  | Thin    | 100               | 24px  | `#000000` |
| Button     | Thin    | 100               | 16px  | `#FFFFFF` (on dark bg) |
| Input Text | Thin    | 100               | 16px  | `#000000` |
| Label Text | Thin    | 100               | 14px  | `#979797` |

_Source: "03 DESKTOP TYPOGRAPHY" page — layer spec panel (font name, weight, size, color visible for each row)._

### Mobile

| Element    | Weight  | CSS `font-weight` | Size  | Color     |
|------------|---------|-------------------|-------|-----------|
| H1         | Thin    | 100               | 24px  | `#000000` |
| H2         | Thin    | 100               | 16px  | `#000000` |
| H3         | Regular | 400               | 18px  | `#000000` |
| Body Text  | Thin    | 100               | 16px  | `#000000` |
| Button     | Thin    | 100               | 16px  | `#FFFFFF` (on dark bg) |
| Input Text | Thin    | 100               | 16px  | `#000000` |
| Label Text | Thin    | 100               | 14px  | `#979797` |

_Source: "03 MOBILE TYPOGRAPHY" page — same spec format._

### Note: H3 > H1

**Yes, H3 (40px desktop / 18px mobile) is larger than H1 (32px / 24px).** This is confirmed directly from the Figma spec page — the rows are labeled H1, H2, H3 in order with those values.

---

## 2. Colors

_Source: "04 COLORS" page — color swatches with explicit hex labels._

### Primary Colors

| Value      | Label in Figma   |
|------------|------------------|
| `#000000`  | PRIMARY COLOR    |
| `#979797`  | PRIMARY COLOR    |

### Secondary Colors

| Value      | Label in Figma   |
|------------|------------------|
| `#F9F4EA`  | SECONDARY COLOR  |
| `#E19D1A`  | SECONDARY COLOR  |
| `#FAFAFA`  | SECONDARY COLOR  |

### Cross-reference with other pages

| Value      | Also appears in                                                          |
|------------|--------------------------------------------------------------------------|
| `#000000`  | H1, H2, H3, Body, Input text — "03 DESKTOP/MOBILE TYPOGRAPHY"           |
| `#979797`  | Label Text color; Frame 65 (navbar) background — "02 LAYOUT", "03 TYPOGRAPHY" |
| `#FAFAFA`  | Rectangle 57 and Group 77 background — "02 LAYOUT"                      |
| `#FFFFFF`  | Button text — "03 DESKTOP/MOBILE TYPOGRAPHY" (not listed on Colors page) |

---

## 3. Layout & Grid

### Desktop — "01 GRID" page (grid system)

| Property             | Value             | Source         |
|----------------------|-------------------|----------------|
| Container max-width  | 1440px            | "01 GRID" page |
| Side padding (L & R) | 128px             | "01 GRID" page |
| Columns              | 12                | "01 GRID" page |
| Gutter (gap)         | 24px              | "01 GRID" page |
| Column template      | `repeat(12, 1fr)` | "01 GRID" page |
| Column height        | 900px             | "01 GRID" page |

### Desktop — "02 LAYOUT" page (spacing & behavior)

| Property                    | Value  | Source          |
|-----------------------------|--------|-----------------|
| Container max-width         | 1440px | "02 LAYOUT" page |
| Side padding (L & R)        | 128px  | "02 LAYOUT" page |
| Section top padding         | 40px   | "02 LAYOUT" page — canvas annotation |
| Hero / top section          | Full width (no side padding) | "02 LAYOUT" page |
| Content sections            | Constrained inside container | "02 LAYOUT" page |
| Grid                        | 12 columns, 24px gap (from grid system) | "02 LAYOUT" page |

### Mobile — "01 GRID" page (grid system)

| Property             | Value            | Source         |
|----------------------|------------------|----------------|
| Screen width         | 375px            | "01 GRID" page |
| Side padding (L & R) | 20px             | "01 GRID" page |
| Columns              | 4                | "01 GRID" page |
| Gutter (gap)         | 24px             | "01 GRID" page |
| Column template      | `repeat(4, 1fr)` | "01 GRID" page |

### Mobile — "02 LAYOUT" page (spacing & behavior)

| Property                         | Value  | Source           |
|----------------------------------|--------|------------------|
| Screen width                     | 375px  | "02 LAYOUT" page |
| Side padding (L & R)             | 20px   | "02 LAYOUT" page |
| Spacing — between heading and content | 16px | "02 LAYOUT" page — canvas annotation |
| Spacing — between sections       | 48px   | "02 LAYOUT" page — canvas annotation |
| Gap between grid items           | 24px   | "02 LAYOUT" page — canvas annotation |
| Hero / top section               | Full width (no side padding) | "02 LAYOUT" page |
| Content sections                 | Constrained with 20px side padding | "02 LAYOUT" page |

---

## 4. Navigation

_Source: "09 NAVIGATION" page — "TOP MENU" section._

### Desktop (1440px)

| Property   | Value                        | Source                  |
|------------|------------------------------|-------------------------|
| Height     | 64px                         | "09 NAVIGATION" page    |
| Display    | flex                         | "09 NAVIGATION" page    |
| Justify    | space-between                | "09 NAVIGATION" page    |
| Align      | center                       | "09 NAVIGATION" page    |
| Padding    | 0 128px                      | "09 NAVIGATION" page    |
| Background | `#FFFFFF`                    | Confirmed from browser screenshot — overrides Frame 65 Figma panel value of `#979797` |
| Position   | Fixed                        | "02 LAYOUT" Frame 65 — Interactions panel |

**Structure (left → right):**
- Left: logo (fork icon + "EPICURE" wordmark)
- Center: navigation links (Restaurants, Chefs)
- Right: icons (search, user, cart)

### Mobile (iPhone X)

| Property   | Value         | Source               |
|------------|---------------|----------------------|
| Height     | 46px          | "09 NAVIGATION" page |
| Display    | flex          | "09 NAVIGATION" page |
| Justify    | space-between | "09 NAVIGATION" page |
| Align      | center        | "09 NAVIGATION" page |
| Padding    | 0 20px        | "09 NAVIGATION" page |

**Structure (left → right):**
- Left: hamburger menu icon
- Center: logo
- Right: icons (search, user, cart with badge)

---

## 5. Footer

_Source: "09 NAVIGATION" page — "FOOTER WEBSITE" and "FOOTER MOBILE" sections._

### Desktop

| Property | Value                                   | Source               |
|----------|-----------------------------------------|----------------------|
| Display  | flex (row)                              | "09 NAVIGATION" page |
| Justify  | center                                  | "09 NAVIGATION" page |
| Gap      | NOT DEFINED IN FIGMA                    | Not shown in panel   |
| Items    | Contact Us, Term of Use, Privacy Policy | "09 NAVIGATION" page |

### Mobile

| Property | Value                                   | Source               |
|----------|-----------------------------------------|----------------------|
| Display  | flex (column)                           | "09 NAVIGATION" page |
| Align    | flex-start                              | "09 NAVIGATION" page |
| Gap      | NOT DEFINED IN FIGMA                    | Not shown in panel   |
| Items    | Contact Us, Term of Use, Privacy Policy | "09 NAVIGATION" page |

---

## 6. Button

_Source: "05 BUTTONS" page — PRIMARY BUTTON, SECONDARY BUTTON, TEXT BUTTON, BUTTON ANATOMY sections._

### Shared

| Property       | Value                | Source                                           |
|----------------|----------------------|--------------------------------------------------|
| Font           | Helvetica Neue       | "03 DESKTOP TYPOGRAPHY" — Button row             |
| Weight         | Thin (100)           | "03 DESKTOP TYPOGRAPHY" — Button row             |
| Font size      | 16px                 | "03 DESKTOP TYPOGRAPHY" — Button row             |
| Text casing    | Uppercase            | "05 BUTTONS" — all button labels shown uppercase |
| Height         | 48px                 | "05 BUTTONS" — BUTTON ANATOMY annotation         |
| Width          | Hug (fit content)    | "05 BUTTONS" — BUTTON ANATOMY size label         |

### Primary Button

| Property   | Value     | Source                                      |
|------------|-----------|---------------------------------------------|
| Background | `#000000` | "05 BUTTONS" — PRIMARY BUTTON visual        |
| Text color | `#FFFFFF` | "03 DESKTOP TYPOGRAPHY" — Button row Colors |
| Border     | none      | "05 BUTTONS" — PRIMARY BUTTON visual        |

### Secondary Button

| Property     | Value                | Source                                              |
|--------------|----------------------|-----------------------------------------------------|
| Background   | transparent          | "05 BUTTONS" — SECONDARY BUTTON visual              |
| Text color   | `#000000`            | "05 BUTTONS" — SECONDARY BUTTON visual              |
| Border color | `#000000` (visual)   | "05 BUTTONS" — SECONDARY BUTTON visual              |

### Text Button

| Property | Value                          | Source                              |
|----------|--------------------------------|-------------------------------------|
| Style    | Text only, no background or border | "05 BUTTONS" — TEXT BUTTON section |
| Label    | e.g. "All Restaurants >>"     | "05 BUTTONS" — TEXT BUTTON visual   |

---

## 7. Form Fields

_Source: "06 Fields" page — TEXT INPUT and SPEC sections._

### Text Input — Dimensions

| Property                                    | Value                          | Source                        |
|---------------------------------------------|--------------------------------|-------------------------------|
| Height — inactive (placeholder only)        | 16px                           | "06 Fields" — SPEC annotation |
| Height — activated (floating label + value) | 52px                           | "06 Fields" — SPEC annotation |
| Gap between stacked fields                  | 24px                           | "06 Fields" — SPEC annotation |
| Border style                                | Bottom border only (underline) | "06 Fields" — all state visuals |


---

## 8. Open Items — Requires Additional Figma Inspection

- [ ] Button border-radius — inspect button component frame
- [ ] Button letter-spacing — not shown in any panel
- [ ] Secondary button border width — not shown in panel
- [ ] Text button font size (web and mobile) — not shown in panel
- [ ] Hero section — no screenshot of the actual hero design frame provided
- [ ] Footer gap values — not visible in property panel
- [ ] Mobile navbar background color — not confirmed from a panel
- [ ] Form field state colors (border, background, error text) — not shown in any panel
