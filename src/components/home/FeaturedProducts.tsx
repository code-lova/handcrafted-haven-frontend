"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";
import { StoryPageCardSkeleton } from "@/components/core/skeleton";

const FeaturedProducts = () => {
  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getAllStories,
    refetchOnWindowFocus: false,
  });

  const featured = (stories ?? [])
    .filter((s) => s.status === "active")
    .slice(0, 6);

  return (
    <section className="bg-olive/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-playfair font-semibold text-rich-brown">
              Fresh From the Workshop
            </h2>
            <p className="text-muted mt-2">
              New and popular pieces from makers on Handcrafted Haven.
            </p>
          </div>
          <Link
            href="/story"
            className="hidden sm:inline text-terracotta font-medium hover:text-terracotta-dark"
          >
            View all &rarr;
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <StoryPageCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <p className="text-center text-red-500 py-10">
            Couldn&apos;t load products right now. Try refreshing the page.
          </p>
        )}

        {!isLoading && !isError && featured.length === 0 && (
          <p className="text-center text-muted py-10">
            New listings are on their way — check back soon.
          </p>
        )}

        {!isLoading && !isError && featured.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((story) => (
              <Link
                key={story._id}
                href={`/story/${story.uuid}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition flex flex-col h-full overflow-hidden"
              >
                <div className="h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={story.files[0]?.secure_url || "/image1.jpeg"}
                    alt={story.name}
                    width={400}
                    height={320}
                    className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex justify-between items-start gap-2 p-4 flex-1">
                  <div>
                    <h3 className="font-playfair font-semibold text-rich-brown line-clamp-1">
                      {story.name}
                    </h3>
                    <p className="text-muted text-sm mt-1">
                      {typeof story.categoryId === "string"
                        ? "Handcrafted"
                        : story.categoryId.name}
                    </p>
                  </div>
                  <p className="text-terracotta font-semibold whitespace-nowrap">
                    ${story.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
