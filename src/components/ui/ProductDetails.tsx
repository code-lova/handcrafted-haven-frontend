"use client";
import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hero from "../Hero";

const ProductDetail = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;


  const handleBuy = () => {
    router.push(`/checkout/${productId}`);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
            <Image
              src="/image1.jpeg"
              alt="Handmade Product"
              width={400}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-playfair font-bold mb-4">
              Handmade Item #{productId}
            </h1>
            <p className="text-olive text-xl font-semibold mb-2">$29.99</p>
            <p className="text-gray-700 mb-6">
              This beautifully handcrafted vase is perfect for your living room
              or workspace. Made with love by local artisans.
            </p>
            <button
              onClick={handleBuy}
              className="bg-olive cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-gold transition"
            >
              Buy Product
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-playfair font-semibold mb-6">
            Leave a Review
          </h2>
          <form className="grid gap-4 max-w-xl">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-lg px-4 py-2"
            />
            <textarea
              rows={4}
              placeholder="Your Review"
              className="border rounded-lg px-4 py-2"
            ></textarea>
            <button
              type="submit"
              className="bg-olive text-white px-6 py-2 rounded-lg hover:bg-gold transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
