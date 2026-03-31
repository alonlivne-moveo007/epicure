/**
 * Restaurants page: renders a list of restaurants. Data fetching stays on the server (`get-restaurants.ts`).
 */
import { PaginatedRestaurants } from "../model/restaurant.types";

export function RestaurantsPage(props: { initialData: PaginatedRestaurants }) {
  const { initialData } = props;
  const { restaurants, pageCount } = initialData;
  return <div>
    <h1>Restaurants ({initialData.total})</h1>
    {/* כאן תעשה map על ה-restaurants */}
  </div>;
}

export default RestaurantsPage;