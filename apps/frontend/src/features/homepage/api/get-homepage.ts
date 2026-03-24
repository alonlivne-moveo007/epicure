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

import { getBffBaseUrl } from '@/lib/bff-url';
import type {
  HomepageDocument,
  HomepageSection,
} from '@/features/homepage/model/homepage.types';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/** Walks BFF + Strapi wrappers and returns the homepage `sections` dynamic zone (or `[]`). */
function extractSections(body: unknown): HomepageSection[] {
  if (!isRecord(body)) return [];
  const inner = body['data'];
  if (!isRecord(inner)) return [];
  const entity = inner['data'];
  if (!isRecord(entity)) return [];
  const raw = entity['sections'];
  if (!Array.isArray(raw)) return [];
  return raw as HomepageSection[];
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
