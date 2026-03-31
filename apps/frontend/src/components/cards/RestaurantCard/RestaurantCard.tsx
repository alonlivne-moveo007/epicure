import Image from 'next/image';

import styles from './RestaurantCard.module.scss';

export type RestaurantCardVariant = 'full' | 'mini';

export type RestaurantCardProps = {
  imageUrl?: string;
  name?: string | null;
  subtitle?: string | null;
  rating?: number | null;
  variant?: RestaurantCardVariant;
};

function renderStars(rating?: number | null): string {
  if (rating == null || Number.isNaN(rating)) return '';
  const safe = Math.max(0, Math.min(5, Math.round(rating)));
  return `${'★'.repeat(safe)}${'☆'.repeat(5 - safe)}`;
}

/**
 * Presentational restaurant card used by homepage sections and future restaurant pages.
 *
 * `variant="full"` — wide listing card (default)
 * `variant="mini"` — compact strip card (used in ChefSection)
 *
 * Dimensions switch automatically between mobile and desktop via CSS media queries.
 * No size prop needed — just use the variant that matches the layout context.
 */
export function RestaurantCard(props: RestaurantCardProps) {
  const { imageUrl, name, subtitle, rating, variant = 'full' } = props;

  const isMini = variant === 'mini';
  const cardClass = isMini ? `${styles.card} ${styles.cardMini}` : styles.card;

  // full: browser picks 334px slot on mobile, 379px on desktop
  // mini: browser picks 245px slot on mobile, 231px on desktop
  const imgSizes = isMini
    ? '(max-width: 1023px) 245px, 231px'
    : '(max-width: 1023px) 334px, 379px';

  // Desktop-mini hides subtitle via CSS; rating is only ever shown on full at desktop.
  const showRating = !isMini && rating != null;

  return (
    <article className={cardClass}>
      {imageUrl ? (
        <div className={styles.thumb}>
          <Image
            src={imageUrl}
            alt={name ?? 'Restaurant'}
            fill
            className={styles.img}
            sizes={imgSizes}
          />
        </div>
      ) : null}
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {subtitle ? <p className={`${styles.subtitle} body`}>{subtitle}</p> : null}
        {showRating ? (
          <p className={styles.rating} aria-label={`Rating ${rating} out of 5`}>
            {renderStars(rating)}
          </p>
        ) : null}
      </div>
    </article>
  );
}
