import { Dish } from "./dish.js";

export interface Restaurant {
  id: number | null;
  name: string;
  description: string | null;
  rating: number | null;
  imageUrl: string | null;
  chefName: string | null;
  chefId: number | null;
  dishes: Dish[] | null;
  openingHours: {
    day: string | null;
    openTime: string | null;
    closeTime: string | null;
  }[] | null;
  location: {
    latitude: number | null;
    longitude: number | null;
  } | null;
  priceRange: {
    minPrice: number | null;
    maxPrice: number | null;
  } | null;
}

