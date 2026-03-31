/**
 * TypeScript models for the homepage dynamic zone, kept local to the feature (MVP).
 *
 * Source of truth for **which** components exist is `apps/cms/src/api/homepage/content-types/homepage/schema.json`.
 * Field shapes follow Strapi 5 REST JSON as returned by the BFF (flat component fields on each block,
 * not the older `attributes` wrapper). Adjust when the CMS schema or populate depth changes.
 */

import type { Chef, Dish, Restaurant, Tag } from '@epicure/domain';
import type { StrapiBlockDto } from '@epicure/strapi-dto';

/** Every dynamic-zone entry includes Strapi’s component UID and a component instance id. */
type SectionBase = {
  id?: number;
  __component: string;
};

/** `sections.hero` — see `apps/cms/src/components/sections/hero.json`. */
export type SectionsHero = SectionBase & {
  __component: 'sections.hero';
  title?: string | null;
  searchPlaceholder?: string | null;
  backgroundImage?: unknown;
};

/** `sections.restaurants` — populated `restaurants` relation. */
export type SectionsRestaurants = SectionBase & {
  __component: 'sections.restaurants';
  title?: string | null;
  restaurants?: Restaurant[] | null;
};

/** `sections.dishs` (Strapi UID spelling) — populated `dishes` relation. */
export type SectionsDishs = SectionBase & {
  __component: 'sections.dishs';
  title?: string | null;
  dishes?: Dish[] | null;
};

/** `sections.tags` — populated `tags` relation. */
export type SectionsTags = SectionBase & {
  __component: 'sections.tags';
  title?: string | null;
  tags?: Tag[] | null;
};

/** `sections.chef` — populated one-to-one `chef` (may include nested `restaurants`). */
export type SectionsChef = SectionBase & {
  __component: 'sections.chef';
  title?: string | null;
  chef?: Chef | null;
};

/** `sections.about` — `description` is Strapi blocks. */
export type SectionsAbout = SectionBase & {
  __component: 'sections.about';
  title?: string | null;
  description?: StrapiBlockDto[] | null;
};

/** Discriminated union on `__component` for the homepage dynamic zone renderer. */
export type HomepageSection =
  | SectionsHero
  | SectionsRestaurants
  | SectionsDishs
  | SectionsTags
  | SectionsChef
  | SectionsAbout;

/** Payload consumed by the homepage UI after `getHomepage()` unwraps the API response. */
export type HomepageDocument = {
  sections: HomepageSection[];
};
