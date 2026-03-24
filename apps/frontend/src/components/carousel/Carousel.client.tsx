'use client';

import { Children, type ReactNode } from 'react';
import { useRef } from 'react';

import styles from './Carousel.module.scss';

export type CarouselProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
};

/**
 * Lightweight reusable horizontal carousel with scroll-snap and optional arrow controls.
 */
export function Carousel(props: CarouselProps) {
  const { children, ariaLabel, className } = props;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slides = Children.toArray(children);

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth * 0.86, 240) * direction;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.arrow}
        aria-label="Scroll carousel left"
        onClick={() => scrollByPage(-1)}
      >
        &#8249;
      </button>

      <div
        ref={trackRef}
        className={styles.track}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        {slides.map((child, index) => (
          <div key={index} className={styles.slide}>
            {child}
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        aria-label="Scroll carousel right"
        onClick={() => scrollByPage(1)}
      >
        &#8250;
      </button>
    </div>
  );
}
