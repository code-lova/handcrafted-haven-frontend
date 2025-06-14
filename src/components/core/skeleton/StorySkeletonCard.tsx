import React from "react";

const StorySkeletonCard = () => {
  return (
    <>
      <div className="max-w-sm bg-gray-200 border border-gray-300 rounded-lg shadow animate-pulse">
        <div className="h-[220px] bg-gray-300 rounded-t-lg" />
        <div className="p-5 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="flex justify-between mt-6">
            <div className="h-10 bg-gray-300 rounded w-32" />
            <div className="h-10 bg-gray-300 rounded w-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StorySkeletonCard;
