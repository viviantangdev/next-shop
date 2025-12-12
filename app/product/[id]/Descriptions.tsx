import { ProductType } from '@/lib/product';
import { use } from 'react';

interface DescriptionsProps {
  item: Promise<ProductType>;
}

export default function Descriptions({ item }: DescriptionsProps) {
  const product = use(item);
  return (
    <section className='flex flex-col gap-5'>
      <h3 className='text-xl'>Details</h3>
      <div className='flex flex-col gap-3' >
        <div className='flex flex-col gap-0.5'>
          <p className='font-semibold'>Description:</p>
          <p>{product.description}</p>
        </div>
        <div>
          <DetailItem title='Brand' text={product.brand} />
          <DetailItem title='Dimentions' text={`${product.dimensions.height} x ${product.dimensions.width} x ${product.dimensions.depth} cm`} />
          <DetailItem title='Weigth' text={`${product.weight} kg`} />
          <DetailItem title='Article nr' text={product.sku} />
        </div>
      </div>
    </section>
  );
}

const DetailItem = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className='flex gap-2'>
      <span className='font-semibold'>{title}:</span>
      <span>{text}</span>
    </div>
  );
};
