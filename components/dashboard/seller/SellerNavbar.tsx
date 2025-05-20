"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const SellerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <header className="bg-olive text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-xl font-playfair font-bold">
          Seller Dashboard
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link href="/dashboard/create-story" className="hover:text-gold">
            Create Story
          </Link>
          <Link href="/dashboard/profile" className="hover:text-gold">
            My Profile
          </Link>
          <button className="hover:text-gold">Logout</button>
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
          <Link href="/dashboard/create-story" onClick={toggleDrawer}>
            Create Story
          </Link>
          <Link href="/dashboard/profile" onClick={toggleDrawer}>
            My Profile
          </Link>
          <Link href="#" onClick={toggleDrawer}>
            Logout
          </Link>
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
