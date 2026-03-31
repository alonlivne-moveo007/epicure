/**
 * Root restaurants route (`/restaurants`): loads restaurants content from the Nest BFF in a Server Component and
 * renders restaurants page. Data fetching stays on the server (`get-restaurants.ts`).
 */import { getRestaurants } from '@/features/restaurants/api/get-restaurants';
import RestaurantsPage from '@/features/restaurants/sections/RestaurantsPage';

export default async function Restaurants() {
  const paginatedData = await getRestaurants();
  return <RestaurantsPage initialData={paginatedData} />;
}