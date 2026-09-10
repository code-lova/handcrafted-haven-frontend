"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  const { data: stories } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getAllStories,
    refetchOnWindowFocus: false,
  });

  const collage = (stories ?? []).filter((s) => s.files?.[0]?.secure_url).slice(0, 4);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
            <Sparkles size={16} />
            Handmade by real people, not factories
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-rich-brown leading-tight">
            Find a piece with a story behind it.
          </h1>

          <p className="mt-6 text-lg text-muted max-w-xl">
            Handcrafted Haven connects you directly with independent artisans.
            Every item is made by hand, in small batches, by someone you can
            actually get to know — no middlemen, no mass production.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/story"
              className="text-center px-6 py-3 rounded-md bg-terracotta hover:bg-terracotta-dark text-white font-medium transition"
            >
              Explore the Marketplace
            </Link>
            <Link
              href="/signup"
              className="text-center px-6 py-3 rounded-md border border-olive text-olive hover:bg-olive hover:text-white font-medium transition"
            >
              Sell Your Craft
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm text-muted">
            <div>
              <p className="text-2xl font-playfair font-semibold text-rich-brown">100%</p>
              <p>Independent makers</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-playfair font-semibold text-rich-brown">1:1</p>
              <p>Direct buyer &amp; artisan connection</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {collage.length > 0
            ? collage.map((story, idx) => (
                <div
                  key={story._id}
                  className={`relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm ${
                    idx === 0 ? "col-span-2 h-56" : "h-40"
                  }`}
                >
                  <Image
                    src={story.files[0].secure_url}
                    alt={story.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))
            : Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl bg-gradient-to-br from-olive/15 to-terracotta/15 ${
                    idx === 0 ? "col-span-2 h-56" : "h-40"
                  }`}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
