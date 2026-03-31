import { Restaurant } from "@epicure/domain";

export interface PaginatedRestaurants {
    restaurants: Restaurant[];
    pageCount: number;
    total: number;
  }