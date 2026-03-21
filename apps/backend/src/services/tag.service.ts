import { Injectable } from '@nestjs/common';
import { StrapiHttpService } from './strapi-http.service';

const POPULATE = { populate: '*' as const };

@Injectable()
export class TagService {
  constructor(private readonly strapiHttp: StrapiHttpService) {}

  async listTags(): Promise<unknown> {
    return this.strapiHttp.get<unknown>('/tags', POPULATE);
  }

  async getTag(id: string): Promise<unknown> {
    return this.strapiHttp.get<unknown>(`/tags/${id}`, POPULATE);
  }

  async createTag(body: unknown): Promise<unknown> {
    return this.strapiHttp.post<unknown>('/tags', body, POPULATE);
  }

  async updateTag(id: string, body: unknown): Promise<unknown> {
    return this.strapiHttp.put<unknown>(`/tags/${id}`, body, POPULATE);
  }

  async deleteTag(id: string): Promise<unknown> {
    return this.strapiHttp.delete<unknown>(`/tags/${id}`);
  }
}
