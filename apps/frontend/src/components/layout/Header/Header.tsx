'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

import { MobileMenu, MOBILE_MENU_ID } from '../MobileMenu/MobileMenu';
import styles from './Header.module.scss';

const NAV_LINKS = ['Restaurants', 'Chefs'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  return (
    <>
      <header className={`${styles.header} ${menuOpen ? styles.headerMenuOpenMobile : ''}`}>
        {!menuOpen && (
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={openMenu}
          >
            <Image
              src="/assets/icons/HAMBUR.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </button>
        )}

        <span className={styles.logoMobile} aria-label="Epicure">
          <Image
            src="/assets/logo-mobile.svg"
            alt="Epicure"
            width={33}
            height={32}
            priority
          />
        </span>

        <span className={styles.logoDesktop} aria-label="Epicure">
          <Image
            src="/assets/logo-desktop.svg"
            alt="Epicure"
            width={162}
            height={33}
            priority
          />
        </span>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <span key={link} className={`${styles.navLink} button-text`}>
              {link}
            </span>
          ))}
        </nav>

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

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
