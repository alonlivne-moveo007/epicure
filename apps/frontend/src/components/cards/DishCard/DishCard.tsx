import Image from 'next/image';

import styles from './DishCard.module.scss';

export type DishCardTag = {
  name?: string | null;
  iconSrc?: string | null;
};

export type DishCardProps = {
  imageUrl?: string;
  name?: string | null;
  description?: string | null;
  /** Raw numeric price — formatted with the ILS icon internally. */
  price?: number | null;
  tags?: DishCardTag[] | null;
};

/**
 * Presentational dish card for homepage rows and restaurant detail lists.
 *
 * Desktop price: flanked by two horizontal `var(--color-gray)` lines (Figma spec).
 * Mobile price: left-aligned ILS icon + amount, no lines.
 */
export function DishCard({ imageUrl, name, description, price, tags }: DishCardProps) {
  const visibleTags = tags?.filter((t) => t.name && t.iconSrc) ?? [];

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <div className={styles.thumb}>
          <Image
            src={imageUrl}
            alt={name ?? 'Dish'}
            fill
            className={styles.img}
            sizes="(max-width: 768px) 84vw, 33vw"
          />
        </div>
      ) : null}

      <div className={styles.body}>
        {name ? <h3 className={styles.name}>{name}</h3> : null}
        {description ? <p className={`${styles.desc} body`}>{description}</p> : null}

        {visibleTags.length > 0 ? (
          <div className={styles.tagRow}>
            {visibleTags.map((t) => (
              <Image key={t.name} src={t.iconSrc!} alt={t.name!} width={40} height={40} />
            ))}
          </div>
        ) : null}

        {price != null ? (
          <div className={styles.priceRow}>
            <span className={styles.priceLine} aria-hidden="true" />
            <span className={`${styles.priceAmount} body`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/icons/ils.svg"
                alt=""
                aria-hidden="true"
                className={styles.ilsIcon}
              />
              {price}
            </span>
            <span className={styles.priceLine} aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
