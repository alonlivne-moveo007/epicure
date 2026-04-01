import { RestaurantCard } from '@/components/cards/RestaurantCard/RestaurantCard';

import type { PaginatedRestaurants } from '../model/restaurant.types';

import styles from './RestaurantGrid.module.scss';

export function RestaurantGrid(props: Pick<PaginatedRestaurants, 'restaurants'>) {
  const { restaurants } = props;
  return (
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
  );
}
