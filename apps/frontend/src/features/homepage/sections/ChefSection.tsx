/**
 * Renders `sections.chef`: featured chef card (image + name overlay) with bio below,
 * and a horizontal carousel of restaurants when Strapi returns them on the populated
 * `chef` relation.
 */

import { ChefCard } from '@/components/cards/ChefCard/ChefCard';
import { RestaurantCard } from '@/components/cards/RestaurantCard/RestaurantCard';
import { Carousel } from '@/components/carousel/Carousel.client';
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type {
  SectionsChef,
  StrapiRestaurant,
} from '@/features/homepage/model/homepage.types';
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './ChefSection.module.scss';

function possessiveRestaurantsTitle(chefName: string | null | undefined): string {
  const name = chefName?.trim() || 'Chef';
  return `${name}'s restaurants`;
}

export function ChefSection(props: SectionsChef) {
  const { title, chef } = props;
  if (!chef) return null;

  const src = strapiImageSrc(chef.image);
  const restaurants = Array.isArray(chef.restaurants)
    ? (chef.restaurants as StrapiRestaurant[])
    : [];

  const restaurantsTitle = possessiveRestaurantsTitle(chef.name);
  const carouselAriaLabel = `${chef.name ?? 'Chef'} restaurants`;

  return (
    <SectionWrapper title={title} titleId="chef-heading">
      <div className={styles.body}>
        {src ? (
          <div className={styles.cardWrap}>
            <ChefCard imageUrl={src} name={chef.name ?? ''} />
          </div>
        ) : null}
        {chef.bio ? <p className={`${styles.bio} body`}>{chef.bio}</p> : null}
      </div>

      {restaurants.length > 0 ? (
        <div className={styles.restaurantsBlock}>
          <h2 id="chef-restaurants-heading" className={styles.restaurantsTitle}>
            {restaurantsTitle}
          </h2>
          <Carousel ariaLabel={carouselAriaLabel} slideClassName={styles.miniSlide}>
            {restaurants.map((r) => (
              <div key={r.id ?? r.name} className={styles.cardItem}>
                <RestaurantCard
                  variant="mini"
                  imageUrl={strapiImageSrc(r.image)}
                  name={r.name}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : null}
    </SectionWrapper>
  );
}
