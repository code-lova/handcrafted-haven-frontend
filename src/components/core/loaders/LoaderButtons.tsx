import React from "react";
import { LoaderButtonProps } from "@/types";

const LoaderButtons: React.FC<LoaderButtonProps> = ({
  loading,
  text,
  type,
  loadingText,
}) => {
  return (
    <button
      className="flex items-center justify-center cursor-pointer w-full bg-ctaBtn hover:bg-ctaBtnHover text-white py-3 rounded-md font-medium"
      disabled={loading}
      type={type}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="loader mr-2" />
          {loadingText || "Loading..."}
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default LoaderButtons;
