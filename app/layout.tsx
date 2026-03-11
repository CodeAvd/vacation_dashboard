import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Sora } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  preload: false,
  variable: '--font-display',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  preload: true,
  weight: ['400', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'VCS - Operational dashboard for bugs and feedback',
  description:
    'Bug-first product dashboard for Vacation Cafe Simulator built from Steam, Discord, YouTube, and compiled research signals.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#faf7f2',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${sora.variable} ${plexSans.variable} bg-background font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
