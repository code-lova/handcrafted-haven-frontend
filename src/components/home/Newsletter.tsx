"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing! Keep an eye on your inbox.");
    setEmail("");
  };

  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-playfair font-semibold text-rich-brown mb-2">
          New pieces, every week
        </h2>
        <p className="text-muted mb-6">
          Get the newest listings and maker stories in your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-olive"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-md bg-terracotta hover:bg-terracotta-dark text-white font-medium transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
