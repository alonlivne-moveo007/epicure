/**
 * Renders `sections.restaurants`: section title plus a responsive grid of restaurant cards from
 * the populated Strapi relation (name, rating, description, image).
 */

import Image from 'next/image';
import Link from 'next/link';

import { RestaurantCard } from '@/components/cards/RestaurantCard/RestaurantCard';
import { Carousel } from '@/components/carousel/Carousel.client';
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type { SectionsRestaurants } from '@/features/homepage/model/homepage.types';

import styles from './RestaurantsSection.module.scss';

export function RestaurantsSection(props: SectionsRestaurants) {
  const { title, restaurants } = props;
  const list = restaurants ?? [];

  return (
    <SectionWrapper title={title} titleId="restaurants-heading">
      <Carousel ariaLabel="Popular restaurants">
        {list.map((r) => {
          return (
            <div key={r.id ?? r.name} className={styles.cardItem}>
              <RestaurantCard
                imageUrl={r.imageUrl ?? undefined}
                name={r.name}
                subtitle={r.chefName ?? r.description}
                rating={r.rating}
              />
            </div>
          );
        })}
      </Carousel>
      <div className={styles.allRestaurantsRow}>
        <Link href="/restaurants" className={styles.allRestaurantsLink}>
          <Image src="/assets/icons/all-restaurants.svg" alt="All Restaurants" width={226} height={35} />
        </Link>
      </div>
    </SectionWrapper>
  );
}
