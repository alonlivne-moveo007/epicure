import type { Tag } from './tag.js';

export interface Dish {
  id: number | null;
  name: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  tags: Tag[];
}

