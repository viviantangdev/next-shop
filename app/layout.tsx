import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '../components/navbar/Navbar';
import './globals.css';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import BackToTop from '@/components/BackToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextShop',
  description: 'NextShop - E-commerce shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Navbar />
        <main className='min-h-screen'>{children}</main>
        <Footer/>
        <ScrollToTop />
        <BackToTop />
      </body>
    </html>
  );
}
