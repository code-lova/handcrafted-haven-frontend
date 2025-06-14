import React from "react";

const Hero = () => {
  return (
    <section className="text-center px-6 py-20 bg-terracotta text-white">
      <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">
        Welcome to Handcrafted Haven
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Discover unique, artisan-made goods crafted with care and creativity.
      </p>
      <button className="mt-6 px-6 py-3 rounded-md bg-ctaBtn hover:bg-ctaBtnHover text-white font-medium cursor-pointer">
        Explore Marketplace
      </button>
    </section>
  );
};

export default Hero;
