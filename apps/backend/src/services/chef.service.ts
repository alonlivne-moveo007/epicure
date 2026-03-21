import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';

const POPULATE = { populate: '*' as const };

@Injectable()
export class ChefService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listChefs(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/chefs', POPULATE);
  }

  async getChef(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/chefs/${id}`, POPULATE);
  }

  async createChef(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/chefs', body, POPULATE);
  }

  async updateChef(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/chefs/${id}`, body, POPULATE);
  }

  async deleteChef(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/chefs/${id}`);
  }
}
