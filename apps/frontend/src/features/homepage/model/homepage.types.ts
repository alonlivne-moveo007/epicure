/**
 * TypeScript models for the homepage dynamic zone, kept local to the feature (MVP).
 *
 * Source of truth for **which** components exist is `apps/cms/src/api/homepage/content-types/homepage/schema.json`.
 * Field shapes follow Strapi 5 REST JSON as returned by the BFF (flat component fields on each block,
 * not the older `attributes` wrapper). Adjust when the CMS schema or populate depth changes.
 */

/** Strapi `blocks` field on `sections.about` — enough structure to render paragraph text. */
export type StrapiBlockChild = {
  type?: string;
  text?: string;
  children?: StrapiBlockChild[];
};

export type StrapiBlock = {
  type?: string;
  children?: StrapiBlockChild[];
};

/** Chef entity when populated from `sections.chef` or nested under restaurants. */
export type StrapiChef = {
  id?: number;
  name?: string;
  bio?: string | null;
  image?: unknown;
  restaurants?: unknown[];
};

/** Restaurant row as populated for `sections.restaurants` (and nested under chef). */
export type StrapiRestaurant = {
  id?: number;
  name?: string;
  description?: string | null;
  rating?: number | null;
  image?: unknown;
  chef?: { name?: string } | null;
};

/** Dish row as populated for `sections.dishs`. */
export type StrapiDish = {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number | null;
  isPopular?: boolean | null;
  image?: unknown;
};

/** Tag row as populated for `sections.tags`. */
export type StrapiTag = {
  id?: number;
  name?: string;
  slug?: string | null;
  image?: unknown;
};

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
  restaurants?: StrapiRestaurant[] | null;
};

/** `sections.dishs` (Strapi UID spelling) — populated `dishes` relation. */
export type SectionsDishs = SectionBase & {
  __component: 'sections.dishs';
  title?: string | null;
  dishes?: StrapiDish[] | null;
};

/** `sections.tags` — populated `tags` relation. */
export type SectionsTags = SectionBase & {
  __component: 'sections.tags';
  title?: string | null;
  tags?: StrapiTag[] | null;
};

/** `sections.chef` — populated one-to-one `chef` (may include nested `restaurants`). */
export type SectionsChef = SectionBase & {
  __component: 'sections.chef';
  title?: string | null;
  chef?: StrapiChef | null;
};

/** `sections.about` — `description` is Strapi blocks; `image` may be multiple in the schema. */
export type SectionsAbout = SectionBase & {
  __component: 'sections.about';
  title?: string | null;
  description?: StrapiBlock[] | null;
  image?: unknown;
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
