import { ProductType } from '@/lib/types';
import { use } from 'react';

interface DiscountedProductsProps {
  items: Promise<ProductType[]>;
}
export default function DiscountedProducts({ items }: DiscountedProductsProps) {
  const discountedProducts = use(items);
  console.log(discountedProducts);
  return (
    <div>
      {discountedProducts.map((p, i) => (
        <div key={i}>
          <p>{p.title}</p>
          <p>{Math.round(p.discountPercentage)}%</p>
          <p>{p.discountPercentage}%</p>
        </div>
      ))}
    </div>
  );
}
