/**
 * Server-only fetch for restaurants from the Nest BFF.
 * Supports an optional chefId filter — maps to `GET /api/restaurants?chefId=<id>`.
 */

import 'server-only';

import type { ApiResponse } from '@epicure/backend-types';
import type { Restaurant } from '@epicure/domain';
import { mapToRestaurants } from '@epicure/mappers';
import type { StrapiRestaurantDto } from '@epicure/strapi-dto';

import { getBffBaseUrl } from '@/lib/bff-url';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function extractRestaurants(body: unknown): StrapiRestaurantDto[] {
  if (!isRecord(body)) return [];
  const inner = body['data'];
  if (!isRecord(inner)) return [];
  const rows = inner['data'];
  if (!Array.isArray(rows)) return [];
  return rows as StrapiRestaurantDto[];
}

export async function getRestaurantsByChef(chefId: number): Promise<Restaurant[]> {
  const base = getBffBaseUrl().replace(/\/$/, '');
  const res = await fetch(`${base}/api/restaurants?chefId=${chefId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as ApiResponse<unknown>;
  return mapToRestaurants(extractRestaurants(json));
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const base = getBffBaseUrl().replace(/\/$/, '');
  const res = await fetch(`${base}/api/restaurants`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as ApiResponse<unknown>;
  return mapToRestaurants(extractRestaurants(json));
}