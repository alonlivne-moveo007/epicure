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
import { ChefService } from '../services/chef.service';

@Controller('chefs')
export class ChefController {
  constructor(private readonly chefService: ChefService) {}

  @Get()
  async list(): Promise<ApiResponse<unknown>> {
    const data = await this.chefService.listChefs();
    return { data };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.chefService.getChef(id);
    return { data };
  }

  @Post()
  async create(@Body() body: unknown): Promise<ApiResponse<unknown>> {
    const data = await this.chefService.createChef(body);
    return { data };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: unknown,
  ): Promise<ApiResponse<unknown>> {
    const data = await this.chefService.updateChef(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.chefService.deleteChef(id);
    return { data };
  }
}
