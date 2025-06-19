"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import useSignOut from "@/utils/logoutHandler";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

const SellerNavbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const toggleDrawer = () => setIsOpen(!isOpen);

  const { handleSignOut } = useSignOut();

  return (
    <header className="bg-olive text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Desktop Menu */}
        <Link href="/seller" className="text-xl font-playfair font-bold">
          Seller Dashboard
        </Link>
        <nav className="hidden md:flex space-x-6 font-medium">
          {status === "authenticated" && session?.user?.role === "buyer" ? (
            <>
              <Link href="/buyer" className="hover:text-gold">
                Dashboard
              </Link>
              <Link href="/story" className="hover:text-gold">
                Shop
              </Link>
              <Link href="/buyer/orders" className="hover:text-gold">
                Orders
              </Link>
              <Link href="/buyer/profile" className="hover:text-gold">
                My Profile
              </Link>
              <Link href="/cart" className="relative hover:text-gold">
                🛒Cart
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-4 text-xs bg-gold text-white px-1.5 py-0.2 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link href="/seller" className="hover:text-gold">
                Dashboard
              </Link>
              <Link href="/seller/story" className="hover:text-gold">
                Stories
              </Link>
              <Link href="/seller/category" className="hover:text-gold">
                Category
              </Link>
              <Link href="/seller/orders" className="hover:text-gold">
                Orders
              </Link>
              <Link href="/seller/profile" className="hover:text-gold">
                My Profile
              </Link>
            </>
          )}

          <button
            className="hover:text-gold cursor-pointer"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={toggleDrawer}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-olive text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50 shadow-lg`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleDrawer}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6 font-medium">
          {status === "authenticated" && session?.user?.role === "buyer" ? (
            <>
              <Link href="/buyer" onClick={toggleDrawer}>
                Dashboard
              </Link>
              <Link href="/story" onClick={toggleDrawer}>
                Shop
              </Link>
              <Link href="/buyer/orders" onClick={toggleDrawer}>
                Orders
              </Link>
              <Link href="/buyer/profile" onClick={toggleDrawer}>
                My Profile
              </Link>
              <Link href="/cart" onClick={toggleDrawer}>
                🛒Cart
                {cart.length > 0 && (
                  <span className="ml-1 text-xs bg-gold text-white px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link href="/seller" onClick={toggleDrawer}>
                Dashboard
              </Link>
              <Link href="/seller/story" onClick={toggleDrawer}>
                Stories
              </Link>
              <Link href="/seller/category" onClick={toggleDrawer}>
                Category
              </Link>
              <Link href="/seller/orders" onClick={toggleDrawer}>
                Orders
              </Link>
              <Link href="/seller/profile" onClick={toggleDrawer}>
                My Profile
              </Link>
              <Link href="/seller/orders" onClick={toggleDrawer}>
                Orders
              </Link>
            </>
          )}

          <p onClick={handleSignOut}>Logout</p>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40"
        />
      )}
    </header>
  );
};

export default SellerNavbar;
