/**
 * Maps Strapi dynamic-zone `__component` UIDs to React section components.
 *
 * Implemented as a `switch` so TypeScript narrows each `HomepageSection` variant when spreading
 * props into the matching component (an object registry + single `C` type led to unusable prop
 * intersections).
 *
 * When Strapi adds a new homepage block: extend `HomepageSection` in `homepage.types.ts`, add a
 * section component, and add a `case` here. Unknown UIDs log a dev warning and render nothing.
 */

import type { HomepageSection } from '@/features/homepage/model/homepage.types';

import { AboutSection } from './AboutSection';
import { ChefSection } from './ChefSection';
import { DishesSection } from './DishesSection';
import { HeroSection } from './HeroSection';
import { RestaurantsSection } from './RestaurantsSection';
import { TagsSection } from './TagsSection';

/** Safe fallback when CMS ships a new component before the frontend registry is updated. */
function UnknownSection(props: { uid: string }) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Unknown homepage section: ${props.uid}`);
  }
  return null;
}

/** Renders one dynamic-zone block; `key` uses Strapi component `id` when present. */
export function renderSection(section: HomepageSection, index: number) {
  const key = section.id ?? index;

  switch (section.__component) {
    case 'sections.hero':
      return <HeroSection key={key} {...section} />;
    case 'sections.restaurants':
      return <RestaurantsSection key={key} {...section} />;
    case 'sections.dishs':
      return <DishesSection key={key} {...section} />;
    case 'sections.tags':
      return <TagsSection key={key} {...section} />;
    case 'sections.chef':
      return <ChefSection key={key} {...section} />;
    case 'sections.about':
      return <AboutSection key={key} {...section} />;
    default:
      return (
        <UnknownSection key={key} uid={(section as { __component: string }).__component} />
      );
  }
}
