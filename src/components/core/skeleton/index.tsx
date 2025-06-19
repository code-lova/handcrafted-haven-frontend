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

export const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow max-h-[400px] overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200 animate-pulse">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j} className="px-6 py-4">
                  <div className="h-4 w-full bg-gray-100 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-4 bg-white border rounded-xl p-4 shadow-sm animate-pulse"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
            </div>
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
