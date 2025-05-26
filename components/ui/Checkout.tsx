"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const router = useRouter();
  const { id } = useParams();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/success");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg border">
        <h2 className="text-3xl font-playfair font-bold mb-8 text-center text-olive">
          Checkout
        </h2>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="flex-shrink-0 w-full md:w-1/2 h-56 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image
              src="/image1.jpeg"
              alt={`Product #${id}`}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <div className="flex-grow">
            <h3 className="text-xl font-playfair font-semibold mb-2">
              Handmade Item #{id}
            </h3>
            <p className="text-gray-700 mb-2">
              This handcrafted item is made by local artisans with care and
              love.
            </p>
            <p className="text-lg font-semibold text-olive">$29.99</p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Select Payment Method
            </label>
            <select
              className="w-full border px-4 py-3 rounded-lg"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Pay on Delivery</option>
              <option value="card">Pay with Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-olive text-white py-3 px-6 rounded-xl font-medium hover:bg-gold transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
