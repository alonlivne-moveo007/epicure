import { Restaurant } from "./domain.js";

export interface Chef {
  id: number | null;
  name: string;
  bio: string | null;
  imageUrl: string | null;
  restaurants: Restaurant[] | null;
}

