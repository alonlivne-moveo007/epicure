/**
 * Renders `sections.about`: Strapi `blocks` copy is flattened to paragraphs; optional side image.
 * Extend `renderBlocks` if you add headings or links in the CMS rich text.
 */

import Image from 'next/image';

import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type {
  SectionsAbout,
  StrapiBlock,
  StrapiBlockChild,
} from '@/features/homepage/model/homepage.types';
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './AboutSection.module.scss';

/** Depth-first text extraction for Strapi block `children` trees (MVP: paragraph + text nodes). */
function collectText(nodes: StrapiBlockChild[] | undefined): string {
  if (!nodes?.length) return '';
  return nodes
    .map((n) => {
      if (n.type === 'text' && typeof n.text === 'string') return n.text;
      return collectText(n.children);
    })
    .join('');
}

/** Maps Strapi blocks to `<p>` elements; ignores unknown block types for forward compatibility. */
function renderBlocks(blocks: StrapiBlock[] | null | undefined) {
  if (!blocks?.length) return null;
  return blocks.map((block, i) => {
    if (block.type === 'paragraph') {
      const text = collectText(block.children);
      if (!text.trim()) return null;
      return (
        <p key={i} className={styles.para}>
          {text}
        </p>
      );
    }
    return null;
  });
}

export function AboutSection(props: SectionsAbout) {
  const { title, description, image } = props;
  const src = strapiImageSrc(image);

  return (
    <SectionWrapper title={title} titleId="about-heading" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <div className={styles.body}>{renderBlocks(description)}</div>
        </div>
        {src ? (
          <div className={styles.media}>
            <Image
              src={src}
              alt=""
              width={480}
              height={360}
              className={styles.mediaImg}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
