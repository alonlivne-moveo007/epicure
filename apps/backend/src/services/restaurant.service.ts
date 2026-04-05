/**
 * Strapi proxy for the `restaurant` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';

import {
  isRestaurantListQueryFilter,
  type RestaurantListQueryFilter,
} from '@epicure/backend-types';

import { isRestaurantOpenNow, strapiRowOpeningHours } from '../utils/restaurant-open-now.util';
import { StrapiHttpService } from './strapi-http.service';

const RESTAURANT_LIST_SORT: Partial<Record<RestaurantListQueryFilter, string>> = {
  new: 'createdAt:desc',
  popular: 'rating:desc',
};

export type ListRestaurantsQuery = {
  page?: number;
  pageSize?: number;
  /** Known values: `new` | `popular` | `open`; unknown strings are ignored. */
  filter?: string;
};

/** Strapi 5 collection list body (shape we forward to the frontend). */
type StrapiCollectionResponse = {
  data: unknown[];
  meta?: { pagination?: { page?: number; pageSize?: number; pageCount?: number; total?: number } };
};

@Injectable()
export class RestaurantService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listRestaurants(query: ListRestaurantsQuery): Promise<unknown> {
    const page = Number(query?.page) > 0 ? Number(query.page) : 1;
    const pageSize = Number(query?.pageSize) > 0 ? Number(query.pageSize) : 10;
    const rawFilter = query?.filter;
    const filter =
      rawFilter !== undefined && isRestaurantListQueryFilter(rawFilter) ? rawFilter : undefined;

    if (filter === 'open') {
      return this.listRestaurantsOpenNow(page, pageSize);
    }

    const sort = filter ? RESTAURANT_LIST_SORT[filter] : undefined;

    return this.strapiHttp.get<unknown>('/restaurants', {
      populate: '*',
      pagination: { page, pageSize },
      ...(sort ? { sort } : {}),
    });
  }

  /** Load all restaurants (paged loop), filter by open-now, then paginate in memory. */
  private async listRestaurantsOpenNow(page: number, pageSize: number): Promise<StrapiCollectionResponse> {
    const batchSize = 100;
    const allRows: unknown[] = [];
    let strapiPage = 1;
    let strapiPageCount = 1;

    do {
      const res = (await this.strapiHttp.get<StrapiCollectionResponse>('/restaurants', {
        populate: '*',
        pagination: { page: strapiPage, pageSize: batchSize },
      })) as StrapiCollectionResponse;

      const batch = Array.isArray(res.data) ? res.data : [];
      allRows.push(...batch);

      const p = res.meta?.pagination;
      strapiPageCount = typeof p?.pageCount === 'number' ? p.pageCount : 1;
      strapiPage += 1;
    } while (strapiPage <= strapiPageCount);

    const filtered = allRows.filter((row) =>
      isRestaurantOpenNow(strapiRowOpeningHours(row), new Date()),
    );

    const total = filtered.length;
    const pageCount = total === 0 ? 0 : Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return {
      data,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      },
    };
  }

  async getRestaurant(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/restaurants/${id}`, { populate: '*' });
  }

  async createRestaurant(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/restaurants', body, { populate: '*' });
  }

  async updateRestaurant(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/restaurants/${id}`, body, { populate: '*' });
  }

  async deleteRestaurant(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/restaurants/${id}`);
  }
}