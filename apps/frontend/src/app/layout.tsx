/**
 * Root App Router layout for `@epicure/frontend`: global styles, document shell, default metadata.
 * Feature routes can override `metadata` or add nested layouts under `app/`.
 */

import './global.scss';
import { Header } from '../components/layout/Header/Header';
import { Footer } from '../components/layout/Footer/Footer';

/** Default document metadata (override in nested layouts or `page.tsx` as needed). */
export const metadata = {
  title: 'Epicure',
  description: 'Epicure web application',
};

/**
 * Root layout: applies global styles and wraps all pages in the HTML document shell.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
