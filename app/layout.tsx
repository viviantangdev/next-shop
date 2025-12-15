import BackToTopButton from '@/components/buttons/BackToTopButton';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { CartProvider } from '@/context/CartContext';
import { CartDrawerProvider } from '@/context/CartDrawerContext';
import { SearchProvider } from '@/context/SearchContext';
import { ToastProvider } from '@/context/ToastContext';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import Navbar from '../components/navbar/Navbar';
import './globals.css';
import { FavoritesProvider } from '@/context/FavoritesContext';

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
            <CartProvider>
              <FavoritesProvider>
                <SearchProvider>
                  <Navbar />
                  {children}
                  <Footer />
                  <ScrollToTop />
                  <BackToTopButton />
                  <CartDrawer />
                  <Toaster position='top-center' duration={3000} />
                </SearchProvider>
              </FavoritesProvider>
            </CartProvider>
          </ToastProvider>
        </CartDrawerProvider>
      </body>
    </html>
  );
}
