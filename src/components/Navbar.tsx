"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import useSignOut from "@/utils/logoutHandler";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const { handleSignOut } = useSignOut();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-playfair font-bold text-olive">
          Handcrafted Haven
        </div>

        <div className="hidden md:flex items-center space-x-6 text-rich-brown font-medium">
          <Link href="/" className="hover:text-[#4A5A40]">
            Home
          </Link>
          <Link href="/story" className="hover:text-olive">
            Shop
          </Link>
          <Link href="/about" className="hover:text-olive">
            About
          </Link>
          <Link href="/contact" className="hover:text-olive">
            Contact
          </Link>
          {status === "authenticated" ? (
            <>
              <Link href="/buyer" className="hover:text-olive">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:text-red-600 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-olive">
                Login
              </Link>
              <Link href="/signup" className="hover:text-olive">
                SignUp
              </Link>
            </>
          )}
          <Link href="/cart" className="relative hover:text-olive">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-gold text-white px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <button
          className="md:hidden text-olive"
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
          <Link href="/" onClick={toggleDrawer}>
            Home
          </Link>
          <Link href="/story" onClick={toggleDrawer}>
            Shop
          </Link>
          <Link href="/about" onClick={toggleDrawer}>
            About
          </Link>
          <Link href="/contact" onClick={toggleDrawer}>
            Contact
          </Link>
          {status === "authenticated" ? (
            <>
              <Link href="/buyer" onClick={toggleDrawer}>
                Dashboard
              </Link>
              <button
                onClick={() => {
                  toggleDrawer();
                  handleSignOut();
                }}
                className="text-left hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={toggleDrawer}>
                Login
              </Link>
              <Link href="/signup" onClick={toggleDrawer}>
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
