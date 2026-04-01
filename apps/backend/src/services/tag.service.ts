/**
 * Strapi proxy for the `tag` collection. Uses `populate: '*'` on reads/writes so relations are included.
 */

import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';


@Injectable()
export class TagService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listTags(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/tags', { populate: '*' });
  }

  async getTag(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/tags/${id}`, { populate: '*' });
  }

  async createTag(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/tags', body, { populate: '*' });
  }

  async updateTag(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/tags/${id}`, body, { populate: '*' });
  }

  async deleteTag(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/tags/${id}`);
  }
}
