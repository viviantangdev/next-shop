import { Headphones, RefreshCw, Shield, Truck } from 'lucide-react';

export type BenefitItem = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

export const BenefitItems: BenefitItem[] = [
  {
    icon: <Truck className='w-8 h-8 text-amber-500' />,
    title: 'Free shipping',
    subtitle: 'On all orders over $50',
  },
  {
    icon: <RefreshCw className='w-8 h-8 text-amber-500' />,
    title: '30-Day Returns',
    subtitle: 'No questions asked',
  },
  {
    icon: <Shield className='w-8 h-8 text-amber-500' />,
    title: 'Secure Payment',
    subtitle: '100% protected',
  },
  {
    icon: <Headphones className='w-8 h-8 text-amber-500' />,
    title: '24/7 Support',
    subtitle: 'We’re here to help',
  },
];
