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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Account">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M2 2h2l2.4 9.6a2 2 0 001.94 1.4h6.32a2 2 0 001.94-1.55L17.5 6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="17" r="1" fill="currentColor" />
            <circle cx="15" cy="17" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}
