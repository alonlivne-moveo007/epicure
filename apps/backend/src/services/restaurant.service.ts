/**
 * Strapi proxy for the `restaurant` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';


@Injectable()
export class RestaurantService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listRestaurants(query: { page?: number; pageSize?: number }): Promise<unknown> {
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 10;

    return this.strapiHttp.get<unknown>('/restaurants', {
      populate: '*',
      pagination: {
        page,
        pageSize,
      },
    });
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
