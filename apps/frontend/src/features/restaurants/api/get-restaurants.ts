/**
 * Server-only fetch for restaurants from the Nest BFF.
 * Request: `GET {bffBaseUrl}/api/restaurants` with optional `page`, `pageSize`, `filter`.
 */

import 'server-only';

import type { ApiResponse, RestaurantsListFilter } from '@epicure/backend-types';
import { mapToRestaurants } from '@epicure/mappers';
import type { StrapiRestaurantDto } from '@epicure/strapi-dto';

import { getBffBaseUrl } from '@/lib/bff-url';
import { PaginatedRestaurants } from '../model/restaurant.types';

export type { RestaurantsListFilter } from '@epicure/backend-types';

type StrapiPaginationSlice = {
  pageCount?: number;
  total?: number;
} | null;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function extractMeta(body: unknown): StrapiPaginationSlice {
  if (!isRecord(body)) return null;
  const inner = body['data'];
  if (!isRecord(inner)) return null;
  const meta = inner['meta'];
  if (!isRecord(meta)) return null;
  const pagination = meta['pagination'];
  if (!isRecord(pagination)) return null;
  const pageCount = pagination['pageCount'];
  const total = pagination['total'];
  return {
    pageCount: typeof pageCount === 'number' ? pageCount : undefined,
    total: typeof total === 'number' ? total : undefined,
  };
}

function extractRestaurants(body: unknown): StrapiRestaurantDto[] {
  if (!isRecord(body)) return [];
  const inner = body['data'];
  if (!isRecord(inner)) return [];
  const rows = inner['data'];
  if (!Array.isArray(rows)) return [];
  return rows as StrapiRestaurantDto[];
}

export type GetRestaurantsOptions = {
  page?: number;
  pageSize?: number;
  /** Omit or `all` = no filter query param */
  filter?: RestaurantsListFilter;
};

export async function getRestaurants(options: GetRestaurantsOptions = {}): Promise<PaginatedRestaurants> {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 9;
  const filter = options.filter;

  const base = getBffBaseUrl().replace(/\/$/, '');
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (filter && filter !== 'all') {
    params.set('filter', filter);
  }

  const url = `${base}/api/restaurants?${params.toString()}`;

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
