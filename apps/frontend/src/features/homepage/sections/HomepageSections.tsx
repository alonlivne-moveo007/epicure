/**
 * Homepage layout shell: iterates CMS `sections` and delegates each entry to `renderSection`.
 * Server Component (no `'use client'`) so the tree stays compatible with RSC data from `getHomepage`.
 */

import type { HomepageSection } from '@/features/homepage/model/homepage.types';

import { renderSection } from './section-registry';

import styles from './HomepageSections.module.scss';

export function HomepageSections(props: {
  sections: HomepageSection[];
}) {
  const { sections } = props;

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
}
