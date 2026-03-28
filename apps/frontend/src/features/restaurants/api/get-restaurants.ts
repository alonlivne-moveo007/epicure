/**
 * Server-only fetch for restaurants from the Nest BFF.
 * Supports an optional chefId filter — maps to `GET /api/restaurants?chefId=<id>`.
 */

import 'server-only';

import type { ApiResponse } from '@epicure/backend-types';

import { getBffBaseUrl } from '@/lib/bff-url';
import type { StrapiRestaurant } from '@/features/homepage/model/homepage.types';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function extractRestaurants(body: unknown): StrapiRestaurant[] {
  if (!isRecord(body)) return [];
  const inner = body['data'];
  if (!isRecord(inner)) return [];
  const rows = inner['data'];
  if (!Array.isArray(rows)) return [];
  return rows as StrapiRestaurant[];
}

export async function getRestaurantsByChef(chefId: number): Promise<StrapiRestaurant[]> {
  const base = getBffBaseUrl().replace(/\/$/, '');
  const res = await fetch(`${base}/api/restaurants?chefId=${chefId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as ApiResponse<unknown>;
  return extractRestaurants(json);
}
