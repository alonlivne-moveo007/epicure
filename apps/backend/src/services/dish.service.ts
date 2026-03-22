/**
 * Strapi proxy for the `dish` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';

const POPULATE = { populate: '*' as const };

@Injectable()
export class DishService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listDishes(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/dishes', POPULATE);
  }

  async getDish(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/dishes/${id}`, POPULATE);
  }

  async createDish(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/dishes', body, POPULATE);
  }

  async updateDish(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/dishes/${id}`, body, POPULATE);
  }

  async deleteDish(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/dishes/${id}`);
  }
}
