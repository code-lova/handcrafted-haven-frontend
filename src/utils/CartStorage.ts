import { CartItem } from "@/types";


const CART_STORAGE_KEY = (buyerId: string) => `cart_${buyerId}`;

export const getCartFromStorage = (buyerId: string): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY(buyerId));
    if(!stored) return [];
    const allItems = JSON.parse(stored) as CartItem[];
    return allItems.filter((item) => item.buyerId === buyerId); // Only return items for this buyer
  } catch {
    return [];
  }
};

export const saveCartToStorage = (buyerId: string, cart: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY(buyerId), JSON.stringify(cart));
};