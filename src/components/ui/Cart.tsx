"use client";
import React from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import Footer from "../Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Clickbutton from "../core/button/ClickButton";
import { Trash2 } from "lucide-react";
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
      <Hero />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-playfair font-semibold mb-6">
          {cart.length > 0
            ? "Stories in Your Cart"
            : "Your Cart is Currently Empty"}
        </h2>

        {cart.length > 0 && (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow p-4 gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-[50%]">
                  <Image
                    src={item.product.files?.[0]?.secure_url || "/image1.jpeg"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-olive font-medium">
                      ${(item.product.price || 0).toFixed(2)} per item
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.product._id)}
                    disabled={item.quantity === 1}
                    // className="bg-gray-200 px-3 py-1 rounded text-xl font-bold hover:bg-gray-300"
                    className={`px-4 py-2 rounded-lg ${
                      item.quantity === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.product, 1)}
                    className="bg-gray-200 px-3 py-1 rounded text-xl font-bold hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="text-right w-[120px]">
                  <p className="text-lg font-semibold">
                    $
                    {(item.product.price * item.quantity).toFixed(2) ||
                      0 * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <div className="mt-8 text-right">
              <p className="text-xl font-bold text-rich-brown">
                Subtotal: ${getSubtotal().toFixed(2)}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <Clickbutton
                type="button"
                onClick={handleUser}
                text="Proceed to Checkout"
                className="bg-olive hover:bg-gold"
                disabled={status === "loading"}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
