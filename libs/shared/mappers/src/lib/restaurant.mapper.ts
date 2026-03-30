import type { Restaurant } from '@epicure/domain';
import type { StrapiRestaurantDto } from '@epicure/strapi-dto';
import { strapiImageSrc } from '@epicure/strapi-media';
import { mapToDishes } from './dish.mapper';

export function mapToRestaurant(dto: StrapiRestaurantDto | null | undefined): Restaurant | null {
  if (!dto) return null;

  return {
    id: dto.id ?? null,
    name: dto.name ?? '',
    description: dto.description ?? null,
    rating: dto.rating ?? null,
    imageUrl: strapiImageSrc(dto.image) ?? null,
    chefName: dto.chef?.name ?? null,
    chefId: dto.chef?.id ?? null,
    dishes: mapToDishes(dto.dishes ?? null),
    openingHours: dto.opening_hours ? dto.opening_hours.map(openingHour => ({
      day: openingHour.day ?? null,
      openTime: openingHour.open_time ?? null,
      closeTime: openingHour.close_time ?? null,
    })) : null,
    location: dto.location ? {
      latitude: dto.location.latitude ?? null,
      longitude: dto.location.longitude ?? null,
    } : null,
    priceRange: dto.price_range ? {
      minPrice: dto.price_range.min_price ?? null,
      maxPrice: dto.price_range.max_price ?? null,
    } : null,
  };
}

export function mapToRestaurants(list: (StrapiRestaurantDto | null | undefined)[] | null | undefined): Restaurant[] {
  if (!list?.length) return [];
  return list.map(mapToRestaurant).filter((r): r is Restaurant => r != null);
}

