import Image from 'next/image';

import styles from './TagChip.module.scss';

type TagChipProps = {
  label: string;
  iconSrc?: string | null;
  className?: string;
};

/**
 * Small, presentational tag chip with optional decorative icon.
 */
export function TagChip(props: TagChipProps) {
  const { label, iconSrc, className } = props;
  const chipClassName = className ? `${styles.chip} ${className}` : styles.chip;

  return (
    <span className={chipClassName}>
      {iconSrc ? (
        <span className={styles.icon}>
          <Image src={iconSrc} alt="" width={40} height={40} className={styles.iconImg} />
        </span>
      ) : null}
      <span className={styles.label}>{label}</span>
    </span>
  );
}
