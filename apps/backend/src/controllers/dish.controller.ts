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
import { DishService } from '../services/dish.service';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async list(): Promise<ApiResponse<unknown>> {
    const data = await this.dishService.listDishes();
    return { data };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.dishService.getDish(id);
    return { data };
  }

  @Post()
  async create(@Body() body: unknown): Promise<ApiResponse<unknown>> {
    const data = await this.dishService.createDish(body);
    return { data };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: unknown,
  ): Promise<ApiResponse<unknown>> {
    const data = await this.dishService.updateDish(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.dishService.deleteDish(id);
    return { data };
  }
}
