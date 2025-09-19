import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/app-layout';
import { PT_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'StudyFirst',
  description: 'Your first-year BE study companion',
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ptSans.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://picsum.photos" />
      </head>
      <body className="font-body antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
