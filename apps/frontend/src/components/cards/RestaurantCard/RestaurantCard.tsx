import Image from 'next/image';

import styles from './RestaurantCard.module.scss';

export type RestaurantCardProps = {
  imageUrl?: string;
  name?: string | null;
  subtitle?: string | null;
  rating?: number | null;
  variant?: 'full' | 'mini';
};

function renderStars(rating?: number | null): string {
  if (rating == null || Number.isNaN(rating)) return '';
  const safe = Math.max(0, Math.min(5, Math.round(rating)));
  return `${'★'.repeat(safe)}${'☆'.repeat(5 - safe)}`;
}

/**
 * Presentational restaurant card used by homepage sections and future restaurant pages.
 */
export function RestaurantCard(props: RestaurantCardProps) {
  const { imageUrl, name, subtitle, rating, variant } = props;
  const isMini = variant === 'mini';

  return (
    <article className={`${styles.card} ${isMini ? styles.cardMini : ''}`}>
      {imageUrl ? (
        <div className={styles.thumb}>
          <Image
            src={imageUrl}
            alt={name ?? 'Restaurant'}
            width={400}
            height={260}
            className={styles.img}
            sizes="(max-width: 768px) 80vw, 33vw"
          />
        </div>
      ) : null}
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {!isMini && subtitle ? <p className={`${styles.subtitle} body`}>{subtitle}</p> : null}
        {!isMini && rating != null ? (
          <p className={styles.rating} aria-label={`Rating ${rating} out of 5`}>
            {renderStars(rating)}
          </p>
        ) : null}
      </div>
    </article>
  );
}
