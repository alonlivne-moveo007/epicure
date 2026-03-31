/**
 * HTTP API for the homepage single type (read-only). Proxies to Strapi `GET /api/homepage`.
 * Updates and deletes are done in Strapi Admin only.
 */

import { ApiResponse } from '@epicure/backend-types';
import { Controller, Get, Query } from '@nestjs/common';
import { HomepageService } from '../services/homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  async get(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiResponse<unknown>> {
    const data = await this.homepageService.getHomepage(query);
    return { data };
  }
}
