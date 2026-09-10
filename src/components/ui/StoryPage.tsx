"use client";
import React, { useState } from "react";
import StorySidebar from "../StorySidebar";
import Navbar from "../Navbar";
import Image from "next/image";
import PageHeader from "../core/PageHeader";
import Footer from "../Footer";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/service/request/story";
import { StoryProps } from "@/service/request/story/type";
import { StoryPageCardSkeleton } from "../core/skeleton";

const StoryPage = () => {
  const [filteredStories, setFilteredStories] = useState<StoryProps[] | null>(
    null
  );
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterError, setFilterError] = useState("");

  const {
    data: allStories,
    isLoading,
    isError,
  } = useQuery<StoryProps[]>({
    queryKey: ["story"],
    queryFn: getAllStories,
    refetchOnWindowFocus: false,
  });

  const storiesToDisplay = filteredStories || allStories;

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Marketplace"
        title="Browse Handcrafted Goods"
        description="Every piece here is made by hand, in small batches, by an independent artisan."
      />

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <StorySidebar
          onFilter={(data, loading, error) => {
            setFilteredStories(data);
            setIsFiltering(loading);
            setFilterError(error);
          }}
        />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-semibold text-rich-brown">
              All Stories
            </h2>
            {!isLoading && !isFiltering && !filterError && !isError && (
              <p className="text-sm text-muted">
                {storiesToDisplay?.length ?? 0} piece
                {storiesToDisplay?.length === 1 ? "" : "s"}
              </p>
            )}
          </div>

          {isLoading || isFiltering ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, idx) => (
                <StoryPageCardSkeleton key={idx} />
              ))}
            </div>
          ) : filterError || isError ? (
            <div className="flex justify-center items-center mt-20">
              <p className="text-red-500 text-center">
                {filterError ||
                  "Failed to load Stories. Try refreshing the page."}
              </p>
            </div>
          ) : Array.isArray(storiesToDisplay) &&
            storiesToDisplay.length === 0 ? (
            <div className="text-center bg-olive/5 rounded-2xl py-16 px-6">
              <p className="text-lg font-medium text-rich-brown mb-2">
                No stories found
              </p>
              <p className="text-muted">
                Try adjusting or clearing your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {storiesToDisplay?.map((story: StoryProps) => (
                <Link
                  key={story._id}
                  href={`/story/${story.uuid}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition flex flex-col h-full overflow-hidden"
                >
                  <div className="h-64 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={story.files[0]?.secure_url || "/image1.jpeg"}
                      alt={story.name}
                      width={300}
                      height={240}
                      className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-start gap-2 p-4 flex-1">
                    <div>
                      <h3 className="font-playfair font-semibold text-rich-brown line-clamp-2">
                        {story.name}
                      </h3>
                      <p className="text-muted text-sm mt-1">
                        {typeof story?.categoryId === "string"
                          ? "Unknown"
                          : story?.categoryId.name}
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
        </section>
      </div>

      <Footer />
    </>
  );
};

export default StoryPage;
