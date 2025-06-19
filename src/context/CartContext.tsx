"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { StoryProps } from "@/service/request/story/type";
import { getCartFromStorage, saveCartToStorage } from "@/utils/CartStorage";
import { CartItem } from "@/types";
import toast from "react-hot-toast";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: StoryProps, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const MAX_QUANTITY = 10;

  // Load from localStorage once
  useEffect(() => {
    const savedCart = getCartFromStorage();
    setCart(savedCart);
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (product: StoryProps, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        if (existingItem.quantity >= MAX_QUANTITY) {
          toast.error("You cannot add more than 10 of this item.");
          return prev;
        }
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          MAX_QUANTITY
        );
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, MAX_QUANTITY) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
      getSubtotal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
