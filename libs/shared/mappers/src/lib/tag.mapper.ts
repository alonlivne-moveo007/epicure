import type { Tag } from '@epicure/domain';
import type { StrapiTagDto } from '@epicure/strapi-dto';
import { strapiImageSrc } from '@epicure/strapi-media';

export function mapToTag(dto: StrapiTagDto | null | undefined): Tag | null {
  if (!dto) return null;

  return {
    id: dto.id ?? null,
    name: dto.name ?? '',
    slug: dto.slug ?? null,
    imageUrl: strapiImageSrc(dto.image) ?? null,
  };
}

export function mapToTags(list: (StrapiTagDto | null | undefined)[] | null | undefined): Tag[] {
  if (!list?.length) return [];
  return list.map(mapToTag).filter((t): t is Tag => t != null);
}

