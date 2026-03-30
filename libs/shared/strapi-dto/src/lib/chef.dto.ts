import { StrapiRestaurantDto } from "./restaurant.dto.js";

export type StrapiChefDto = {
  id?: number;
  name?: string;
  bio?: string | null;
  image?: unknown;
  restaurants?: StrapiRestaurantDto[] | null;
};

