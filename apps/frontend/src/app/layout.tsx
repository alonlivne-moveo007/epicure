/**
 * Root App Router layout for `@epicure/frontend`: global styles, document shell, default metadata.
 * Feature routes can override `metadata` or add nested layouts under `app/`.
 */

import './global.scss';

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
      <body>{children}</body>
    </html>
  );
}
