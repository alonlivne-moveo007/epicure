/** Values accepted as `?filter=` on the restaurants list API (BFF + Next). */
export const RESTAURANT_LIST_QUERY_FILTERS = ['new', 'popular', 'open'] as const;

export type RestaurantListQueryFilter = (typeof RESTAURANT_LIST_QUERY_FILTERS)[number];

/** UI + fetch: includes default when no query param. */
export type RestaurantsListFilter = 'all' | RestaurantListQueryFilter;

export function isRestaurantListQueryFilter(
  value: string,
): value is RestaurantListQueryFilter {
  return (RESTAURANT_LIST_QUERY_FILTERS as readonly string[]).includes(value);
}

export function parseRestaurantsListFilterParam(
  raw: string | string[] | undefined,
): RestaurantsListFilter {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v !== undefined && isRestaurantListQueryFilter(v)) return v;
  return 'all';
}
