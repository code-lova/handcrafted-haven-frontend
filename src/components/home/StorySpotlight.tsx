"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";

const StorySpotlight = () => {
  const { data: stories, isLoading } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getAllStories,
    refetchOnWindowFocus: false,
  });

  const spotlight = (stories ?? [])
    .filter((s) => s.status === "active" && s.description)
    .sort((a, b) => (b.description?.length ?? 0) - (a.description?.length ?? 0))[0];

  if (!isLoading && !spotlight) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-playfair font-semibold text-rich-brown text-center mb-10">
        Behind the Craft
      </h2>

      {isLoading || !spotlight ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-pulse">
          <div className="h-80 rounded-2xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-1/3 bg-gray-100 rounded" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={spotlight.files[0]?.secure_url || "/image1.jpeg"}
              alt={spotlight.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-terracotta uppercase tracking-wide">
              Maker Spotlight
            </p>
            <h3 className="text-2xl font-playfair font-semibold text-rich-brown mt-2">
              {spotlight.name}
            </h3>
            <p className="text-muted mt-4 leading-relaxed line-clamp-5">
              {spotlight.description}
            </p>
            <Link
              href={`/story/${spotlight.uuid}`}
              className="inline-block mt-6 text-olive font-medium hover:text-terracotta"
            >
              Read the full story &rarr;
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default StorySpotlight;
