import type { Dish } from '@epicure/domain';
import type { StrapiDishDto } from '@epicure/strapi-dto';
import { strapiImageSrc } from '@epicure/strapi-media';

import { mapToTags } from './tag.mapper';

export function mapToDish(dto: StrapiDishDto | null | undefined): Dish | null {
  if (!dto) return null;

  return {
    id: dto.id ?? null,
    name: dto.name ?? '',
    description: dto.description ?? null,
    price: dto.price ?? null,
    imageUrl: strapiImageSrc(dto.image) ?? null,
    tags: mapToTags(dto.tags ?? null),
  };
}

export function mapToDishes(list: (StrapiDishDto | null | undefined)[] | null | undefined): Dish[] {
  if (!list?.length) return [];
  return list.map(mapToDish).filter((d): d is Dish => d != null);
}

