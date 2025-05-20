"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-playfair font-bold text-[#4A5A40]">
          Handcrafted Haven
        </div>

        <div className="hidden md:flex items-center space-x-6 text-[#3C2F2F] font-medium">
          <Link href="/" className="hover:text-[#4A5A40]">Home</Link>
          <Link href="/shop" className="hover:text-[#4A5A40]">Shop</Link>
          <Link href="/login" className="hover:text-[#4A5A40]">Login</Link>
          <Link href="/signup" className="hover:text-[#4A5A40]">SignUp</Link>
        </div>

        <button
          className="md:hidden text-[#4A5A40]"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col gap-4 font-medium text-[#3C2F2F] md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={toggleDrawer} className="self-end">
            <X size={28} />
          </button>
          <a href="#" onClick={toggleDrawer}>Home</a>
          <a href="#" onClick={toggleDrawer}>Shop</a>
          <a href="#" onClick={toggleDrawer}>About</a>
          <a href="#" onClick={toggleDrawer}>Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
