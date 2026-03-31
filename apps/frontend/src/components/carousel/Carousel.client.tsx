'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { Children, type KeyboardEvent, type ReactNode } from 'react';

import styles from './Carousel.module.scss';

export type CarouselProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  /** Extra class applied to every slide — use for per-instance slide width overrides. */
  slideClassName?: string;
};

export function Carousel({ children, ariaLabel, className, slideClassName }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const slides = Children.toArray(children);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
    if (e.key === 'ArrowRight') emblaApi?.scrollNext();
  };

  return (
    <div
      ref={emblaRef}
      className={[styles.viewport, className].filter(Boolean).join(' ')}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.track}>
        {slides.map((child, i) => (
          <div
            key={i}
            className={[styles.slide, slideClassName].filter(Boolean).join(' ')}
            role="group"
            aria-roledescription="slide"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
