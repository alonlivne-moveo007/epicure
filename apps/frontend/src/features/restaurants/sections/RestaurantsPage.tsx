/**
 * Restaurants page: renders a list of restaurants. Data fetching stays on the server (`get-restaurants.ts`).
 */
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import { RestaurantPrimaryFilters } from './RestaurantPrimaryFilters';
import { RestaurantGrid } from './RestaurantGrid';

import type { PaginatedRestaurants } from '../model/restaurant.types';

export function RestaurantsPage(props: { initialData: PaginatedRestaurants }) {
  const { initialData } = props;
  const { restaurants } = initialData;
  return (
    <SectionWrapper title={`Restaurants`} titleId="restaurants-heading">
      <RestaurantPrimaryFilters />
      <RestaurantGrid restaurants={restaurants} />
    </SectionWrapper>
  );
}

export default RestaurantsPage;
