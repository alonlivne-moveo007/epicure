import Link from 'next/link';

import type { RestaurantsListFilter } from '../api/get-restaurants';

import styles from './RestaurantPrimaryFilters.module.scss';

const FILTERS = [
  { id: 'all' as const, label: 'All' },
  { id: 'new' as const, label: 'New' },
  { id: 'popular' as const, label: 'Most Popular' },
  { id: 'open' as const, label: 'Open Now' },
  { id: 'map' as const, label: 'Map View' },
];

export type PrimaryFilterId = (typeof FILTERS)[number]['id'];

function hrefFor(id: PrimaryFilterId): string {
  if (id === 'all') return '/restaurants';
  if (id === 'map') return '/restaurants'; // UI-only for now; no filter param
  return `/restaurants?filter=${id}`;
}

export function RestaurantPrimaryFilters(props: { activeFilter: RestaurantsListFilter }) {
  const { activeFilter } = props;

  return (
    <nav className={styles.nav} aria-label="Restaurant categories">
      <div className={styles.track}>
        {FILTERS.map((f) => {
          const isActive =
            f.id === 'map'
              ? false
              : f.id === 'all'
                ? activeFilter === 'all'
                : activeFilter === f.id;

          const isMap = f.id === 'map';

          if (isMap) {
            return (
              <button
                key={f.id}
                type="button"
                className={`${styles.item} ${styles.itemDesktopOnly} button-text`}
                disabled
              >
                {f.label}
              </button>
            );
          }

          return (
            <Link
              key={f.id}
              href={hrefFor(f.id)}
              className={`${styles.item} button-text ${isActive ? styles.itemActive : ''}`}
              aria-current={isActive ? 'page' : undefined}
              scroll={false}
            >
              {f.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}