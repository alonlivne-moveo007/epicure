import Image from 'next/image';

import styles from './ChefCard.module.scss';

export type ChefCardProps = {
  imageUrl: string;
  name: string;
};

export function ChefCard({ imageUrl, name }: ChefCardProps) {
  return (
    <article className={styles.card}>
      <Image
        src={imageUrl}
        alt={name}
        fill
        className={styles.img}
        sizes="(max-width: 768px) 90vw, 433px"
      />
      <div className={styles.overlay}>
        <p className={styles.name}>{name}</p>
      </div>
    </article>
  );
}
