import { ShoppingCart } from 'lucide-react';
interface CartButtonProps {
  onClick: () => void;
}
export default function CartButton({ onClick }: CartButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='group primary-button flex justify-center items-center gap-2 w-full'
    >
      <ShoppingCart size={15} className='transition-all duration-400 group-hover:stroke-3'/>
      <span>Add to cart</span>
    </button>
  );
}
