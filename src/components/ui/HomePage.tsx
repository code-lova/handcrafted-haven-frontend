import React from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import Footer from "../Footer";
import Link from "next/link";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Featured Products */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-playfair font-semibold mb-10 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Link
              key={item}
              href={`/products/${item}`}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                <div className="h-48 bg-white rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gold font-semibold">Product Image</span>
                </div>
                <h3 className="text-xl font-playfair mb-2">
                  Handmade Item #{item}
                </h3>
                <p className="text-olive font-medium">$29.99</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 py-16 bg-olive text-white">
        <h2 className="text-3xl font-playfair font-semibold mb-6 text-center">
          Our Mission
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg">
          At Handcrafted Haven, our mission is to uplift artisans by offering a
          platform to share their stories and sell their creations. We believe
          in sustainable living, creative expression, and the power of
          community.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
