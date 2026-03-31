/**
 * Renders `sections.about`: Strapi `blocks` copy is flattened to paragraphs; optional side image.
 * Extend `renderBlocks` if you add headings or links in the CMS rich text.
 *
 * Mobile order  : logo → store buttons → title → body
 * Desktop order : [title + body + store buttons] | [logo]
 */

import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type { StrapiBlockChildDto, StrapiBlockDto } from '@epicure/strapi-dto';
import type { SectionsAbout } from '@/features/homepage/model/homepage.types';

import styles from './AboutSection.module.scss';

/** Depth-first text extraction for Strapi block `children` trees (MVP: paragraph + text nodes). */
function collectText(nodes: StrapiBlockChildDto[] | undefined): string {
  if (!nodes?.length) return '';
  return nodes
    .map((n) => {
      if (n.type === 'text' && typeof n.text === 'string') return n.text;
      return collectText(n.children);
    })
    .join('');
}

/** Maps Strapi blocks to `<p>` elements; ignores unknown block types for forward compatibility. */
function renderBlocks(blocks: StrapiBlockDto[] | null | undefined) {
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
      {/* No title prop — we render the h2 manually inside the layout
          so we can reorder it on mobile via CSS flex order */}
      <SectionWrapper titleId="about-heading" className={styles.section}>
        <div className={styles.layout}>

          {/* ── Logo ── order 1 on mobile, right column on desktop */}
          <div className={styles.logoWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/about-logo-mobile.svg"
              alt="Epicure"
              className={`${styles.logo} ${styles.logoMobile}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/about-logo.svg"
              alt="Epicure"
              className={`${styles.logo} ${styles.logoDesktop}`}
            />
          </div>

          {/* ── Store buttons ── order 2 on mobile */}
          <div className={styles.storeButtons}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/store-googleplay.svg"
              alt="Get it on Google Play"
              className={styles.storeBtn}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/store-appstore.svg"
              alt="Download on the App Store"
              className={styles.storeBtn}
            />
          </div>

          {/* ── Title ── order 3 on mobile, top of left column on desktop */}
          {title ? (
            <h2 id="about-heading" className={styles.title}>
              {title}
            </h2>
          ) : null}

          {/* ── Body copy ── order 4 on mobile */}
          <div className={styles.body}>{renderBlocks(description)}</div>

        </div>
      </SectionWrapper>
    </div>
  );
}
