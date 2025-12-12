import BackToTopButton from '@/components/buttons/BackToTopButton';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { SearchProvider } from '@/context/SearchContext';
import { ToastProvider } from '@/context/ToastContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import Navbar from '../components/navbar/Navbar';
import './globals.css';

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
        <CartDrawerProvider>
          <ToastProvider>
            <SearchProvider>
              <Navbar />
              <main className='min-h-screen'>{children}</main>
              <Footer />
              <ScrollToTop />
              <BackToTopButton />
              <CartDrawer />
              <Toaster position='top-center' duration={3000} />
            </SearchProvider>
          </ToastProvider>
        </CartDrawerProvider>
      </body>
    </html>
  );
}
