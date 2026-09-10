"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import PageHeader from "../core/PageHeader";
import Footer from "../Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Clickbutton from "../core/button/ClickButton";
import { Trash2, Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { data: session, status } = useSession();
  
  const { cart, removeFromCart, decreaseQuantity, addToCart, getSubtotal } =
    useCart();
  const navigate = useRouter();

  const handleUser = () => {
    if (status === "loading") return;
    if (!session?.user) {
      navigate.push("/login");
    } else {
      navigate.push("/checkout");
    }
  };

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Shopping Cart"
        title={cart.length > 0 ? "Your Cart" : "Your Cart is Empty"}
      />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {cart.length > 0 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 rounded-xl shadow-sm p-4 gap-4"
                >
                  <div className="flex items-center gap-4 w-full md:w-[45%]">
                    <Image
                      src={item.product.files?.[0]?.secure_url || "/image1.jpeg"}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover w-20 h-20"
                    />
                    <div>
                      <h3 className="font-semibold text-rich-brown">
                        {item.product.name}
                      </h3>
                      <p className="text-muted text-sm mt-1">
                        ${(item.product.price || 0).toFixed(2)} per item
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      onClick={() => decreaseQuantity(item.product._id)}
                      disabled={item.quantity === 1}
                      className="p-2 text-muted hover:text-rich-brown disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.product, 1)}
                      disabled={item.quantity >= 10}
                      className="p-2 text-muted hover:text-rich-brown disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right w-[100px]">
                    <p className="font-semibold text-terracotta">
                      ${((item.product.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-muted hover:text-red-600 cursor-pointer transition"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
              <Link
                href="/story"
                className="text-terracotta font-medium hover:text-terracotta-dark"
              >
                &larr; Continue Shopping
              </Link>
              <div className="flex items-center gap-6">
                <p className="text-xl font-bold text-rich-brown">
                  Subtotal: ${getSubtotal().toFixed(2)}
                </p>
                <Clickbutton
                  type="button"
                  onClick={handleUser}
                  text="Proceed to Checkout"
                  disabled={status === "loading"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center bg-olive/5 rounded-2xl py-20 px-6">
            <p className="text-muted mb-6 max-w-sm mx-auto">
              Nothing here yet. Browse the marketplace to find your next favorite piece.
            </p>
            <Link
              href="/story"
              className="inline-block px-6 py-3 rounded-md bg-terracotta hover:bg-terracotta-dark text-white font-medium transition"
            >
              Browse the Marketplace
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
