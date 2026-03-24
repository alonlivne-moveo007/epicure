/**
 * Renders `sections.dishs` (Strapi UID): grid of dishes with optional `isPopular` badge and image.
 */

import { DishCard } from '@/components/cards/DishCard/DishCard';
import { Carousel } from '@/components/carousel/Carousel.client';
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type { SectionsDishs } from '@/features/homepage/model/homepage.types';
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './DishesSection.module.scss';

export function DishesSection(props: SectionsDishs) {
  const { title, dishes } = props;
  const list = dishes ?? [];

  return (
    <SectionWrapper
      title={title}
      titleId="dishes-heading"
      className={styles.section}
    >
      <Carousel ariaLabel="Signature dishes">
        {list.map((d) => {
          const imageUrl = strapiImageSrc(d.image);
          const priceLabel = d.price != null ? `₪${d.price}` : null;
          return (
            <div key={d.id ?? d.name} className={styles.cardItem}>
              <DishCard
                imageUrl={imageUrl}
                name={d.name}
                description={d.description}
                showPopular={Boolean(d.isPopular)}
                priceLabel={priceLabel}
              />
            </div>
          );
        })}
      </Carousel>
    </SectionWrapper>
  );
}
