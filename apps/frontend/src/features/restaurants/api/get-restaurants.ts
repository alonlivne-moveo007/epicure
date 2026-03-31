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
import { PaginatedRestaurants } from '../model/restaurant.types';



/**
 * 
 * @param body 
 * @returns 
 */
function extractMeta(body: unknown): any {
  if (!isRecord(body)) return null;
  const inner = body['data'];
  if (!isRecord(inner)) return null;
  return inner['meta']?.pagination ?? null;
}



/**
 * 
 * @param v 
 * @returns 
 */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

/**
 * 
 * @param body 
 * @returns 
 */
function extractRestaurants(body: unknown): StrapiRestaurantDto[] {
  if (!isRecord(body)) return [];
  const inner = body['data'];
  if (!isRecord(inner)) return [];
  const rows = inner['data'];
  if (!Array.isArray(rows)) return [];
  return rows as StrapiRestaurantDto[];
}

/**
 * 
 * @param page 
 * @param pageSize 
 * @returns 
 */
export async function getRestaurants(page = 1, pageSize = 9): Promise<PaginatedRestaurants> {
  const base = getBffBaseUrl().replace(/\/$/, '');
  
  const url = `${base}/api/restaurants?page=${page}&pageSize=${pageSize}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { restaurants: [], pageCount: 0, total: 0 };
  }

  const json = (await res.json()) as ApiResponse<unknown>;
  
  const meta = extractMeta(json);
  const restaurantsDto = extractRestaurants(json);

  return {
    restaurants: mapToRestaurants(restaurantsDto),
    pageCount: meta?.pageCount ?? 0,
    total: meta?.total ?? 0,
  };
}