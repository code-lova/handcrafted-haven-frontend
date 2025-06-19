"use client";
import React, { useState } from "react";
import StorySidebar from "../StorySidebar";
import Navbar from "../Navbar";
import Image from "next/image";
import Hero from "../Hero";
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
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-26 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <StorySidebar
          onFilter={(data, loading, error) => {
            setFilteredStories(data);
            setIsFiltering(loading);
            setFilterError(error);
          }}
        />

        <section>
          <h2 className="text-2xl font-playfair font-semibold mb-6">
            All Stories
          </h2>

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
            <div className="flex justify-center items-center mt-20">
              <p className="text-gray-600 text-center text-lg font-medium">
                No stories found with the selected filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {storiesToDisplay?.map((story: StoryProps) => (
                <Link
                  key={story._id}
                  href={`/story/${story.uuid}`}
                  className="cursor-pointer"
                >
                  <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col h-full">
                    <div className="h-80 w-full overflow-hidden rounded-t-xl flex items-center justify-center bg-gray-100">
                      <Image
                        src={story.files[0]?.secure_url || "/image1.jpeg"}
                        alt={story.name}
                        width={300}
                        height={240}
                        className="object-fit h-full w-full"
                      />
                    </div>
                    <div className="flex justify-between flex-1 p-4">
                      <div>
                        <h3 className="text-lg font-playfair font-semibold line-clamp-2">
                          #{story.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-1">
                          {typeof story?.categoryId === "string"
                            ? "Unknown"
                            : story?.categoryId.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-olive font-semibold">
                          ${story.price}
                        </p>
                      </div>
                    </div>
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
