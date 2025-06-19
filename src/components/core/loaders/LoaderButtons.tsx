import React from "react";
import { LoaderButtonProps } from "@/types";

const LoaderButtons: React.FC<LoaderButtonProps> = ({
  loading,
  text,
  type,
  loadingText,
  disabled = false,
}) => {
  const isDisabled = disabled || loading;
  return (
    <button
      className={`flex items-center justify-center cursor-pointer w-full py-3 rounded-md font-medium transition duration-300 ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-ctaBtn hover:bg-ctaBtnHover text-white"
      }`}
      disabled={isDisabled}
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
