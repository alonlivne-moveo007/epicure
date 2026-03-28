/**
 * Strapi proxy for the `restaurant` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';

const POPULATE = { populate: '*' as const };

@Injectable()
export class RestaurantService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listRestaurants(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/restaurants', POPULATE);
  }

  async listByChef(chefId: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/restaurants', {
      ...POPULATE,
      filters: { chef: { id: { $eq: chefId } } },
    });
  }

  async getRestaurant(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/restaurants/${id}`, POPULATE);
  }

  async createRestaurant(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/restaurants', body, POPULATE);
  }

  async updateRestaurant(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/restaurants/${id}`, body, POPULATE);
  }

  async deleteRestaurant(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/restaurants/${id}`);
  }
}
