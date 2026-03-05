import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import './globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: 'PropMarketHub — Free Property Investment Tools for Australia',
    template: '%s | PropMarketHub',
  },
  description:
    'PropMarketHub brings together practical property investment tools — suburb scorecard, mortgage calculator, stamp duty estimator, and rental yield planner — in one platform.',
  metadataBase: new URL('https://propmarkethub.com.au'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'PropMarketHub',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en-AU">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
