import './global.scss';

/** Default document metadata for the Epicure Next.js app (override in nested layouts or pages as needed). */
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
