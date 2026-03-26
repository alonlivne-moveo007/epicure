/**
 * Renders `sections.about`: Strapi `blocks` copy is flattened to paragraphs; optional side image.
 * Extend `renderBlocks` if you add headings or links in the CMS rich text.
 */

import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type {
  SectionsAbout,
  StrapiBlock,
  StrapiBlockChild,
} from '@/features/homepage/model/homepage.types';

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
        <p key={i} className={`${styles.para} body`}>
          {text}
        </p>
      );
    }
    return null;
  });
}

export function AboutSection(props: SectionsAbout) {
  const { title, description } = props;

  return (
    <div className={styles.wrapper}>
      <SectionWrapper title={title} titleId="about-heading" className={styles.section}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <div className={styles.body}>{renderBlocks(description)}</div>
            <div className={styles.storeButtons}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/icons/store-appstore.svg"
                alt="Download on the App Store"
                className={styles.storeBtn}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/icons/store-googleplay.svg"
                alt="Get it on Google Play"
                className={styles.storeBtn}
              />
            </div>
          </div>
          <div className={styles.logoWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/about-logo.svg"
              alt="Epicure"
              className={styles.logo}
            />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
