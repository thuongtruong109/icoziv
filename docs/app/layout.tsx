import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Icoziv — Build your tech stack badge',
    template: '%s · Icoziv',
  },
  description:
    'Compose a beautiful, edge-fast skill icon badge for your README, portfolio or documentation.',
  applicationName: 'Icoziv',
  keywords: ['skill icons', 'README badges', 'developer icons', 'tech stack'],
  authors: [{ name: 'Icoziv contributors' }],
  openGraph: {
    title: 'Icoziv — Your tech stack, composed beautifully',
    description: 'Pick your tools and copy one polished SVG badge.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

const themeScript = `
  try {
    const stored = localStorage.getItem('icoziv-theme-preference');
    const theme = stored === 'light' || stored === 'dark'
      ? stored
      : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      className={GeistSans.variable}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      {/* Browser extensions may add body attributes before React hydrates. */}
      <body suppressHydrationWarning>
        <Script id="icoziv-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
