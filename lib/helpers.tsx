import { format } from 'date-fns';
import { CartItem } from './cart';

export function formatDate(dateString: string) {
  return format(new Date(dateString), 'yyyy-MM-dd');
}

export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function totalSum(items: CartItem[]): string {
  const total: number = items.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0
  );
  return total.toFixed(2);
}
