import Image from 'next/image';

import styles from './DishCard.module.scss';

export type DishCardProps = {
  imageUrl?: string;
  name?: string | null;
  description?: string | null;
  priceLabel?: string | null;
  showPopular?: boolean;
};

/**
 * Presentational dish card for homepage rows and restaurant detail lists.
 */
export function DishCard(props: DishCardProps) {
  const { imageUrl, name, description, priceLabel, showPopular } = props;

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <div className={styles.thumb}>
          <Image
            src={imageUrl}
            alt={name ?? 'Dish'}
            width={320}
            height={220}
            className={styles.img}
            sizes="(max-width: 768px) 80vw, 25vw"
          />
        </div>
      ) : null}
      <div className={styles.body}>
        <h3 className={styles.name}>
          {name}
          {showPopular ? <span className={styles.badge}>Popular</span> : null}
        </h3>
        {description ? <p className={styles.desc}>{description}</p> : null}
        {priceLabel ? <p className={styles.price}>{priceLabel}</p> : null}
      </div>
    </article>
  );
}
