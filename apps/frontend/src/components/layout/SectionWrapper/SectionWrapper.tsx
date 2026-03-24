import type { ReactNode } from 'react';

import styles from './SectionWrapper.module.scss';

export type SectionWrapperProps = {
  title?: string | null;
  titleId: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
};

/**
 * Shared section chrome for homepage blocks: spacing, max-width and consistent heading style.
 */
export function SectionWrapper(props: SectionWrapperProps) {
  const { title, titleId, children, footer, className, contentClassName } = props;

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(' ')}
      aria-labelledby={title ? titleId : undefined}
    >
      {title ? (
        <h2 id={titleId} className={styles.heading}>
          {title}
        </h2>
      ) : null}
      <div className={[styles.content, contentClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </section>
  );
}
