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
import { RestaurantService } from '../services/restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async list(): Promise<ApiResponse<unknown>> {
    const data = await this.restaurantService.listRestaurants();
    return { data };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.restaurantService.getRestaurant(id);
    return { data };
  }

  @Post()
  async create(@Body() body: unknown): Promise<ApiResponse<unknown>> {
    const data = await this.restaurantService.createRestaurant(body);
    return { data };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: unknown,
  ): Promise<ApiResponse<unknown>> {
    const data = await this.restaurantService.updateRestaurant(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<unknown>> {
    const data = await this.restaurantService.deleteRestaurant(id);
    return { data };
  }
}
