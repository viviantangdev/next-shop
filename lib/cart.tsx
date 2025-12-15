import { ProductType } from './product';

export interface CartItem {
  product: ProductType;
  quantity: number;
}

const CART_STORAGE_KEY = 'shopping-cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
}

export function saveCart(cartItems: CartItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

export function addItemToCart(
  product: ProductType,
  quantity: number = 1
): CartItem[] {
  const cart = getCart();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
  getCart();
  return cart;
}

export function removeItemFromCart(productId: number): CartItem[] {
  const cart = getCart();
  const filteredCart = cart.filter((item) => item.product.id !== productId);
  saveCart(filteredCart);
  getCart();
  return filteredCart;
}

export function updateItemQuantity(
  productId: number,
  quantity: number
): CartItem[] {
  const cart = getCart();
  const item = cart.find((item) => item.product.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeItemFromCart(productId);
    }
    item.quantity = quantity;
  }

  saveCart(cart);
  getCart();
  return cart;
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
}
