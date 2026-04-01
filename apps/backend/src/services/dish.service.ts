/**
 * Strapi proxy for the `dish` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';


@Injectable()
export class DishService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listDishes(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/dishes', { populate: '*' });
  }

  async getDish(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/dishes/${id}`, { populate: '*' });
  }

  async createDish(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/dishes', body, { populate: '*' });
  }

  async updateDish(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/dishes/${id}`, body, { populate: '*' });
  }

  async deleteDish(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/dishes/${id}`);
  }
}
