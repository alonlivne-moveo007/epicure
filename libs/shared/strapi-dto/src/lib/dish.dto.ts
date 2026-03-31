import type { StrapiTagDto } from './tag.dto.js';

export type StrapiDishDto = {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number | null;
  image?: unknown;
  tags?: StrapiTagDto[] | null;
};

