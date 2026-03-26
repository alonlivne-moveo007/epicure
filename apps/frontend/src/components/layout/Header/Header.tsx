import Image from 'next/image';

import styles from './Header.module.scss';

const NAV_LINKS = ['Restaurants', 'Chefs'];

export function Header() {
  return (
    <header className={styles.header}>
      {/* Mobile: hamburger (left) */}
      <button type="button" className={styles.hamburger} aria-label="Open menu">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
          <rect y="0" width="22" height="2" fill="currentColor" />
          <rect y="7" width="22" height="2" fill="currentColor" />
          <rect y="14" width="22" height="2" fill="currentColor" />
        </svg>
      </button>

      {/* Mobile: logo (center) */}
      <span className={styles.logoMobile} aria-label="Epicure">
        <Image
          src="/assets/logo-mobile.svg"
          alt="Epicure"
          width={33}
          height={32}
          priority
        />
      </span>

      {/* Desktop: logo (left) */}
      <span className={styles.logoDesktop} aria-label="Epicure">
        <Image
          src="/assets/logo-desktop.svg"
          alt="Epicure"
          width={162}
          height={33}
          priority
        />
      </span>

      {/* Desktop: navigation links (center) */}
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <span key={link} className={`${styles.navLink} button-text`}>
            {link}
          </span>
        ))}
      </nav>

      {/* Icons (right — shown on both desktop and mobile) */}
      <div className={styles.icons}>
        <button type="button" className={styles.iconBtn} aria-label="Search">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/search.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Account">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/user.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Cart">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/bag.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>
      </div>
    </header>
  );
}
