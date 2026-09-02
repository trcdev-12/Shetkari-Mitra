import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shetkari Mitra — Your Farm Friend',
  description: 'A friendly daily plant health dashboard for farmers.',
  openGraph: {
    title: 'Shetkari Mitra — Your Farm Friend',
    description: 'Your farm friend for healthier crops.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Shetkari Mitra farm dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shetkari Mitra — Your Farm Friend',
    description: 'Your farm friend for healthier crops.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
