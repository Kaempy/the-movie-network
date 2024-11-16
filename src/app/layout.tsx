import type { Metadata } from 'next';
import { Libre_Baskerville as Baskerville, Lato } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const baskerville = Baskerville({
  variable: '--font-baskerville',
  weight: '400',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
});
const lato = Lato({
  variable: '--font-lato',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Movie Network',
  description:
    'Dive into a world of movies, explore genres, and discover your next favorite film.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baskerville.variable} ${lato.variable} ${lato.className} antialiased`}
      >
        <Toaster closeButton richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
