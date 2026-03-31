'use client';

import Image from 'next/image';

import styles from './MobileMenu.module.scss';

const PRIMARY_LINKS = ['Restaurants', 'Chefs'];
const SECONDARY_LINKS = ['Contact Us', 'Terms of Use', 'Privacy Policy'];

/** Stable id for `aria-controls` on the header hamburger button. */
export const MOBILE_MENU_ID = 'mobile-menu';

export type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
      aria-hidden={!open}
    >
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close menu"
          onClick={onClose}
        >
          <Image src="/assets/icons/x.svg" alt="" width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      <nav id={MOBILE_MENU_ID} className={styles.nav} aria-label="Mobile navigation">
        <ul className={styles.list}>
          {PRIMARY_LINKS.map((label) => (
            <li key={label}>
              <a href="#" className={`${styles.link} h2`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.divider} role="presentation" />
        <ul className={styles.list}>
          {SECONDARY_LINKS.map((label) => (
            <li key={label}>
              <a href="#" className={`${styles.link} h2`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
