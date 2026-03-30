/**
 * Server-only fetch for the marketing homepage against the Nest BFF.
 *
 * Contract (aligned with `apps/backend/src/controllers/homepage.controller.ts`):
 * - Request: `GET {bffBaseUrl}/api/homepage` (optional query params are forwarded to Strapi by Nest).
 * - Response envelope: `{ data: <Strapi REST body> }` via `@epicure/backend-types` `ApiResponse`.
 *
 * Strapi’s single-type REST response nests the entity again under `data`, so the dynamic zone
 * array is at `json.data.data.sections`. Default `populate` for zone components is merged in
 * `apps/backend/src/services/homepage.service.ts`.
 *
 * Uses `next: { revalidate: 60 }` for ISR-style caching; switch to `cache: 'no-store'` while
 * debugging CMS content freshness.
 */

import 'server-only';

import type { ApiResponse } from '@epicure/backend-types';
import type { Restaurant, Tag, Dish, Chef } from '@epicure/domain';
import type {
  StrapiBlockDto,
  StrapiChefDto,
  StrapiDishDto,
  StrapiRestaurantDto,
  StrapiTagDto,
} from '@epicure/strapi-dto';
import { mapToChef, mapToDishes, mapToRestaurants, mapToTags } from '@epicure/mappers';

import { getBffBaseUrl } from '@/lib/bff-url';
import type {
  HomepageDocument,
  HomepageSection,
} from '@/features/homepage/model/homepage.types';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/** Walks BFF + Strapi wrappers and returns the homepage `sections` dynamic zone (or `[]`). */
type HomepageSectionDto =
  | {
      id?: number;
      __component: 'sections.hero';
      title?: string | null;
      searchPlaceholder?: string | null;
      backgroundImage?: unknown;
    }
  | {
      id?: number;
      __component: 'sections.restaurants';
      title?: string | null;
      restaurants?: StrapiRestaurantDto[] | null;
    }
  | {
      id?: number;
      __component: 'sections.dishs';
      title?: string | null;
      dishes?: StrapiDishDto[] | null;
    }
  | {
      id?: number;
      __component: 'sections.tags';
      title?: string | null;
      tags?: StrapiTagDto[] | null;
    }
  | {
      id?: number;
      __component: 'sections.chef';
      title?: string | null;
      chef?: StrapiChefDto | null;
    }
  | {
      id?: number;
      __component: 'sections.about';
      title?: string | null;
      description?: StrapiBlockDto[] | null;
    };

function mapSection(dto: HomepageSectionDto): HomepageSection | null {
  switch (dto.__component) {
    case 'sections.hero':
    case 'sections.about':
      return dto as unknown as HomepageSection;
    case 'sections.restaurants': {
      const restaurants: Restaurant[] | null = dto.restaurants ? mapToRestaurants(dto.restaurants) : null;
      return { ...dto, restaurants };
    }
    case 'sections.dishs': {
      const dishes: Dish[] | null = dto.dishes ? mapToDishes(dto.dishes) : null;
      return { ...dto, dishes };
    }
    case 'sections.tags': {
      const tags: Tag[] | null = dto.tags ? mapToTags(dto.tags) : null;
      return { ...dto, tags };
    }
    case 'sections.chef': {
      const chef: Chef | null = dto.chef ? mapToChef(dto.chef) : null;
      return { ...dto, chef };
    }
    default:
      return null;
  }
}

function extractSections(body: unknown): HomepageSection[] {
  if (!isRecord(body)) return [];
  const inner = body['data'];
  if (!isRecord(inner)) return [];
  const entity = inner['data'];
  if (!isRecord(entity)) return [];
  const raw = entity['sections'];
  if (!Array.isArray(raw)) return [];
  return (raw as HomepageSectionDto[]).map(mapSection).filter((s): s is HomepageSection => s != null);
}

/** Loads homepage sections from the BFF; throws if the HTTP status is not OK. */
export async function getHomepage(): Promise<HomepageDocument> {
  const base = getBffBaseUrl().replace(/\/$/, '');
  const res = await fetch(`${base}/api/homepage`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Homepage request failed: ${res.status}`);
  }

  const json = (await res.json()) as ApiResponse<unknown>;
  const sections = extractSections(json);

  return { sections };
}
