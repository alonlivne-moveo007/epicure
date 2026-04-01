/**
 * Restaurants page: renders a list of restaurants. Data fetching stays on the server (`get-restaurants.ts`).
 */
import { RestaurantCard } from '@/components/cards/RestaurantCard/RestaurantCard';
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import { RestaurantPrimaryFilters } from './RestaurantPrimaryFilters';

import type { PaginatedRestaurants } from "../model/restaurant.types";

import styles from './RestaurantsPage.module.scss';


export function RestaurantsPage(props: { initialData: PaginatedRestaurants }) {
  const { initialData } = props;
  const { restaurants, total } = initialData;
  return (
    <SectionWrapper title={`Restaurants`} titleId="restaurants-heading">
      <RestaurantPrimaryFilters />
      <ul className={styles.grid}>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className={styles.cell}>
            <RestaurantCard
              imageUrl={restaurant.imageUrl ?? undefined}
              name={restaurant.name}
              subtitle={restaurant.chefName ?? restaurant.description}
              rating={restaurant.rating}
            />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

export default RestaurantsPage;