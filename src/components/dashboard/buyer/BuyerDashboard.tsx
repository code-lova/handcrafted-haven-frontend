"use client";
import React from "react";
import { useUserContext } from "@/context/userContext";
import LoadingSpinner from "@/components/core/spinner/LoadingSpinner";
import SellerNavbar from "../seller/SellerNavbar";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const BuyerDashboard = () => {
  const { user, isLoading } = useUserContext();
  const { cart } = useCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <SellerNavbar />
      <div className="p-12">
        <h1 className="text-3xl font-playfair mb-6">Welcome Back Buyer! 🎉</h1>
        <div>
          {user && (
            <div className="mb-8 font-medium text-xl text-gray-700">
              Hello, <span className="font-bold text-olive">{user.name}</span>{" "}
              👋
            </div>
          )}
        </div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-600">🛒 Items in Cart</h2>
            <p className="text-2xl font-bold text-olive mt-2">{cart.length}</p>
            <Link href="/cart" className="text-sm text-gold underline mt-2 inline-block">View Cart</Link>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-600">📦 Orders</h2>
            <p className="text-2xl font-bold text-olive mt-2">5</p>
            <Link href="/orders" className="text-sm text-gold underline mt-2 inline-block">View Orders</Link>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-600">✉️ Messages</h2>
            <p className="text-2xl font-bold text-olive mt-2">2</p>
            <Link href="/messages" className="text-sm text-gold underline mt-2 inline-block">View Messages</Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">🧾 Recent Orders</h2>
          <p className="text-sm text-gray-500">You haven’t made any orders yet. Start shopping now!</p>
        </div>

        {/* Suggested Products */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <p className="font-medium">Handmade Bracelet</p>
              <p className="text-sm text-gray-500">Beautiful artisan design.</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="font-medium">Woven Basket</p>
              <p className="text-sm text-gray-500">Perfect for gifts.</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="font-medium">Clay Mug</p>
              <p className="text-sm text-gray-500">Eco-friendly and stylish.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BuyerDashboard;
