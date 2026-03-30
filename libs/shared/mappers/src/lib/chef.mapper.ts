import type { Chef } from '@epicure/domain';
import type { StrapiChefDto } from '@epicure/strapi-dto';
import { strapiImageSrc } from '@epicure/strapi-media';

export function mapToChef(dto: StrapiChefDto | null | undefined): Chef | null {
  if (!dto) return null;

  return {
    id: dto.id ?? null,
    name: dto.name ?? '',
    bio: dto.bio ?? null,
    imageUrl: strapiImageSrc(dto.image) ?? null,
  };
}

