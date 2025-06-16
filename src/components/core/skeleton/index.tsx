import React from "react";

export const StoryPageCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow animate-pulse flex flex-col h-full">
      {/* Image skeleton */}
      <div className="h-80 w-full bg-gray-200 rounded-t-xl"></div>

      {/* Text skeleton */}
      <div className="flex flex-col justify-between flex-1 p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const StoryDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      {/* Image Placeholder */}
      <div>
        <div className="bg-gray-200 rounded-xl w-full max-w-[400px] mx-auto aspect-[1/1]" />
        <div className="flex gap-3 justify-center mt-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg w-[70px] h-[70px]" />
          ))}
        </div>
      </div>

      {/* Text Placeholder */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-20 bg-gray-200 rounded w-full" />
        <div className="h-12 bg-gray-300 rounded w-[150px]" />
      </div>
    </div>
  );
};
