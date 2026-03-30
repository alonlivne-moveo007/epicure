/**
 * Renders `sections.dishs` (Strapi UID): grid of dishes with image and tag chip.
 */

import { DishCard } from '@/components/cards/DishCard/DishCard';
import { Carousel } from '@/components/carousel/Carousel.client';
import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type { SectionsDishs } from '@/features/homepage/model/homepage.types';

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
          const tags = (d.tags ?? []).map((t) => ({
            name: t.name,
            iconSrc: t.imageUrl,
          }));
          return (
            <div key={d.id ?? d.name} className={styles.cardItem}>
              <DishCard
                imageUrl={d.imageUrl ?? undefined}
                name={d.name}
                description={d.description}
                price={d.price}
                tags={tags}
              />
            </div>
          );
        })}
      </Carousel>
    </SectionWrapper>
  );
}
