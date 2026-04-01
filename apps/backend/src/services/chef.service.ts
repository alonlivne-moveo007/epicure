/**
 * Strapi proxy for the `chef` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';


@Injectable()
export class ChefService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listChefs(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/chefs', { populate: '*' });
  }

  async getChef(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/chefs/${id}`, { populate: '*' });
  }

  async createChef(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/chefs', body, { populate: '*' });
  }

  async updateChef(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/chefs/${id}`, body, { populate: '*' });
  }

  async deleteChef(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/chefs/${id}`);
  }
}
