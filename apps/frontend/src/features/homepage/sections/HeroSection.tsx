/**
 * Renders the `sections.hero` dynamic-zone block: title, optional background image (`next/image`),
 * and a non-interactive placeholder echoing Strapi `searchPlaceholder` (wire a client search later).
 */

import Image from 'next/image';

import { SectionWrapper } from '@/components/layout/SectionWrapper/SectionWrapper';
import type { SectionsHero } from '@/features/homepage/model/homepage.types';
import { strapiImageSrc } from '@/lib/strapi-media';

import styles from './HeroSection.module.scss';

export function HeroSection(props: SectionsHero) {
  const { title, searchPlaceholder, backgroundImage } = props;
  const bgUrl = strapiImageSrc(backgroundImage);

  return (
    <section
      className={`${styles.hero} ${bgUrl ? '' : styles.heroFallback}`}
      aria-labelledby="homepage-hero-title"
    >
      {bgUrl ? (
        <>
          <Image
            className={styles.bg}
            src={bgUrl}
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.scrim} aria-hidden />
        </>
      ) : null}
      <SectionWrapper titleId="homepage-hero-title" className={styles.innerWrap}>
        <div className={styles.inner}>
          {title ? (
            <h1 id="homepage-hero-title" className={styles.title}>
              {title}
            </h1>
          ) : null}
          {searchPlaceholder ? (
            <p className={styles.searchLabel}>
              <span className={styles.visuallyHidden}>Search</span>
              <span className={styles.searchFakeInput} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/icons/search.svg" alt="" aria-hidden="true" className={styles.searchIcon} />
                <span className="input-text">{searchPlaceholder}</span>
              </span>
            </p>
          ) : null}
        </div>
      </SectionWrapper>
    </section>
  );
}
