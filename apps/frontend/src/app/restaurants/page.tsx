/**
 * Root restaurants route (`/restaurants`): loads restaurants from the Nest BFF (Server Component).
 */
import { parseRestaurantsListFilterParam } from '@epicure/backend-types';
import { getRestaurants } from '@/features/restaurants/api/get-restaurants';
import RestaurantsPage from '@/features/restaurants/sections/RestaurantsPage';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Restaurants({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const filter = parseRestaurantsListFilterParam(sp.filter);

  const paginatedData = await getRestaurants({ page: 1, pageSize: 9, filter });

  return <RestaurantsPage initialData={paginatedData} activeFilter={filter} />;
}
