import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'StudyFirst',
  description: 'Your first-year BE study companion',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://picsum.photos" />
      </head>
      <body className="font-body antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
