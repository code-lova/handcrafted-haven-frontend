"use client";

import React, { useState } from "react";

const ProductSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <aside className="w-full md:w-64 p-4 bg-[#F5F3EF] rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Filter By</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          <option value="jewelry">Jewelry</option>
          <option value="home">Home Decor</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <div>
        <h4 className="font-medium mb-2">Price</h4>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Any</option>
          <option value="0-25">$0 - $25</option>
          <option value="25-50">$25 - $50</option>
          <option value="50-100">$50 - $100</option>
        </select>
      </div>
    </aside>
  );
};

export default ProductSidebar;
