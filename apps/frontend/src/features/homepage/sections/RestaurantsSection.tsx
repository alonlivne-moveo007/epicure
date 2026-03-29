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
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './RestaurantsSection.module.scss';

export function RestaurantsSection(props: SectionsRestaurants) {
  const { title, restaurants } = props;
  const list = restaurants ?? [];

  return (
    <SectionWrapper title={title} titleId="restaurants-heading">
      <Carousel ariaLabel="Popular restaurants">
        {list.map((r) => {
          const imageUrl = strapiImageSrc(r.image);
          return (
            <div key={r.id ?? r.name} className={styles.cardItem}>
              <RestaurantCard
                imageUrl={imageUrl}
                name={r.name}
                subtitle={r.chef?.name ?? r.description}
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
