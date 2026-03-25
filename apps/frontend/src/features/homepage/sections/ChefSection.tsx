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
    <>
      <SectionWrapper title={title} titleId="chef-heading" className={styles.profileSection}>
        <div className={styles.body}>
          {src ? (
            <div className={styles.cardWrap}>
              <ChefCard imageUrl={src} name={chef.name ?? ''} />
            </div>
          ) : null}
          {chef.bio ? <p className={styles.bio}>{chef.bio}</p> : null}
        </div>
      </SectionWrapper>

      {restaurants.length > 0 ? (
        <SectionWrapper
          title={restaurantsTitle}
          titleId="chef-restaurants-heading"
          className={styles.restaurantsSection}
        >
          <Carousel ariaLabel={carouselAriaLabel}>
            {restaurants.map((r) => (
              <div key={r.id ?? r.name} className={styles.cardItem}>
                <RestaurantCard
                  imageUrl={strapiImageSrc(r.image)}
                  name={r.name}
                  subtitle={r.chef?.name ?? null}
                  rating={r.rating}
                />
              </div>
            ))}
          </Carousel>
        </SectionWrapper>
      ) : null}
    </>
  );
}
