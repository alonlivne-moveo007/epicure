import { StrapiChefDto } from "./chef.dto.js";
import { StrapiDishDto } from "./dish.dto.js";

export interface StrapiLocationDto {
  longitude?: number | null;
  latitude?: number | null;
}

export interface StrapiOpeningHoursDto {
  day?: string | null;
  open_time?: string | null;
  close_time?: string | null;
}

export interface StrapiPriceRangeDto {
  min_price?: number | null;
  max_price?: number | null;
}

export type StrapiRestaurantDto = {
  id?: number;
  name?: string;
  description?: string | null;
  rating?: number | null;
  image?: unknown;
  chef?: StrapiChefDto | null;
  dishes?: StrapiDishDto[] | null;
  opening_hours?: StrapiOpeningHoursDto[] | null;
  location?: StrapiLocationDto | null;
  price_range?: StrapiPriceRangeDto | null;
};

