/**
 * HTTP API for tags. Proxies to Strapi collection REST (`GET/POST /api/tags`, etc.).
 */

import { ApiResponse } from '@epicure/backend-types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async list(): Promise<ApiResponse<unknown>> {
    const data = await this.tagService.listTags();
    return { data };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.tagService.getTag(id);
    return { data };
  }

  @Post()
  async create(@Body() body: unknown): Promise<ApiResponse<unknown>> {
    const data = await this.tagService.createTag(body);
    return { data };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: unknown,
  ): Promise<ApiResponse<unknown>> {
    const data = await this.tagService.updateTag(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.tagService.deleteTag(id);
    return { data };
  }
}
