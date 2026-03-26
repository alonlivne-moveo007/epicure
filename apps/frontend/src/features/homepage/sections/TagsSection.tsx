/**
 * Renders `sections.tags`: horizontal wrap of tag chips with optional thumbnail from Strapi media.
 */

import Image from 'next/image';

import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type { SectionsTags } from '@/features/homepage/model/homepage.types';
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './TagsSection.module.scss';

export function TagsSection(props: SectionsTags) {
  const { title, tags } = props;
  const list = tags ?? [];

  return (
    <div className={styles.wrapper}>
    <SectionWrapper title={title} titleId="tags-heading">
      <ul className={styles.list}>
        {list.map((t) => {
          const src = strapiImageSrc(t.image);
          if (!src) return null;
          return (
            <li key={t.id ?? t.slug ?? t.name} className={styles.tag}>
              <Image src={src} alt={t.name ?? ''} width={40} height={40} />
              {t.name ? <span className={`${styles.tagName} body`}>{t.name}</span> : null}
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
    </div>
  );
}
