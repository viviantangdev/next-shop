import { format } from "date-fns";

export function formatDate(dateString: string) {
  return format(new Date(dateString), "yyyy-MM-dd");
}

export function toTitleCase(str: string): string {
  if (!str) return "";
  return str
      .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function discountedPrice(price: number, discountPercentage: number): string {
  const discounted = price * (1 - discountPercentage / 100);
  return discounted.toFixed(2);
}