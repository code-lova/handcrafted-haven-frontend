"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/service/request/category";
import { CategoryProps } from "@/service/request/category/type";

const FeaturedCategories = () => {
  const { data: categories, isLoading } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  const activeCategories = (categories ?? [])
    .filter((c) => c.status === "active")
    .slice(0, 6);

  if (!isLoading && activeCategories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-playfair font-semibold text-rich-brown">
            Shop by Category
          </h2>
          <p className="text-muted mt-2">
            Browse the marketplace by the kind of craft you&apos;re after.
          </p>
        </div>
        <Link
          href="/story"
          className="hidden sm:inline text-terracotta font-medium hover:text-terracotta-dark"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-11 w-32 rounded-full bg-gray-100 animate-pulse"
              />
            ))
          : activeCategories.map((category) => (
              <Link
                key={category._id}
                href="/story"
                className="px-5 py-2.5 rounded-full border border-olive/30 text-rich-brown font-medium hover:bg-olive hover:text-white hover:border-olive transition"
              >
                {category.name}
              </Link>
            ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
