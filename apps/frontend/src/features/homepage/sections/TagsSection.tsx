/**
 * Renders `sections.tags`: horizontal wrap of tag chips with optional thumbnail from Strapi media.
 */

import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import { TagChip } from '@/components/tags/TagChip/TagChip';
import type { SectionsTags } from '@/features/homepage/model/homepage.types';
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './TagsSection.module.scss';

export function TagsSection(props: SectionsTags) {
  const { title, tags } = props;
  const list = tags ?? [];

  return (
    <SectionWrapper title={title} titleId="tags-heading">
      <ul className={styles.list}>
        {list.map((t) => {
          const src = strapiImageSrc(t.image);
          return (
            <li key={t.id ?? t.slug ?? t.name} className={styles.tag}>
              <TagChip label={t.name ?? ''} iconSrc={src} />
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
