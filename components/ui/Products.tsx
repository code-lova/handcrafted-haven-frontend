import React from "react";
import ProductSidebar from "../ProductSidebar";
import Navbar from "../Navbar";
import Image from "next/image";
import Hero from "../Hero";
import Footer from "../Footer";

const Products = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-26 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <ProductSidebar />

        {/* Product Grid */}
        <section>
          <h2 className="text-2xl font-playfair font-semibold mb-6">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <div className="h-48 bg-[#F5F3EF] rounded-md mb-4 flex items-center justify-center">
                  <Image
                    src="/image1.jpeg"
                    alt="Product"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-playfair mb-2">
                  Handmade Item #{item}
                </h3>
                <p className="text-[#4A5A40] font-semibold">$29.99</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Products;
