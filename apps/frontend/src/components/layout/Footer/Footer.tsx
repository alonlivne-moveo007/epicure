import styles from './Footer.module.scss';

const FOOTER_LINKS = ['Contact Us', 'Term of Use', 'Privacy Policy'];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        {FOOTER_LINKS.map((label) => (
          <li key={label}>
            <span className={`${styles.link} button-text`}>{label}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
}
